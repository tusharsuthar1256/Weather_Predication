import { soilProperties } from './cropData';

type SoilType = keyof typeof soilProperties;

export function calculateSoilMoisture(
  soilType: SoilType,
  daysSinceWatering: number,
  rainfall: number = 0
): {
  currentMoisture: number;
  optimalRange: { min: number; max: number };
  daysUntilWatering: number;
  moistureStatus: 'low' | 'optimal' | 'high';
} {
  const soil = soilProperties[soilType];
  
  // Calculate initial moisture content (assuming field capacity after watering)
  const initialMoisture = soil.fieldCapacity;
  
  // Calculate moisture loss due to drainage and evaporation
  const moistureLoss = soil.drainageRate * daysSinceWatering * 0.5;
  
  // Calculate current moisture considering rainfall
  let currentMoisture = (initialMoisture - moistureLoss + (rainfall * 0.001));
  currentMoisture = Math.max(currentMoisture, soil.wiltingPoint);
  currentMoisture = Math.min(currentMoisture, soil.fieldCapacity);

  // Convert to percentage
  const moisturePercentage = (currentMoisture / soil.fieldCapacity) * 100;

  // Calculate optimal range
  const optimalMin = (soil.wiltingPoint + soil.waterHoldingCapacity * 0.5) / soil.fieldCapacity * 100;
  const optimalMax = 90; // 90% of field capacity

  // Determine moisture status
  let moistureStatus: 'low' | 'optimal' | 'high';
  if (moisturePercentage < optimalMin) {
    moistureStatus = 'low';
  } else if (moisturePercentage > optimalMax) {
    moistureStatus = 'high';
  } else {
    moistureStatus = 'optimal';
  }

  // Calculate days until watering needed
  const daysUntilWatering = Math.max(
    0,
    Math.ceil(
      ((currentMoisture - soil.wiltingPoint) / (soil.drainageRate * 0.5))
    )
  );

  return {
    currentMoisture: Math.round(moisturePercentage),
    optimalRange: {
      min: Math.round(optimalMin),
      max: Math.round(optimalMax),
    },
    daysUntilWatering,
    moistureStatus,
  };
}