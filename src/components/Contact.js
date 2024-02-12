import React from "react";
import { useTheme } from "../context/ThemeContext"; // Assuming this is your theme context setup

const Contact = () => {
  const { theme } = useTheme(); // Using theme from context

  // Style based on theme context
  const formStyle =
    theme === "light"
      ? { backgroundColor: "#f8f8f8", color: "#000" }
      : { backgroundColor: "#333", color: "#fff" };

  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you might want to handle form submission, like sending data to an API
    // For Netlify forms, the submission is handled automatically when using 'data-netlify="true"'
    console.log(formData); // For demonstration purposes, log formData to the console
    alert("Form submitted! Check console for details.");
  };

  return (
    <section style={formStyle} id="contact">
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The following hidden inputs are for Netlify forms */}
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />

        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Contact;
