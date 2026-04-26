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
