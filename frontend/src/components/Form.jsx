import React, { useState } from "react";

const Form = () => {

const [message,setMessage]= useState(" ");


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/coding/backend/form.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ FIXED: lowercase "headers"
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

       if(data.status === "success"){
        setMessage(`Thanks for submitting the form, ${formData.name}. ${data.message}!`);
         setFormData({ name: '', email: '', subject: '' });

       }   else {
        setMessage(data.message || 'Something went wrong');
      }

      console.log("Server response:", data);

   
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (<div>
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
     {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
    </div>
  );
};

export default Form;
