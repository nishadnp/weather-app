// src/utility/capitalizeFirstLetter.js

/**
 * Capitalizes the first letter of a string.
 *
 * If the input is not a string or is an empty string,
 * an empty string is returned.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} A new string with the first character converted to uppercase,
 * or an empty string if the input is invalid.
 */
export function capitalizeFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) return "";
  return str[0].toUpperCase() + str.slice(1);
}
