// src/charts/forecastChart/forecastChartRenderer.js

// DOM element cache for forecast chart SVG paths
const elements = (() => {
  const elCache = {};

  return {
    get forecastChart() {
      return (elCache.forecastChart ??=
        document.querySelector(".forecast__chart"));
    },
    get lowPath() {
      return (elCache.lowPath ??= document.querySelector(
        ".forecast__low-path"
      ));
    },
    get highPath() {
      return (elCache.highPath ??= document.querySelector(
        ".forecast__high-path"
      ));
    },
    get fillPath() {
      return (elCache.fillPath ??= document.querySelector(".forecast__fill"));
    },
  };
})();

/**
 * Builds smooth SVG path string using quadratic bezier curves.
 * Creates a continuous trendline that connects temperature points.
 * Uses current point as control point, endpoint at midpoint between current and next point.
 *
 * @param {Array} coords - Array of coordinate objects with x and y properties
 * @returns {string} SVG path definition (d attribute value)
 */
const pathString = (coords) => {
  if (coords.length === 0) return "";

  let d = `M ${coords[0].x} ${coords[0].y}`;

  for (let i = 0; i < coords.length - 1; i++) {
    const curr = coords[i];
    const next = coords[i + 1];

    // Quadratic bezier: control point at current y, endpoint at midpoint
    const midX = (curr.x + next.x) / 2;
    d += ` Q ${curr.x} ${curr.y}, ${midX} ${(curr.y + next.y) / 2}`;
  }

  // Complete path with final point
  const last = coords[coords.length - 1];
  d += ` L ${last.x} ${last.y}`;

  return d;
};

/**
 * Renders high/low temperature trendlines and fill area between them.
 * Creates a visual "ribbon" showing temperature range across the forecast period.
 * Includes native SVG tooltips for accessibility.
 *
 * @param {Object} model - Chart model containing highestTempCoords and lowestTempCoords arrays
 */
export function renderPaths(model) {
  const { highestTempCoords, lowestTempCoords } = model;

  const highLineD = pathString(highestTempCoords);
  const lowLineD = pathString(lowestTempCoords);
  // Closed path: high line + reversed low line creates filled ribbon
  const fillD = `${highLineD} ${pathString([...lowestTempCoords].reverse())} Z`;

  if (elements.highPath) {
    elements.highPath.setAttribute("d", highLineD);
    elements.highPath.innerHTML = `<title>High Temperature Trendline</title>`;
  }

  if (elements.lowPath) {
    elements.lowPath.setAttribute("d", lowLineD);
    elements.lowPath.innerHTML = `<title>Low Temperature Trendline</title>`;
  }

  if (elements.fillPath) elements.fillPath.setAttribute("d", fillD);
}
