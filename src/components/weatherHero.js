// src/components/weatherHero.js

const elements = {
  weatherIcon: document.querySelector(".weather-hero__icon"),
  weatherCondition: document.querySelector(".weather-hero__condition"),
  weatherDescription: document.querySelector(".weather-hero__description"),
  currentTemperature: document.querySelector(
    ".weather-hero__temperature-current"
  ),
  highestTemperature: document.querySelector(".weather-hero__temperature-high"),
  lowestTemperature: document.querySelector(".weather-hero__temperature-low"),
  currentLocation: document.querySelector(".weather-hero__location-text"),
};

export function renderWeatherHero(processedData) {
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
      elements.weatherIcon.src = module.default;
    })
    .catch((error) => {
      console.error("Error loading weather icon:", error);
      elements.weatherIcon.src = "https://via.placeholder.com/150"; // fallback icon
    });
}
