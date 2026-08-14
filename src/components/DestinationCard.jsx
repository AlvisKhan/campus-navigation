import { CATEGORIES } from "../data/locations";
import {
  calculateDistance,
  formatDistance,
  calculateWalkingTime,
  calculateBearing,
} from "../utils/geoUtils";

export default function DestinationCard({
  destination,
  userLocation,
  onStartNavigation,
  onClearRoute,
  onClose,
  hasActiveRoute,
  isRouting,
  routeStats,
}) {
  if (!destination) return null;

  const catInfo = CATEGORIES[destination.categoryId?.toUpperCase()] || {
    icon: "🏢",
    name: destination.category,
    color: "#38bdf8",
  };

  const isVerified = destination.latitude != null && destination.longitude != null;

  // Direct distance and bearing from user GPS
  let distanceMeters = null;
  let vectorBearing = null;

  if (userLocation && isVerified) {
    distanceMeters = calculateDistance(
      userLocation[0],
      userLocation[1],
      destination.latitude,
      destination.longitude
    );
    vectorBearing = calculateBearing(
      userLocation[0],
      userLocation[1],
      destination.latitude,
      destination.longitude
    );
  }

  // Display metrics (prefer routing distance if calculated)
  const displayDistance = routeStats?.distance
    ? formatDistance(routeStats.distance)
    : distanceMeters != null
      ? formatDistance(distanceMeters)
      : null;

  const displayDuration = routeStats?.duration
    ? `${Math.max(1, Math.round(routeStats.duration / 60))} MIN`
    : distanceMeters != null
      ? calculateWalkingTime(distanceMeters).toUpperCase()
      : null;

  return (
    <div className="destination-card" style={{ "--target-accent": catInfo.color || "#00f0ff" }}>
      {/* Holographic Header */}
      <div className="dest-card-header">
        <div className="dest-card-title-group">
          <div className="dest-tech-icon-box">
            <span className="dest-tech-icon">{catInfo.icon}</span>
            <span className="dest-glow-ring"></span>
          </div>

          <div className="dest-header-details">
            <div className="dest-badge-row">
              <span className="dest-category-tag">{destination.category}</span>
              <span className="dest-id-tag">ID: {destination.id}</span>
              <span className="dest-status-verified">● GPS VERIFIED</span>
            </div>
            <h2 className="dest-name">{destination.name}</h2>
          </div>
        </div>

        <button
          className="dest-close-btn"
          onClick={onClose}
          title="Deselect target"
        >
          ✕
        </button>
      </div>

      <p className="dest-description">{destination.description}</p>

      {/* Futuristic Telemetry HUD Grid */}
      <div className="dest-metrics-grid">
        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-icon">📍</span>
            <span className="metric-label">DISTANCE</span>
          </div>
          <span className="metric-val mono-glow">
            {displayDistance || (userLocation ? "SYNCING..." : "ENABLE GPS")}
          </span>
        </div>

        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-icon">🚶</span>
            <span className="metric-label">TRANSIT ETA</span>
          </div>
          <span className="metric-val mono-glow">
            {displayDuration || (userLocation ? "SYNCING..." : "ENABLE GPS")}
          </span>
        </div>

        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-icon">🧭</span>
            <span className="metric-label">HEADING VECTOR</span>
          </div>
          <span className="metric-val mono-text">
            {vectorBearing || (userLocation ? "CALCULATING" : "GPS REQUIRED")}
          </span>
        </div>

        <div className="metric-box">
          <div className="metric-header">
            <span className="metric-icon">🌐</span>
            <span className="metric-label">COORDINATES</span>
          </div>
          <span className="metric-val mono-small">
            {destination.latitude.toFixed(5)}°, {destination.longitude.toFixed(5)}°
          </span>
        </div>
      </div>

      {/* Tactical Route Action Buttons */}
      <div className="dest-actions">
        <button
          className={`btn-navigate ${hasActiveRoute ? "btn-active-nav" : ""}`}
          onClick={onStartNavigation}
          disabled={isRouting}
        >
          {isRouting ? (
            <span className="btn-loading-flex">
              <span className="spinner-ring"></span> COMPUTING PEDESTRIAN PATH...
            </span>
          ) : hasActiveRoute ? (
            "🔄 RECOMPUTE WALKING ROUTE"
          ) : (
            "⚡ INITIALIZE DIRECTION"
          )}
        </button>

        {hasActiveRoute && (
          <button className="btn-clear-route" onClick={onClearRoute}>
            CLEAR PATH
          </button>
        )}
      </div>
    </div>
  );
}
