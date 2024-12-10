import { useState, useEffect } from 'react';
import { CalendarCheck, Cloud, Droplet, Leaf, Sun, Wind, Airplay, CloudRain, CloudLightning, CloudFog } from 'lucide-react';
import { Card } from '../components/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export function Weather() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);  
  const [airQuality, setAirQuality] = useState<any>(null); // For AQI data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    if (!location.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log("weather json : ", data);

      if (data.cod !== 200) {
        setError(data.message);
        setWeatherData(null);
        setForecastData([]);
        setAirQuality(null);
      } else {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon); // Fetch AQI and Sunrise/Sunset data
        fetchForecastData(data.coord.lat, data.coord.lon);
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAirQualityData = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const data = await response.json();
      setAirQuality(data);
      console.log("Air Quality Data:", data);
    } catch (err) {
      setError('Failed to fetch air quality data.');
    }
  };

  const fetchForecastData = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const todayIndex = new Date().getDay();

      const formattedData = data.list.slice(0, 7).map((entry: any, index: number) => {
        const futureDayIndex = (todayIndex + index + 1) % 7;
        return {
          day: weekdays[futureDayIndex],
          temp: entry.main.temp,
          humidity: entry.main.humidity,
          timestamp: entry.dt_txt, // Store the timestamp for displaying "Today at"
        };
      });

      setForecastData(formattedData);
      console.log("Forecast Data:", formattedData);
    } catch (err) {
      setError('Failed to fetch forecast data.');
    }
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  console.log("Weather data is: ", weatherData);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 w-full dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="mb-8 pl-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Weather Prediction</h1>
        <div className="max-w-xl flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="dark:text-gray-900 text-white w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 dark:bg-white hover:outline-white"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      
  
      {loading ? (
        <div className="text-center">
          <p className="text-gray-600">Fetching weather data...</p>
        </div>
      ) : weatherData ? (
        <>
          <div className="flex flex-col sm:flex-row gap-8 w-full text-gray-900 dark:text-white justify-center">
            {/* Current Weather Card */}
            <div className="w-full sm:w-[48%] mb-8">
              <Card className="mb-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900">
                <p className="text-xl font-semibold mb-4 flex justify-start items-center text-white dark:text-gray-900">
                  Current Weather
                </p>
                <hr className="mb-2" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                      className="w-16 h-16"
                    />
                    <div>
                      <p className="text-3xl font-bold">{Math.round(weatherData.main.temp)}°C</p>
                      <p className="text-gray-600">{weatherData.weather[0].description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Wind className="h-5 w-5 text-gray-500" />
                      <span>{weatherData.wind.speed} km/h</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Droplet className="h-5 w-5 text-blue-500" />
                      <span>{weatherData.main.humidity}%</span>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-900 dark:bg-white">
                <p className="text-xl font-semibold mb-4 flex justify-start items-center text-white dark:text-gray-900">
                  Irrigation Recommendation
                </p>
                <hr className="mb-2" />
                <div className="flex items-center space-x-4 p-4">
                  <Cloud className="h-12 w-12 text-blue-500" />
                  <div>
                    <p className="text-lg font-semibold text-green-600">
                      {weatherData.main.humidity > 70 ? "Not Suitable for Irrigation" : "Suitable for Irrigation"}
                    </p>
                    <p className="text-gray-600">
                      {weatherData.main.humidity > 70 ? "High chance of rain" : "Low chance of rain, moderate humidity"}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
  
            {/* Forecast */}
            <div className="w-full sm:w-[48%] ">
              <Card className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 h-[345px] overflow-y-auto scrollbar-hide">
                <p className="text-xl font-semibold mb-4 flex justify-start items-center">
                  <CalendarCheck className="mr-3" />
                  7-Day Forecast
                </p>
                <hr className="mb-4" />
                {forecastData.map((data, inx) => (
                  <div
                    key={inx}
                    className="w-full shadow-md mb-3 flex justify-between items-center py-3 px-4"
                  >
                    <div>
                      <p>{data.day}</p>
                      <p>Humidity: {data.humidity}%</p>
                      <p>Time: {new Date(data.timestamp).toLocaleTimeString()}</p>
                    </div>
                    <div>
                      <p className="text-3xl font-semibold">{Math.round(data.temp)}°C</p>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
  
          {/* Full Bottom Container for Air Quality & Sunrise/Sunset */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center w-full">
  
            {/* Rain Fall */}
            {weatherData && (
              <Card className="w-full sm:w-[48%] bg-gray-900 dark:bg-white text-white dark:text-gray-900 mb-8">
                <p className="text-xl font-semibold mb-4 flex justify-start items-center">
                  <Sun className="mr-3" />
                  Current Rainfall
                </p>
                <hr className="mb-2" />
                <div className="p-2">
                    <Cloud className="h-12 w-12 text-blue-500" />
                    <p className="text-lg font-semibold">
                      {weatherData.rain ? `${weatherData.rain['1h']} mm` : "No Rain"}
                    </p>
                    <p className="text-gray-600">
                      {weatherData.rain ? "Rain recorded in the last hour" : "No rainfall in the past hour"}
                    </p>
                  </div>
              </Card>
            )}

            {/* Air Quality Section */}
            {airQuality && (
  <Card className="w-full sm:w-[48%] bg-gray-900 dark:bg-white text-white dark:text-gray-900 mb-8">
    <p className="text-xl font-semibold mb-4 flex justify-start items-center">
      <Airplay className="mr-3" />
      Air Quality Index
    </p>
    <hr className="mb-2" />
    <div className="flex items-center space-x-4">
      <div className="flex justify-between items-center w-full p-4">
        <div>
          {airQuality.list[0].main.aqi === 1 && <Sun className="text-yellow-500 h-14 w-14" />}
          {airQuality.list[0].main.aqi === 2 && <Cloud className="text-green-500 h-14 w-14" />}
          {airQuality.list[0].main.aqi === 3 && <CloudRain className="text-orange-500 h-14 w-14" />}
          {airQuality.list[0].main.aqi === 4 && <CloudLightning className="text-red-500 h-14 w-14" />}
          {airQuality.list[0].main.aqi === 5 && <CloudFog className="text-gray-700 h-14 w-14" />}
        </div>
        <div>
          <p
            className={`px-4 py-2 rounded-lg font-semibold text-white ${
              airQuality.list[0].main.aqi === 1 ? 'bg-green-500' :
              airQuality.list[0].main.aqi === 2 ? 'bg-yellow-500' :
              airQuality.list[0].main.aqi === 3 ? 'bg-orange-500' :
              airQuality.list[0].main.aqi === 4 ? 'bg-red-500' :
              'bg-gray-700'
            }`}
          >
            {['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'][airQuality.list[0].main.aqi - 1]}
          </p>
        </div>
      </div>
    </div>
    <p className="pl-4 font-semibold">
      Air Quality Index: {airQuality.list[0].main.aqi}
    </p>
  </Card>
)}

          </div>
        </>
      ) : (
        <div className="h-[300px] bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">Enter a location and click Search, To see predication</p>
          </div>
      )}
    </div>
  </div>
  
  );
}
