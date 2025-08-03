/*
  🚧 Features to implement later:
  - Accept `house` prop for edit mode (null means add mode)
  - Accept `onSubmit` prop to handle form submission (API or Redux)
  - Add validation & error handling
  - Integrate with backend to create/update house
*/

import { useState } from "react";

const AddOrEditHouse = ({ house = null, onSubmit }) => {
  const editing = !!house;

  const [formData, setFormData] = useState({
    name: house?.name || "",
    location: house?.location || "",
    price: house?.price || "",
    rating: house?.rating || "",
    photoUrl: house?.photoUrl || "",
    description: house?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    // 🔁 Will integrate API or Redux later
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-amber-600">
          {editing ? "Edit House Details" : "List Your House"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* House Name */}
          <div>
            <label className="block mb-1 font-medium">House Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g. Ocean View Villa"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g. Goa, India"
            />
          </div>

          {/* Price & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Rating (1–5)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              type="url"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              required
              placeholder="https://image-link.com"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Write about the house..."
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition"
            >
              {editing ? "Update House" : "Add House"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddOrEditHouse;
