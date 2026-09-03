import { useEffect } from "react";
import { getGoogleMapsDirectionsUrl } from "../utils/geoUtils";

export default function GoogleMapsHandoffCard({
  destination,
  userLocation,
  onDismiss,
  routeStats,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 7000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!destination || destination.latitude == null || destination.longitude == null) {
    return null;
  }

  const originLat = userLocation ? userLocation[0] : null;
  const originLng = userLocation ? userLocation[1] : null;

  const gmapsUrl = getGoogleMapsDirectionsUrl(
    originLat,
    originLng,
    destination.latitude,
    destination.longitude,
    "walking"
  );

  return (
    <div
      className="gmaps-handoff-popup"
      role="dialog"
      aria-label="Google Maps Turn-by-Turn Navigation Handoff"
    >
      <div className="gmaps-popup-inner">
        <button
          className="gmaps-popup-close"
          onClick={onDismiss}
          title="Dismiss navigation prompt"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="gmaps-popup-header">
          <div className="gmaps-popup-icon-box">
            <span className="gmaps-popup-icon">🧭</span>
            <span className="gmaps-pulse-ring"></span>
          </div>
          <div className="gmaps-popup-title-group">
            <h3 className="gmaps-popup-title">Route Found!</h3>
            <p className="gmaps-popup-desc">Want turn-by-turn navigation?</p>
          </div>
        </div>

        {destination.name && (
          <div className="gmaps-dest-preview">
            <span className="gmaps-dest-pin">📍</span>
            <span className="gmaps-dest-name">{destination.name}</span>
          </div>
        )}

        <div className="gmaps-popup-actions">
          <a
            href={gmapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gmaps-open-btn"
            title="Open turn-by-turn walking navigation in Google Maps"
          >
            <span className="gmaps-btn-icon">🗺️</span>
            <span className="gmaps-btn-text">Open in Google Maps</span>
            <span className="gmaps-btn-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
