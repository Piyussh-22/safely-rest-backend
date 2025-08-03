import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "guest",
    termsAccepted: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }

    if (!formData.termsAccepted) {
      return setErrorMessage("You must accept the terms");
    }

    try {
      // ✅ Simulate API response for now
      const mockUser = {
        id: "456",
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        type: formData.userType, // "guest" or "host"
      };

      // ✅ Dispatch login after signup
      dispatch(loginSuccess(mockUser));

      navigate("/"); // Redirect to home page
    } catch (err) {
      setErrorMessage("Signup failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm">Sign up to get started</p>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name & Last Name */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              User Type
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="guest">Guest</option>
              <option value="host">Host</option>
            </select>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-red-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
