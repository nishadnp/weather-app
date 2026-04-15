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

// Close dropdowns on form submit
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

  // UX cleanup
  locationInput.value = "";
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

function renderAll(data) {
  renderHeader(data.header);
  renderSideBar(data.sidebar);
  renderWeatherHero(data.weatherHero);
  renderInsights(data.insights);
  renderNextDaysForecast(data.nextFiveDays);
}
