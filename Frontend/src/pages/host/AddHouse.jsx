// AddHouse.jsx
import { useState } from "react";

const AddHouse = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 2) {
      alert("You can upload maximum 2 photos");
      return;
    }
    setFiles(selectedFiles);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !location || !description || files.length === 0) {
      alert("All fields and at least 1 photo are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("description", description);
    files.forEach((file) => formData.append("photos", file));

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // assuming you store JWT here
      const res = await fetch("/api/host/add-house", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setMessage("House added successfully!");
        // Reset form
        setName("");
        setPrice("");
        setLocation("");
        setDescription("");
        setFiles([]);
      } else {
        setMessage(data.message || "Failed to add house");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Add New House</h2>
      {message && (
        <div className="mb-4 text-center text-sm text-red-600">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="House Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Add House"}
        </button>
      </form>
      {files.length > 0 && (
        <div className="mt-2 text-sm">
          Selected files: {files.map((f) => f.name).join(", ")}
        </div>
      )}
    </div>
  );
};

export default AddHouse;
