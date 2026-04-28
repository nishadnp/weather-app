// src/charts/astroObjectPosition/renderAstroObject.js

/**
 * Updates the visual position of sun or moon on the trajectory chart.
 * Shows/hides the celestial object based on whether it's above or below horizon.
 * Applies CSS classes and attributes for styling the appropriate object type.
 *
 * @param {Object} coordinates - Object with cx, cy properties (SVG center coordinates)
 * @param {string} celestialObject - Type of object: 'sun' or 'moon'
 * @param {boolean} onShift - True if object is currently visible above horizon
 */
export function renderObject(coordinates, celestialObject, onShift) {
  const svgShape = document.querySelector(".astronomy-chart__object");

  // Hide if object is below horizon
  if (!onShift) {
    svgShape.style.display = "none";
    return;
  } else {
    svgShape.style.display = "block";
  }

  // Clean up old modifier classes (e.g., astronomy-chart__object--sun)
  svgShape.classList.forEach((clsName) => {
    if (clsName.startsWith("astronomy-chart__object--")) {
      svgShape.classList.remove(clsName);
    }
  });

  // Apply current celestial object class
  svgShape.classList.add(`astronomy-chart__object--${celestialObject}`);

  // Update position on chart
  svgShape.setAttribute("cx", coordinates.cx);
  svgShape.setAttribute("cy", coordinates.cy);
}

/**
 * Renders moon phase indicator (crescent shadow) positioned based on moon phase.
 * Shows a dark overlay that slides across the moon to simulate moon phases.
 * Used for visual indication of lunar cycle (new moon → full moon).
 *
 * @param {Object} coordinates - Object with cx, cy properties for moon position
 * @param {number} offset - Horizontal offset for phase shadow. Null if not moon mode.
 */
export function renderMoonShroud(coordinates, offset) {
  const shroud = document.querySelector(".moon-shroud");

  // Hide if no moon phase data or in sun mode
  if (offset === null) {
    shroud.style.display = "none";
    return;
  }

  shroud.style.display = "block";

  // Position shadow at moon center, offset based on moon phase
  shroud.setAttribute("cx", coordinates.cx + offset);
  shroud.setAttribute("cy", coordinates.cy);
}
