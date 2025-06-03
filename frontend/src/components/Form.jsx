import React, { useState } from "react";

const Form = () => {
  const [messages, setMessages] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "", // Back to "message" to match database
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
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

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers.get('content-type'));

      // Get the raw response text
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        setMessages(`Server error: ${response.status} - ${responseText}`);
        return;
      }

      // Only try to parse JSON if we have content
      if (responseText.trim() === '') {
        setMessages("Server returned empty response");
        return;
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);
        console.error("Response was:", responseText);
        setMessages("Server returned invalid JSON response");
        return;
      }

      if (data.status === "success") {
        setMessages(`Thanks for submitting the form, ${formData.name}. ${data.message}!`);
        setFormData({ name: '', email: '', message: '' }); // Back to "message"
      } else {
        setMessages(data.message || 'Something went wrong'); // Fixed: changed "messages" to "message"
      }

    } catch (err) {
      console.error("Error submitting form:", err);
      setMessages('Network error. Please try again.'); // Fixed: changed "setMessage" to "setMessages"
    }
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            placeholder="Enter Message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      {messages && <p style={{ marginTop: '10px', color: 'green' }}>{messages}</p>} {/* Fixed: changed "message" to "messages" */}
    </div>
  );
};

export default Form;