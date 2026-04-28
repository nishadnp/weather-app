// src/components/header.js

import { format } from "date-fns";

// DOM element lazy getter pattern to avoid null reference errors on import
const dom = {
  get dateEl() {
    return document.querySelector(".header__date > p");
  },
};

/**
 * Renders the header date display with formatted date (e.g., "Monday, 24 April 2026").
 * @param {Object} processedData - Processed weather data containing date string
 */
export function renderHeader(processedData) {
  const day = processedData?.date;
  const el = dom.dateEl;

  if (!day || !el) return;

  el.textContent = formatDate(day);
}

/**
 * Formats API date string to human-readable format.
 * @param {string} dateString - ISO date string from API (e.g., "2026-04-24")
 * @returns {string} Formatted date (e.g., "Monday, 24 April 2026")
 */
function formatDate(dateString) {
  return format(new Date(dateString), "EEEE, d MMMM yyyy");
}
