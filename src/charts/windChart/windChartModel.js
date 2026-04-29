import { unitSystem } from "../../utils/weatherUnit";

/**
 * Processes hourly weather data into a model for wind chart rendering.
 * Converts wind speeds to m/s, calculates bar heights and positions.
 * @param {Array} hours - Array of hourly weather data objects
 * @param {Object} config - Chart configuration constants
 * @returns {Array} Array of model objects with x, bar, lineY, and isCurrent properties
 */
export function getWindChartModel(hours, config) {
  const midIndex = Math.floor(hours.length / 2);

  return hours.map((hour, index) => {
    const speedUniformiser = unitSystem === "metric" ? 0.27778 : 0.44704;

    // Convert wind speeds from API units to m/s for consistent visualization
    const windMps = hour.windspeed * speedUniformiser;
    const gustMps = hour.windgust * speedUniformiser;

    // Cap speeds at visual max to prevent bars from exceeding chart height
    const safeSpeed = Math.min(windMps, config.visualMax);
    const safeGust = Math.min(gustMps, config.visualMax);

    // Calculate bar dimensions based on speed relative to visual max
    const barHeight =
      (safeSpeed / config.visualMax) * config.svgHeight * config.barCap;

    const x = index * config.xStep;

    const barY = config.svgHeight - barHeight;

    // Position gust line above bars with buffer for visibility
    const lineY =
      config.svgHeight -
      (safeGust / config.visualMax) * config.svgHeight * config.barCap -
      config.lineBuffer;

    return {
      x,
      bar: {
        y: barY,
        height: barHeight,
        opacity: 0.2 + (safeSpeed / config.visualMax) * 0.4, // Opacity increases with speed
        title: `${hour.windspeed.toFixed(1)} ${unitSystem === "metric" ? "km/h" : "mph"}`, // Tooltip text for bar
      },
      lineY,
      isCurrent: index === midIndex, // Highlight current hour
    };
  });
}
