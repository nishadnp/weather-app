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
  // Weather metrics to display in highlight cards
  const keys = ["precipprob", "humidity", "uvIndex", "visibility"];

  // Unit suffixes for each metric
  const units = {
    precipprob: "%",
    humidity: "%",
    uvIndex: " UV",
    visibility: formatUnit("distance"),
  };

  const highlightCards = elements.highlightCards;

  // Populate each highlight card with metric value and interpretive footnote
  highlightCards.forEach((highlightCard, index) => {
    const key = keys[index];
    const value = processedData[key];
    const unit = units[key];

    // Display numeric value with unit
    const dataText = highlightCard.querySelector(".highlights-card__data");
    dataText.textContent = value + " " + unit;
    dataText.style.fontSize = "1.5rem";

    // Display interpretive label (e.g., "Moderate" for humidity)
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

/**
 * Updates Air Quality Index display with numeric value, category label, and color coding.
 * @param {number} aqi - Air Quality Index value
 */
function setAQI(aqi) {
  elements.aqiValue.textContent = aqi;

  const aqiCategory = getAQICategory(aqi);
  const aqiCategoryEl = elements.aqiCategory;

  aqiCategoryEl.textContent = aqiCategory.category;
  aqiCategoryEl.style.color = aqiCategory.categoryColor;
}

/**
 * Populates pollutant concentration pills with values and appropriate units.
 * Uses data-pollutant attribute to identify each pollutant.
 * Units: µg/m³ for particulate matter (PM), ppb for gas pollutants.
 * @param {Object} pollutants - Object with pollutant keys and concentration values
 */
function setPollutants(pollutants) {
  const aqiPills = elements.aqiPills;

  aqiPills.forEach((pill) => {
    const pillValueEl = pill.querySelector(".air-quality__pill-value");
    const pollutantUnit = document.createElement("span");
    pollutantUnit.classList.add("air-quality__unit");

    const key = pillValueEl.dataset.pollutant;
    if (!key) return;

    // Display concentration value or N/A if unavailable
    pillValueEl.textContent = pollutants[key] ?? "N/A";

    // PM pollutants use µg/m³, gas pollutants use ppb
    pollutantUnit.innerHTML =
      key.slice(0, 2) === "pm" ? " µg/m<sup>3</sup>" : " ppb";
    pillValueEl.appendChild(pollutantUnit);
  });
}
