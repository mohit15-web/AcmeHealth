import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progressData, setProgressData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get('/api/progress');
        setProgressData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching progress data:', err);
        setError('Failed to load progress data');
        setIsLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  if (isLoading) {
    return (
      <div title="Weight Progress">
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div title="Weight Progress">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  const data =  {
    startWeight: 198,
    currentWeight: 181,
    startDate: '2025-01-01',
    currentDate: '2025-06-01',
    totalLoss: 17,
    percentageLoss: 8.6,
    startBMI: 30.2,
    currentBMI: 27.6,
    weightHistory: [
      { date: '2025-01-01', weight: 198 },
      { date: '2025-02-01', weight: 195 },
      { date: '2025-03-01', weight: 190 },
      { date: '2025-04-01', weight: 187 },
      { date: '2025-05-01', weight: 183 },
      { date: '2025-06-01', weight: 181 },
    ]
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const chartData = data.weightHistory.map(entry => ({
    date: formatDate(entry.date),
    weight: entry.weight
  }));

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <div title="Weight Progress">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-gray-700 font-semibold text-lg mb-2">Weight Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-gray-700 font-semibold text-lg mb-4">Summary</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><strong>Start Weight:</strong> {data.startWeight} lbs</li>
            <li><strong>Current Weight:</strong> {data.currentWeight} lbs</li>
            <li><strong>Total Lost:</strong> {data.totalLoss} lbs ({data.percentageLoss}%)</li>
            <li><strong>Start BMI:</strong> {data.startBMI} ({getBmiCategory(data.startBMI)})</li>
            <li><strong>Current BMI:</strong> {data.currentBMI} ({getBmiCategory(data.currentBMI)})</li>
            <li><strong>Period:</strong> {formatDate(data.startDate)} to {formatDate(data.currentDate)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
