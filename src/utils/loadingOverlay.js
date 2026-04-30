// src/utils/loadingOverlay.js

/**
 * This module manages the loading overlay state for the weather application. It provides a function to show or hide the loading overlay based on the application's loading state.
 * The loading overlay is a visual indicator that informs users that the application is processing data or fetching information, enhancing the user experience by providing feedback during asynchronous operations.
 *
 * @param {boolean} isLoading - A boolean value indicating whether the loading overlay should be shown (true) or hidden (false).
 * @returns {void} This function does not return any value. It directly manipulates the DOM to show or hide the loading overlay.
 */
// Show loader
const loader = document.getElementById("loading-overlay");
loader.classList.remove("hidden");

export function loadingOverlayState(isLoading) {
  if (isLoading) {
    loader.classList.remove("hidden");
  } else if (!isLoading) {
    loader.classList.add("hidden");
  }
}
