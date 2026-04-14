// src/api/weather.js

import { format, subDays, addDays } from "date-fns";

// API config (constants only), freeze prevents accidental changes to config values at runtime
const API_CONFIG = Object.freeze({
  baseURL:
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
  apiKey: "HBDN9AQH5UV6PCLDBRWTDA63D",
  defaultUnit: "us",
  elements: "&elements=add:windspeedmax",
});

// Fetch weather data for a location
export function getWeather(locationQuery) {
  // This function can be expanded to fetch weather data based on user input or other parameters

  // trim + encode ensures safe URL input (e.g. "New York" works)
  const safeLocation = encodeURIComponent(locationQuery.trim());

  const dateRange = get7DayRangeFromYesterday();

  const url = `${API_CONFIG.baseURL}/${safeLocation}/${dateRange}?unitGroup=${API_CONFIG.defaultUnit}${API_CONFIG.elements}&key=${API_CONFIG.apiKey}&contentType=json`;
  console.log("Fetching weather data...");

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

// Builds API date range string for 7 days window (yesterday to +5 days from today); Format: yyyy-MM-dd/yyyy-MM-dd
function get7DayRangeFromYesterday() {
  const startDateObj = subDays(new Date(), 1); // yesterday
  const endDateObj = addDays(startDateObj, 6);

  const startDate = format(startDateObj, "yyyy-MM-dd");
  const endDate = format(endDateObj, "yyyy-MM-dd");

  return `${startDate}/${endDate}`;
}
