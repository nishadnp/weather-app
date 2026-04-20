/**
 * Forecast Chart Module
 * Transforms 7-day forecast data into high/low temperature trendlines with fill area.
 */

import { GRAPH_CONFIG } from "./config";
import { getForecastChartModel } from "./forecastChartModel";
import { renderPaths } from "./forecastChartRenderer";

export function renderForecastChart(days) {
  // Calculate coordinates from temperature data
  const model = getForecastChartModel(days, GRAPH_CONFIG);
  // Render to SVG DOM elements
  renderPaths(model);
}
