// src/api/map.js

import { currentTimeVibe } from "../ui/controller";

// API configuration constants for Geoapify static map service
const API_CONFIG = Object.freeze({
  baseURL: "https://maps.geoapify.com/v1/staticmap",
  apiKey: process.env.GEOAPIFY_KEY,
  width: 380,
  height: 300,
  zoom: 9,
});

/**
 * Generates Geoapify static map URL with weather-appropriate style and location marker.
 * Map style adapts to time-of-day for visual consistency with background imagery.
 *
 * @param {string} coordinates - Coordinates in "longitude,latitude" format
 * @returns {string} Complete Geoapify API URL with all parameters
 */
export function getMapURL(coordinates) {
  const styleName = currentTimeVibe ? mapStyle[currentTimeVibe] : "osm-bright";

  const url = `${API_CONFIG.baseURL}?style=${styleName}&width=${API_CONFIG.width}&height=${API_CONFIG.height}&center=lonlat:${coordinates}&zoom=${API_CONFIG.zoom}&marker=lonlat:${coordinates};color:%23ff0000;size:42&apiKey=${API_CONFIG.apiKey}`;

  return url;
}

/**
 * Maps time-of-day vibes to appropriate Geoapify map styles.
 * Creates visual cohesion between background image and map display.
 */
const mapStyle = {
  "night moody": "dark-matter",
  "sunrise dawn": "klokantech-basic",
  "morning light": "osm-bright",
  "afternoon sun": "osm-bright",
  "sunset golden hour": "dark-matter",
};
