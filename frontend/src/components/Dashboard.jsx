import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/coding/backend/get_submissions.php")
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching submissions:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading submissions...</p>;

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <ul>
          <li><a href="#">Submissions</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </div>

      <div>
        <h2>Contact Form Submissions</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th> {/* Added missing column heading for ID */}
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td>{sub.name}</td>
                <td>{sub.email}</td>
                <td>{sub.message}</td>
                <td>{new Date(sub.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
