import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, UserCheck, BellRing } from "lucide-react";
import hero from "../assets/hero.svg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-tr from-indigo-100 via-sky-100 to-rose-100 font-sans">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        
        {/* Text Section */}
        <div className="animate-fadeInUp text-center md:text-left">
          {/* Tagline */}
          <span className="text-sm font-semibold uppercase text-blue-600 tracking-wider mb-2 block">
            Crafted with Vision. Driven by Opportunity.
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
              Welcome to <span className="font-playfair italic">Jobora</span>
            </span>
            <span className="block">Your Career, Elevated.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-700 mb-10 max-w-md mx-auto md:mx-0">
            Discover curated jobs, apply instantly, and get real-time alerts — <span className="font-playfair">Jobora</span> is your modern gateway to a fulfilling career.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300">
                Get Started
              </button>
            </Link>
            <Link to="/jobs">
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl transition-all duration-300">
                Browse Jobs
              </button>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6 text-gray-600 text-sm justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <Briefcase size={20} className="text-blue-600" />
              Verified Opportunities
            </div>
            <div className="flex items-center gap-2">
              <UserCheck size={20} className="text-green-600" />
              One-Click Apply
            </div>
            <div className="flex items-center gap-2">
              <BellRing size={20} className="text-pink-600" />
              Smart Job Alerts
            </div>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="hidden md:block">
          <img
            src={hero}
            alt="Jobora Hero Illustration"
            className="w-full max-w-lg mx-auto animate-fadeInUp"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
