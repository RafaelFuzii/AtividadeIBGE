import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
    useEffect(() => {
      }, [data]);
    
  if (!data) return null;

  return (
    <div className="mt-10">
      <Bar 
      data={data} 
      options={{
        responsive: true,
        scales: {
            y: {
                min: 0,
                ticks: {
                    beginAtZero: true,
                    display: true,
                    font: {
                        size: 14
                    }
                }
            }
        }
      }} 
      />
    </div>
  );
};

export default BarChart;
