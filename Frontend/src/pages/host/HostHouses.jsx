// HostHouses.jsx
import { useEffect, useState } from "react";

const HostHouses = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchHouses = async () => {
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token"); // JWT
      const res = await fetch("/api/host/host-house-list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setHouses(data.data);
      else setMessage(data.message || "Failed to fetch houses");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (houseId) => {
    if (!window.confirm("Are you sure you want to delete this house?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/host/delete-house/${houseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setHouses((prev) => prev.filter((h) => h._id !== houseId));
      } else {
        alert(data.message || "Failed to delete house");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (houses.length === 0)
    return <p className="text-center mt-4">You have no houses listed yet.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Houses</h2>
      {message && <p className="text-red-600 mb-2">{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {houses.map((house) => (
          <div
            key={house._id}
            className="border rounded shadow p-3 flex flex-col"
          >
            {house.photos && house.photos[0] && (
              <img
                src={house.photos[0]}
                alt={house.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <h3 className="font-semibold">{house.name}</h3>
            <p className="text-sm text-gray-600">{house.location}</p>
            <p className="mt-1 font-medium">₹{house.price}</p>
            <p className="text-sm mt-1">{house.description}</p>
            <div className="mt-3 flex gap-2">
              {/* Optional: you can add Edit functionality later */}
              <button
                onClick={() => handleDelete(house._id)}
                className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostHouses;
