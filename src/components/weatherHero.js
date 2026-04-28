// src/components/weatherHero.js

import { formatTimeZone, getTimeWithoutSeconds } from "../utils/time-fns";

// DOM element cache for the hero section
const elements = {
  weatherIcon: document.querySelector(".weather-hero__icon"),
  weatherCondition: document.querySelector(".weather-hero__condition"),
  weatherDescription: document.querySelector(".weather-hero__description"),
  currentTemperature: document.querySelector(
    ".weather-hero__temperature-current"
  ),
  highestTemperature: document.querySelector(".weather-hero__temperature-high"),
  lowestTemperature: document.querySelector(".weather-hero__temperature-low"),
  currentLocation: document.querySelector(".weather-hero__location-text"),
  currentTime: document.querySelector(".weather-hero__time"),
};

/**
 * Renders the main weather hero section with current conditions, temperature, location, and time.
 * Dynamically loads weather icon from SVG asset files.
 * @param {Object} processedData - Processed weather data for display
 */
export function renderWeatherHero(processedData) {
  setWeatherIcon(processedData.icon);

  elements.weatherCondition.textContent = processedData.conditions ?? "N/A";
  elements.weatherDescription.textContent = processedData.description ?? "N/A";

  elements.currentTemperature.textContent =
    processedData.currentTemperature != null
      ? `${processedData.currentTemperature}°`
      : "N/A";

  elements.highestTemperature.textContent =
    processedData.currentTemperature != null
      ? `${processedData.highestTemperature}°`
      : "N/A";

  elements.lowestTemperature.textContent =
    processedData.currentTemperature != null
      ? `${processedData.lowestTemperature}°`
      : "N/A";

  elements.currentLocation.textContent = processedData.location ?? "N/A";

  elements.currentTime.textContent =
    getTimeWithoutSeconds(processedData.timezone) +
    " • " +
    formatTimeZone(processedData.timezone);
}

/**
 * Dynamically loads and sets the weather condition icon as SVG.
 * Uses import() for on-demand asset loading. Falls back to placeholder on error.
 * @param {string} iconName - Icon identifier from Visual Crossing API (e.g., 'cloudy', 'rainy')
 */
function setWeatherIcon(iconName) {
  if (!iconName) {
    elements.weatherIcon.src = "https://via.placeholder.com/150";
    return;
  }

  import(`../assets/icons/WeatherIcons-VisualCrossing-v4/${iconName}.svg`)
    .then((module) => {
      elements.weatherIcon.src = module.default;
    })
    .catch((error) => {
      console.error("Error loading weather icon:", error);
      elements.weatherIcon.src = "https://via.placeholder.com/150";
    });
}
