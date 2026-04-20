// src/charts/forecastChart/forecastChartModel.js

/**
 * Transforms temperature data into SVG coordinates for visualization.
 * Uses a linear scale to map temperatures to Y positions (flipped for SVG coordinates).
 */
export function getForecastChartModel(days, graphConfig) {
  const maxTempSet = days.map((day) => day.highestTemperature);
  const minTempSet = days.map((day) => day.lowestTemperature);

  const combinedTempSet = [...maxTempSet, ...minTempSet];

  // Add padding to temperature range for visual breathing room
  const chartMin = Math.min(...combinedTempSet) - 5;
  const chartMax = Math.max(...combinedTempSet) + 5;

  // Maps temperature value to Y coordinate (inverted for SVG origin at top-left)
  const maptoY = (temperature, min, max) => {
    const range = max - min;
    const percentage = (temperature - min) / range;
    return graphConfig.svgHeight - percentage * graphConfig.svgHeight;
  };

  // Generate coordinate points for high temperature trendline
  const highestTempCoords = maxTempSet.map((temperature, index) => ({
    x: graphConfig.xStep * index,
    y: maptoY(temperature, chartMin, chartMax),
  }));

  // Generate coordinate points for low temperature trendline
  const lowestTempCoords = minTempSet.map((temperature, index) => ({
    x: graphConfig.xStep * index,
    y: maptoY(temperature, chartMin, chartMax),
  }));

  return {
    chartMax,
    chartMin,
    highestTempCoords,
    lowestTempCoords,
  };
}
