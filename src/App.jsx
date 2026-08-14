import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

// Leaflet default location pin icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

import locations, {
  getLocationById,
  getVerifiedLocations,
} from "./data/locations";
import SearchBar from "./components/SearchBar";
import DestinationCard from "./components/DestinationCard";

// Map tile layers
const MAP_LAYERS = {
  OSM: {
    id: "osm",
    name: "OSM Standard",
    icon: "🌐",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  SATELLITE: {
    id: "satellite",
    name: "Satellite",
    icon: "🛰️",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://esri.com">Esri</a>',
  },
};

function LocationHudButton({ setUserLocation }) {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);

  const findMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const location = [latitude, longitude];
        setUserLocation(location);
        map.flyTo(location, 18, { duration: 1.5 });
      },
      (error) => {
        setIsLocating(false);
        console.error("Geolocation error:", error);

        if (error.code === error.PERMISSION_DENIED) {
          alert("Please enable GPS / Location permissions in browser settings.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          alert("GPS satellite lock could not be acquired.");
        } else if (error.code === error.TIMEOUT) {
          alert("Location request timed out. Retrying...");
        } else {
          alert("Unable to acquire current GPS coordinates.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <button
      className="hud-gps-button"
      onClick={findMyLocation}
      title="Acquire user GPS telemetry"
      disabled={isLocating}
    >
      <span className="gps-indicator-dot"></span>
      <span className="gps-btn-text">
        {isLocating ? "ACQUIRING FIX..." : "LOCK MY GPS"}
      </span>
    </button>
  );
}

function CampusCenterButton({ center }) {
  const map = useMap();
  const handleRecenter = () => {
    map.flyTo(center, 17, { duration: 1.2 });
  };

  return (
    <button
      className="hud-recenter-button"
      onClick={handleRecenter}
      title="Recenter campus view"
    >
      <span>🎯</span> RECENTER CAMPUS
    </button>
  );
}

function MapHudControls({
  setUserLocation,
  campusCenter,
  activeLayer,
  setActiveLayer,
}) {
  return (
    <div className="hud-floating-controls">
      <LocationHudButton setUserLocation={setUserLocation} />
      <CampusCenterButton center={campusCenter} />

      {/* Map Layer Switcher Pills */}
      <div className="layer-switcher-pills">
        {Object.keys(MAP_LAYERS).map((key) => {
          const layer = MAP_LAYERS[key];
          return (
            <button
              key={layer.id}
              className={`layer-pill ${activeLayer === key ? "active" : ""}`}
              onClick={() => setActiveLayer(key)}
              title={`Switch to ${layer.name}`}
            >
              <span>{layer.icon}</span>
              <span className="layer-pill-text">{layer.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MapViewController({ targetCoords, routeCoords }) {
  const map = useMap();

  useEffect(() => {
    if (routeCoords && routeCoords.length > 0) {
      const bounds = routeCoords.map(([lat, lng]) => [lat, lng]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 18 });
    } else if (targetCoords && targetCoords[0] != null && targetCoords[1] != null) {
      map.flyTo(targetCoords, 17, { duration: 1.2 });
    }
  }, [targetCoords, routeCoords, map]);

  return null;
}

function App() {
  const defaultAdmin = getLocationById("admin-building") || locations[0];
  const campusCenter = [defaultAdmin.latitude, defaultAdmin.longitude];

  const [activeLayer, setActiveLayer] = useState("OSM");
  const [userLocation, setUserLocation] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(defaultAdmin);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [route, setRoute] = useState([]);
  const [routeStats, setRouteStats] = useState(null);
  const [isRouting, setIsRouting] = useState(false);

  const verifiedLocations = getVerifiedLocations();

  const handleSelectDestination = (loc) => {
    setSelectedDestination(loc);
    setRoute([]);
    setRouteStats(null);
  };

  const handleClearRoute = () => {
    setRoute([]);
    setRouteStats(null);
  };

  const handleCloseCard = () => {
    setSelectedDestination(null);
    setRoute([]);
    setRouteStats(null);
  };

  const getRoute = async () => {
    if (!selectedDestination || selectedDestination.latitude === null) {
      alert("Selected target node does not have verified spatial coordinates.");
      return;
    }

    if (!userLocation) {
      alert("Please initialize GPS telemetry by clicking 'LOCK MY GPS' first.");
      return;
    }

    setIsRouting(true);
    const start = `${userLocation[1]},${userLocation[0]}`;
    const destination = `${selectedDestination.longitude},${selectedDestination.latitude}`;

    const url = `https://router.project-osrm.org/route/v1/driving/${start};${destination}?overview=full&geometries=geojson`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Routing computation failed.");
      }

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const routeData = data.routes[0];
        const coordinates = routeData.geometry.coordinates;

        const routeCoordinates = coordinates.map(
          ([longitude, latitude]) => [latitude, longitude]
        );

        setRoute(routeCoordinates);
        setRouteStats({
          distance: routeData.distance,
          duration: routeData.duration,
        });
      } else {
        alert("No traversal path found to this campus destination.");
      }
    } catch (error) {
      console.error("Routing error:", error);
      alert("Unable to calculate route. Please verify network status.");
    } finally {
      setIsRouting(false);
    }
  };

  const currentTileLayer = MAP_LAYERS[activeLayer] || MAP_LAYERS.VOYAGER;

  return (
    <div className="app">
      {/* Top Telemetry & Header Bar */}
      <header className="header">
        <div className="header-top-row">
          <div className="brand-badge-group">
            <div className="institute-emblem">
              <span className="emblem-core">NIT</span>
            </div>
            <div className="header-titles">
              <div className="sys-status-line">
                <span className="status-blinker"></span>
                <span className="sys-title">CAMPUS NAVIGATION SYSTEM</span>
                <span className="sys-version">v2.5</span>
              </div>
              <h1 className="main-heading">National Institute of Technology Silchar</h1>
            </div>
          </div>

          {/* Quick HUD Telemetry Bar */}
          <div className="telemetry-bar">
            <div className="telemetry-item">
              <span className="telem-label">NODES ONLINE</span>
              <span className="telem-val">{locations.length} VERIFIED</span>
            </div>
            <div className="telemetry-item">
              <span className="telem-label">GPS STATUS</span>
              <span className={`telem-val ${userLocation ? "text-neon-cyan" : "text-amber"}`}>
                {userLocation ? "LOCKED (3D FIX)" : "STANDBY"}
              </span>
            </div>
          </div>
        </div>

        {/* Global Search & Category Filters */}
        <SearchBar
          locations={locations}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectLocation={handleSelectDestination}
          userLocation={userLocation}
        />
      </header>

      {/* Main Map Viewport */}
      <div className="map-container">
        <MapContainer
          center={campusCenter}
          zoom={17}
          scrollWheelZoom={true}
          className={`map ${activeLayer.toLowerCase()}-mode`}
        >
          <TileLayer
            key={currentTileLayer.id}
            attribution={currentTileLayer.attribution}
            url={currentTileLayer.url}
          />

          <MapViewController
            targetCoords={
              selectedDestination?.latitude != null
                ? [selectedDestination.latitude, selectedDestination.longitude]
                : null
            }
            routeCoords={route}
          />

          {/* Map HUD Controls inside MapContainer */}
          <MapHudControls
            setUserLocation={setUserLocation}
            campusCenter={campusCenter}
            activeLayer={activeLayer}
            setActiveLayer={setActiveLayer}
          />

          {/* Standard Location Pins */}
          {verifiedLocations.map((loc) => {
            const isSelected = selectedDestination?.id === loc.id;
            return (
              <Marker
                key={loc.id}
                position={[loc.latitude, loc.longitude]}
                eventHandlers={{
                  click: () => handleSelectDestination(loc),
                }}
              >
                <Popup className="cyber-leaflet-popup">
                  <div className="marker-popup">
                    <div className="popup-top-badge">
                      <span className="popup-category">{loc.category}</span>
                      <span className="popup-node-id">#{loc.id}</span>
                    </div>
                    <strong className="popup-title">{loc.name}</strong>
                    <p className="popup-desc">{loc.description}</p>
                    <div className="popup-coords">
                      📍 {loc.latitude.toFixed(5)}° N, {loc.longitude.toFixed(5)}° E
                    </div>
                    <button
                      className="popup-select-btn"
                      onClick={() => handleSelectDestination(loc)}
                    >
                      {isSelected ? "✓ CURRENT TARGET" : "🎯 LOCK AS DESTINATION"}
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* User Location Marker */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup className="cyber-leaflet-popup">
                <div className="marker-popup">
                  <span className="popup-category">USER LOCATION</span>
                  <strong className="popup-title">Current GPS Position</strong>
                  <p className="popup-desc">Real-time GPS coordinates acquired</p>
                  <div className="popup-coords">
                    {userLocation[0].toFixed(5)}° N, {userLocation[1].toFixed(5)}° E
                  </div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Solid Blue Direction Route Polyline */}
          {route.length > 0 && (
            <Polyline
              positions={route}
              pathOptions={{
                color: "#2563eb",
                weight: 6,
                opacity: 0.85,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          )}
        </MapContainer>

        {/* Destination Card */}
        {selectedDestination && (
          <DestinationCard
            destination={selectedDestination}
            userLocation={userLocation}
            onStartNavigation={getRoute}
            onClearRoute={handleClearRoute}
            onClose={handleCloseCard}
            hasActiveRoute={route.length > 0}
            isRouting={isRouting}
            routeStats={routeStats}
          />
        )}
      </div>
    </div>
  );
}

export default App;