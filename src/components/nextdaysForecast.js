// src/components/nextdaysForecast.js

import { renderForecastChart } from "../charts/forecastChart";

// DOM element cache for forecast cards and icons
const elements = {
  forecastCardElements: document.querySelectorAll(".forecast__card"),
  tempMaxElements: document.querySelectorAll(".forecast__temp-max"),
  dayNameElements: document.querySelectorAll(".forecast__day-name"),
  forecastIconElements: document.querySelectorAll(".forecast-icon"),
};

/**
 * Renders next 5 days forecast with day names, high temperatures, and weather icons.
 * Updates individual forecast cards and renders the temperature trendline chart.
 * @param {Array} processedData - Array of forecast day objects with dayName, highestTemperature, icon
 */
export function renderNextDaysForecast(processedData) {
  processedData.forEach((day, index) => {
    if (index < elements.tempMaxElements.length) {
      elements.tempMaxElements[index].textContent =
        day.highestTemperature != null ? `${day.highestTemperature}°` : "N/A";
      setForecastIcon(day.icon, index);
      elements.dayNameElements[index].textContent = day.dayName ?? "N/A";
    }
  });

  renderForecastChart(processedData);
}

/**
 * Dynamically loads and sets weather icon for a specific forecast card.
 * Uses import() for on-demand asset loading. Silently skips if icon name is missing.
 * @param {string} iconName - Weather icon identifier from API
 * @param {number} index - Forecast card index to update
 */
function setForecastIcon(iconName, index) {
  if (!iconName) {
    return;
  }

  import(`../assets/icons/WeatherIcons-VisualCrossing-v4/${iconName}.svg`)
    .then((module) => {
      elements.forecastIconElements[index].src = module.default;
    })
    .catch((error) => {
      console.error("Error loading weather icon:", error);
      elements.forecastIconElements[index].src =
        "https://via.placeholder.com/150";
    });
}
