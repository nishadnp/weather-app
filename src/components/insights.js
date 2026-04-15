// src/components/insights.js
import { formatUnit } from "../utils/weatherUnit";

const elements = {
  sunriseTimeText: document.querySelector(
    ".sun__event--sunrise > .sun__event-time"
  ),
  sunsetTimeText: document.querySelector(
    ".sun__event--sunset > .sun__event-time"
  ),
  histogramContainer: document.querySelector(".wind-chart__histogram"),
  polyLine: document.querySelector(".wind-chart__trendline"),
  windStats: document.querySelector(".insights__stats"),
};

export function renderInsights(processedData) {
  elements.sunriseTimeText.textContent = processedData.sunrise ?? "N/A";

  elements.sunsetTimeText.textContent = processedData.sunset ?? "N/A";

  const totalHours = processedData.centered39hWindow.length;
  const currentHour = (totalHours - 1) / 2;

  renderWindBars(processedData.centered39hWindow);
  renderWindLine(processedData.centered39hWindow);
  renderWindStatsForHour(processedData.centered39hWindow[currentHour]);
}

function renderWindBars(hours) {
  const VISUAL_MAX = 50; // The top of bar (y=0) is 50mph
  const SVG_HEIGHT = 100;
  const BAR_CAP = 0.7; // Bars only take up 70% of the space

  // Clear chart
  elements.histogramContainer.replaceChildren();

  hours.forEach((hour, index) => {
    const safeSpeed = Math.min(hour.windspeed, VISUAL_MAX);

    const barHeight = (safeSpeed / VISUAL_MAX) * SVG_HEIGHT * BAR_CAP;
    const x = index * 5; // 5px spacing per hour
    const y = SVG_HEIGHT - barHeight; // Bars grow upwards from the bottom

    const opacity = 0.2 + (safeSpeed / VISUAL_MAX) * 0.4;

    const bar = createBar(x, y, barHeight, opacity);

    bar.classList.add("wind-chart__bar");

    if (index === 20) {
      bar.classList.add("wind-chart__bar--current");
      bar.setAttribute("fill", "rgba(255, 255, 255, 0.9)");
    }

    elements.histogramContainer.appendChild(bar);
  });
}

function createBar(xPosition, yPosition, height, opacity) {
  const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bar.classList.add("wind-chart__bar");
  bar.setAttribute("x", xPosition);
  bar.setAttribute("y", yPosition);
  bar.setAttribute("height", height);
  bar.setAttribute("fill", `rgba(255, 255, 255, ${opacity})`);

  return bar;
}

function renderWindLine(hours) {
  const VISUAL_MAX = 50;
  const SVG_HEIGHT = 100;
  const BAR_CAP = 0.7;
  const LINE_BUFFER = 15;

  const points = hours
    .map((hour, index) => {
      const safeGust = Math.min(hour.windgust, VISUAL_MAX);
      const x = index * 5;
      const rawY = SVG_HEIGHT - (safeGust / VISUAL_MAX) * SVG_HEIGHT * BAR_CAP;
      const y = rawY - LINE_BUFFER;
      return `${x},${y}`;
    })
    .join(" ");

  elements.polyLine.setAttribute("points", points);
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
