// src/utility/capitalizeFirstLetter.js

export function capitalizeFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) return "";
  return str[0].toUpperCase() + str.slice(1);
}
