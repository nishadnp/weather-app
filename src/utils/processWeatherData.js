// src/utils/processWeatherData.js

// Function to process the weather data received from the API
export function processWeatherData(data) {
  // This function can be expanded to process the weather data as needed
  console.log("Processing weather data...");

  const currentConditions = data.currentConditions; // current weather conditions
  const today = data.days[0]; // today’s forecast

  // Process the next five days' brief forecast
  const nextFiveDays = data.days.slice(1, 6).map((day) => ({
    dayName: new Date(day.datetime).toLocaleDateString("en-US", {
      weekday: "long",
    }),
    highestTemperature: day.tempmax,
    icon: day.icon,
  }));

  // Extract and return the relevant weather information in a structured format
  return {
    today: {
      date: today.datetime,
      location: data.resolvedAddress,
      currentTemperature: currentConditions.temp,
      lowestTemperature: today.tempmin,
      highestTemperature: today.tempmax,
      conditions: currentConditions.conditions,
      description: today.description,
      humidity: currentConditions.humidity,
      icon: currentConditions.icon,
      windSpeed: currentConditions.windspeed,
      visibility: currentConditions.visibility,
      uvIndex: currentConditions.uvindex,
    },
    nextFiveDays,
  };
}
