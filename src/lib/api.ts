import axios from 'axios';

const OPENWEATHER_API_KEY = 'YOUR_API_KEY'; // Replace with actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      main: string;
      description: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      day: number;
    };
    humidity: number;
    weather: Array<{
      main: string;
    }>;
  }>;
}

export async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    // First, get coordinates for the city
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`
    );

    if (!geoResponse.data[0]) {
      throw new Error('City not found');
    }

    const { lat, lon } = geoResponse.data[0];

    // Then get weather data using coordinates
    const weatherResponse = await axios.get(
      `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    return weatherResponse.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}