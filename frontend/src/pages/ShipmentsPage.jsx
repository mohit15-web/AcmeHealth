import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Layout from '../components/layout/Layout';

const shipments = [
  {
    id: "SHP002",
    date: "2025-05-15",
    status: "Processing",
    medication: "Semaglutide",
    dosage: "0.5mg",
    tracking: "Delivered",
  },
  {
    id: "SHP110",
    date: "2025-04-15",
    status: "Delivered",
    medication: "Semaglutide",
    dosage: "0.5mg",
    tracking: "USPS12345678",
  },
  {
    id: "SHP003",
    date: "2025-05-15",
    status: "Processing",
    medication: "Semaglutide",
    dosage: "0.5mg",
    tracking: "Pending",
  },
  {
    id: "SHP100",
    date: "2025-05-15",
    status: "Processing",
    medication: "Semaglutide",
    dosage: "0.5mg",
    tracking: "Delivered",
  },
];

const ShipmentsPage = () => {
  return (
  <Layout>
        <main className="p-6 bg-gray-50 flex-1">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Shipments</h1>
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Medication</th>
                  <th className="py-3 px-4 text-left">Dosage</th>
                  <th className="py-3 px-4 text-left">Tracking</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{shipment.id}</td>
                    <td className="py-3 px-4">{shipment.date}</td>
                    <td className="py-3 px-4">{shipment.status}</td>
                    <td className="py-3 px-4">{shipment.medication}</td>
                    <td className="py-3 px-4">{shipment.dosage}</td>
                    <td className="py-3 px-4">
                      {shipment.tracking === 'Pending' ? (
                        <span className="text-yellow-600">Pending</span>
                      ) : (
                        <a
                          href={`https://track.com/${shipment.tracking}`}
                          className="text-blue-600 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {shipment.tracking}
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        </Layout>
  );
};

export default ShipmentsPage;
