// src/ui/controller.js

import { getWeather } from "../api/weather";
import { getCurrentLocation } from "../api/geolocation";
import { getBackgroundImage } from "../api/dynamicBackground";

import { processWeatherData } from "../models/weatherViewModel";
import { createDropdown } from "../utils/customDropDown";
import { setUnitSystem } from "../utils/weatherUnit";

import { initInsights, updateAstro } from "../components/insights";

import {
  renderHeader,
  renderSideBar,
  renderWeatherHero,
  renderInsights,
  renderNextDaysForecast,
} from "../components";
import { getTimeVibe } from "../utils/time-fns";

const domElements = (() => {
  // Lazy cache for stable DOM nodes (queried once)
  const cacheEl = {};
  return {
    get dropdown() {
      return (cacheEl.dropdown ??= document.querySelector(".dropdown"));
    },
    get dropdowns() {
      // Static NodeList: safe since DOM is not dynamic
      return (cacheEl.dropdowns ??= document.querySelectorAll(".dropdown"));
    },
    get headerForm() {
      return (cacheEl.headerForm ??= document.querySelector(".header__form"));
    },
    get locationInput() {
      return (cacheEl.locationInput ??=
        document.getElementById("locationInput"));
    },
    get currentLocationBtn() {
      return (cacheEl.currentLocationBtn ??= document.querySelector(
        ".header__btn--current-location"
      ));
    },
  };
})();

let isInitialized = false;

/**
 * Initializes the application controller by setting up event handlers and UI state.
 * Called once on app startup to bind form submissions, location button, and astronomy toggles.
 * Prevents duplicate initialization via isInitialized guard.
 */
export function initController() {
  if (isInitialized) return;
  isInitialized = true;

  const dropdowns = Array.from(domElements.dropdowns).map(createDropdown);

  bindGlobalEvents(dropdowns);
  bindFormEvents(dropdowns);
  bindLocationButton();

  initInsights((astroMode) => {
    const astroData = currentProcessedData?.insights.astronomy;
    if (!astroData) return;
    updateAstro(astroData, astroMode);
  });
}

/**
 * Attaches global click handler to close all dropdowns when clicking outside.
 * @param {Array} dropdowns - Array of dropdown instances to manage
 */
function bindGlobalEvents(dropdowns) {
  document.addEventListener("click", () => {
    dropdowns.forEach((d) => d.close());
  });
}

/**
 * Binds form submission handler for location search with unit system selection.
 * Validates input, fetches weather data, renders UI, then clears form state.
 * @param {Array} dropdowns - Array of dropdown instances to close after submit
 */
function bindFormEvents(dropdowns) {
  const form = domElements.headerForm;

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const locationInput = domElements.locationInput;
    const dropdownEl = domElements.dropdown;

    const locationQuery = locationInput.value;
    if (!locationQuery.trim()) return;

    const unitSystem = dropdownEl.dataset.value || "metric";
    setUnitSystem(unitSystem);

    fetchAndRender(locationQuery, unitSystem);

    locationInput.value = "";
    dropdowns.forEach((d) => d.close());
  });
}

/**
 * Binds click handler for current location button.
 * Requests user's geolocation via browser API, then fetches and renders weather.
 */
function bindLocationButton() {
  const currentLocationBtn = domElements.currentLocationBtn;

  if (!currentLocationBtn) return;

  currentLocationBtn.addEventListener("click", () => {
    const dropdownEl = domElements.dropdown;
    const unitSystem = dropdownEl.dataset.value || "metric";
    setUnitSystem(unitSystem);

    getCurrentLocation()
      .then((locationQuery) => {
        fetchAndRender(locationQuery, unitSystem);
      })
      .catch((err) => {
        console.error("Failed to get location: ", err);
      });
  });
}

/**
 * Orchestrates weather data fetching, processing, and UI rendering.
 * Fetches raw API data → transforms to UI model → updates background → renders all components.
 * @param {string} locationQuery - Location name or coordinates for weather API
 * @param {string} unitSystem - Unit system ('metric', 'us', 'uk') for temperature/speed
 */
function fetchAndRender(locationQuery, unitSystem) {
  getWeather(locationQuery, unitSystem)
    .then(processWeatherData)
    .then((processedData) => {
      currentProcessedData = processedData;
      updateBackgroundImage(currentProcessedData.conditions);
      renderAll(currentProcessedData);
    })
    .catch((error) => {
      console.error("Weather fetch failed:", error);
    });
}

/**
 * Renders all UI sections with processed weather data.
 * Each render function handles DOM updates for its respective component.
 * @param {Object} components - Processed weather data grouped by component (header, sidebar, etc.)
 */
function renderAll(components) {
  renderHeader(components.header);
  renderSideBar(components.sidebar);
  renderWeatherHero(components.weatherHero);
  renderInsights(components.insights);
  renderNextDaysForecast(components.nextFiveDays);
}

/**
 * Updates page background with weather-based image from Unsplash API.
 * Determines time-of-day vibe (sunrise, afternoon, sunset, etc.) to select appropriate imagery.
 * Applies dark overlay gradient for text readability.
 * @param {string} weatherCondition - Weather condition (e.g., 'Rainy', 'Sunny') for image search
 */
async function updateBackgroundImage(weatherCondition) {
  currentTimeVibe = getTimeVibe(
    currentProcessedData.timezone,
    currentProcessedData.insights.astronomy.sun.rise,
    currentProcessedData.insights.astronomy.sun.set
  );

  const image = await getBackgroundImage(weatherCondition, currentTimeVibe);
  const body = document.querySelector("body");

  if (image) {
    body.style.background = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${image}')`;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
  }
}

let currentProcessedData = null;
export let currentTimeVibe = null;
