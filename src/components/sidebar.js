// src/components/sidebar.js

import { formatUnit } from "../utils/weatherUnit";
import { levelGetters } from "../utils/weatherLevels";
import { getMapURL } from "../api/map";

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

  const highlightCards = document.querySelectorAll(".highlights-card");

  console.log(processedData.coordinates);
  // Loop through the highlight cards and populate them with the corresponding weather data
  highlightCards.forEach((highlightCard, index) => {
    // Clear existing data in the card before adding new data

    const key = keys[index];
    const value = processedData[key];
    const unit = units[key];

    // Main value display
    const dataText = highlightCard.querySelector(".highlights-card__data");
    dataText.textContent = value + " " + unit;
    dataText.style.fontSize = "1.5rem";

    // Secondary label (contextual interpretation of the value)
    const footnote = highlightCard.querySelector(".highlights-card__footnote");
    if (key === "precipprob") {
      footnote.textContent = processedData.preciptype || "";
    } else {
      const getLevel = levelGetters[key];
      footnote.textContent = getLevel ? getLevel(value, unit) : "";
    }
  });

  const mapImg = document.querySelector(".sidebar__location-map");
  mapImg.src = getMapURL(processedData.coordinates);
}
