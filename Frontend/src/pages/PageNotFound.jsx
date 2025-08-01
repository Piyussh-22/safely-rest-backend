// pages/NorUser/ErrorPage.jsx

import { Link, useLocation } from "react-router-dom";

/**
 * ❗ ErrorPage Component
 * Shows a simple 404 error message for unknown routes.
 * Can be used inside a <Routes> block with a wildcard path: <Route path="*" element={<ErrorPage />} />
 */

export default function ErrorPage() {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-10 px-4 text-center">
      <p className="text-gray-800 text-lg">
        You tried to access:{" "}
        <span className="font-semibold text-blue-600">{location.pathname}</span>
      </p>
      <span className="text-red-600 text-6xl font-bold">404</span>
      <span className="text-red-600 text-4xl">Page Not Found</span>
      <Link
        to="/"
        className="bg-green-800 hover:bg-green-400 py-2 px-6 rounded transition duration-300 text-white hover:text-black text-xl"
      >
        Go to Home
      </Link>
    </div>
  );
}
