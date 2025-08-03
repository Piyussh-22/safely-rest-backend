/*
  🚧 Features to implement later:
  - Fetch house details from API using ID (from URL params)
  - Show loading & error states
  - Add FavButton (toggle favourite)
  - Implement "Book Now" button functionality
  - Add responsive enhancements if needed
*/

import FavButton from "../../components/FavButton";

const dummyHouse = {
  name: "Cozy Hilltop Cabin",
  location: "Manali, Himachal Pradesh",
  price: 3500,
  rating: 4.6,
  description: `Escape to this peaceful cabin surrounded by pine trees.\n\nPerfect for a weekend getaway with friends or family.`,
  photoUrl:
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1050&q=80",
};

const HouseDetails = () => {
  const house = dummyHouse; // 🔁 Replace with fetched data later

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <section className="bg-white shadow-sm rounded-xl overflow-hidden">
        {/* Image */}
        <img
          src={house.photoUrl}
          alt={house.name}
          className="w-full h-64 sm:h-[350px] object-cover"
        />

        {/* Content */}
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-semibold text-gray-900">{house.name}</h1>

          <p className="text-lg text-blue-700">{house.location}</p>

          <div className="grid grid-cols-2 gap-4 pt-2 text-sm text-gray-700">
            <div>
              <span className="text-gray-500">Price</span>
              <br />₹{house.price} per night
            </div>
            <div>
              <span className="text-gray-500">Rating</span>
              <br />⭐ {house.rating}/5
            </div>
          </div>

          <div className="pt-4 border-t text-sm leading-relaxed text-gray-700 whitespace-pre-line">
            {house.description}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-6 border-t">
            <FavButton isFavourite={false} />
            <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition">
              Book Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HouseDetails;
