// src/utils/processWeatherData.js

import { isSameHour } from "date-fns";

// Function to process the weather data received from the API
export function processWeatherData(data) {
  console.log(data);
  // This function can be expanded to process the weather data as needed
  console.log("Processing weather data...");

  const currentConditions = data.currentConditions; // current weather conditions
  const today = data.days[1]; // today’s forecast

  // Yesterday, today and tomorrow
  const daysAroundToday = data.days.slice(0, 3);

  const centered39hWindow = getCentered39hWindow(daysAroundToday);

  // Process the next five days' brief forecast
  const nextFiveDays = data.days.slice(2, 7).map((day) => ({
    dayName: new Date(day.datetime).toLocaleDateString("en-US", {
      weekday: "long",
    }),
    highestTemperature: day.tempmax,
    icon: day.icon,
  }));

  // Extract and return the relevant weather information in a structured format
  return {
    today: {
      date: today.datetime,
      location: data.resolvedAddress,
      currentTemperature: currentConditions.temp,
      lowestTemperature: today.tempmin,
      highestTemperature: today.tempmax,
      conditions: currentConditions.conditions,
      description: today.description,
      humidity: currentConditions.humidity,
      icon: currentConditions.icon,
      windSpeed: currentConditions.windspeed,
      visibility: currentConditions.visibility,
      uvIndex: currentConditions.uvindex,
      sunrise: today.sunrise,
      sunset: today.sunset,
      precipprob: today.precipprob,
    },
    nextFiveDays,
    centered39hWindow,
  };
}

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
