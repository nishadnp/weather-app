// ./src/components/nextdaysForecast.js

const elements = {
  forecastCardElements: document.querySelectorAll(".forecast-card"),
  tempMaxElements: document.querySelectorAll(".forecast-tempmax"),
  dayNameElements: document.querySelectorAll(".forecast-dayname"),
};

export function renderNextDaysForecast(processedData) {
  processedData.nextFiveDays.forEach((day, index) => {
    if (index < elements.tempMaxElements.length) {
      elements.tempMaxElements[index].textContent =
        day.highestTemperature != null ? `${day.highestTemperature}°` : "N/A";
      setForecastIcon(day.icon, index);
      elements.dayNameElements[index].textContent = day.dayName ?? "N/A";
    }
  });
}

function setForecastIcon(iconName, index) {
  if (!iconName) {
    return;
  }

  import(`../assets/icons/WeatherIcons-VisualCrossing-v4/${iconName}.svg`)
    .then((module) => {
      console.log(`Loaded icon for ${iconName}:`, module.default);
      elements.forecastCardElements[index].style.backgroundImage =
        `url(${module.default})`;
    })
    .catch((error) => {
      console.error("Error loading weather icon:", error);
      elements.forecastCardElements[index].style.backgroundImage =
        "url(https://via.placeholder.com/150)"; // fallback icon
    });
}
