// src/charts/windChart/config.js

/**
 * Configuration constants for the wind chart visualization.
 */
export const GRAPH_CONFIG = Object.freeze({
  visualMax: 30, // Maximum wind speed displayed (m/s), bars cap at this value
  svgHeight: 70, // Height of the SVG container in pixels
  barCap: 0.7, // Fraction of height occupied by bars (70%)
  lineBuffer: 15, // Vertical offset for the gust line above bars
  xStep: 5, // Horizontal spacing between data points
});
