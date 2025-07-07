import React, { useEffect, useState } from "react";
import { MapPin, Clock, Building2, X } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume_url: ""
  });

  const API_URL = "http://localhost:8080/coding/backend/jobpost.php";
  const APPLY_URL = "http://localhost:8080/coding/backend/apply.php";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (Array.isArray(data)) setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    setCurrentJobId(jobId);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      job_id: currentJobId
    };

    try {
      const res = await fetch(APPLY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (result.status === "success") {
        alert("✅ Application submitted!");
        setShowModal(false);
        setFormData({ name: "", email: "", phone: "", resume_url: "" });
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (err) {
      alert("❌ Network Error!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">💼 Job Listings</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-white shadow rounded-xl border"
            >
              <h2 className="text-xl font-bold">{job.title}</h2>
              <div className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                <Building2 size={16} />
                <span>{job.type}</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Clock size={16} />
                <span>Posted recently</span>
              </div>
              <p className="text-gray-700 text-sm mt-2">
                {job.description.length > 150
                  ? job.description.slice(0, 150) + "..."
                  : job.description}
              </p>
              <button
                onClick={() => handleApply(job.id)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>
            <h3 className="text-xl font-bold text-center mb-4">📝 Apply for Job</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="resume_url"
                placeholder="Resume Link (e.g. Google Drive)"
                value={formData.resume_url}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
