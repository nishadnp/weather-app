//src/utils/getUnit.js

// Active unit system, defaults to metric for Celsius
export let unitSystem = "metric";

/**
 * Updates the active unit system globally.
 * Affects temperature, distance, and speed formatting throughout the app.
 * @param {string} data - Unit system identifier: 'metric', 'us', or 'uk'
 */
export function setUnitSystem(data) {
  unitSystem = data;
}

/**
 * Maps unit systems to measurement standards.
 * Determines temperature, distance, and speed units based on active system.
 */
const UNIT_MAP = {
  us: {
    distance: "mi",
    speed: "mph",
    temperature: "°F",
  },
  metric: {
    distance: "km",
    speed: "km/h",
    temperature: "°C",
  },
  uk: {
    distance: "mi",
    speed: "mph",
    temperature: "°C",
  },
};

/**
 * Retrieves the appropriate unit suffix for a given measurement type.
 * @param {string} measurement - Measurement type: 'distance', 'speed', or 'temperature'
 * @returns {string} Unit suffix (e.g., 'km', 'mph', '°C') or empty string if not found
 */
export function formatUnit(measurement) {
  return UNIT_MAP[unitSystem]?.[measurement] ?? "";
}
