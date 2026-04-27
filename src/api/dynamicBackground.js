// src/api/dynamicBackground.js

const API_CONFIG = Object.freeze({
  baseURL: "https://api.unsplash.com/search/photos",
  apiKey: process.env.UNSPLASH_KEY,
});

export async function getBackgroundImage(weatherCondition) {
  const query = `${weatherCondition} weather landscape`;

  const URL = `${API_CONFIG.baseURL}?query=${query}&orientation=landscape&per_page=1&client_id=${API_CONFIG.apiKey}`;

  try {
    const response = await fetch(URL);

    if (!response.ok) throw new Error("Unsplash fetch failed");

    const data = await response.json();

    // Return the regular-sized image URL
    return data.results[0]?.urls?.regular;
  } catch (error) {
    console.error(error);
    return null;
  }
}
