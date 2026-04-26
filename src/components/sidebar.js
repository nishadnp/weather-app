// src/components/sidebar.js

import { formatUnit } from "../utils/weatherUnit";
import { getAQICategory, levelGetters } from "../utils/weatherLevels";
import { getMapURL } from "../api/map";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const elements = (() => {
  const cacheEl = {};
  return {
    get highlightCards() {
      return (cacheEl.highlightCards ??=
        document.querySelectorAll(".highlights-card"));
    },
    get aqiValue() {
      return (cacheEl.aqiValue ??= document.querySelector(
        ".air-quality__meter-value"
      ));
    },
    get aqiCategory() {
      return (cacheEl.aqiCategory ??= document.querySelector(
        ".air-quality__meter-status"
      ));
    },
    get pmPollutant() {
      return (cacheEl.pmPollutant ??= document.querySelector(
        ".air-quality__pill-label"
      ));
    },
    get aqiPills() {
      return (cacheEl.aqiPillsValue ??=
        document.querySelectorAll(".air-quality__pill"));
    },
    get mapImg() {
      return (cacheEl.mapImg ??= document.querySelector(".static-map__map"));
    },
  };
})();

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

  const highlightCards = elements.highlightCards;

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
      footnote.textContent =
        capitalizeFirstLetter(processedData.preciptype) || "";
    } else {
      const getLevel = levelGetters[key];
      footnote.textContent = getLevel ? getLevel(value, unit) : "";
    }
  });

  setAQI(processedData.aqi);
  setPollutants(processedData.pollutants);

  const mapImg = elements.mapImg;
  mapImg.src = getMapURL(processedData.coordinates);
}

function setAQI(aqi) {
  elements.aqiValue.textContent = aqi;

  const aqiCategory = getAQICategory(aqi);

  const aqiCategoryEl = elements.aqiCategory;

  aqiCategoryEl.textContent = aqiCategory.category;
  aqiCategoryEl.style.color = aqiCategory.categoryColor;
}

function setPollutants(pollutants) {
  const aqiPills = elements.aqiPills;

  aqiPills.forEach((pill) => {
    const pillValueEl = pill.querySelector(".air-quality__pill-value");

    const pollutantUnit = document.createElement("span");
    pollutantUnit.classList.add("air-quality__unit");

    // Get the pollutant key from the element's data attribute
    const key = pillValueEl.dataset.pollutant;

    // Skip update if no pollutant key is defined
    if (!key) return;

    // Display pollutant value or fallback if unavailable
    pillValueEl.textContent = pollutants[key] ?? "N/A";

    pollutantUnit.innerHTML =
      key.slice(0, 2) === "pm" ? " µg/m<sup>3</sup>" : " ppb";
    pillValueEl.appendChild(pollutantUnit);
  });
}
