/*
  ConversionChart Component
  -------------------------
  This component renders a Bar chart using react-chartjs-2 to display conversion KPIs
  for various combinations of agent personality and voice type.
  
  For demo purposes, static mock data is used to represent conversion rates for different agent configurations.
  
  Agent configurations include:
    - Empathetic - Friendly
    - Empathetic - Authoritative
    - Empathetic - Neutral
    - Professional - Friendly
    - Professional - Authoritative
    - Professional - Neutral
    - Direct - Friendly
    - Direct - Authoritative
    - Direct - Neutral
*/

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ConversionChart: React.FC = () => {
  // Static agent configurations
  const labels = [
    'Empathetic - Friendly',
    'Empathetic - Authoritative',
    'Empathetic - Neutral',
    'Professional - Friendly',
    'Professional - Authoritative',
    'Professional - Neutral',
    'Direct - Friendly',
    'Direct - Authoritative',
    'Direct - Neutral'
  ];
  
  // Static conversion data (mock percentages or counts)
  const conversionData = [15, 20, 18, 25, 30, 28, 12, 18, 15];

  // Chart data configuration
  const data = {
    labels,
    datasets: [
      {
        label: 'Conversion Rate',
        data: conversionData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Conversion Rates by Agent Configuration',
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px', padding: '20px' }}>
      <h2>Conversion Rates by Agent Configuration</h2>
      <p>This chart displays conversion KPIs based on different combinations of agent personality and voice type. The data shown is static mock data used for demonstration purposes.</p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ConversionChart;
