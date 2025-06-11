import React, { useState } from "react";
import Swal from "sweetalert2";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/coding/backend/form.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: `${response.status} - ${responseText}`,
        });
        return;
      }

      if (responseText.trim() === "") {
        Swal.fire({
          icon: "error",
          title: "Empty Response",
          text: "Server returned empty response",
        });
        return;
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);
        console.error("Response was:", responseText);
        Swal.fire({
          icon: "error",
          title: "Invalid JSON",
          text: "Server returned invalid JSON response",
        });
        return;
      }

      if (data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: `Hi ${formData.name}, your message has been received.`,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: data.message || "Something went wrong",
        });
      }
    } catch (err) {
      console.error("Network error:", err);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please check your internet connection and try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Contact Us</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
