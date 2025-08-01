// src/components/Navbar.jsx

/*
  🚧 Functionality to add later (Backend Integration):
  - Get `isLoggedIn` and `user` from Redux store (currently hardcoded)
  - Replace <form method="POST"> logout with real handleLogout()
  - On login: set Redux isLoggedIn + user
  - Route protection based on user.type (guest/host)
*/

import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux"; ❌ not needed for now

const Navbar = () => {
  const location = useLocation();

  // TEMP: Hardcoded user for UI development
  const isLoggedIn = true; // set to false to see login link
  const user = { type: "guest" }; // change to "host" to see host links

  const isActive = (path) =>
    location.pathname === path ? "bg-red-400" : "hover:bg-red-400";

  return (
    <header className="bg-red-500 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-2 py-2">
        <Link
          to="/"
          className={`${isActive(
            "/"
          )} px-2 py-2 rounded transition font-bold text-xl flex flex-row justify-center items-center gap-2`}
          title="Index Page"
        >
          <img
            src="../../public/logo.png"
            alt="App Logo"
            className="h-10 w-auto rounded-md"
          />
          <span>Safely Rest</span>
        </Link>

        {isLoggedIn && user?.type === "guest" && (
          <>
            <Link
              to="/house-list"
              className={`${isActive(
                "/house-list"
              )} px-2 py-2 rounded transition font-bold text-xl`}
              title="House List"
            >
              Houses
            </Link>
            <Link
              to="/favourite-list"
              className={`${isActive(
                "/favourite-list"
              )} px-2 py-2 rounded transition font-bold text-xl`}
              title="Favourite List"
            >
              Favourite
            </Link>
          </>
        )}

        {isLoggedIn && user?.type === "host" && (
          <>
            <Link
              to="/host/host-house-list"
              className={`${isActive(
                "/host/host-house-list"
              )} px-2 py-2 rounded transition font-bold text-xl`}
              title="Host House List"
            >
              Host
            </Link>
            <Link
              to="/host/add-house"
              className={`${isActive(
                "/host/add-house"
              )} px-2 py-2 rounded transition font-bold text-xl`}
              title="Add/Edit House"
            >
              Add House
            </Link>
          </>
        )}

        {isLoggedIn ? (
          <button
            className={`${isActive(
              "/logout"
            )} px-2 py-2 rounded transition font-bold text-xl`}
            title="Click to Logout"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className={`${isActive(
              "/login"
            )} px-2 py-2 rounded transition font-bold text-xl`}
            title="LogIn Page"
          >
            Log In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
