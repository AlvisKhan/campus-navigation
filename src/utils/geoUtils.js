/**
 * Geographic, Walking, and Telemetry calculation utilities
 */

/**
 * Calculates the great-circle distance between two points in meters using the Haversine formula.
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number} Distance in meters
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
    return null;
  }

  const R = 6371e3; // Earth radius in meters
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Formats distance in meters into human-readable string.
 * @param {number|null} meters 
 * @returns {string} Formatted distance (e.g. "250 m" or "1.4 km")
 */
export function formatDistance(meters) {
  if (meters == null) return "Unknown distance";
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Calculates estimated walking time based on average walking speed of 4.8 km/h (~1.33 m/s).
 * @param {number|null} meters 
 * @returns {string} Formatted walking time (e.g. "3 min walk" or "< 1 min walk")
 */
export function calculateWalkingTime(meters) {
  if (meters == null) return "—";
  const walkingSpeedMeterPerMin = 80; // ~4.8 km/h = 80 meters/min
  const minutes = Math.round(meters / walkingSpeedMeterPerMin);

  if (minutes <= 1) {
    return "1 min walk";
  }
  return `${minutes} min walk`;
}

/**
 * Calculates initial compass bearing from Point A to Point B in degrees (0 - 360) and cardinal direction.
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {string|null} Formatted bearing (e.g. "284° WNW")
 */
export function calculateBearing(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
    return null;
  }

  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;

  const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lon2 - lon1));

  let brng = (toDeg(Math.atan2(y, x)) + 360) % 360;
  const roundedBrng = Math.round(brng);

  const cardinals = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const cardinalIndex = Math.round(brng / 22.5) % 16;

  return `${roundedBrng}° ${cardinals[cardinalIndex]}`;
}
