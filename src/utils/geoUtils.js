/**
 * Geographic, Walking, Telemetry, and Geolocation Service Utilities
 */

/**
 * Calculates the great-circle distance between two points in meters using the Haversine formula.
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number|null} Distance in meters
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

/**
 * Generates a cross-platform Google Maps turn-by-turn directions URL.
 * Works seamlessly on mobile (opening Google Maps App or browser fallback) and desktop (browser).
 * 
 * @param {number|null} originLat Latitude of origin (user location)
 * @param {number|null} originLng Longitude of origin (user location)
 * @param {number} destLat Latitude of destination
 * @param {number} destLng Longitude of destination
 * @param {string} [travelMode="walking"] Travel mode: "walking", "driving", "transit", "bicycling"
 * @returns {string} Universal Google Maps Directions URL
 */
export function getGoogleMapsDirectionsUrl(originLat, originLng, destLat, destLng, travelMode = "walking") {
  const params = new URLSearchParams({
    api: "1",
    destination: `${destLat},${destLng}`,
    travelmode: travelMode,
  });

  if (originLat != null && originLng != null) {
    params.set("origin", `${originLat},${originLng}`);
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/**
 * Standard Geolocation Error Classification
 */
export const GEOLOCATION_ERROR_TYPES = {
  NOT_SUPPORTED: "NOT_SUPPORTED",
  PERMISSION_DENIED: "PERMISSION_DENIED",
  POSITION_UNAVAILABLE: "POSITION_UNAVAILABLE",
  TIMEOUT: "TIMEOUT",
  UNKNOWN: "UNKNOWN",
};

/**
 * Structured diagnostic logger for geolocation events and debugging.
 * Logs error.code, error.message, enableHighAccuracy, timeout, window.isSecureContext, and hostname.
 * @param {string} tag
 * @param {object} diagnosticData
 */
export function logGeoDiagnostics(tag, diagnosticData = {}) {
  const isSecure = typeof window !== "undefined" ? window.isSecureContext : false;
  const hostname = typeof window !== "undefined" ? window.location.hostname : "unknown";
  const protocol = typeof window !== "undefined" ? window.location.protocol : "unknown";

  console.groupCollapsed(`🌐 [GeoLocation Diagnostic] ${tag}`);
  console.log("Timestamp:", new Date().toISOString());
  console.log("Secure Context:", isSecure ? "YES (HTTPS/localhost)" : "NO (Insecure Context)");
  console.log("Hostname / Protocol:", `${hostname} (${protocol})`);
  console.log("Diagnostics Payload:", {
    isSecureContext: isSecure,
    hostname,
    protocol,
    ...diagnosticData,
  });
  console.groupEnd();
}

/**
 * Formats a GeolocationPositionError or fallback error into clean user-facing and diagnostic details.
 * @param {GeolocationPositionError|Error|null} error
 * @param {object} context
 * @returns {object} Clean error representation
 */
export function formatGeolocationError(error, context = {}) {
  const code = error?.code;
  const rawMessage = error?.message || "Unknown geolocation error";

  let type = GEOLOCATION_ERROR_TYPES.UNKNOWN;
  let title = "Unable to Acquire Location";
  let message = "An unexpected error occurred while obtaining your location. Please retry.";
  let canRetry = true;

  if (code === 1 || error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError") {
    type = GEOLOCATION_ERROR_TYPES.PERMISSION_DENIED;
    title = "Location Permission Denied";
    message =
      "Browser or device location access is disabled. Please enable location permissions in your browser address bar or device settings, then retry.";
    canRetry = true;
  } else if (code === 2) {
    type = GEOLOCATION_ERROR_TYPES.POSITION_UNAVAILABLE;
    title = "Position Currently Unavailable";
    message =
      "Your device cannot determine its position right now. If indoors, try moving near an open area or outdoors, and ensure device Location Services and Wi-Fi are enabled.";
    canRetry = true;
  } else if (code === 3) {
    type = GEOLOCATION_ERROR_TYPES.TIMEOUT;
    title = "Location Request Timed Out";
    message =
      "Obtaining location took longer than expected. Please verify your network or GPS connection and tap Retry.";
    canRetry = true;
  } else if (error?.type === GEOLOCATION_ERROR_TYPES.NOT_SUPPORTED) {
    type = GEOLOCATION_ERROR_TYPES.NOT_SUPPORTED;
    title = "Geolocation Not Supported";
    message = "Geolocation is not supported by your current browser or device environment.";
    canRetry = false;
  }

  return {
    type,
    code: code ?? null,
    rawMessage,
    title,
    message,
    canRetry,
    context,
  };
}

/**
 * Robust single-shot location acquisition with high-accuracy first attempt and automatic fallback.
 * 
 * Strategy:
 * 1. Checks for navigator.geolocation support.
 * 2. Attempts high-accuracy fix (timeout ~25s, maximumAge 15s).
 * 3. If high-accuracy fails with POSITION_UNAVAILABLE (code 2) or TIMEOUT (code 3),
 *    automatically retries with low-accuracy mode (enableHighAccuracy: false, timeout ~25s, maximumAge 60s).
 * 4. Categorizes errors cleanly without assuming code 2 is permission denied.
 * 5. Emits complete diagnostics for debugging.
 * 
 * @param {object} [options]
 * @param {number} [options.highAccuracyTimeout=25000] Timeout for high accuracy in ms (20-30s)
 * @param {number} [options.highAccuracyMaxAge=15000] Maximum age for high accuracy cached fix in ms
 * @param {number} [options.lowAccuracyTimeout=25000] Timeout for low accuracy fallback in ms
 * @param {number} [options.lowAccuracyMaxAge=60000] Maximum age for low accuracy cached fix in ms
 * @param {boolean} [options.enableFallback=true] Whether to fallback to low accuracy
 * @param {(status: { phase: string, detail?: string }) => void} [options.onStatusChange] Optional progress callback
 * @returns {Promise<{
 *   success: boolean,
 *   coords: { latitude: number, longitude: number, accuracy: number, altitude?: number|null, heading?: number|null, speed?: number|null }|null,
 *   error: object|null,
 *   isFallback: boolean,
 *   timestamp: number
 * }>}
 */
export function getUserLocation(options = {}) {
  const {
    highAccuracyTimeout = 25000,
    highAccuracyMaxAge = 15000,
    lowAccuracyTimeout = 25000,
    lowAccuracyMaxAge = 60000,
    enableFallback = true,
    onStatusChange = null,
  } = options;

  return new Promise((resolve) => {
    if (typeof window === "undefined" || !navigator || !navigator.geolocation) {
      const err = formatGeolocationError({ type: GEOLOCATION_ERROR_TYPES.NOT_SUPPORTED });
      logGeoDiagnostics("Not Supported", {
        error: err,
        windowExists: typeof window !== "undefined",
      });
      resolve({
        success: false,
        coords: null,
        error: err,
        isFallback: false,
        timestamp: Date.now(),
      });
      return;
    }

    const notifyStatus = (phase, detail = "") => {
      if (typeof onStatusChange === "function") {
        onStatusChange({ phase, detail });
      }
    };

    const extractCoords = (pos) => ({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
      altitude: pos.coords.altitude,
      altitudeAccuracy: pos.coords.altitudeAccuracy,
      heading: pos.coords.heading,
      speed: pos.coords.speed,
    });

    // Step 1: Attempt High Accuracy Positioning
    notifyStatus("high_accuracy", "Acquiring precise satellite/GPS fix...");

    const highAccuracyOpts = {
      enableHighAccuracy: true,
      timeout: highAccuracyTimeout,
      maximumAge: highAccuracyMaxAge,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        logGeoDiagnostics("High-Accuracy Fix Succeeded", {
          enableHighAccuracy: true,
          timeout: highAccuracyTimeout,
          maximumAge: highAccuracyMaxAge,
          coords: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          },
        });

        notifyStatus("success", "Precise location locked.");
        resolve({
          success: true,
          coords: extractCoords(pos),
          error: null,
          isFallback: false,
          timestamp: pos.timestamp || Date.now(),
        });
      },
      (highAccError) => {
        logGeoDiagnostics("High-Accuracy Attempt Failed", {
          code: highAccError.code,
          message: highAccError.message,
          enableHighAccuracy: true,
          timeout: highAccuracyTimeout,
          maximumAge: highAccuracyMaxAge,
        });

        // If permission denied (code 1), do NOT retry because permission is blocked
        if (highAccError.code === 1 || !enableFallback) {
          const formattedErr = formatGeolocationError(highAccError, {
            phase: "high_accuracy",
            enableHighAccuracy: true,
          });
          notifyStatus("failed", formattedErr.message);
          resolve({
            success: false,
            coords: null,
            error: formattedErr,
            isFallback: false,
            timestamp: Date.now(),
          });
          return;
        }

        // Step 2: Automatic Fallback to Standard/Network-assisted positioning (enableHighAccuracy: false)
        notifyStatus(
          "fallback_low_accuracy",
          "High accuracy unavailable, retrying with network-assisted positioning..."
        );

        const lowAccuracyOpts = {
          enableHighAccuracy: false,
          timeout: lowAccuracyTimeout,
          maximumAge: lowAccuracyMaxAge,
        };

        navigator.geolocation.getCurrentPosition(
          (fallbackPos) => {
            logGeoDiagnostics("Fallback Low-Accuracy Fix Succeeded", {
              enableHighAccuracy: false,
              timeout: lowAccuracyTimeout,
              maximumAge: lowAccuracyMaxAge,
              coords: {
                latitude: fallbackPos.coords.latitude,
                longitude: fallbackPos.coords.longitude,
                accuracy: fallbackPos.coords.accuracy,
              },
            });

            notifyStatus("success", "Location acquired (standard accuracy).");
            resolve({
              success: true,
              coords: extractCoords(fallbackPos),
              error: null,
              isFallback: true,
              timestamp: fallbackPos.timestamp || Date.now(),
            });
          },
          (fallbackError) => {
            logGeoDiagnostics("Fallback Attempt Failed", {
              code: fallbackError.code,
              message: fallbackError.message,
              enableHighAccuracy: false,
              timeout: lowAccuracyTimeout,
              maximumAge: lowAccuracyMaxAge,
            });

            const formattedErr = formatGeolocationError(fallbackError, {
              phase: "fallback_low_accuracy",
              enableHighAccuracy: false,
            });

            notifyStatus("failed", formattedErr.message);
            resolve({
              success: false,
              coords: null,
              error: formattedErr,
              isFallback: true,
              timestamp: Date.now(),
            });
          },
          lowAccuracyOpts
        );
      },
      highAccuracyOpts
    );
  });
}

/**
 * Continuous location watcher utility structured for future live-navigation tracking.
 * Can be cleanly integrated when continuous navigation tracking is enabled.
 * 
 * @param {(coords: object, isFallback: boolean) => void} onUpdate
 * @param {(error: object) => void} onError
 * @param {object} [options]
 * @returns {{ unwatch: () => void, isWatching: () => boolean }}
 */
export function createLocationWatcher(onUpdate, onError, options = {}) {
  let watchId = null;
  let active = false;

  const {
    enableHighAccuracy = true,
    timeout = 25000,
    maximumAge = 10000,
  } = options;

  if (typeof window === "undefined" || !navigator || !navigator.geolocation) {
    const err = formatGeolocationError({ type: GEOLOCATION_ERROR_TYPES.NOT_SUPPORTED });
    if (typeof onError === "function") onError(err);
    return {
      unwatch: () => {},
      isWatching: () => false,
    };
  }

  active = true;

  const watchOptions = {
    enableHighAccuracy,
    timeout,
    maximumAge,
  };

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      if (!active) return;
      const coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        altitude: pos.coords.altitude,
        heading: pos.coords.heading,
        speed: pos.coords.speed,
      };
      if (typeof onUpdate === "function") {
        onUpdate(coords, !enableHighAccuracy);
      }
    },
    (err) => {
      if (!active) return;
      logGeoDiagnostics("WatchPosition Error", {
        code: err.code,
        message: err.message,
        enableHighAccuracy,
      });
      const formatted = formatGeolocationError(err, { phase: "watch_position" });
      if (typeof onError === "function") {
        onError(formatted);
      }
    },
    watchOptions
  );

  return {
    unwatch: () => {
      active = false;
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
      }
    },
    isWatching: () => active,
  };
}
