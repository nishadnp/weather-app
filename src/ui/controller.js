// src/ui/controller.js

import { getWeather } from "../api/weather";
import { getCurrentLocation } from "../api/geolocation";
import { getBackgroundImage } from "../api/dynamicBackground";

import { processWeatherData } from "../utils/weatherViewModel";
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

// ----------------------
// 🔹 INIT UI BEHAVIOR
// ----------------------

let isInitialized = false;

export function initController() {
  // Prevent duplicate event bindings
  if (isInitialized) return;
  isInitialized = true;

  // Initialize dropdown instances once
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

function bindGlobalEvents(dropdowns) {
  // Close all dropdowns on outside click
  document.addEventListener("click", () => {
    dropdowns.forEach((d) => d.close());
  });
}

function bindFormEvents(dropdowns) {
  const form = domElements.headerForm;

  if (!form) return; // Guard if DOM not present

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const locationInput = domElements.locationInput;
    const dropdownEl = domElements.dropdown;

    const locationQuery = locationInput.value;
    if (!locationQuery.trim()) return; // Ignore empty input

    const unitSystem = dropdownEl.dataset.value || "metric"; // fallback
    setUnitSystem(unitSystem);

    fetchAndRender(locationQuery, unitSystem);

    // Reset input and UI state
    locationInput.value = "";
    dropdowns.forEach((d) => d.close());
  });
}

function bindLocationButton() {
  const currentLocationBtn = domElements.currentLocationBtn;

  if (!currentLocationBtn) return; // Guard if DOM not present

  currentLocationBtn.addEventListener("click", () => {
    const dropdownEl = domElements.dropdown;

    const unitSystem = dropdownEl.dataset.value || "metric"; // fallback
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

function fetchAndRender(locationQuery, unitSystem) {
  // Single pipeline: choose data source → process → render

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

function renderAll(components) {
  // Delegate rendering to individual UI modules
  renderHeader(components.header);
  renderSideBar(components.sidebar);
  renderWeatherHero(components.weatherHero);
  renderInsights(components.insights);
  renderNextDaysForecast(components.nextFiveDays);
}

async function updateBackgroundImage(weatherCondition) {
  const timeVibe = getTimeVibe(
    currentProcessedData.timezone,
    currentProcessedData.insights.astronomy.sun.rise,
    currentProcessedData.insights.astronomy.sun.set
  );

  const image = await getBackgroundImage(weatherCondition, timeVibe);
  const body = document.querySelector("body");

  if (image) {
    body.style.background = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${image}')`;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
  }
}

let currentProcessedData = null;
