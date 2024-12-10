
export interface WaterConsumptionResult {
  dailyNeed: number;
  seasonalNeed: number;
  efficiency: number;
  recommendedDaily: number;
}

export function calculateDetailedWaterConsumption(
  areaSize: number,
  cropType: string,
  growingSeason: string
): WaterConsumptionResult {
  // Enhanced calculation logic
  const cropFactors: Record<string, number> = {
    'corn': 1.2,
    'wheat': 1.0,
    'rice': 1.5,
    'vegetables': 1.1,
    'fruits': 1.3,
  };

  const seasonFactors: Record<string, number> = {
    'spring': 1.1,
    'summer': 1.3,
    'fall': 1.0,
    'winter': 0.8,
  };

  const cropFactor = cropFactors[cropType] || 1.0;
  const seasonFactor = seasonFactors[growingSeason] || 1.0;

  const dailyNeed = areaSize * cropFactor * seasonFactor * 10;
  const seasonalNeed = dailyNeed * 90; // Assuming 90 days per season
  const efficiency = seasonalNeed / areaSize;
  const recommendedDaily = dailyNeed * 0.28; // Convert to liters

  return {
    dailyNeed,
    seasonalNeed,
    efficiency,
    recommendedDaily,
  };
}

export interface SoilMoistureResult {
  currentLevel: number;
  optimalRange: {
    min: number;
    max: number;
  };
  status: 'Low' | 'Optimal' | 'High';
  recommendation: string;
  stressLevel: string;
}

export function calculateDetailedSoilMoisture(
  soilType: string,
  lastWatered: Date,
  rainfall: number,
  conditions: string
): SoilMoistureResult {
  const soilCapacity: Record<string, { min: number; max: number }> = {
    'clay': { min: 65, max: 85 },
    'loam': { min: 45, max: 75 },
    'sandy': { min: 25, max: 55 },
  };

  const daysSinceWatering = Math.floor(
    (new Date().getTime() - lastWatered.getTime()) / (1000 * 60 * 60 * 24)
  );

  const baseLevel = soilCapacity[soilType]?.min || 45;
  const currentLevel = Math.max(
    0,
    baseLevel + rainfall * 2 - daysSinceWatering * 5
  );

  const optimalRange = soilCapacity[soilType] || { min: 45, max: 75 };

  let status: 'Low' | 'Optimal' | 'High';
  if (currentLevel < optimalRange.min) status = 'Low';
  else if (currentLevel > optimalRange.max) status = 'High';
  else status = 'Optimal';

  const recommendation = status === 'Low'
    ? 'Immediate watering recommended'
    : status === 'High'
      ? 'Hold watering until soil dries'
      : 'Maintain current watering schedule';

  const stressLevel = status === 'Low'
    ? 'Needs Water'
    : status === 'High'
      ? 'Over-watered'
      : 'Healthy';

  return {
    currentLevel,
    optimalRange,
    status,
    recommendation,
    stressLevel,
  };
}