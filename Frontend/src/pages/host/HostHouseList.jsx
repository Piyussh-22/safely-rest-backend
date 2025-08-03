/*
  🚧 Features to implement later:
  - Fetch host's registered houses from API or Redux
  - Implement delete functionality with API
  - Navigate to edit page with correct house data
*/

import { useNavigate } from "react-router-dom";

const dummyHostHouses = [
  {
    _id: "1",
    name: "Ocean View Villa",
    location: "Goa",
    price: 5000,
    rating: 4.8,
    photoUrl: "https://via.placeholder.com/300x200",
  },
  {
    _id: "2",
    name: "Hilltop Retreat",
    location: "Manali",
    price: 3500,
    rating: 4.6,
    photoUrl: "https://via.placeholder.com/300x200",
  },
];

export default function HostHouseList({
  registeredHouses = dummyHostHouses,
  onDelete,
}) {
  const navigate = useNavigate();

  if (!registeredHouses.length) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <p className="mb-4 text-lg">No houses listed yet.</p>
        <button
          onClick={() => navigate("/host/add-house")}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition"
        >
          Add Your First House
        </button>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-amber-600">
        Your Listed Houses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {registeredHouses.map((house) => (
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

            {/* Info Section */}
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
                <span className="block text-gray-600">📍 {house.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 pb-4 flex gap-2">
              <button
                onClick={() =>
                  navigate(`/host/edit-house/${house._id}?editing=true`)
                }
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete && onDelete(house._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
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
