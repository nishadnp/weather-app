// src/components/weatherContent.js

const elements = {
  weatherIcon: document.querySelector(".weather-icon"),
  weatherCondition: document.querySelector(".weather-condition"),
  weatherDescription: document.querySelector(".weather-description"),
  currentTemperature: document.querySelector(".temperature-current"),
  highestTemperature: document.querySelector(".temperature-highest"),
  lowestTemperature: document.querySelector(".temperature-lowest"),
  currentLocation: document.querySelector(".location"),
};

export function renderWeatherContent(processedData) {
  setWeatherIcon(processedData.today.icon);

  elements.weatherCondition.textContent =
    processedData.today.conditions ?? "N/A";
  elements.weatherDescription.textContent =
    processedData.today.description ?? "N/A";

  elements.currentTemperature.textContent =
    processedData.today.currentTemperature != null
      ? `${processedData.today.currentTemperature}°`
      : "N/A";

  elements.highestTemperature.textContent =
    processedData.today.currentTemperature != null
      ? `${processedData.today.highestTemperature}°`
      : "N/A";

  elements.lowestTemperature.textContent =
    processedData.today.currentTemperature != null
      ? `${processedData.today.lowestTemperature}°`
      : "N/A";

  elements.currentLocation.textContent = processedData.today.location ?? "N/A";
}

function setWeatherIcon(iconName) {
  if (!iconName) {
    elements.weatherIcon.src = "https://via.placeholder.com/150";
    return;
  }

  import(`../assets/icons/WeatherIcons-VisualCrossing-v4/${iconName}.svg`)
    .then((module) => {
      console.log(`Loaded icon for ${iconName}:`, module.default);
      elements.weatherIcon.src = module.default;
    })
    .catch((error) => {
      console.error("Error loading weather icon:", error);
      elements.weatherIcon.src = "https://via.placeholder.com/150"; // fallback icon
    });
}
