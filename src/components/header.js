// src/components/header.js

import { format } from "date-fns";

// Lazily resolves DOM node (avoids null issues on import)
const dom = {
  get dateEl() {
    return document.querySelector(".header__date > p");
  },
};

export function renderHeader(processedData) {
  // Safely access date from processed weather data
  const day = processedData?.today?.date;

  const el = dom.dateEl;

  // Exit early if required data or DOM element is missing
  if (!day || !el) return;

  el.textContent = formatDate(day);
}

// Converts API date → readable UI format
function formatDate(dateString) {
  return format(new Date(dateString), "EEEE, d MMMM yyyy");
}
