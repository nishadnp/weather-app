// Entry point
import "./styles/main.css";

import { getWeather } from "./api/weather";
import { processWeatherData } from "./utils/weatherViewModel";

import { renderHeader } from "./components/header";
import { renderSideBar } from "./components/sidebar";
import { renderWeatherHero } from "./components/weatherHero";
import { renderInsights } from "./components/insights";
import { renderNextDaysForecast } from "./components/nextdaysForecast";

import { createDropdown } from "./utils/customDropDown";
import { setUnitSystem } from "./utils/weatherUnit";

import mockData from "./utils/mockData/weatherData.json" with { type: "json" };
import { getCurrentLocation } from "./api/geolocation";

// Toggle between mock data and real API
let isMockMode = false;

// ----------------------
// 🔹 INIT UI BEHAVIOR
// ----------------------

// Initialize dropdowns (explicit, controlled)
const dropdownElements = document.querySelectorAll(".dropdown");
const dropdowns = Array.from(dropdownElements).map(createDropdown);

// Global outside click handler (owned by app)
document.addEventListener("click", () => {
  dropdowns.forEach((d) => d.close());
});

const currentLocationBtn = document.querySelector(
  ".header__btn--current-location"
);

currentLocationBtn.addEventListener("click", () => {
  const dropdownEl = document.querySelector(".dropdown");

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

const form = document.querySelector(".header__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const locationInput = document.getElementById("locationInput");
  const dropdownEl = document.querySelector(".dropdown");

  const locationQuery = locationInput.value;
  const unitSystem = dropdownEl.dataset.value || "metric"; // fallback
  setUnitSystem(unitSystem);

  if (isMockMode) {
    console.log("Mock mode enabled — ignoring API call");
    renderAll(processWeatherData(mockData));
    return;
  }

  fetchAndRender(locationQuery, unitSystem);

  // UX cleanup
  locationInput.value = "";

  // Close dropdowns on form submit
  dropdowns.forEach((d) => d.close());
});

console.log("Webpack is working");

// ----------------------
// 🔹 INITIAL RENDER (optional)
// ----------------------

if (isMockMode) {
  renderAll(processWeatherData(mockData));
}

// ----------------------
// 🔹 RENDER PIPELINE
// ----------------------

function fetchAndRender(locationQuery, unitSystem) {
  getWeather(locationQuery, unitSystem)
    .then(processWeatherData)
    .then((processedData) => {
      console.log(
        `Weather data for ${locationQuery} (${unitSystem}):`,
        processedData
      );
      renderAll(processedData);
    })
    .catch((error) => {
      console.error("Weather fetch failed:", error);
    });
}

function renderAll(data) {
  renderHeader(data.header);
  renderSideBar(data.sidebar);
  renderWeatherHero(data.weatherHero);
  renderInsights(data.insights);
  renderNextDaysForecast(data.nextFiveDays);
}
