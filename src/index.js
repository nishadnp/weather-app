// ./src/index.js

import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import { getWeather } from "./api/weather";
import { processWeatherData } from "./utils/processWeatherData";
import { renderSideBar } from "./components/sidebar";
import { renderWeatherContent } from "./components/weatherContent";

// Event listener for the weather form submission
document.getElementById("weather-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value;
  // Fetch and process weather data for the entered city
  getWeather(city)
    .then(processWeatherData)
    .then((processedData) => {
      console.log(`Selected weather API data for ${city}: `, processedData);
      renderSideBar(processedData);
      renderWeatherContent(processedData);
    })
    .catch((error) => {
      console.error("Error fetching or processing weather data:", error);
    });

  cityInput.value = ""; // Clear the input field after submission
});

// Example usage of the getWeather function
console.log("Webpack is working");
