import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = "http://localhost:8080/api/users/register";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    weight: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate(data) {
    const e = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!data.age || Number(data.age) <= 0) e.age = "Enter a valid age";
    if (!data.address.trim()) e.address = "Address is required";
    if (!data.weight || Number(data.weight) <= 0) e.weight = "Enter a valid weight";
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Enter a valid email";
    if (!data.password || data.password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        const userId = data.id;

        console.log("✅ Registered userId:", userId);

        localStorage.setItem("userId", userId);
        navigate("/login-user");

      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Server error:", error);
      alert("Server error");
    }
  }

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>User Registration</h2>
        {["name", "age", "address", "weight", "email", "password"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === "age" || field === "weight" ? "number" : field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={
                field === "name" ? "Enter your name" :
                  field === "age" ? "Enter your age" :
                    field === "address" ? "Enter your address" :
                      field === "weight" ? "Enter your weight" :
                        field === "email" ? "Enter your email" :
                          field === "password" ? "Enter a password" : ""
              }
            />
            {errors[field] && <p className="error">{errors[field]}</p>}
          </div>
        ))}
        <div className="button-group">
          <button type="submit">Register</button>
          <button type="button" onClick={() => navigate("/login-user")}>Login</button>
        </div>
      </form>
    </div>
  );
}
