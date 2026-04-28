// src/utils/weatherLevels.js

/**
 * Validates that a value is a finite number within optional bounds.
 * @param {*} x - Value to validate
 * @param {number} min - Minimum acceptable value (default: -Infinity)
 * @param {number} max - Maximum acceptable value (default: Infinity)
 * @returns {boolean} True if x is a valid finite number within bounds
 */
function isValidNumber(x, min = -Infinity, max = Infinity) {
  return typeof x === "number" && Number.isFinite(x) && x >= min && x <= max;
}

/**
 * Maps a numeric value to a labeled category using threshold-based rules.
 * Uses <= comparison: first threshold that value satisfies wins.
 * @param {number} value - Value to categorize
 * @param {Array} rules - Array of [threshold, label] pairs, sorted ascending
 * @param {string} invalidReturn - Label to return if value is invalid
 * @returns {string} Corresponding label or invalidReturn if invalid
 */
function pickLevel(value, rules, invalidReturn = "") {
  if (!isValidNumber(value)) return invalidReturn;

  for (const [threshold, label] of rules) {
    if (value <= threshold) return label;
  }

  return invalidReturn;
}

/**
 * Categorizes relative humidity as qualitative moisture level.
 * @param {number} relativeHumidity - Humidity percentage (0-100)
 * @returns {string} Humidity category: 'Very Dry', 'Dry Air', 'Moderate', 'Humid', or 'Very Humid'
 */
const humidityLevel = (relativeHumidity) => {
  if (!isValidNumber(relativeHumidity, 0, 100)) return "";

  return pickLevel(relativeHumidity, [
    [30, "Very Dry"],
    [49, "Dry Air"],
    [69, "Moderate"],
    [89, "Humid"],
    [100, "Very Humid"],
  ]);
};

/**
 * Categorizes UV index as sun exposure risk level.
 * @param {number} uvIndex - UV index value
 * @returns {string} Risk level: 'Low', 'Moderate', 'High', 'Very High', or 'Extreme'
 */
const uvIndexLevel = (uvIndex) => {
  if (!isValidNumber(uvIndex, 0)) return "";

  return pickLevel(uvIndex, [
    [2, "Low"],
    [5, "Moderate"],
    [7, "High"],
    [10, "Very High"],
    [Infinity, "Extreme"],
  ]);
};

/**
 * Categorizes visibility distance as clarity/air quality level.
 * Uses unit-specific thresholds (miles vs kilometers).
 * @param {number} visibility - Distance value in specified units
 * @param {string} distanceUnit - Unit system: 'mi' (miles) or 'km' (kilometers)
 * @returns {string} Clarity level: 'Near Zero', 'Very Poor', 'Poor', 'Moderate', 'Good', or 'Very Clear'
 */
const visibilityLevel = (visibility, distanceUnit) => {
  if (!isValidNumber(visibility, 0)) return "";
  if (typeof distanceUnit !== "string") return "";

  const rules = {
    mi: [
      [0.03, "Near Zero"],
      [0.3, "Very Poor"],
      [1, "Poor"],
      [3, "Moderate"],
      [6, "Good"],
      [Infinity, "Very Clear"],
    ],
    km: [
      [0.05, "Near Zero"],
      [0.5, "Very Poor"],
      [1, "Poor"],
      [5, "Moderate"],
      [10, "Good"],
      [Infinity, "Very Clear"],
    ],
  };

  return pickLevel(visibility, rules[distanceUnit]);
};

/**
 * Maps measurement types to their categorization functions.
 * Used by UI components to dynamically resolve appropriate level interpreters.
 */
export const levelGetters = {
  humidity: humidityLevel,
  uvIndex: uvIndexLevel,
  visibility: visibilityLevel,
};

/**
 * Categorizes Air Quality Index (AQI) value as health risk with associated color coding.
 * AQI ranges: 0-50 (Good), 51-100 (Moderate), 101-150 (Unhealthy Sensitive), 151-200 (Unhealthy), 201-300 (Very Unhealthy), 300+ (Hazardous)
 *
 * @param {number} aqi - Air Quality Index value
 * @returns {Object} Object with 'category' (string) and 'categoryColor' (hex code) properties
 */
export const getAQICategory = (aqi) => {
  if (!isValidNumber(aqi, 0)) return "";

  if (aqi <= 50) return { category: "Good", categoryColor: "#10b981" };
  if (aqi <= 100) return { category: "Moderate", categoryColor: "#facc15" };
  if (aqi <= 150)
    return { category: "Unhealthy (Sensitive)", categoryColor: "#f97316" };
  if (aqi <= 200) return { category: "Unhealthy", categoryColor: "#ef4444" };
  if (aqi <= 300)
    return { category: "Very Unhealthy", categoryColor: "#8b5cf6" };
  return { category: "Hazardous", categoryColor: "#4c0519" };
};
