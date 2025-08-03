/*
  🚧 Features to implement later:
  - Fetch favourite houses from Redux or API
  - Make FavButton remove house from favourites
  - Handle "Book" button functionality
  - Add loading & error states
*/

import { Link } from "react-router-dom";
import FavButton from "../../components/FavButton";

const dummyFavouriteHouses = [
  {
    _id: "1",
    name: "Sunny Stay",
    location: "Ranchi",
    price: 2500,
    rating: 4.5,
    photoUrl: "https://via.placeholder.com/300x200",
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

const FavouriteList = ({ favouriteHouses = dummyFavouriteHouses }) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        My Favourite Houses
      </h1>

      {favouriteHouses.length === 0 ? (
        <p className="text-center text-gray-400">No favourites yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favouriteHouses.map((house) => (
            <div
              key={house._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* House Image */}
              <img
                src={house.photoUrl}
                alt={house.name}
                className="w-full h-48 object-cover"
              />

              {/* Price & Info */}
              <div className="flex justify-between p-4">
                <div>
                  <span className="text-lg font-semibold text-gray-800">
                    ₹{house.price}
                  </span>
                  <span className="block text-yellow-500">
                    ⭐ {house.rating}/5
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900">{house.name}</span>
                  <span className="block text-gray-600">
                    📍 {house.location}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="px-4 pb-4 flex items-center gap-2">
                <Link
                  to={`/houses/${house._id}`}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition text-center"
                >
                  View
                </Link>
                <div className="flex-shrink-0">
                  <FavButton isFavourite={true} />
                </div>
                <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition">
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

export default FavouriteList;
