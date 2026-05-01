// src/utils/capitalizeFirstLetter.js

/**
 * Capitalizes the first letter of a string or each string in an array.
 *
 * - If a string is provided, returns the string with its first character capitalized.
 * - If an array is provided, returns a new array with each valid string capitalized.
 * - Non-string or empty values are converted to an empty string.
 *
 * @param {input|input[]} input - A string or an array of strings.
 * @returns {input|input[]} A capitalized string or an array of capitalized strings.
 */
export function capitalizeFirstLetter(input) {
  if (Array.isArray(input)) {
    return input.map((item) =>
      typeof item === "string" && item.length > 0
        ? item[0].toUpperCase() + item.slice(1)
        : ""
    );
  }

  if (typeof input !== "string" || input.length === 0) return "";

  return input[0].toUpperCase() + input.slice(1);
}
