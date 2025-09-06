import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../../axios.js";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const user = res.data.user;

      dispatch(
        loginSuccess({
          id: user.id,
          email: user.email,
          role: user.userType, // for role-based routing later
          ...user,
        })
      );

      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => {
    setShowPass(!showPass);
  };
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundColor: "var(--bg)",
        text: "var(--bg)",
      }}
    >
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
            className="border p-2 w-full "
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
          Does not have an account ?{" "}
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
  );
};

export default Login;
