// Crop coefficients (Kc) for different growth stages
export const cropCoefficients = {
     wheat: {
       initial: 0.3,
       development: 0.7,
       middle: 1.15,
       late: 0.4,
     },
     rice: {
       initial: 1.05,
       development: 1.2,
       middle: 1.3,
       late: 0.7,
     },
     corn: {
       initial: 0.3,
       development: 0.7,
       middle: 1.2,
       late: 0.5,
     },
     soybeans: {
       initial: 0.4,
       development: 0.8,
       middle: 1.15,
       late: 0.5,
     },
   } as const;
   
   // Reference evapotranspiration (ET0) values by season (mm/day)
   export const seasonalEvapotranspiration = {
     spring: 4.5,
     summer: 6.0,
     fall: 3.5,
     winter: 2.0,
   } as const;
   
   // Field capacity and wilting point for different soil types (% volume)
   export const soilProperties = {
     sandy: {
       fieldCapacity: 0.15,
       wiltingPoint: 0.07,
       waterHoldingCapacity: 0.08,
       drainageRate: 0.6, // fraction per day
     },
     clay: {
       fieldCapacity: 0.40,
       wiltingPoint: 0.20,
       waterHoldingCapacity: 0.20,
       drainageRate: 0.1,
     },
     loam: {
       fieldCapacity: 0.30,
       wiltingPoint: 0.15,
       waterHoldingCapacity: 0.15,
       drainageRate: 0.3,
     },
     silt: {
       fieldCapacity: 0.35,
       wiltingPoint: 0.17,
       waterHoldingCapacity: 0.18,
       drainageRate: 0.25,
     },
   } as const;