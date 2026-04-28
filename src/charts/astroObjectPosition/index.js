// src/charts/astrObjectPosition/index.js

import { getTimeWithSeconds } from "../../utils/time-fns";
import { computePosition } from "./computePosition";
import { renderMoonShroud, renderObject } from "./renderAstroObject";

/**
 * Orchestrates computation and rendering of celestial object position on trajectory chart.
 * Updates the visual representation of sun or moon based on current time and rise/set times.
 * Handles sun/moon phase visualization.
 *
 * @param {Object} dataset - Rise/set times and phase data for the celestial object
 * @param {string} celestialObject - Type: 'sun' or 'moon'
 * @param {string} timezone - IANA timezone string for accurate time calculation
 */
export function updateAstroObjectPosition(dataset, celestialObject, timezone) {
  const currentTime = getTimeWithSeconds(timezone);

  const objectData = computePosition(dataset, currentTime, celestialObject);

  renderObject(objectData.coordinates, celestialObject, objectData.onShift);

  renderMoonShroud(objectData.coordinates, objectData.offset);
}
