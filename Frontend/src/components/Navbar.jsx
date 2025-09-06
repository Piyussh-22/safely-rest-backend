// components/Navbar.jsx
import { useState } from "react";
import LogoutConfirm from "./LogoutConfirm";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav
        className="px-6 py-2 flex justify-between items-center bg-gray-200 dark:bg-gray-900 text-black dark:text-white
       shadow border-b"
      >
        <Link to="/" className="text-2xl font-bold text-red-400">
          Safely Rest
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/houses" className="hover:text-red-400">
            Houses
          </Link>
          {isAuthenticated && user?.type === "host" && (
            <Link to="/host/dashboard" className="hover:text-red-400">
              Host Dashboard
            </Link>
          )}
          {!isAuthenticated ? (
            <>
              <Link to="/signup" className="hover:text-red-400">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="font-medium">Hello, {user?.name}</span>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
          {/* Switch dark/light mode */}
          <ThemeToggle />
        </div>
      </nav>

      {/* Logout Modal */}
      <LogoutConfirm
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;
