import React, { useState } from "react";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

//const RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY";  // Replace with your site key//const RECAPTCHA_SITE_KEY = "6Ld7kVgrAAAAAKyAtPISXMuwTy2w8IgRxkTtVihl";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      Swal.fire({
        icon: "warning",
        title: "Please verify you're not a robot",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/coding/backend/form.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
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
        setRecaptchaToken(null);
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
            required
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
            required
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

     <ReCAPTCHA
  sitekey={RECAPTCHA_SITE_KEY}
  onChange={handleRecaptchaChange}
/>


        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
