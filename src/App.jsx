import { useState, useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-rotate";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

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
import { getUserLocation, formatDistance } from "./utils/geoUtils";
import SearchBar from "./components/SearchBar";
import DestinationCard from "./components/DestinationCard";
import GoogleMapsHandoffCard from "./components/GoogleMapsHandoffCard";
import FreshersGuide from "./components/FreshersGuide";
import LandingPage from "./components/LandingPage";
import ContactModal from "./components/ContactModal";

// Custom Leaflet Pin Icons

// User Starting Location Pin (Emerald Green - distinct from blue and red)
const UserLocationIcon = L.divIcon({
  className: "user-gps-pin-container",
  html: `
    <div class="user-gps-beacon user-beacon-emerald">
      <div class="radar-wave wave-emerald wave-1"></div>
      <div class="radar-wave wave-emerald wave-2"></div>
      <div class="radar-wave wave-emerald wave-3"></div>
      <div class="gps-core-dot dot-emerald-glow"></div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18],
});

// Destination Target Pin (Vivid Crimson Red)
const DestinationPinIcon = L.divIcon({
  className: "dest-pin-container",
  html: `
    <div class="dest-marker-pin">
      <svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C6.71573 0 0 6.71573 0 15C0 25.5 15 42 15 42C15 42 30 25.5 30 15C30 6.71573 23.2843 0 15 0Z" fill="#EF4444"/>
        <circle cx="15" cy="15" r="7.5" fill="#FFFFFF"/>
        <circle cx="15" cy="15" r="4.5" fill="#DC2626"/>
      </svg>
    </div>
  `,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -38],
});

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

function LocationHudButton({
  userLocation,
  locationStatus,
  onAcquireLocation,
}) {
  const map = useMap();
  const isLocating =
    locationStatus === "acquiring" || locationStatus === "fallback";

  const handleClick = async () => {
    if (userLocation && locationStatus !== "error") {
      map.flyTo(userLocation, 18, { duration: 1.2 });
      return;
    }

    const loc = await onAcquireLocation();
    if (loc) {
      map.flyTo(loc, 18, { duration: 1.5 });
    }
  };

  return (
    <button
      className={`hud-gps-button ${
        locationStatus === "error"
          ? "btn-gps-error"
          : userLocation
          ? "btn-gps-locked"
          : ""
      }`}
      onClick={handleClick}
      title={
        userLocation
          ? "Center view on current user location"
          : "Acquire user GPS telemetry"
      }
      disabled={isLocating}
    >
      <span
        className={`gps-indicator-dot ${
          locationStatus === "error"
            ? "dot-rose"
            : locationStatus === "fallback"
            ? "dot-amber"
            : userLocation
            ? "dot-emerald"
            : ""
        }`}
      ></span>
      <span className="gps-btn-text">
        {locationStatus === "acquiring"
          ? "ACQUIRING FIX..."
          : locationStatus === "fallback"
          ? "RETRYING (NETWORK)..."
          : locationStatus === "error"
          ? "RETRY GPS LOCK"
          : userLocation
          ? "MY LOCATION"
          : "LOCK MY GPS"}
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

function CompassHudControl() {
  const map = useMap();
  const [bearing, setBearing] = useState(0);

  useEffect(() => {
    if (!map) return;

    const updateBearing = () => {
      if (typeof map.getBearing === "function") {
        const currentBearing = Math.round(map.getBearing() || 0);
        const normalized = ((currentBearing % 360) + 360) % 360;
        setBearing(normalized);
      }
    };

    map.on("rotate", updateBearing);
    updateBearing();

    return () => {
      map.off("rotate", updateBearing);
    };
  }, [map]);

  const handleResetNorth = () => {
    if (typeof map.setBearing === "function") {
      map.setBearing(0);
    }
  };

  const handleRotateLeft = () => {
    if (typeof map.setBearing === "function") {
      const current = typeof map.getBearing === "function" ? map.getBearing() : bearing;
      map.setBearing(current - 45);
    }
  };

  const handleRotateRight = () => {
    if (typeof map.setBearing === "function") {
      const current = typeof map.getBearing === "function" ? map.getBearing() : bearing;
      map.setBearing(current + 45);
    }
  };

  const cardinals = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const cardinalIndex = Math.round(bearing / 22.5) % 16;
  const directionName = cardinals[cardinalIndex];

  const isRotated = bearing !== 0;

  return (
    <div className={`hud-compass-box ${isRotated ? "is-rotated" : ""}`}>
      <button
        className="hud-rotate-btn"
        onClick={handleRotateLeft}
        title="Rotate map counter-clockwise (45°)"
      >
        ↺
      </button>

      <button
        className="hud-compass-dial"
        onClick={handleResetNorth}
        title={isRotated ? "Click to reset orientation to North-Up (0°)" : "Map aligned North-Up"}
      >
        <div
          className="compass-needle"
          style={{ transform: `rotate(${-bearing}deg)` }}
        >
          <span className="needle-north">▲</span>
          <span className="needle-south">▼</span>
        </div>
        <span className="compass-bearing-label">{bearing}° {directionName}</span>
      </button>

      <button
        className="hud-rotate-btn"
        onClick={handleRotateRight}
        title="Rotate map clockwise (45°)"
      >
        ↻
      </button>
    </div>
  );
}

function MapHudControls({
  userLocation,
  locationStatus,
  onAcquireLocation,
  campusCenter,
  activeLayer,
  setActiveLayer,
}) {
  return (
    <div className="hud-floating-controls">
      <LocationHudButton
        userLocation={userLocation}
        locationStatus={locationStatus}
        onAcquireLocation={onAcquireLocation}
      />
      <CompassHudControl />
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
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 18 });
    } else if (
      targetCoords &&
      targetCoords[0] != null &&
      targetCoords[1] != null
    ) {
      map.flyTo(targetCoords, 17, { duration: 1.2 });
    }
  }, [targetCoords, routeCoords, map]);

  return null;
}

function LocationStatusToast({
  locationStatus,
  locationStatusDetail,
  locationError,
  onRetry,
  onDismiss,
}) {
  const isLocating =
    locationStatus === "acquiring" || locationStatus === "fallback";

  if (!isLocating && !locationError) return null;

  return (
    <div
      className={`hud-location-toast ${
        locationError ? "toast-error" : "toast-info"
      }`}
    >
      {isLocating && (
        <div className="toast-inner">
          <div className="spinner-ring"></div>
          <div className="toast-text-group">
            <span className="toast-title">
              {locationStatus === "fallback"
                ? "STANDARD ACCURACY FALLBACK"
                : "ACQUIRING GPS SATELLITE FIX"}
            </span>
            <span className="toast-desc">{locationStatusDetail}</span>
          </div>
        </div>
      )}

      {locationError && (
        <div className="toast-inner">
          <div className="toast-icon">
            {locationError.type === "PERMISSION_DENIED"
              ? "🔒"
              : locationError.type === "TIMEOUT"
              ? "⏱️"
              : "⚠️"}
          </div>
          <div className="toast-text-group">
            <div className="toast-title-row">
              <span className="toast-title">{locationError.title}</span>
              {locationError.code && (
                <span className="toast-code-pill">CODE {locationError.code}</span>
              )}
            </div>
            <span className="toast-desc">{locationError.message}</span>
          </div>
          <div className="toast-actions">
            {locationError.canRetry && (
              <button className="toast-retry-btn" onClick={onRetry}>
                🔄 RETRY
              </button>
            )}
            <button
              className="toast-dismiss-btn"
              onClick={onDismiss}
              title="Dismiss notification"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveRouteHud({
  destination,
  routeStats,
  onClearRoute,
  onViewDetails,
  onShowGmapsPopup,
  isFullMapMode,
  onToggleFullMap,
}) {
  if (!routeStats) return null;

  const distanceText = routeStats.distance
    ? formatDistance(routeStats.distance)
    : "";
  const durationMinutes = routeStats.duration
    ? Math.max(1, Math.round(routeStats.duration / 60))
    : 1;

  return (
    <div className="active-route-hud">
      <div className="route-hud-pill">
        <div className="route-hud-info">
          <span className="route-hud-beacon"></span>
          <div className="route-hud-text">
            <span className="route-hud-dest">
              {destination?.name
                ? `TO: ${destination.name.toUpperCase()}`
                : "ACTIVE WALKING ROUTE"}
            </span>
            <div className="route-hud-metrics">
              <span className="route-metric-dist">📍 {distanceText}</span>
              <span className="route-metric-sep">•</span>
              <span className="route-metric-time">🚶 {durationMinutes} MIN WALK</span>
            </div>
          </div>
        </div>

        <div className="route-hud-actions">
          {onShowGmapsPopup && (
            <button
              className="route-hud-gmaps-btn"
              onClick={onShowGmapsPopup}
              title="Open turn-by-turn navigation in Google Maps"
            >
              🗺️ GMAPS
            </button>
          )}
          {onToggleFullMap && (
            <button
              className={`route-hud-fullmap-btn ${isFullMapMode ? "is-active" : ""}`}
              onClick={onToggleFullMap}
              title={isFullMapMode ? "Restore standard view" : "Maximize map space"}
            >
              {isFullMapMode ? "🗗 EXIT" : "⛶ FULL MAP"}
            </button>
          )}
          {destination && (
            <button
              className="route-hud-details-btn"
              onClick={onViewDetails}
              title="Show target node details"
            >
              ℹ️ INFO
            </button>
          )}
          <button
            className="route-hud-clear-btn"
            onClick={onClearRoute}
            title="End navigation and clear route"
          >
            ✕ CLEAR
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const defaultAdmin = getLocationById("admin-building") || locations[0];
  const campusCenter = [defaultAdmin.latitude, defaultAdmin.longitude];

  // Routing State
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path) => {
    if (typeof window !== "undefined" && window.location.pathname !== path) {
      window.history.pushState(null, "", path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  const [activeLayer, setActiveLayer] = useState("OSM");
  const [userLocation, setUserLocation] = useState(null);
  const [userLocationAccuracy, setUserLocationAccuracy] = useState(null);
  const [isFallbackLocation, setIsFallbackLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationStatusDetail, setLocationStatusDetail] = useState("");
  const [locationError, setLocationError] = useState(null);

  const [selectedDestination, setSelectedDestination] = useState(defaultAdmin);
  const [activeDestination, setActiveDestination] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [route, setRoute] = useState([]);
  const [routeStats, setRouteStats] = useState(null);
  const [isRouting, setIsRouting] = useState(false);
  const [showGoogleMapsPopup, setShowGoogleMapsPopup] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFullMapMode, setIsFullMapMode] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const verifiedLocations = getVerifiedLocations();

  const handleAcquireLocation = useCallback(
    async (options = {}) => {
      setLocationStatus("acquiring");
      setLocationStatusDetail("Acquiring high-accuracy GPS fix (20–30s timeout)...");
      setLocationError(null);

      const result = await getUserLocation({
        onStatusChange: ({ phase, detail }) => {
          if (phase === "high_accuracy") {
            setLocationStatus("acquiring");
            setLocationStatusDetail(detail || "Acquiring high-accuracy GPS fix...");
          } else if (phase === "fallback_low_accuracy") {
            setLocationStatus("fallback");
            setLocationStatusDetail(
              detail || "High accuracy unavailable, retrying with network-assisted positioning..."
            );
          }
        },
        ...options,
      });

      if (result.success && result.coords) {
        const loc = [result.coords.latitude, result.coords.longitude];
        setUserLocation(loc);
        setUserLocationAccuracy(result.coords.accuracy);
        setIsFallbackLocation(result.isFallback);
        setLocationStatus("success");
        setLocationStatusDetail(
          result.isFallback
            ? `Position locked via Network/Wi-Fi (±${Math.round(result.coords.accuracy)}m)`
            : `Position locked via Precise GPS (±${Math.round(result.coords.accuracy)}m)`
        );
        setLocationError(null);
        return loc;
      } else {
        setLocationStatus("error");
        setLocationError(result.error);
        setLocationStatusDetail(result.error?.message || "Location acquisition failed.");
        return null;
      }
    },
    []
  );

  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
    setIsSearchExpanded(false);
  };

  const handleSelectMapLocationFromGuide = (locationId) => {
    const target = getLocationById(locationId);
    if (target) {
      setSelectedDestination(target);
    }
    navigateTo("/map");
  };

  const handleClearRoute = () => {
    setRoute([]);
    setRouteStats(null);
    setActiveDestination(null);
    setShowGoogleMapsPopup(false);
    setIsFullMapMode(false);
    setIsSearchExpanded(false);
  };

  const handleCloseCard = () => {
    setSelectedDestination(null);
  };

  const getRoute = async () => {
    if (!selectedDestination || selectedDestination.latitude === null) {
      alert("Selected target node does not have verified spatial coordinates.");
      return;
    }

    let currentUserLoc = userLocation;
    if (!currentUserLoc) {
      currentUserLoc = await handleAcquireLocation();
      if (!currentUserLoc) {
        return;
      }
    }

    setIsRouting(true);
    const start = `${currentUserLoc[1]},${currentUserLoc[0]}`;
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
        setActiveDestination(selectedDestination);
        // Automatically hide the large target location detail card so the map & navigation path are fully visible, especially on mobile!
        setSelectedDestination(null);
        // Display Google Maps Turn-by-Turn navigation handoff popup
        setShowGoogleMapsPopup(true);
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

  const currentTileLayer = MAP_LAYERS[activeLayer] || MAP_LAYERS.OSM;

  // Render clean, minimal Landing Page at root URL (/) or /home
  if (currentPath === "/" || currentPath === "" || currentPath === "/home") {
    return (
      <>
        <LandingPage
          onNavigateToCampus={() => navigateTo("/map")}
          onNavigateToFreshers={() => navigateTo("/freshers")}
          onOpenContact={() => setIsContactModalOpen(true)}
        />
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </>
    );
  }

  // Render dedicated Freshers Guide page if path is /freshers
  if (currentPath === "/freshers" || currentPath.startsWith("/freshers")) {
    return (
      <>
        <FreshersGuide
          onNavigateToMap={() => navigateTo("/map")}
          onNavigateToHome={() => navigateTo("/")}
          onSelectMapLocation={handleSelectMapLocationFromGuide}
          onOpenContact={() => setIsContactModalOpen(true)}
        />
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="app">
      {/* Top Telemetry & Header Bar */}
      <header className={`header ${route.length > 0 ? "nav-route-active" : ""} ${isFullMapMode ? "nav-full-map-hidden" : ""}`}>
        <div className="header-top-row">
          <div 
            className="brand-badge-group brand-badge-interactive"
            onClick={() => navigateTo("/")}
            role="button"
            tabIndex={0}
            title="Return to Main Portal"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigateTo("/"); }}
          >
            <div className="institute-emblem">
              <span className="emblem-core">NIT</span>
            </div>
            <div className="header-titles">
              <div className="sys-status-line">
                <span className="status-blinker"></span>
                <span className="sys-title">CAMPUS NAVIGATION SYSTEM</span>
                <span className="sys-version">v2.5</span>
              </div>
              <h1 className="main-heading">
                <span className="heading-desktop">National Institute of Technology Silchar</span>
                <span className="heading-mobile">NIT Silchar</span>
              </h1>
            </div>
          </div>

          {/* Quick Header Actions: Home Portal, Freshers Button & Telemetry */}
          <div className="header-right-actions">
            <button
              className="header-home-pill-btn"
              onClick={() => navigateTo("/")}
              title="Return to Main Portal Home"
            >
              <span className="pill-sparkle">⌂</span>
              <span className="pill-text">HOME</span>
            </button>

            <button
              className="header-freshers-pill-btn"
              onClick={() => navigateTo("/freshers")}
              title="Open Freshers Compass & Campus Companion"
            >
              <span className="pill-sparkle">🎓</span>
              <span className="pill-text">FRESHERS GUIDE</span>
              <span className="pill-tag">2026</span>
            </button>

            <button
              className="header-contact-pill-btn"
              onClick={() => setIsContactModalOpen(true)}
              title="Suggestions & Connect with Alvis Khan"
            >
              <span className="pill-sparkle">💬</span>
              <span className="pill-text">SUGGESTIONS</span>
            </button>

            {/* Quick HUD Telemetry Bar */}
            <div className="telemetry-bar">
              <div className="telemetry-item">
                <span className="telem-label">NODES ONLINE</span>
                <span className="telem-val">{locations.length} VERIFIED</span>
              </div>
              <div className="telemetry-item">
                <span className="telem-label">GPS STATUS</span>
                <span
                  className={`telem-val ${
                    userLocation
                      ? isFallbackLocation
                        ? "text-neon-emerald"
                        : "text-neon-cyan"
                      : locationStatus === "error"
                      ? "text-neon-rose"
                      : locationStatus === "acquiring" || locationStatus === "fallback"
                      ? "text-neon-amber"
                      : "text-amber"
                  }`}
                >
                  {userLocation
                    ? isFallbackLocation
                      ? `LOCKED (EST. ±${Math.round(userLocationAccuracy || 30)}m)`
                      : "LOCKED (3D FIX)"
                    : locationStatus === "acquiring"
                    ? "ACQUIRING..."
                    : locationStatus === "fallback"
                    ? "FALLBACK FIX..."
                    : locationStatus === "error"
                    ? "FIX FAILED"
                    : "STANDBY"}
                </span>
              </div>
            </div>
          </div>
        </div>



        {/* Navigation Mode: Ultra-compact route strip instead of bulky search stack */}
        {route.length > 0 && !isSearchExpanded && (
          <div className="active-nav-compact-header">
            <div className="nav-compact-info">
              <span className="nav-compact-icon">🚶</span>
              <div className="nav-compact-titles">
                <span className="nav-compact-to">WALKING ROUTE</span>
                <strong className="nav-compact-name">
                  {activeDestination?.name || "SELECTED DESTINATION"}
                </strong>
              </div>
            </div>
            <div className="nav-compact-btns">
              <button
                type="button"
                className="nav-btn-change-dest"
                onClick={() => setIsSearchExpanded(true)}
                title="Search or select a different location"
              >
                🔍 CHANGE
              </button>
              <button
                type="button"
                className="nav-btn-fullmap-top"
                onClick={() => setIsFullMapMode(!isFullMapMode)}
                title={isFullMapMode ? "Restore standard view" : "Maximize map space"}
              >
                {isFullMapMode ? "🗗 EXIT" : "⛶ FULL MAP"}
              </button>
            </div>
          </div>
        )}

        {/* Global Search & Category Filters (shown when no route OR when search is expanded) */}
        {(route.length === 0 || isSearchExpanded) && (
          <div className="search-expanded-wrapper">
            {route.length > 0 && isSearchExpanded && (
              <div className="search-collapse-strip">
                <span>SELECT NEW TARGET LOCATION</span>
                <button
                  type="button"
                  className="btn-collapse-search"
                  onClick={() => setIsSearchExpanded(false)}
                >
                  ✕ CANCEL
                </button>
              </div>
            )}
            <SearchBar
              locations={locations}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectLocation={handleSelectDestination}
              userLocation={userLocation}
            />
          </div>
        )}
      </header>

      {/* Main Map Viewport */}
      <div className={`map-container ${isFullMapMode ? "map-full-screen" : ""}`}>
        {/* Floating Restore Controls Button (visible when header is hidden in full map mode) */}
        {isFullMapMode && (
          <button
            className="floating-restore-hud-btn"
            onClick={() => setIsFullMapMode(false)}
            title="Restore standard interface header"
          >
            🗗 SHOW CONTROLS
          </button>
        )}

        {/* Floating HUD Location Status Toast */}
        <LocationStatusToast
          locationStatus={locationStatus}
          locationStatusDetail={locationStatusDetail}
          locationError={locationError}
          onRetry={() => handleAcquireLocation()}
          onDismiss={() => setLocationError(null)}
        />

        {/* Compact Active Navigation HUD Bar (shown when route exists and large card is hidden) */}
        {route.length > 0 && routeStats && !selectedDestination && (
          <ActiveRouteHud
            destination={activeDestination}
            routeStats={routeStats}
            onClearRoute={handleClearRoute}
            onViewDetails={() => setSelectedDestination(activeDestination)}
            onShowGmapsPopup={() => setShowGoogleMapsPopup(true)}
            isFullMapMode={isFullMapMode}
            onToggleFullMap={() => setIsFullMapMode(!isFullMapMode)}
          />
        )}

        {/* Google Maps Turn-by-Turn Handoff Popup (shown after route calculation) */}
        {showGoogleMapsPopup && activeDestination && route.length > 0 && (
          <GoogleMapsHandoffCard
            destination={activeDestination}
            userLocation={userLocation}
            onDismiss={() => setShowGoogleMapsPopup(false)}
            routeStats={routeStats}
          />
        )}

        <MapContainer
          center={campusCenter}
          zoom={17}
          scrollWheelZoom={true}
          rotate={true}
          touchRotate={true}
          shiftKeyRotate={true}
          rotateControl={false}
          bearing={0}
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
            userLocation={userLocation}
            locationStatus={locationStatus}
            onAcquireLocation={handleAcquireLocation}
            campusCenter={campusCenter}
            activeLayer={activeLayer}
            setActiveLayer={setActiveLayer}
          />

          {/* Campus Location Pins: Default pin for standard nodes, Red pin for destination. Filtered to only target destination when direction is shown */}
          {verifiedLocations
            .filter((loc) => {
              if (route.length > 0) {
                const targetId = activeDestination?.id || selectedDestination?.id;
                return loc.id === targetId;
              }
              return true;
            })
            .map((loc) => {
              const isDestination =
                selectedDestination?.id === loc.id ||
                activeDestination?.id === loc.id;

              return (
                <Marker
                  key={loc.id}
                  position={[loc.latitude, loc.longitude]}
                  icon={isDestination ? DestinationPinIcon : DefaultIcon}
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
                        {isDestination ? "✓ CURRENT DESTINATION" : "🎯 LOCK AS DESTINATION"}
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

          {/* User Location Marker (Vivid Emerald Green — Not Blue, Not Red) */}
          {userLocation && (
            <Marker position={userLocation} icon={UserLocationIcon}>
              <Popup className="cyber-leaflet-popup">
                <div className="marker-popup">
                  <div className="popup-top-badge">
                    <span className="popup-category">
                      {isFallbackLocation
                        ? "USER POSITION (NETWORK FIX)"
                        : "USER POSITION (GPS LOCK)"}
                    </span>
                    {userLocationAccuracy && (
                      <span className="popup-node-id">
                        ±{Math.round(userLocationAccuracy)}m
                      </span>
                    )}
                  </div>
                  <strong className="popup-title">Current Live Position</strong>
                  <p className="popup-desc">
                    {isFallbackLocation
                      ? "Standard network-assisted positioning coordinates"
                      : "High-precision satellite telemetry locked"}
                  </p>
                  <div className="popup-coords">
                    📍 {userLocation[0].toFixed(5)}° N, {userLocation[1].toFixed(5)}° E
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

        {/* Destination Card (shown when a destination is selected) */}
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

        {/* Contact & Suggestion Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>
      <Analytics />
    </div>
  );
}

export default App;