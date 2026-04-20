// src/components/nextdaysForecast.js

import { renderForecastChart } from "../charts/forecastChart";

const elements = {
  forecastCardElements: document.querySelectorAll(".forecast__card"),
  tempMaxElements: document.querySelectorAll(".forecast__temp-max"),
  dayNameElements: document.querySelectorAll(".forecast__day-name"),
  forecastIconElements: document.querySelectorAll(".forecast-icon"),
};

export function renderNextDaysForecast(processedData) {
  processedData.forEach((day, index) => {
    if (index < elements.tempMaxElements.length) {
      elements.tempMaxElements[index].textContent =
        day.highestTemperature != null ? `${day.highestTemperature}°` : "N/A";
      setForecastIcon(day.icon, index);
      elements.dayNameElements[index].textContent = day.dayName ?? "N/A";
    }
  });

  renderForecastChart(processedData);
}

function setForecastIcon(iconName, index) {
  if (!iconName) {
    return;
  }

  import(`../assets/icons/WeatherIcons-VisualCrossing-v4/${iconName}.svg`)
    .then((module) => {
      elements.forecastIconElements[index].src = module.default;
    })
    .catch((error) => {
      console.error("Error loading weather icon:", error);
      elements.forecastIconElements[index].src =
        "https://via.placeholder.com/150"; // fallback icon
    });
}
