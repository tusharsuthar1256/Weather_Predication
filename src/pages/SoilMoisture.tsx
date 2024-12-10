import React, { useState } from 'react';
import { Sprout, Droplets, Clock } from 'lucide-react';
import axios from 'axios';
import { calculateSoilMoisture } from '../utils/soilCalculator';
import { SoilMoistureChart } from '../components/Charts/SoilMoistureChart';
import { PlantStatusIcon } from '../components/PlantStatus/PlantStatusIcon';

export const SoilPage: React.FC = () => {
  const [soilType, setSoilType] = useState('');
  const [lastWatered, setLastWatered] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [city, setCity] = useState('');
  const [isManual, setIsManual] = useState(true); // State to toggle between manual and city search
  const [results, setResults] = useState<{
    currentMoisture: number;
    optimalRange: { min: number; max: number };
    daysUntilWatering: number;
    moistureStatus: 'low' | 'optimal' | 'high';
  } | null>(null);

  const getRainfallData = async (city: string) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // Replace with your OpenWeather API key
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const weatherData = response.data;
      const rainfallAmount = weatherData.rain ? weatherData.rain['1h'] : 0;
      setRainfall(rainfallAmount.toString());
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setRainfall('');
    }
  };

  const handleCalculate = () => {
    if (!soilType || !lastWatered || (isManual && !rainfall)) return;

    const daysSinceWatering = Math.floor(
      (new Date().getTime() - new Date(lastWatered).getTime()) / (1000 * 60 * 60 * 24)
    );

    const calculation = calculateSoilMoisture(
      soilType as any,
      daysSinceWatering,
      Number(rainfall) || 0
    );
    setResults(calculation);
  };

  const getMoistureStatusColor = (status: 'low' | 'optimal' | 'high') => {
    switch (status) {
      case 'low':
        return 'text-red-600';
      case 'optimal':
        return 'text-green-600';
      case 'high':
        return 'text-yellow-600';
    }
  };

  const handleCityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cityInput = e.target.value;
    setCity(cityInput);

    // Trigger the API call when the city input changes (debounced or immediate)
    if (cityInput) {
      await getRainfallData(cityInput); // Fetch rainfall data based on the city
    } else {
      setRainfall(''); // Clear rainfall if the input is empty
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gray-900 rounded-xl shadow-sm p-6 dark:bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-white dark:text-gray-900">
          Soil Moisture Calculator
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="soilType" className="block text-sm font-medium text-white dark:text-gray-900 mb-1">
              Soil Type
            </label>
            <select
              id="soilType"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select soil type</option>
              <option value="sandy">Sandy</option>
              <option value="clay">Clay</option>
              <option value="loam">Loam</option>
              <option value="silt">Silt</option>
            </select>
          </div>

          <div>
            <label htmlFor="lastWatered" className="block text-sm font-medium text-white dark:text-gray-900 mb-1">
              Last Watered
            </label>
            <input
              type="date"
              id="lastWatered"
              value={lastWatered}
              onChange={(e) => setLastWatered(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="manual"
                name="rainfallInput"
                checked={isManual}
                onChange={() => setIsManual(true)}
                className="mr-2"
              />
              <label htmlFor="manual" className="text-white">By Manual</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="citySearch"
                name="rainfallInput"
                checked={!isManual}
                onChange={() => setIsManual(false)}
                className="mr-2"
              />
              <label htmlFor="citySearch" className="text-white">By City Search</label>
            </div>
          </div>

          {/* Conditional rendering for manual or city search input */}
          {isManual ? (
            <div>
              <label htmlFor="rainfall" className="block text-sm font-medium text-white dark:text-gray-900 mb-1">
                Manual Rainfall (mm)
              </label>
              <input
                type="number"
                id="rainfall"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
                placeholder="Enter rainfall amount"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-white dark:text-gray-900 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={handleCityChange} // Update city input and trigger API call
                placeholder="Enter city name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <div>
                <label htmlFor="rainfall" className="block text-sm font-medium text-white dark:text-gray-900 mt-4 mb-1">
                  Recent Rainfall (mm)
                </label>
                <input
                  type="number"
                  id="rainfall"
                  value={rainfall}
                  placeholder="Enter rainfall amount"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled
                />
              </div>
            </div>
          )}

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
          >
            Calculate Soil Moisture
          </button>
        </div>

        {results && (
          <>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="text-blue-600" size={24} />
                  <h3 className="text-lg font-medium">Current Moisture Level</h3>
                </div>
                <p className="text-3xl font-semibold text-gray-900">
                  {results.currentMoisture}%
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Optimal range: {results.optimalRange.min}% - {results.optimalRange.max}%
                </p>
                <p className={`text-sm font-medium mt-2 ${getMoistureStatusColor(results.moistureStatus)}`}>
                  Status: {results.moistureStatus.charAt(0).toUpperCase() + results.moistureStatus.slice(1)}
                </p>
              </div>

              <div className="p-6 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-green-600" size={24} />
                  <h3 className="text-lg font-medium">Watering Recommendation</h3>
                </div>
                {results.moistureStatus === 'low' ? (
                  <p className="text-gray-700">
                    Immediate watering recommended.
                  </p>
                ) : (
                  <p className="text-gray-700">
                    Next watering recommended in {results.daysUntilWatering} days.
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-4">
                  Based on soil type, recent rainfall, and days since last watering
                </p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <SoilMoistureChart
                  currentMoisture={results.currentMoisture}
                  optimalRange={results.optimalRange}
                />
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <PlantStatusIcon status={results.moistureStatus} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
