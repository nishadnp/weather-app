// src/charts/windChart/windChartRenderer.js

// DOM element cache for wind chart SVG containers
const elements = {
  histogramContainer: document.querySelector(".wind-chart__histogram"),
  polyLine: document.querySelector(".wind-chart__trendline"),
};

/**
 * Renders wind speed bars as SVG rectangles in the histogram container.
 * The current hour (middle of 39-hour window) is highlighted in white.
 * Other bars have varying opacity based on wind speed.
 *
 * @param {Array} models - Array of wind chart model objects with x, bar, and isCurrent properties
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
 * Creates an SVG rectangle element representing a wind speed bar.
 * Uses explicit SVG namespace for proper rendering.
 *
 * @param {number} x - X position of bar
 * @param {number} y - Y position (top of bar)
 * @param {number} height - Bar height in pixels
 * @param {number} opacity - Fill opacity (0-1)
 * @returns {SVGRectElement} Configured rectangle element
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
 * Renders wind gust trend line as an SVG polyline connecting peak wind gusts.
 * Shows maximum wind gust potential above the average wind speed bars.
 *
 * @param {Array} models - Array of wind chart model objects with lineY positions
 */
export function renderWindLine(models) {
  const points = models.map((model) => `${model.x},${model.lineY}`).join(" ");

  elements.polyLine.setAttribute("points", points);
}
