import { useNavigate } from "react-router-dom";
import { useState } from "react";

// 🧠 Props:
// - registeredHouses: array of house objects (from API or context)
// - onDelete: (id) => handle delete logic (e.g. API call, state update)
export default function HostHouseList({ registeredHouses = [], onDelete }) {
  const navigate = useNavigate();

  if (!registeredHouses.length) {
    return (
      <div className="text-center text-gray-400 mt-10">
        No houses registered yet.
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-500">
        Host mere Dost 🙏
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {registeredHouses.map((house) => (
          <div
            key={house._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={house.photoUrl}
              alt="House"
              className="w-full h-48 object-cover"
            />

            <div className="flex justify-between p-4">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-800">
                  ₹{house.price}
                </span>
                <span className="text-yellow-500">⭐ {house.rating}/5</span>
              </div>

              <div className="flex flex-col text-right">
                <span className="font-bold text-gray-900">{house.name}</span>
                <span className="text-gray-600">📍 {house.location}</span>
              </div>
            </div>

            <div className="px-4 pb-4 flex flex-row gap-2">
              <button
                onClick={() =>
                  navigate(`/host/edit-house/${house._id}?editing=true`)
                }
                className="block bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded transition flex-1"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(house._id)}
                className="block bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded transition flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
