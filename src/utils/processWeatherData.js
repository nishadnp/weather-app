// src/utils/processWeatherData.js

// Function to process the weather data received from the API
export function processWeatherData(data) {
  // This function can be expanded to process the weather data as needed
  console.log("Processing weather data...");
  return {
    location: data.resolvedAddress,
    temperature: data.currentConditions.temp,
    conditions: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity,
    icon: data.currentConditions.icon,
  };
}
