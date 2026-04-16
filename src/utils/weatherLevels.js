// src/utils/weatherLevels.js

// Validates numeric input with optional bounds
function isValidNumber(x, min = -Infinity, max = Infinity) {
  return typeof x === "number" && Number.isFinite(x) && x >= min && x <= max;
}

// Maps numeric value to a labeled range
function pickLevel(value, rules, invalidReturn = "") {
  if (!isValidNumber(value)) return invalidReturn;

  for (const [threshold, label] of rules) {
    if (value <= threshold) return label;
  }

  return invalidReturn;
}

// Humidity → qualitative air moisture level
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

// UV index → exposure risk level
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

// Visibility → clarity level (depends on unit system)
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

// Public mapping used by UI to resolve metric → interpretation function
export const levelGetters = {
  humidity: humidityLevel,
  uvIndex: uvIndexLevel,
  visibility: visibilityLevel,
};
