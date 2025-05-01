import React from "react";
import Layout from "../components/layout/Layout";
import SummaryCard from "../components/dashboard/SummaryCard";
import WeightChart from "../components/dashboard/WeightChart";
import ShipmentTable from "../components/dashboard/ShipmentTable";
import {
  UserIcon,
  ChartBarIcon,
  PackageIcon,
  CalendarIcon,
} from "lucide-react";

const DashboardPage = () => {

  const data = {
    currentWeight: 181,
    weightLoss: 17,
    nextShipment: "2025-05-15",
    nextCheckIn: "2025-05-10",
    weightData: [
      { date: "2024-04-01", weight: 70 },
      { date: "2024-04-08", weight: 68 },
      { date: "2024-04-15", weight: 66 },
      { date: "2024-04-22", weight: 65 }
    ],
    shipments: [
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
    ],
  };

  return (
    <Layout>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Current Weight"
          value={`${data.currentWeight} lbs`}
          icon={<UserIcon />}
          iconBg="bg-blue-500"
          link="/progress"
          linkText="View details"
        />
        <SummaryCard
          title="Total Weight Loss"
          value={`${data.weightLoss} lbs`}
          icon={<ChartBarIcon />}
          iconBg="bg-green-500"
          link="/progress"
          linkText="View progress"
        />
        <SummaryCard
          title="Next Shipment"
          value={data.nextShipment}
          icon={<PackageIcon />}
          iconBg="bg-indigo-500"
          link="/shipments"
          linkText="View details"
        />
        <SummaryCard
          title="Next Check-In"
          value={data.nextCheckIn}
          icon={<CalendarIcon />}
          iconBg="bg-purple-500"
          link="/appointments"
          linkText="Schedule"
        />
      </div>

      {/* Weight Chart */}
      <div className="bg-white p-6 rounded-md shadow-md mb-8">
        <WeightChart data={data.weightData} />
      </div>

      {/* Recent Shipments */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <ShipmentTable shipments={data.shipments} />
      </div>
    </Layout>
  );
};

export default DashboardPage;
