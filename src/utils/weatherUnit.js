//src/utils/getUnit.js

let unitSystem = "metric"; // default

export function setUnitSystem(data) {
  unitSystem = data;
}

const UNIT_MAP = {
  us: {
    distance: "miles",
    speed: "mph",
    temperature: "C",
  },
  metric: {
    distance: "km",
    speed: "km/h",
    temperature: "C",
  },
  uk: {
    distance: "miles",
    speed: "mph",
    temperature: "C",
  },
};

export function formatUnit(measurement) {
  return UNIT_MAP[unitSystem]?.[measurement] ?? "";
}
