import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WaterConsumptionChartProps {
  dailyWaterNeed: number;
  seasonalWaterNeed: number;
  waterEfficiency: number;
}

export const WaterConsumptionChart: React.FC<WaterConsumptionChartProps> = ({
  dailyWaterNeed,
  seasonalWaterNeed,
  waterEfficiency,
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Water Consumption Metrics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: ['Daily Need (m³)', 'Seasonal Need (m³/100)', 'Efficiency (m³/ha/10)'],
    datasets: [
      {
        label: 'Water Consumption',
        data: [dailyWaterNeed, seasonalWaterNeed/100, waterEfficiency/10],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};