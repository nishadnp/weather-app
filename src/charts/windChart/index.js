// src/charts/windChart/index.js

import { GRAPH_CONFIG } from "./config";
import { getWindChartModel } from "./windChartModel";
import { renderWindBars, renderWindLine } from "./windChartRenderer";

/**
 * Renders the wind chart by processing hourly data and drawing bars and trend line.
 * @param {Array} hours - Array of hourly weather data objects
 */
export function renderWindChart(hours) {
  const model = getWindChartModel(hours, GRAPH_CONFIG);

  renderWindBars(model);
  renderWindLine(model);
}
