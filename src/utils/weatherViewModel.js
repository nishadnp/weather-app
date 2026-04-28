// src/utils/weatherViewModel.js

import { isSameHour } from "date-fns";

/**
 * Processes raw weather API data into a UI-friendly view model.
 *
 * @param {Object} data - Raw weather API response.
 * @returns {Object} Structured weather data for UI components.
 */
export function processWeatherData(data) {
  const currentConditions = data.currentConditions;
  const today = data.days[1]; // // index 1 because index 0 is yesterday

  // Yesterday, today and tomorrow
  const daysAroundToday = data.days.slice(0, 3);

  // Extract current weather and today's forecast
  const centered39hWindow = getCentered39hWindow(daysAroundToday);

  // Map next 5 days into simplified forecast format
  const nextFiveDays = data.days.slice(2, 7).map((day) => ({
    dayName: new Date(day.datetime).toLocaleDateString("en-US", {
      weekday: "long",
    }),
    highestTemperature: day.tempmax,
    lowestTemperature: day.tempmin,
    icon: day.icon,
  }));

  // UI view model structured by component sections
  return {
    conditions: currentConditions.conditions,
    timezone: data.timezone,
    header: {
      date: today.datetime,
    },
    sidebar: {
      precipprob: currentConditions.precipprob,
      preciptype: currentConditions.preciptype,
      humidity: currentConditions.humidity,
      uvIndex: currentConditions.uvindex,
      visibility: currentConditions.visibility,
      aqi: currentConditions.aqius,
      pollutants: {
        pm2p5: currentConditions.pm2p5,
        o3: currentConditions.o3,
        pm10: currentConditions.pm10,
        no2: currentConditions.no2,
      },
      coordinates: `${data.longitude},${data.latitude}`,
    },
    weatherHero: {
      icon: currentConditions.icon,
      conditions: currentConditions.conditions,
      description: today.description,
      currentTemperature: currentConditions.temp,
      lowestTemperature: today.tempmin,
      highestTemperature: today.tempmax,
      location: data.resolvedAddress,
      timezone: data.timezone,
    },
    insights: {
      centered39hWindow,
      astronomy: {
        sun: {
          rise: today.sunrise,
          set: today.sunset,
        },
        timezone: data.timezone,
        moon: {
          phase: today.moonphase,
          rise: today.moonrise,
          set: today.moonset,
        },
      },
    },
    nextFiveDays,
  };
}

/**
 * Builds a 39-hour forecast window centered on the current hour.
 *
 * @param {Array<Object>} days - Array of day objects containing hourly forecasts.
 * @returns {Array<Object>} 39-hour window of hourly forecast data.
 */
function getCentered39hWindow(days) {
  const hours = days.flatMap((d) => d.hours);
  const currentHourIndex = hours.findIndex((hour) =>
    isSameHour(new Date(), new Date(hour.datetimeEpoch * 1000))
  );
  if (currentHourIndex === -1) {
    console.warn("Current hour not found");
    return [];
  }
  const rightHalf = hours.slice(currentHourIndex, currentHourIndex + 19 + 1);
  const leftHalf = hours.slice(currentHourIndex - 19, currentHourIndex);
  return [...leftHalf, ...rightHalf];
}
