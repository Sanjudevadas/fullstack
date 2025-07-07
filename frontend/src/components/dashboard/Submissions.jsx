import React, { useEffect, useState } from "react";

const Submissions = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch("http://localhost:8080/coding/backend/get_applications.php");
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      alert("❌ Failed to load applications.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch("http://localhost:8080/coding/backend/update_status.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      const result = await res.json();

      if (result.status === "success") {
        alert(`✅ Application ${status} and email sent`);
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, status } : app
          )
        );
      } else {
        alert("❌ " + result.message);
      }
    } catch (error) {
      alert("❌ Error updating status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-gray-600 mt-2">Loading applications...</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No applications found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {applications.map((app) => (
        <div
          key={app.id}
          className="bg-white border rounded-xl p-5 shadow-md hover:shadow-lg transition cursor-default"
        >
          <div className="mb-2">
            <strong>Name:</strong> {app.name}
          </div>
          <div className="mb-2">
            <strong>Email:</strong> {app.email}
          </div>
          <div className="mb-2">
            <strong>Phone:</strong> {app.phone}
          </div>
          <div className="mb-2">
            <strong>Resume:</strong>{" "}
            <a
              href={app.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
            >
              View Resume
            </a>
          </div>
          <div className="mb-4">
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-white text-sm ${
                app.status === "pending"
                  ? "bg-yellow-500"
                  : app.status === "accepted"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {app.status}
            </span>
          </div>

          {app.status === "pending" && (
            <div className="flex gap-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
                onClick={() => updateStatus(app.id, "accepted")}
                title="Mark as Accepted and send mail"
              >
                ✅ Accept
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer"
                onClick={() => updateStatus(app.id, "rejected")}
                title="Reject applicant and send mail"
              >
                ❌ Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Submissions;
