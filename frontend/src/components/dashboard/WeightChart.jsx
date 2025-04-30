import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const WeightChart = ({ data }) => {
  
  return (
    <div className="bg-white p-5 rounded-lg shadow w-full h-80">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Weight Progress</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[dataMin => dataMin - 5, dataMax => dataMax + 5]} />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;
