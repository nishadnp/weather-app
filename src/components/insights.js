// src/components/insights.js

const elements = {
  sunriseTimeText: document.querySelector(
    ".sun__event--sunrise > .sun__event-time"
  ),
  sunsetTimeText: document.querySelector(
    ".sun__event--sunset > .sun__event-time"
  ),
};

export function renderInsights(processedData) {
  elements.sunriseTimeText.textContent = processedData.today.sunrise ?? "N/A";

  elements.sunsetTimeText.textContent = processedData.today.sunset ?? "N/A";
}
