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
