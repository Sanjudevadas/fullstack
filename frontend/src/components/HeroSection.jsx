import React from "react";

const HeroSection = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center text-center px-6 py-20
                 bg-gradient-to-tr from-indigo-100 via-sky-100 to-rose-100"
    >
      <div className="max-w-3xl mx-auto animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-rose-500">
            Shape Your Career,
          </span>
          <span className="block">Track Every Opportunity.</span>
        </h1>

        <p className="text-lg text-gray-700 mb-10">
          Smart tools to organize your job search, boost your career, and never miss an opportunity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300">
            Get Started
          </button>
          <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold px-8 py-3 rounded-lg transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
