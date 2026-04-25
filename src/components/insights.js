// src/components/insights.js

import { renderWindChart } from "../charts/windChart";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { formatUnit } from "../utils/weatherUnit";

import sunLineArtPath from "../assets/images/sun-line-art.svg";
import moonLineArtPath from "../assets/images/moon-line-art.svg";

const elements = (() => {
  const cacheEl = {};

  return {
    get windStatsValue() {
      return (cacheEl.windStats ??=
        document.querySelectorAll(".wind__stats-value"));
    },
    get astronomyContainer() {
      return (cacheEl.astronomyContainer ??=
        document.querySelector(".astronomy"));
    },
    get toggleAstro() {
      return (cacheEl.toggleAstro ??= document.getElementById("toggle-astro"));
    },
    get astroTitle() {
      return (cacheEl.astroTitle ??= document.querySelector(
        ".insight__title--astronomy"
      ));
    },
    get astroObjectImg() {
      return (cacheEl.astroObjectImg ??=
        document.querySelector(".astronomy__object"));
    },
    get eventRise() {
      return (cacheEl.eventRise ??= document.querySelector(
        ".astronomy__event--rise"
      ));
    },
    get eventSet() {
      return (cacheEl.eventSet ??= document.querySelector(
        ".astronomy__event--set"
      ));
    },
  };
})();

export function renderInsights(processedData) {
  const totalHours = processedData.centered39hWindow.length;
  const currentHour = Math.floor(totalHours / 2);

  renderWindChart(processedData.centered39hWindow);
  renderWindStatsForHour(processedData.centered39hWindow[currentHour]);

  updateAstro(processedData.astronomy, getAstroMode());
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

export function updateAstro(astroData, astroObject = "sun") {
  astroData = astroData[astroObject];

  const capitalizedAstroObject = capitalizeFirstLetter(astroObject);

  const astroTitle = elements.astroTitle;
  astroTitle.textContent =
    capitalizedAstroObject + "rise" + " & " + capitalizedAstroObject + "set";

  const eventRise = elements.eventRise;

  const eventRiseLabel = eventRise.querySelector(".astronomy__event-label");
  eventRiseLabel.textContent = capitalizedAstroObject + "rise";

  const eventRiseTime = eventRise.querySelector(".astronomy__event-time");
  eventRiseTime.textContent = astroData.rise ?? "N/A";

  const astroObjectLineArt = elements.astroObjectImg;
  astroObjectLineArt.src =
    astroObject === "sun" ? sunLineArtPath : moonLineArtPath;

  const eventSet = elements.eventSet;

  const eventSetLabel = eventSet.querySelector(".astronomy__event-label");
  eventSetLabel.textContent = capitalizedAstroObject + "set";

  const eventSetTime = eventSet.querySelector(".astronomy__event-time");
  eventSetTime.textContent = astroData.set ?? "N/A";
}

export function initInsights(onToggle) {
  elements?.toggleAstro.addEventListener("change", () => {
    onToggle(getAstroMode());
  });
}

function getAstroMode() {
  return elements.toggleAstro.checked ? "moon" : "sun";
}
