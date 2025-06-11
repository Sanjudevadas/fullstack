import { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://yourserver.com/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.status === "success") {
      localStorage.setItem("user", JSON.stringify(data.user));
      // Redirect based on role
      if (data.user.role === "admin") {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/user-dashboard";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
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
      <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Login
      </button>
      {message && <p className="mt-2 text-center text-red-500">{message}</p>}
    </form>
  );
}
