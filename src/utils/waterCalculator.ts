import { cropCoefficients, seasonalEvapotranspiration } from './cropData';

type CropType = keyof typeof cropCoefficients;
type Season = keyof typeof seasonalEvapotranspiration;

export function calculateWaterConsumption(
  area: number,
  cropType: CropType,
  season: Season,
  daysInSeason: number = 90,
  precipitation: number // Total precipitation during the season in mm
): {
  dailyWaterNeed: number;
  seasonalWaterNeed: number;
  irrigationRequirement: number;
  waterEfficiency: number;
} {
  // Get crop coefficient (Kc) - using middle season as default
  const cropCoeff = cropCoefficients[cropType].middle;

  // Get reference evapotranspiration (ET0)
  const et0 = seasonalEvapotranspiration[season];

  // Calculate crop evapotranspiration (ETc)
  const etc = et0 * cropCoeff;

  // Convert hectares to square meters
  const areaInM2 = area * 10000;

  // Calculate daily water need (cubic meters)
  const dailyWaterNeed = (etc * areaInM2) / 1000;

  // Calculate seasonal water need (without considering precipitation)
  const seasonalWaterNeed = dailyWaterNeed * daysInSeason;

  // Convert precipitation from mm to cubic meters for the area
  const precipitationVolume = (precipitation * areaInM2) / 1000;

  // Calculate irrigation requirement (IR = ET - P + IR)
  const irrigationRequirement = seasonalWaterNeed - precipitationVolume;

  // Calculate water use efficiency (m³/ha)
  const waterEfficiency = seasonalWaterNeed / area;

  return {
    dailyWaterNeed: Math.round(dailyWaterNeed * 100) / 100,
    seasonalWaterNeed: Math.round(seasonalWaterNeed),
    irrigationRequirement: Math.max(0, Math.round(irrigationRequirement)), // Ensure IR is non-negative
    waterEfficiency: Math.round(waterEfficiency),
  };
}
