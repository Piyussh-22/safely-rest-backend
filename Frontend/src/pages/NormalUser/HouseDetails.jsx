// HouseDetails.jsx

// 🛠️ FUNCTIONALITY TO ADD LATER:
// 1. Fetch house details from API using house ID from URL
// 2. Show loading and error states
// 3. Add "Favourite" button toggle
// 4. Add "Book Now" button or availability calendar (optional)
// 5. Responsive enhancements if needed

import React from "react";

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
          <h1 className="text-3xl font-medium tracking-tight text-[#111]">
            {house.name}
          </h1>

          <p className="text-base text-gray-600">{house.location}</p>

          <div className="grid grid-cols-2 gap-4 pt-2 text-sm text-gray-700">
            <div>
              <span className="text-gray-500">Price</span>
              <br />₹{house.price} per night
            </div>
            <div>
              <span className="text-gray-500">Rating</span>
              <br />
              {house.rating}/5
            </div>
          </div>

          <div className="pt-4 border-t text-sm leading-relaxed text-gray-700 whitespace-pre-line">
            {house.description}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HouseDetails;
