// ./src/index.js

import "./styles/base.css";

// Function to fetch weather data for a given city

function getWeather(city) {
  // This function can be expanded to fetch weather data based on user input or other parameters
  console.log("Fetching weather data...");

  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=HBDN9AQH5UV6PCLDBRWTDA63D&contentType=json`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  });
}

const city = "New York"; // Example city, can be replaced with user input

// Example usage of the getWeather function
getWeather(city)
  .then(processWeatherData)
  .then((cleanData) => {
    console.log(`Selected weather API data for ${city}:`, cleanData);
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
  });

function processWeatherData(data) {
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

console.log("Webpack is working");
