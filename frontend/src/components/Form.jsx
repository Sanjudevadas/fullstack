import React from "react";
import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    setFormData({
      name: "",
      email: "",
      subject: "",
    });
  };

  return (
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
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          placeholder="Enter subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
