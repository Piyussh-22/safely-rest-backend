// FavouriteList.jsx
// ✅ Functionality:
// - Show list of favourited houses
// - If empty: show placeholder message
// - Each card shows: image, price, rating, name, location
// - Action buttons: View, Remove Favourite (FavButton), Book

import React from "react";
import FavButton from "../../components/FavButton"; // Update path if needed
import { Link } from "react-router-dom";

const FavouriteList = ({ favouriteHouses }) => {
  if (!favouriteHouses || favouriteHouses.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-500">
          My Favourite Houses
        </h1>
        <p className="text-center text-gray-400">No favourite yet!</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-500">
        My Favourite Houses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favouriteHouses.map((house) => (
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

            {/* Buttons */}
            <div className="px-4 pb-4 flex flex-row gap-2">
              <Link
                to={`/houses/${house._id}`}
                className="block bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded transition flex-1"
              >
                View
              </Link>

              <FavButton house={house} isFavPage={true} className="flex-1" />

              <button className="block bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded transition flex-1">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default FavouriteList;
