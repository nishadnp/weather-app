// src/api/geolocation.js

/**
 * Requests user's current geographic coordinates via browser Geolocation API.
 * Returns a promise that resolves to a string "latitude, longitude".
 * @returns {Promise<string>} Resolves to coordinates string or rejects if permission denied
 */
export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        resolve(`${lat}, ${lon}`);
      },
      (error) => reject(error)
    );
  });
