import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-indigo-100 via-sky-100 to-rose-100 pt-12 pb-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-700 text-sm">
        
        {/* Left: Brand */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold text-indigo-600">SanjYou🤖</h2>
          <p className="text-gray-500 mt-1">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="/about" className="hover:text-indigo-600 transition duration-300">About</a>
          <a href="/privacy" className="hover:text-indigo-600 transition duration-300">Privacy</a>
          <a href="/contact" className="hover:text-indigo-600 transition duration-300">Contact</a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition">
            <FaLinkedin size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
