import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function DoctorLogin() {
  const [credentials, setCredentials] = useState({ name: "", password: "" });
  const [loginStatus, setLoginStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:8080/api/doctors");
      if (!response.ok) throw new Error("Failed to fetch doctors");

      const doctors = await response.json();
      const found = doctors.find(
        (doc) =>
          doc.name === credentials.name &&
          doc.password === credentials.password
      );

      if (found) {
        localStorage.setItem("doctorId", found.docid);
        localStorage.setItem("role", "doctor");
        localStorage.setItem("isLoggedIn", "true");
        setLoginStatus("success");
        navigate("/doctor/home");
      } else {
        setLoginStatus("fail");
      }
    } catch (error) {
      setErrorMessage(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="app-container">
      <form className="form" onSubmit={handleLogin}>
        <h2>Doctor Login</h2>
        <div className="form-group">
          <label>Doctor Name</label>
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        {loginStatus === "success" && <p className="status success">Login successful!</p>}
        {loginStatus === "fail" && <p className="status fail">Invalid credentials!</p>}
        {errorMessage && <p className="status error">Error: {errorMessage}</p>}
      </form>
    </div>
  );
}
