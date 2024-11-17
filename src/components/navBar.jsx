import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="container mx-auto  bg-gray-900 text-white shadow-md fixed w-full z-10">
      <div className="w-full mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">BrandName</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-lg hover:text-green-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/qr-code"
            className="text-lg hover:text-green-400 transition duration-300"
          >
            QR Code Generator
          </Link>
          <Link
            to="/products"
            className="text-lg hover:text-green-400 transition duration-300"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-lg hover:text-green-400 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg hover:text-green-400 transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (visible when isMenuOpen is true) */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-gray-800 text-white py-4 px-6 space-y-4`}
      >
        <Link
          to="/"
          className="block text-lg hover:text-green-400 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="block text-lg hover:text-green-400 transition duration-300"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="block text-lg hover:text-green-400 transition duration-300"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="block text-lg hover:text-green-400 transition duration-300"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
