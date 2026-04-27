// src/api/map.js

// API config (constants only), freeze prevents accidental changes to config values at runtime
const API_CONFIG = Object.freeze({
  baseURL: "https://maps.geoapify.com/v1/staticmap",
  apiKey: process.env.GEOAPIFY_KEY,
  styleName: "dark-matter",
  width: 380,
  height: 300,
  zoom: 9,
});

export function getMapURL(coordinates) {
  const url = `${API_CONFIG.baseURL}?style=${API_CONFIG.styleName}&width=${API_CONFIG.width}&height=${API_CONFIG.height}&center=lonlat:${coordinates}&zoom=${API_CONFIG.zoom}&marker=lonlat:${coordinates};color:%23ff0000;size:42&apiKey=${API_CONFIG.apiKey}`;

  return url;
}
