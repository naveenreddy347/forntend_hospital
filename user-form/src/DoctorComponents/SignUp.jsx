import React, { useState } from "react";
import "../App.css";

export default function SignUp() {
  const [doctor, setDoctor] = useState({
    name: "",
    designation: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor)
      });

      if (response.ok) {
        alert("Doctor registered successfully!");
        setDoctor({ name: "", designation: "", password: "" });
      } else {
        const errorText = await response.text();
        alert(`Error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      alert(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="app-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Doctor Sign Up</h2>
        <div className="form-group">
          <label>Doctor Name</label>
          <input
            type="text"
            name="name"
            value={doctor.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={doctor.designation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={doctor.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
