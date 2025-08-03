/*
  🚧 Features to implement later:
  - Fetch footer links dynamically (if needed)
  - Add real social media icons and links
  - Make links configurable from backend
*/

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        {/* Brand */}
        <div className="mb-4 md:mb-0 text-lg font-semibold">
          © {new Date().getFullYear()} Safely Rest
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
