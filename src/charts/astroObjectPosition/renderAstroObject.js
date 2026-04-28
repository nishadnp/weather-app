// src/charts/astroObjectPosition/renderAstroObject.js

export function renderObject(coordinates, celestialObject, onShift) {
  const svgShape = document.querySelector(".astronomy-chart__object");

  // If not on shift, hide or remove the element and exit
  if (!onShift) {
    svgShape.style.display = "none";
    return;
  } else {
    svgShape.style.display = "block";
  }

  // Clean up old modifier classes (sun vs moon)
  svgShape.classList.forEach((clsName) => {
    if (clsName.startsWith("astronomy-chart__object--")) {
      svgShape.classList.remove(clsName);
    }
  });

  svgShape.classList.add(`astronomy-chart__object--${celestialObject}`);

  // Update position
  svgShape.setAttribute("cx", coordinates.cx);
  svgShape.setAttribute("cy", coordinates.cy);
}
