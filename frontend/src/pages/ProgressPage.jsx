import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";

// Dummy data
const dummyEntries = [
  { _id: "d1", date: "2024-04-01", weight: 160 },
  { _id: "d2", date: "2024-04-08", weight: 158 },
  { _id: "d3", date: "2024-04-15", weight: 157 },
  { _id: "d4", date: "2024-04-22", weight: 156 },
];

const ProgressPage = () => {
  const [weightEntries, setWeightEntries] = useState(dummyEntries);
  const [newEntry, setNewEntry] = useState({ date: "", weight: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDummy, setIsDummy] = useState(true);

  const fetchWeightEntries = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/weight/history`
      );
      // Combine dummy with real entries
      setWeightEntries((prev) =>
        isDummy ? [...prev, ...response.data.entries] : response.data.entries
      );
      toast.success("Weight Data loaded successfully");
    } catch (err) {
      toast.error("Failed to load data");
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeightEntries();
  }, []);

  const handleAddEntry = async () => {
    if (!newEntry.date || !newEntry.weight) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/weight/add`,
        newEntry
      );
      setWeightEntries((prev) => {
        const filtered = isDummy ? [] : prev;
        return [...filtered, response.data.entry];
      });
      setIsDummy(false);
      setNewEntry({ date: "", weight: "" });
      toast.success("Weight Entry added successfully");
    } catch (err) {
      setError("Failed to add entry");
      console.error("Add failed:", err);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/weight/delete/${id}`
      );
      setWeightEntries(weightEntries.filter((entry) => entry._id !== id));
      toast.success("Weight Entry deleted successfully");
    } catch (err) {
      toast.error("Failed to delete entry");
      setError("Failed to delete entry");
      console.error("Delete failed:", err);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const chartData = Array.isArray(weightEntries)
    ? weightEntries.map((entry) => ({
        date: formatDate(entry.date),
        weight: entry.weight,
      }))
    : [];

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Weight Progress
        </h2>

        {/* Loading and Error States */}
        {isLoading ? (
          <p className="text-gray-600 mb-4">Loading weight entries...</p>
        ) : error ? (
          <p className="text-red-500 mb-4">{error}</p>
        ) : null}

        {/* Add New Entry */}
        <div className="mb-6 flex gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded w-full"
              value={newEntry.date}
              onChange={(e) =>
                setNewEntry({ ...newEntry, date: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Weight (lbs)
            </label>
            <input
              type="number"
              className="border border-gray-300 p-2 rounded w-full"
              value={newEntry.weight}
              onChange={(e) =>
                setNewEntry({ ...newEntry, weight: parseFloat(e.target.value) })
              }
            />
          </div>
          <button
            onClick={handleAddEntry}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Entry
          </button>
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* List of Entries */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium mb-3">Weight Entries</h3>
          <ul className="divide-y">
            {weightEntries.map((entry) => (
              <li
                key={entry._id}
                className="py-2 flex justify-between items-center"
              >
                <span>
                  {formatDate(entry.date)} — {entry.weight} lbs
                </span>
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
