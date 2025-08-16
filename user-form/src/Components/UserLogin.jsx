import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const USER_LOGIN_API = "http://localhost:8080/api/users/login";

export default function UserLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!name || !password) {
      alert("Please enter both name and password");
      return;
    }

    try {
      const res = await fetch(USER_LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password })
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Login response:", data);

        if (!data.userid) {
          alert("Login response missing user ID");
          return;
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "user");
        localStorage.setItem("userId", data.userid);

        alert("Login successful!");
        navigate(`/doctors/${data.userid}`);
      } else {
        alert("Invalid name or password");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again later.");
    }
  }

  return (
    <div className="app-container">
      <form className="form" onSubmit={handleLogin}>
        <h2>User Login</h2>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
