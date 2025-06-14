import React from "react";
import { Briefcase, UserCheck, BellRing } from "lucide-react";
import { FaFeatherAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-10 pt-12 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-700 text-sm border border-white/50">

          {/* Left: Logo & Brand */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <FaFeatherAlt className="text-2xl text-indigo-700 drop-shadow-md" />
              <span className="text-xl font-[Playfair Display] font-semibold tracking-wide text-gray-800">
                Jobora
              </span>
            </div>
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} SanjYou • All rights reserved.
            </p>
          </div>

          {/* Center: Feature Icons (Hero-style) */}
          <div className="flex flex-col sm:flex-row gap-6 text-gray-600 text-sm text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Briefcase size={20} className="text-blue-600" />
              Verified Jobs
            </div>
            <div className="flex items-center gap-2">
              <UserCheck size={20} className="text-green-600" />
              Easy Apply
            </div>
            <div className="flex items-center gap-2">
              <BellRing size={20} className="text-pink-600" />
              Job Alerts
            </div>
          </div>

          {/* Right: Nav Links */}
          <div className="flex space-x-6 text-sm font-medium">
            <a href="/about" className="hover:text-blue-600 transition duration-300">
              About
            </a>
            <a href="/privacy" className="hover:text-blue-600 transition duration-300">
              Privacy
            </a>
            <a href="/contact" className="hover:text-blue-600 transition duration-300">
              Contact
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
