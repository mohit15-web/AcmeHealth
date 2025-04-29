import React from 'react';


const shipments = [
    {
      id: "SHP001",
      date: "2025-04-15",
      status: "Delivered",
      medication: "Semaglutide",
      dosage: "0.5mg",
      tracking: "USPS12345678",
    },
    {
      id: "SHP002",
      date: "2025-05-15",
      status: "Processing",
      medication: "Semaglutide",
      dosage: "0.5mg",
      tracking: "Pending",
    },
  ];

  
const ShipmentsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Your Shipments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Medication</th>
              <th className="py-3 px-4 text-left">Dosage</th>
              <th className="py-3 px-4 text-left">Tracking</th>
            </tr>
          </thead>
          <tbody>
            {shipments?.map((shipment) => (
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
                    <a href={`https://track.com/${shipment.tracking}`} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                      {shipment.tracking}
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentsPage;
