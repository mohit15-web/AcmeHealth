import React from 'react';
import { Link } from 'react-router-dom';

const ShipmentTable = ({ shipments }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Recent Shipments</h2>
        <Link to="/shipments" className="text-sm text-blue-600 hover:underline">
          View all shipments →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-600">ID</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Date</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Medication</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shipments?.map((shipment) => (
              <tr key={shipment.id}>
                <td className="px-4 py-2">{shipment.id}</td>
                <td className="px-4 py-2">{new Date(shipment.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      shipment.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {shipment.status}
                  </span>
                </td>
                <td className="px-4 py-2">{shipment.medication} ({shipment.dosage})</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/shipments/${shipment.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentTable;
