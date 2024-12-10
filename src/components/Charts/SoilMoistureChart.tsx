import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SoilMoistureChartProps {
  currentMoisture: number;
  optimalRange: { min: number; max: number };
}

export const SoilMoistureChart: React.FC<SoilMoistureChartProps> = ({
  currentMoisture,
  optimalRange,
}) => {
  // Set default values for optimalRange if it's undefined
  const min = optimalRange?.min ?? 0;
  const max = optimalRange?.max ?? 100;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Soil Moisture Level',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: (value: number) => `${value}%`,
        },
      },
    },
  };

  const labels = ['Min', 'Current', 'Max'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Moisture Level',
        data: [min, currentMoisture, max],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return <Line options={options} data={data} />;
};
