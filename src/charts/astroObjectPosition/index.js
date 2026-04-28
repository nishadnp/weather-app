// src/charts/astrObjectPosition/index.js

import { getTimeWithSeconds } from "../../utils/time-fns";
import { computePosition } from "./computePosition";
import { renderMoonShroud, renderObject } from "./renderAstroObject";

export function updateAstroObjectPosition(dataset, celestialObject, timezone) {
  const currentTime = getTimeWithSeconds(timezone);

  const objectData = computePosition(dataset, currentTime, celestialObject);

  renderObject(objectData.coordinates, celestialObject, objectData.onShift);

  renderMoonShroud(objectData.coordinates, objectData.offset);
}
