// src/components/insights.js

import { renderWindChart } from "../charts/windChart";
import { formatUnit } from "../utils/weatherUnit";

const elements = {
  sunriseTimeText: document.querySelector(
    ".sun__event--sunrise > .sun__event-time"
  ),
  sunsetTimeText: document.querySelector(
    ".sun__event--sunset > .sun__event-time"
  ),
  windStats: document.querySelector(".insights__stats"),
};

export function renderInsights(processedData) {
  elements.sunriseTimeText.textContent = processedData.sunrise ?? "N/A";

  elements.sunsetTimeText.textContent = processedData.sunset ?? "N/A";

  const totalHours = processedData.centered39hWindow.length;
  const currentHour = Math.floor(totalHours / 2);

  renderWindChart(processedData.centered39hWindow);
  renderWindStatsForHour(processedData.centered39hWindow[currentHour]);
}

function renderWindStatsForHour(hour) {
  elements.windStats.innerHTML = "";

  const windSpeedText = document.createElement("p");
  const windDirectionText = document.createElement("p");
  const windGustText = document.createElement("p");

  windSpeedText.innerHTML = `<span class="insights__label">Speed:</span> ${hour.windspeed} <span class="measurement-unit">${formatUnit("speed")}</span>`;
  windDirectionText.innerHTML = `<span class="insights__label">Direction:</span> ${hour.winddir}°`;
  windGustText.innerHTML = `<span class="insights__label">Gust:</span> ${hour.windgust} <span class="measurement-unit">${formatUnit("speed")}</span>`;

  elements.windStats.appendChild(windSpeedText);
  elements.windStats.appendChild(windDirectionText);
  elements.windStats.appendChild(windGustText);
}
