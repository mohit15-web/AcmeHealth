import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Layout from '../components/layout/Layout';

const SettingsPage = () => {
  return (
    <Layout>
         <main className="p-6 bg-gray-50 flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

          <div className="grid gap-6 max-w-3xl">
            {/* Personal Info Section */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Personal Info</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value="John Doe"
                    disabled
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value="john@example.com"
                    disabled
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                  />
                </div>
              </div>
            </section>

            {/* Notification Settings */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Notifications</h2>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span>Email updates about shipments</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Weekly weight progress summary</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Reminders for medication dosage</span>
                </label>
              </div>
            </section>

            {/* Password Change */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Change Password</h2>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full border rounded px-3 py-2"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Update Password
                </button>
              </div>
            </section>
          </div>
        </main>
    </Layout>
  );
};

export default SettingsPage;
