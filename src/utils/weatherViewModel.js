// src/utils/weatherViewModel.js

/**
 * Builds UI-ready weather data structure from raw API response.
 * Used by components for rendering sections (header, sidebar, hero, insights).
 */

import { isSameHour } from "date-fns";

// Function to process the weather data received from the API
export function processWeatherData(data) {
  const currentConditions = data.currentConditions; // current weather conditions
  const today = data.days[1]; // today’s forecast

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
 * Builds a centered 39-hour window around current time
 * from hourly forecast data.
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
