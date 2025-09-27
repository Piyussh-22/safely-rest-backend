import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { useDispatch } from "react-redux";
import { createHouse } from "../../redux/housesSlice";

const AddHouse = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    price: "",
    location: "",
    description: "",
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);

    for (let file of selected) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage(`File "${file.name}" is too large. Max size 2MB.`);
        return;
      }
    }

    const duplicates = selected.filter((file) =>
      files.some((f) => f.name === file.name && f.size === file.size)
    );

    if (duplicates.length > 0) {
      setMessage(
        "Duplicate image not allowed. Please select a different file."
      );
      return;
    }

    const newFiles = [...files, ...selected];

    if (newFiles.length > 2) {
      setMessage("You can upload a maximum of 2 photos.");
      return;
    }

    setFiles(newFiles);
    setMessage("");
  };

  const handleRemoveFile = (index) => {
    URL.revokeObjectURL(files[index]);
    setFiles(files.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (
      !form.name ||
      !form.price ||
      !form.location ||
      !form.description ||
      files.length === 0
    ) {
      setMessage("All fields and at least 1 photo are required.");
      return;
    }

    if (Number(form.price) <= 0) {
      setMessage("Price must be greater than 0.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    files.forEach((file) => formData.append("photos", file));

    try {
      setLoading(true);
      await dispatch(createHouse(formData)).unwrap();
      setMessage("House added successfully.");
      setForm({ name: "", price: "", location: "", description: "" });
      files.forEach((file) => URL.revokeObjectURL(file));
      setFiles([]);
    } catch (err) {
      setMessage(`Failed to add house: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-lg mx-auto p-6 shadow-xl rounded-2xl border"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        borderColor: "var(--text)",
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add New House</h2>
      {message && (
        <div
          className={`mb-4 text-center font-medium ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="House Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-[var(--bg)] text-[var(--text)] border-[var(--text)]"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          min="1"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-[var(--bg)] text-[var(--text)] border-[var(--text)]"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-[var(--bg)] text-[var(--text)] border-[var(--text)]"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-[var(--bg)] text-[var(--text)] border-[var(--text)]"
        />
        <label className="flex flex-col items-center justify-center w-full h-16 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <Upload className="w-8 h-8 text-gray-500 mb-2" />
          <span className="text-sm text-gray-500">Click to upload (max 2)</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              handleFileChange(e);
              e.target.value = null;
            }}
            className="hidden"
          />
        </label>
        {files.length > 0 && (
          <div className="flex gap-3 mt-2 flex-wrap justify-center">
            {files.map((file, idx) => (
              <div key={idx} className="relative inline-block">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-lg border hover:scale-105 transition"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          type="submit"
          disabled={loading || files.length === 0}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Please Wait Uploading... " : "Add House"}
        </button>
      </form>
    </div>
  );
};

export default AddHouse;
