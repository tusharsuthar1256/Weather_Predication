import React, { useState } from 'react';
import { Droplets, Calendar, Ruler } from 'lucide-react';
import { calculateWaterConsumption } from '../utils/waterCalculator';
import { WaterConsumptionChart } from '../components/Charts/WaterConsumptionChart';

export const WaterPage: React.FC = () => {
  const [area, setArea] = useState('');
  const [cropType, setCropType] = useState('');
  const [season, setSeason] = useState('');
  const [results, setResults] = useState<{
    dailyWaterNeed: number;
    seasonalWaterNeed: number;
    waterEfficiency: number;
  } | null>(null);

  const handleCalculate = () => {
    if (!area || !cropType || !season) return;

    const calculation = calculateWaterConsumption(
      Number(area),
      cropType as any,
      season as any
    );
    setResults(calculation);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <div className="bg-gray-900 rounded-xl shadow-sm p-6 dark:bg-white">
        <h2 className="text-2xl font-semibold text-white dark:text-gray-900 mb-6">
          Water Consumption Calculator
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-white dark:text-gray-900 mb-1">
              Field Area (hectares)
            </label>
            <input
              type="number"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter field area"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="cropType" className="block text-sm font-medium text-white dark:text-gray-900 mb-1">
              Crop Type
            </label>
            <select
              id="cropType"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select crop type</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="corn">Corn</option>
              <option value="soybeans">Soybeans</option>
            </select>
          </div>

          <div>
            <label htmlFor="season" className="block text-sm font-medium text-white dark:text-gray-900 mb-1">
              Growing Season
            </label>
            <select
              id="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select season</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
            </select>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Water Consumption
          </button>
        </div>

        {results && (
          <>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="text-blue-600" size={24} />
                  <h3 className="text-lg font-medium">Daily Water Need</h3>
                </div>
                <p className="text-3xl font-semibold text-gray-900">
                  {results.dailyWaterNeed}L m³
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Per day water requirement
                </p>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="text-blue-600" size={24} />
                  <h3 className="text-lg font-medium">Seasonal Need</h3>
                </div>
                <p className="text-3xl font-semibold text-gray-900">
                  {results.seasonalWaterNeed}L m³
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Total seasonal requirement
                </p>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Ruler className="text-blue-600" size={24} />
                  <h3 className="text-lg font-medium">Water Efficiency</h3>
                </div>
                <p className="text-3xl font-semibold text-gray-900">
                  {results.waterEfficiency}L m³/ha
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Water use per hectare
                </p>
              </div>
            </div>

            <div className="mt-8">
              <WaterConsumptionChart
                dailyWaterNeed={results.dailyWaterNeed}
                seasonalWaterNeed={results.seasonalWaterNeed}
                waterEfficiency={results.waterEfficiency}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};