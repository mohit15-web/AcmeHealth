import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressPage = () => {
  const [weightEntries, setWeightEntries] = useState([
    { id: 1, date: '2025-01-01', weight: 198 },
    { id: 2, date: '2025-02-01', weight: 195 },
    { id: 3, date: '2025-03-01', weight: 190 },
    { id: 4, date: '2025-04-01', weight: 187 },
    { id: 5, date: '2025-05-01', weight: 183 },
    { id: 6, date: '2025-06-01', weight: 181 },
  ]);
  
  const [newEntry, setNewEntry] = useState({ date: '', weight: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeightEntries = async () => {
    try {
      const response = await axios.get('/api/weight');
      setWeightEntries(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load data');
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchWeightEntries();
  // }, []);

  const handleAddEntry = async () => {
    if (!newEntry.date || !newEntry.weight) return;
    try {
      const response = await axios.post('/api/weight', newEntry);
      setWeightEntries([...weightEntries, response.data]);
      setNewEntry({ date: '', weight: '' });
    } catch (err) {
      console.error('Add failed:', err);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await axios.delete(`/api/weight/${id}`);
      setWeightEntries(weightEntries.filter(entry => entry._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const chartData = Array.isArray(weightEntries)
  ? weightEntries.map(entry => ({
      date: formatDate(entry.date),
      weight: entry.weight
    }))
  : [];

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Weight Progress</h2>

        {/* Add New Entry */}
        <div className="mb-6 flex gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded w-full"
              value={newEntry.date}
              onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Weight (lbs)</label>
            <input
              type="number"
              className="border border-gray-300 p-2 rounded w-full"
              value={newEntry.weight}
              onChange={e => setNewEntry({ ...newEntry, weight: parseFloat(e.target.value) })}
            />
          </div>
          <button onClick={handleAddEntry} className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Entry
          </button>
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded shadow mb-6">
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

        {/* List of Entries */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium mb-3">Weight Entries</h3>
          <ul className="divide-y">
            {weightEntries?.map(entry => (
              <li key={entry._id} className="py-2 flex justify-between items-center">
                <span>{formatDate(entry.date)} — {entry.weight} lbs</span>
                <button
                  onClick={() => handleDeleteEntry(entry._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ProgressPage;
