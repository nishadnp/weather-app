// src/charts/astroObjectPath/computePosition.js

import { timeToSeconds } from "../../utils/time-fns";

/**
 * Computes the X and Y coordinates on the elliptical arc.
 * @param {Object} astroObject - { rise: timestamp, set: timestamp, current: timestamp }
 * @returns {Object} { cx, cy }
 */
export const computePosition = (dataset, currentTime) => {
  const track = document.querySelector(".astronomy-chart__track");

  if (!track) return { cx: 0, cy: 0 };

  // Convert times to seconds for easier calculations
  const riseTime = timeToSeconds(dataset.rise);
  const setTime = timeToSeconds(dataset.set);
  currentTime = timeToSeconds(currentTime);

  let onShift = false;
  let progress = 0;

  if (riseTime < setTime) {
    if (currentTime >= riseTime && currentTime <= setTime) {
      onShift = true;
      progress = (currentTime - riseTime) / (setTime - riseTime);
    }
  } else {
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

  // Path Math
  const totalLength = track.getTotalLength();
  const point = track.getPointAtLength(progress * totalLength);

  return {
    onShift,
    cx: point.x,
    cy: point.y,
  };
};
