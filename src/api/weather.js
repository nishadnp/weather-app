// src/api/weather.js

// API config (constants only), freeze prevents accidental changes to config values at runtime
const API_CONFIG = Object.freeze({
  baseURL:
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
  apiKey: "HBDN9AQH5UV6PCLDBRWTDA63D",
  defaultUnit: "us",
});

// Fetch weather data for a location
export function getWeather(locationQuery) {
  // This function can be expanded to fetch weather data based on user input or other parameters

  // trim + encode ensures safe URL input (e.g. "New York" works)
  const safeLocation = encodeURIComponent(locationQuery.trim());

  console.log("Fetching weather data...");

  return fetch(
    `${API_CONFIG.baseURL}/${safeLocation}?unitGroup=${API_CONFIG.defaultUnit}&key=${API_CONFIG.apiKey}&contentType=json`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}
