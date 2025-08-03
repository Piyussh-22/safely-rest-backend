/*
  🚧 Features to implement later:
  - Fetch host stats from backend (houses count, bookings, revenue)
  - Show recent bookings
  - Protect this page for hosts only
*/

import { useNavigate } from "react-router-dom";

export default function HostDashboard() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center mb-8 text-amber-600">
        Host Dashboard
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <button
          onClick={() => navigate("/host/add-house")}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transition"
        >
          ➕ Add New House
        </button>
        <button
          onClick={() => navigate("/host/host-house-list")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md transition"
        >
          📋 View My Houses
        </button>
      </div>

      {/* Future Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500 text-sm">Total Houses</h2>
          <p className="text-2xl font-bold text-amber-600">0</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500 text-sm">Total Bookings</h2>
          <p className="text-2xl font-bold text-amber-600">0</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-gray-500 text-sm">Revenue (₹)</h2>
          <p className="text-2xl font-bold text-amber-600">0</p>
        </div>
      </section>
    </main>
  );
}
