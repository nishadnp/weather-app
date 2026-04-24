// src/components/insights.js

import { renderWindChart } from "../charts/windChart";
import { formatUnit } from "../utils/weatherUnit";

const elements = (() => {
  const cacheEl = {};

  return {
    get sunriseTimeText() {
      return (cacheEl.sunriseTimeText ??= document.querySelector(
        ".astronomy__event--rise .astronomy__event-time"
      ));
    },
    get sunsetTimeText() {
      return (cacheEl.sunsetTimeText ??= document.querySelector(
        ".astronomy__event--set .astronomy__event-time"
      ));
    },
    get windStatsValue() {
      return (cacheEl.windStats ??=
        document.querySelectorAll(".wind__stats-value"));
    },
  };
})();

export function renderInsights(processedData) {
  elements.sunriseTimeText.textContent = processedData.sunrise ?? "N/A";

  elements.sunsetTimeText.textContent = processedData.sunset ?? "N/A";

  const totalHours = processedData.centered39hWindow.length;
  const currentHour = Math.floor(totalHours / 2);

  renderWindChart(processedData.centered39hWindow);
  renderWindStatsForHour(processedData.centered39hWindow[currentHour]);
}

function renderWindStatsForHour(hour) {
  const values = [hour.windspeed, hour.winddir, hour.windgust];

  elements.windStatsValue.forEach((value, index) => {
    // Clear existing values
    value.innerHTML = "";

    if (values[index] === hour.winddir) value.innerHTML = `${hour.winddir}°`;
    else
      value.innerHTML = `${values[index]} <span class="wind__unit">${formatUnit("speed")}</span>`;
  });
}
