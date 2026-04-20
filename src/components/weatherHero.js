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
  currentTime: document.querySelector(".weather-hero__time"),
};

export function renderWeatherHero(processedData) {
  setWeatherIcon(processedData.icon);

  elements.weatherCondition.textContent = processedData.conditions ?? "N/A";
  elements.weatherDescription.textContent = processedData.description ?? "N/A";

  elements.currentTemperature.textContent =
    processedData.currentTemperature != null
      ? `${processedData.currentTemperature}°`
      : "N/A";

  elements.highestTemperature.textContent =
    processedData.currentTemperature != null
      ? `${processedData.highestTemperature}°`
      : "N/A";

  elements.lowestTemperature.textContent =
    processedData.currentTemperature != null
      ? `${processedData.lowestTemperature}°`
      : "N/A";

  elements.currentLocation.textContent = processedData.location ?? "N/A";

  elements.currentTime.textContent = getTimeDetails(processedData.timeZone);
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

function getTimeDetails(timeZone) {
  const time = new Date().toLocaleTimeString("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const gmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName")?.value;

  return `${time} • ${gmt}`;
}
