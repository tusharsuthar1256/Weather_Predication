import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateSoilMoisture(soilType: string, currentConditions: string): number {
  // Simplified calculation for demo
  const soilFactors = {
    'clay': 0.8,
    'loam': 0.6,
    'sandy': 0.4,
  };
  const conditionFactors = {
    'dry': 0.3,
    'moderate': 0.6,
    'wet': 0.9,
  };
  
  return soilFactors[soilType as keyof typeof soilFactors] * 
         conditionFactors[currentConditions as keyof typeof conditionFactors] * 100;
}

export function calculateWaterConsumption(
  plantType: string,
  soilType: string,
  areaSize: number
): number {
  // Simplified calculation for demo
  const plantFactors = {
    'vegetables': 1.2,
    'flowers': 1.0,
    'trees': 1.5,
  };
  const soilFactors = {
    'clay': 0.8,
    'loam': 1.0,
    'sandy': 1.2,
  };
  
  return plantFactors[plantType as keyof typeof plantFactors] * 
         soilFactors[soilType as keyof typeof soilFactors] * 
         areaSize * 10;
}