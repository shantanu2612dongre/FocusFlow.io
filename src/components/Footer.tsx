import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white text-center py-8">
      <div className="container mx-auto px-4 max-w-screen-lg">
        <div className="flex flex-col items-center space-y-4">
        <h2>FocusFlow</h2>
          <div className="text-center">
            <p className="text-sm text-gray-400">Providing quality services since 2025.</p>
          </div>

          {/* Quick Links */}
          <nav className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 transition">Home</a>
            <a href="#" className="hover:text-gray-400 transition">About</a>
            <a href="#" className="hover:text-gray-400 transition">Services</a>
            <a href="#" className="hover:text-gray-400 transition">Contact</a>
          </nav>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-gray-400 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-400 transition">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;