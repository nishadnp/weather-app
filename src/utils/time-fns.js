// src/utils/time-fns.js

export function getTimeWithoutSeconds(timeZone) {
  const time = new Date().toLocaleTimeString("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return time;
}

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

export function formatTimeZone(timeZone) {
  const gmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName")?.value;

  return gmt;
}

export function timeToSeconds(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export const getTimeVibe = (timeZone, sunRiseTime, sunSetTime) => {
  const currentTime = getTimeWithSeconds(timeZone); // Current time in HH:MM:SS format
  const currentTimeInSeconds = timeToSeconds(currentTime);
  const riseTimeinSeconds = timeToSeconds(sunRiseTime);
  const setTimeinSeconds = timeToSeconds(sunSetTime);

  // Night (Before dawn or after dusk)
  if (
    currentTimeInSeconds < riseTimeinSeconds - 1800 ||
    currentTimeInSeconds > setTimeinSeconds + 1800
  )
    return "night moody";

  // Sunrise/Dawn (30 mins before to 1 hour after)
  if (
    currentTimeInSeconds >= riseTimeinSeconds - 1800 &&
    currentTimeInSeconds <= riseTimeinSeconds + 3600
  )
    return "sunrise dawn";

  // Morning (Up to noon)
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

  // Dusk/Golden Hour
  return "sunset golden hour";
};
