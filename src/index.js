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

// Example usage of the getWeather function
getWeather("Dubai")
  .then((data) => {
    console.log("Weather data for Dubai:", data);
    return data;
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
  });

console.log("Webpack is working");
