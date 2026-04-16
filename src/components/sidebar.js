// src/components/sidebar.js

import { formatUnit } from "../utils/weatherUnit";

export function renderSideBar(processedData) {
  // Keys for the weather parameters to be displayed in the highlight cards
  const keys = ["precipprob", "humidity", "uvIndex", "visibility"];

  // Units for the different weather parameters
  const units = {
    precipprob: "%",
    humidity: "%",
    uvIndex: " UV",
    visibility: formatUnit("distance"),
  };

  // Map each key to its corresponding "level" function
  const levelGetters = {
    humidity: humidityLevel,
    uvIndex: uvIndexLevel,
    visibility: (value) => visibilityLevel(value, formatUnit("distance")),
  };

  const highlightCards = document.querySelectorAll(".highlights-card");

  // Loop through the highlight cards and populate them with the corresponding weather data
  highlightCards.forEach((highlightCard, index) => {
    // Clear existing data in the card before adding new data

    const key = keys[index];
    const value = processedData[key];

    const dataText = highlightCard.querySelector(".highlights-card__data");
    dataText.textContent = value + " " + units[key];
    dataText.style.fontSize = "1.5rem";

    const footnote = highlightCard.querySelector(".highlights-card__footnote");
    if (key === "precipprob") {
      footnote.textContent = processedData.preciptype || "N/A";
    } else {
      const getLevel = levelGetters[key];
      footnote.textContent = getLevel ? getLevel(value) : "";
    }
  });
}

function isValidNumber(x, min = -Infinity, max = Infinity) {
  return typeof x === "number" && Number.isFinite(x) && x >= min && x <= max;
}

function pickLevel(value, rules, invalidReturn = "") {
  if (!isValidNumber(value)) return invalidReturn;

  for (const [threshold, label] of rules) {
    if (value <= threshold) return label;
  }

  return invalidReturn;
}

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

const visibilityLevel = (visibility, distanceUnit) => {
  if (!isValidNumber(visibility, 0)) return "";
  if (typeof distanceUnit !== "string") return "";

  const unit = distanceUnit.toLowerCase();

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

  if (!rules[unit]) return "";

  return pickLevel(visibility, rules[unit]);
};
