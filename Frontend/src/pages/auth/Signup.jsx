import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import api from "../../services/api.js";
import GoogleBtn from "../../components/GoogleBtn.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "guest",
    termsAccepted: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }

    if (!formData.termsAccepted) {
      return setErrorMessage("You must accept the terms");
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/signup", {
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userType: formData.userType,
      });

      if (res.data.success) {
        const { token, user } = res.data;

        // Store token in localStorage
        localStorage.setItem("token", token);

        // Set default Authorization header for future requests
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Dispatch login success
        dispatch(
          loginSuccess({
            id: user.id,
            name: `${user.name || formData.firstName}`,
            email: formData.email,
            role: user.role,
          })
        );

        navigate("/");
      } else {
        setErrorMessage(res.data.message || "Signup failed");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen items-center justify-center px-4 py-4"
      style={{
        backgroundColor: "var(--bg)",
        text: "var(--bg)",
      }}
    >
      <div className="w-96">
        <GoogleBtn userType="guest" />
        <div className="flex items-center justify-center my-4">
          <span className="px-2 text-sm text-gray-500">OR</span>
        </div>
      </div>

      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6 dark:border border">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-sm">Sign up to get started</p>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-semibold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold">User Type</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-1 py-2"
              >
                <option value="guest">Guest</option>
                <option value="host">Host</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label className="text-sm">
              I agree to the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg font-semibold transition disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={!formData.termsAccepted || loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-red-400 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
