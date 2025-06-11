import { useState } from "react";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://yourserver.com/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.status === "success") {
      window.location.href = "/login";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="user">Candidate</option>
        <option value="admin">Admin</option>
      </select>
      <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Register
      </button>
      {message && <p className="mt-2 text-center text-red-500">{message}</p>}
    </form>
  );
}
