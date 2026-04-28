// src/utils/time-fns.js

/**
 * Formats current time in HH:MM format (24-hour) for specified timezone.
 * @param {string} timeZone - IANA timezone string (e.g., 'America/New_York')
 * @returns {string} Time formatted as HH:MM in 24-hour format
 */
export function getTimeWithoutSeconds(timeZone) {
  const time = new Date().toLocaleTimeString("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return time;
}

/**
 * Formats current time in HH:MM:SS format (24-hour) for specified timezone.
 * @param {string} timeZone - IANA timezone string (e.g., 'America/New_York')
 * @returns {string} Time formatted as HH:MM:SS in 24-hour format
 */
export function getTimeWithSeconds(timeZone) {
  const time = new Date().toLocaleTimeString("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return time;
}

/**
 * Extracts and formats timezone offset (e.g., "UTC+5" or "UTC-8").
 * @param {string} timeZone - IANA timezone string
 * @returns {string} Formatted timezone offset
 */
export function formatTimeZone(timeZone) {
  const gmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName")?.value;

  return gmt;
}

/**
 * Converts HH:MM:SS format string to total seconds since midnight.
 * @param {string} timeStr - Time in HH:MM:SS format
 * @returns {number} Total seconds from midnight (0-86400)
 */
export function timeToSeconds(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Determines the time-of-day "vibe" for background image selection.
 * Calculates whether it's night, dawn, morning, afternoon, or dusk relative to sunrise/sunset.
 * Uses 30-minute buffers around sunrise/sunset for transition periods.
 *
 * @param {string} timeZone - IANA timezone string
 * @param {string} sunRiseTime - Sunrise time in HH:MM:SS format
 * @param {string} sunSetTime - Sunset time in HH:MM:SS format
 * @returns {string} Vibe descriptor: 'night moody', 'sunrise dawn', 'morning light', 'afternoon sun', or 'sunset golden hour'
 */
export const getTimeVibe = (timeZone, sunRiseTime, sunSetTime) => {
  const currentTime = getTimeWithSeconds(timeZone);
  const currentTimeInSeconds = timeToSeconds(currentTime);
  const riseTimeinSeconds = timeToSeconds(sunRiseTime);
  const setTimeinSeconds = timeToSeconds(sunSetTime);

  // Night (Before dawn or after dusk) - 30 mins buffer
  if (
    currentTimeInSeconds < riseTimeinSeconds - 1800 ||
    currentTimeInSeconds > setTimeinSeconds + 1800
  )
    return "night moody";

  // Sunrise/Dawn (30 mins before to 1 hour after sunrise)
  if (
    currentTimeInSeconds >= riseTimeinSeconds - 1800 &&
    currentTimeInSeconds <= riseTimeinSeconds + 3600
  )
    return "sunrise dawn";

  // Morning (1 hour after sunrise to noon)
  if (
    currentTimeInSeconds > riseTimeinSeconds + 3600 &&
    currentTimeInSeconds < 43200
  )
    return "morning light";

  // Afternoon (Noon to 1 hour before sunset)
  if (
    currentTimeInSeconds >= 43200 &&
    currentTimeInSeconds <= setTimeinSeconds - 3600
  )
    return "afternoon sun";

  // Dusk/Golden Hour (1 hour before to 30 mins after sunset)
  return "sunset golden hour";
};
