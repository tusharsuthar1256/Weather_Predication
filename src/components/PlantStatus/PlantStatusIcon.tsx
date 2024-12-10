import { Droplets, Leaf, PlaneTakeoff, Sprout } from 'lucide-react';
import React from 'react';
// import { Plant, PlantOff, Droplets } from 'lucide-react';

interface PlantStatusIconProps {
  status: 'low' | 'optimal' | 'high';
}

export const PlantStatusIcon: React.FC<PlantStatusIconProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'low':
        return {
          icon: <Leaf size={64} />,
          color: 'text-red-500',
          message: 'Plant Stress - Needs Water',
        };
      case 'optimal':
        return {
          icon: <Sprout size={64} />,
          color: 'text-green-500',
          message: 'Healthy Plant Growth',
        };
      case 'high':
        return {
          icon: <Droplets size={64} />,
          color: 'text-yellow-500',
          message: 'Over-Watered',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex flex-col items-center">
      <div className={`${config.color} mb-2`}>
        {config.icon}
      </div>
      <p className={`${config.color} text-sm font-medium`}>
        {config.message}
      </p>
    </div>
  );
};