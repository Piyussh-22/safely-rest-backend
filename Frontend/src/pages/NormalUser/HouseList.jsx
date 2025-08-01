// HouseList.jsx

/**
 * ✅ UI Completed for listing registered houses.
 * 🔜 Functionality to implement later:
 * 1. Fetch registered houses from backend (API call)
 * 2. Handle "View" button click to route to house detail page
 * 3. Make <FavouriteButton /> functional (toggle fav, etc.)
 * 4. Implement "Book" button functionality
 * 5. Add loading/error states if needed
 */

import React from "react";
import FavButton from "../../components/FavButton"; // UI only

const dummyHouses = [
  {
    _id: "1",
    name: "Sunny Stay",
    location: "Ranchi",
    price: 2500,
    rating: 4.5,
    photoUrl: "https://via.placeholder.com/300x200", // Placeholder image
  },
  {
    _id: "2",
    name: "Cozy Nest",
    location: "Delhi",
    price: 3200,
    rating: 4.2,
    photoUrl: "https://via.placeholder.com/300x200",
  },
];

const HouseList = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-500">
        Available Houses
      </h1>

      {dummyHouses.length === 0 ? (
        <p className="text-center text-gray-400">No houses registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyHouses.map((house) => (
            <div
              key={house._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* House Image */}
              <img
                src={house.photoUrl}
                alt="House"
                className="w-full h-48 object-cover"
              />

              {/* Price/Rating + Name/Location */}
              <div className="flex justify-between p-4">
                {/* Left: Price & Rating */}
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-800">
                    ₹{house.price}
                  </span>
                  <span className="text-yellow-500">⭐ {house.rating}/5</span>
                </div>

                {/* Right: Name & Location */}
                <div className="flex flex-col text-right">
                  <span className="font-bold text-gray-900">{house.name}</span>
                  <span className="text-gray-600">📍 {house.location}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="px-4 pb-4 flex flex-row gap-2">
                <button className="block bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded transition flex-1">
                  View
                </button>
                <FavButton isFavPage={false} />
                <button className="block bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded transition flex-1">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default HouseList;
