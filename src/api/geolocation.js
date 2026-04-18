// src/api/geolocation.js

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
