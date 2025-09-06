/*
  🚧 Features to implement later:
  - Fetch house list from backend (API call)
  - Handle "View" button click → navigate to HouseDetail page
  - Make FavButton functional (toggle favourite)
  - Implement "Book" button functionality
  - Add loading & error states
*/

import FavButton from "../../components/FavButton";

const dummyHouses = [
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

const HouseList = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 ">Available Houses</h1>

      {dummyHouses.length === 0 ? (
        <p className="text-center text-gray-400">No houses registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyHouses.map((house) => (
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

              {/* Price & Name */}
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
                <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition">
                  View
                </button>
                <div className="flex flex-1 justify-center items-center ">
                  <FavButton isFavourite={false} />
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

export default HouseList;
