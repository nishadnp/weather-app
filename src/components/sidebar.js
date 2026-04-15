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

  const highlightCards = document.querySelectorAll(".highlights-card");

  // Loop through the highlight cards and populate them with the corresponding weather data
  highlightCards.forEach((highlightCard, index) => {
    // Clear existing data in the card before adding new data

    let text = highlightCard.querySelector("p");
    if (!text) {
      text = document.createElement("p");
      highlightCard.appendChild(text);
      text.style.fontSize = "1.5rem";
    }

    text.textContent = processedData[keys[index]] + " " + units[keys[index]];
  });
}
