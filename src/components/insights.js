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

  const astroObjectLineArt = elements.astroObjectImg;
  astroObjectLineArt.src =
    astroObject === "sun" ? sunLineArtPath : moonLineArtPath;

  const eventRiseEl = elements.eventRise;
  const eventSetEl = elements.eventSet;

  const eventIcons = getAstroIcons(astroObject);

  const eventRiseIconEl = eventRiseEl.querySelector(".astronomy__event-icon");
  eventRiseIconEl.innerHTML = eventIcons.rise;

  const eventSetIconEl = eventSetEl.querySelector(".astronomy__event-icon");
  eventSetIconEl.innerHTML = eventIcons.set;

  const eventRiseLabel = eventRiseEl.querySelector(".astronomy__event-label");
  eventRiseLabel.textContent = capitalizedAstroObject + "rise";

  const eventSetLabel = eventSetEl.querySelector(".astronomy__event-label");
  eventSetLabel.textContent = capitalizedAstroObject + "set";

  const eventRiseTime = eventRiseEl.querySelector(".astronomy__event-time");
  eventRiseTime.textContent = astroData.rise ?? "N/A";

  const eventSetTime = eventSetEl.querySelector(".astronomy__event-time");
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

function getAstroIcons(astroMode) {
  if (astroMode === "moon") {
    return {
      rise: '<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-moonrise" fill="currentColor" width="23" height="23" viewBox="0 0 32 32"><path d="M2 28h28v2H2zm24-2h-2a8 8 0 0 0-2.037-5.333l1.49-1.335A9.98 9.98 0 0 1 26 26m-10 0h-2a9.93 9.93 0 0 1 3.754-7.804A8 8 0 0 0 16 18a8.01 8.01 0 0 0-8 8H6a10.01 10.01 0 0 1 10-10 9.9 9.9 0 0 1 4.446 1.052 1 1 0 0 1 0 1.79A7.96 7.96 0 0 0 16 26m0-24-5 5 1.41 1.41L15 5.83V14h2V5.83l2.59 2.58L21 7z"/><path data-name="&lt;Transparent Rectangle&gt;" style="fill:none" d="M0 0h32v32H0z"/></svg>',
      set: '<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-moonset" fill="currentColor" width="23" height="23" viewBox="0 0 32 32"><path d="M2 28h28v2H2zm24-2h-2a8 8 0 0 0-2.037-5.333l1.49-1.335A9.98 9.98 0 0 1 26 26m-10 0h-2a9.93 9.93 0 0 1 3.754-7.804A8 8 0 0 0 16 18a8.01 8.01 0 0 0-8 8H6a10.01 10.01 0 0 1 10-10 9.9 9.9 0 0 1 4.446 1.052 1 1 0 0 1 0 1.79A7.96 7.96 0 0 0 16 26m0-12-5-5 1.41-1.41L15 10.17V2h2v8.17l2.59-2.58L21 9z"/><path data-name="&lt;Transparent Rectangle&gt;" style="fill:none" d="M0 0h32v32H0z"/></svg>',
    };
  }
  if (astroMode === "sun") {
    return {
      rise: '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-sunrise" viewBox="0 0 16 16"><path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" /></svg>',
      set: '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-sunset" viewBox="0 0 16 16"><path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" /></svg>',
    };
  }
  return "";
}
