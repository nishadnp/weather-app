// src/index.js

// Entry point

import "./styles/main.css";

import { getWeather } from "./api/weather";
import { processWeatherData } from "./utils/weatherViewModel";

import { renderHeader } from "./components/header";
import { renderSideBar } from "./components/sidebar";
import { renderWeatherHero } from "./components/weatherHero";
import { renderInsights } from "./components/insights";
import { renderNextDaysForecast } from "./components/nextdaysForecast";

import mockData from "./utils/mockData/weatherData.json" with { type: "json" };

// Toggle between mock data and real API
let isMockMode = false;

// Initial render (mock mode only)
if (isMockMode) renderAll(processWeatherData(mockData));

// Handle location search
document.querySelector(".header__form").addEventListener("submit", (event) => {
  event.preventDefault();
  const locationInput = document.getElementById("locationInput");
  const locationQuery = locationInput.value;
  // Fetch and process weather data for the entered location
  if (isMockMode) {
    console.log("Mock mode enabled — ignoring API call");
    return;
  }

  // Fetch → process → render
  getWeather(locationQuery)
    .then(processWeatherData)
    .then((processedData) => {
      console.log(
        `Selected weather API data for ${locationQuery}: `,
        processedData
      );
      renderAll(processedData);
    })
    .catch((error) => {
      console.error("Weather fetch failed: ", error);
    });

  locationInput.value = ""; // Clear the input field after submission
});

console.log("Webpack is working");

// Render all UI sections with processed data
function renderAll(data) {
  renderHeader(data.header);
  renderSideBar(data.sidebar);
  renderWeatherHero(data.weatherHero);
  renderInsights(data.insights);
  renderNextDaysForecast(data.nextFiveDays);
}
