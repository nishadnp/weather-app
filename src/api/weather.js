// src/api/weather.js

import { format, subDays, addDays } from "date-fns";

/**
 * Visual Crossing Weather API configuration.
 * Elements array includes standard weather metrics plus air quality (AQI) and astronomy data.
 */
const API_CONFIG = Object.freeze({
  baseURL:
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
  apiKey: process.env.WEATHER_API_KEY,
  elements:
    "add:aqius,add:pm2p5,add:o3,add:pm10,add:no2,add:moonrise,add:moonset",
});

/**
 * Fetches 7-day weather forecast (yesterday to +5 days) for a given location.
 * Supports multiple unit systems (metric, US, UK).
 * Returns raw API response with all weather metrics and hourly data.
 *
 * @param {string} locationQuery - Location name, address, or "lat,lon" coordinates
 * @param {string} unitSystem - Unit system: 'metric', 'us', or 'uk'
 * @returns {Promise<Object>} Raw API response with weather data
 * @throws {Error} On network failure or API error
 */
export function getWeather(locationQuery, unitSystem) {
  // Safely encode location for URL (handles special characters, spaces)
  const safeLocation = encodeURIComponent(locationQuery.trim());

  const dateRange = get7DayRangeFromYesterday();

  const url = `${API_CONFIG.baseURL}/${safeLocation}/${dateRange}?unitGroup=${unitSystem}&elements=${API_CONFIG.elements}&key=${API_CONFIG.apiKey}&contentType=json`;

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

/**
 * Builds 7-day date range from yesterday through +5 days from today.
 * Format: yyyy-MM-dd/yyyy-MM-dd
 * Supports retrieving past, present, and future weather data.
 *
 * @returns {string} Date range string in format "YYYY-MM-DD/YYYY-MM-DD"
 */
function get7DayRangeFromYesterday() {
  const startDateObj = subDays(new Date(), 1); // yesterday
  const endDateObj = addDays(startDateObj, 6);

  const startDate = format(startDateObj, "yyyy-MM-dd");
  const endDate = format(endDateObj, "yyyy-MM-dd");

  return `${startDate}/${endDate}`;
}
