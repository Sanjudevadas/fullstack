import React, { useState } from "react";
import {
  Briefcase, MapPin, FileText, ChevronDown
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.status === "success") {
        alert("✅ Job posted successfully!");
        setFormData({
          title: "",
          description: "",
          location: "",
          type: "",
        });
      } else {
        alert(result.message || "❌ Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Could not connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-10">
      <div className="text-center mb-8">
        <img
          src="https://illustrations.popsy.co/gray/work-from-home.svg"
          alt="Post Job Illustration"
          className="w-44 mx-auto mb-4"
        />
        <h2 className="text-3xl font-bold text-blue-700">🚀 Post a Job</h2>
        <p className="text-gray-600">Fill in job details below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-1">
            <Briefcase className="inline w-4 h-4 mr-2" /> Job Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="e.g. UI/UX Designer"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">
            <FileText className="inline w-4 h-4 mr-2" /> Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            rows="4"
            placeholder="Key responsibilities, skills, etc."
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">
            <MapPin className="inline w-4 h-4 mr-2" /> Location
          </label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="e.g. Kochi, Remote"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Job Type</label>
          <div className="relative">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg appearance-none"
              required
            >
              <option value="">Select Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
            <ChevronDown className="absolute top-3 right-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {isSubmitting ? "⏳ Posting..." : "🚀 Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
