import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  FileText,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:8080/coding/backend/jobpost.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ Job posted successfully!");
        setFormData({
          title: "",
          description: "",
          location: "",
          type: "",
        });
      } else {
        alert(result.message || "❌ Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-3xl mx-auto mt-10 border border-gray-200">
      {/* Header with Illustration */}
      <div className="text-center mb-8">
        <img
          src="https://illustrations.popsy.co/gray/work-from-home.svg"
          alt="Post Job Illustration"
          className="w-44 mx-auto mb-4"
        />
        <h2 className="text-3xl font-extrabold text-blue-700 mb-2">
          🚀 Post a New Job
        </h2>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          Submit the job role details below and find your perfect candidate!
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Briefcase className="inline-block w-4 h-4 mr-2" />
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., UI/UX Designer"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FileText className="inline-block w-4 h-4 mr-2" />
            Job Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write key responsibilities, skills, and expectations..."
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline-block w-4 h-4 mr-2" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Kochi, Remote"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <div className="relative">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select job type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "⏳ Posting..." : "🚀 Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
