// src/api/dynamicBackground.js

// Unsplash API configuration for dynamic background imagery
const API_CONFIG = Object.freeze({
  baseURL: "https://api.unsplash.com/search/photos",
  apiKey: process.env.UNSPLASH_KEY,
});

/**
 * Fetches a weather-appropriate background image from Unsplash API.
 * Searches for landscape imagery matching the weather condition and time-of-day vibe.
 * Returns the regular-sized image URL suitable for CSS background properties.
 *
 * @async
 * @param {string} weatherCondition - Weather condition descriptor (e.g., 'Rainy', 'Sunny')
 * @param {string} timeVibe - Time-of-day vibe (e.g., 'night moody', 'sunrise dawn', 'afternoon sun')
 * @returns {Promise<string|null>} Image URL on success, null if API fails
 */
export async function getBackgroundImage(weatherCondition, timeVibe) {
  const query = `${weatherCondition} weather ${timeVibe} landscape`;

  const URL = `${API_CONFIG.baseURL}?query=${query}&orientation=landscape&per_page=1&client_id=${API_CONFIG.apiKey}`;

  try {
    const response = await fetch(URL);

    if (!response.ok) throw new Error("Unsplash fetch failed");

    const data = await response.json();

    // Return regular-sized image URL (optimal for web display)
    return data.results[0]?.urls?.regular;
  } catch (error) {
    console.error(error);
    return null;
  }
}
