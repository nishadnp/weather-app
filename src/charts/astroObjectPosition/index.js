// src/charts/astrObjectPosition/index.js

import { getTimeWithSeconds } from "../../utils/time-fns";
import { computePosition } from "./computePosition";
import { renderObject } from "./renderAstroObject";

export function updateAstroObjectPosition(dataset, celestialObject, timezone) {
  const currentTime = getTimeWithSeconds(timezone);

  const objectCoordinates = computePosition(dataset, currentTime);

  renderObject(objectCoordinates, celestialObject, objectCoordinates.onShift);
}
