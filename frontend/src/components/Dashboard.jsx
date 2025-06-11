import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:8080/coding/backend/get_submissions.php")
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching submissions:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = submissions.filter((sub) =>
      sub.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
    setCurrentPage(1);
  }, [search, submissions]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) return <p className="text-center mt-10 text-lg font-semibold text-gray-600">Loading submissions...</p>;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 sticky top-0 h-screen hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-8">📊 Dashboard</h2>
          <ul className="space-y-4 font-medium">
            <li><a href="#" className="hover:text-blue-600 transition"> Submissions</a></li>
            <li><a href="#" className="hover:text-blue-600 transition"> Settings</a></li>
            <li><a href="#" className="hover:text-blue-600 transition"> Logout</a></li>
          </ul>
        </div>
        <p className="text-sm text-gray-400 mt-8">&copy; 2025 sanjyou</p>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-semibold"> Contact Form Submissions</h2>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none w-full sm:w-64"
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white text-sm text-left border border-gray-200">
            <thead className="bg-blue-100 text-blue-700 uppercase text-xs font-semibold">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((sub) => (
                <tr key={sub.id} className="hover:bg-blue-50 transition">
                  <td className="p-3 border">{sub.id}</td>
                  <td className="p-3 border">{sub.name}</td>
                  <td className="p-3 border">{sub.email}</td>
                  <td className="p-3 border">{sub.message}</td>
                  <td className="p-3 border">{new Date(sub.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No submissions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md font-medium border transition ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-400 hover:bg-blue-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
