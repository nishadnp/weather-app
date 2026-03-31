// src/utils/processWeatherData.js

// Function to process the weather data received from the API
export function processWeatherData(data) {
  // This function can be expanded to process the weather data as needed
  console.log("Processing weather data...");

  const currentConditions = data.currentConditions;

  // Extract and return the relevant weather information in a structured format
  return {
    date: currentConditions.datetime,
    location: data.resolvedAddress,
    currentTemperature: currentConditions.temp,
    conditions: currentConditions.conditions,
    humidity: currentConditions.humidity,
    icon: currentConditions.icon,
    windSpeed: currentConditions.windspeed,
    visibility: currentConditions.visibility,
    uvIndex: currentConditions.uvindex,
  };
}
