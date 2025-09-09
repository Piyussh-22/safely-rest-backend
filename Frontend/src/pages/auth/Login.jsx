import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { Eye, EyeOff } from "lucide-react";
import GoogleBtn from "../../components/GoogleBtn.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.success) {
        const { token, user } = res.data;

        // Store token in localStorage
        localStorage.setItem("token", token);

        // Set default Authorization header for future requests
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Dispatch login success with proper mapping
        dispatch(
          loginSuccess({
            id: user.id,
            name: user.name,
            email: email,
            role: user.role,
          })
        );

        navigate("/");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen "
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
      <div>
        <form
          onSubmit={handleLogin}
          className="p-6 shadow-md rounded-md w-96 border"
        >
          <h2 className="text-xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}

          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 w-full mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-1 text-sm font-medium">Password</label>
          <div className="relative mb-3">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              className="border p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleShowPass}
              className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-900"
            >
              {showPass ? <Eye /> : <EyeOff />}
            </button>
          </div>

          <p className="text-center text-sm m-4">
            Does not have an account?{" "}
            <a href="/signup" className="text-red-400 hover:underline">
              Sign Up
            </a>
          </p>

          <button
            type="submit"
            className={`bg-blue-600 text-white py-2 px-4 w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
