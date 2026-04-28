// src/charts/astroObjectPath/computePosition.js

import { timeToSeconds } from "../../utils/time-fns";

/**
 * Computes the visual position of a celestial object (sun or moon) on an elliptical trajectory chart.
 * Calculates whether object is currently visible and its progress along the arc.
 * For moon, computes phase-based shadow offset to simulate lunar phases.
 *
 * Handles edge cases:
 * - Objects that cross midnight (rise time > set time)
 * - Objects that are never visible at current location
 * - Moon phase visualization
 *
 * @param {Object} dataset - Celestial data with rise, set, and phase (for moon) times
 * @param {string} currentTime - Current time in HH:MM:SS format
 * @param {string} celestialObject - Type: 'sun' or 'moon'
 * @returns {Object} Object with: onShift (boolean), coordinates (cx, cy), offset (moon phase shadow)
 */
export const computePosition = (dataset, currentTime, celestialObject) => {
  const track = document.querySelector(".astronomy-chart__track");

  if (!track) return { cx: 0, cy: 0 };

  // Convert times to seconds for easier calculations
  const riseTime = timeToSeconds(dataset.rise);
  const setTime = timeToSeconds(dataset.set);
  currentTime = timeToSeconds(currentTime);

  let onShift = false;
  let progress = 0;

  // Handle normal case (rise < set) and crossing-midnight case (rise > set)
  if (riseTime < setTime) {
    // Normal case: rise and set within same day
    if (currentTime >= riseTime && currentTime <= setTime) {
      onShift = true;
      progress = (currentTime - riseTime) / (setTime - riseTime);
    }
  } else {
    // Crossing midnight case: rise > set
    if (currentTime >= riseTime || currentTime <= setTime) {
      onShift = true;
      const totalWindow = 24 * 3600 - riseTime + setTime;
      const elapsed =
        currentTime >= riseTime
          ? currentTime - riseTime
          : 24 * 3600 - riseTime + currentTime;
      progress = elapsed / totalWindow;
    }
  }

  // Use SVG path to get x,y position at progress point along arc
  const totalLength = track.getTotalLength();
  const point = track.getPointAtLength(progress * totalLength);

  // Moon-specific: compute phase shadow offset
  let offset = null;
  if (celestialObject === "moon") {
    // Phase ranges from 0 (new) to 1 (full back to new)
    // offset ranges from -24 (full dark) to +24 (bright side)
    // phaseValue 0.5 = Full (Offset = 0, no shadow)
    // phaseValue 0 or 1 = New (Full shadow)
    const radius = 6;
    offset = (dataset.phase - 0.5) * (radius * 4);
  }

  return {
    onShift,
    coordinates: {
      cx: point.x,
      cy: point.y,
    },
    offset,
  };
};
