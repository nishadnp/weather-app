// src/components/extras.js

const elements = {
  sunriseTimeText: document.querySelector(".sunrise-time"),
  sunsetTimeText: document.querySelector(".sunset-time"),
};

export function renderExtras(processedData) {
  elements.sunriseTimeText.textContent = processedData.today.sunrise ?? "N/A";

  elements.sunsetTimeText.textContent = processedData.today.sunset ?? "N/A";
}
