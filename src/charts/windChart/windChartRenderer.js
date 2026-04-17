// src/charts/windChart/windChartRenderer.js

const elements = {
  histogramContainer: document.querySelector(".wind-chart__histogram"),
  polyLine: document.querySelector(".wind-chart__trendline"),
};

/**
 * Renders wind speed bars on the chart histogram.
 * @param {Array} models - Array of wind chart model objects
 */
export function renderWindBars(models) {
  elements.histogramContainer.replaceChildren();

  models.forEach((model) => {
    const bar = createBar(
      model.x,
      model.bar.y,
      model.bar.height,
      model.bar.opacity
    );

    bar.classList.add("wind-chart__bar");

    if (model.isCurrent) {
      bar.classList.add("wind-chart__bar--current");
      bar.setAttribute("fill", "rgba(255, 255, 255, 0.9)");
    }

    elements.histogramContainer.appendChild(bar);
  });
}

/**
 * Creates an SVG rectangle element for a wind speed bar.
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {number} height - Bar height
 * @param {number} opacity - Fill opacity
 * @returns {SVGRectElement} The created bar element
 */
function createBar(x, y, height, opacity) {
  const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");

  bar.classList.add("wind-chart__bar");
  bar.setAttribute("x", x);
  bar.setAttribute("y", y);
  bar.setAttribute("height", height);
  bar.setAttribute("fill", `rgba(255, 255, 255, ${opacity})`);

  return bar;
}

/**
 * Renders the wind gust trend line as a polyline.
 * @param {Array} models - Array of wind chart model objects
 */
export function renderWindLine(models) {
  const points = models.map((model) => `${model.x},${model.lineY}`).join(" ");

  elements.polyLine.setAttribute("points", points);
}
