import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  function handleLogout() {
    localStorage.clear();
    alert("Logged out successfully!");
    navigate(role === "doctor" ? "/doctor/login" : "/login-user");
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">🏥 HospitalCare</Link>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          

          {/* Conditional Links */}
          {isLoggedIn && role === "user" && (
            <>
              <Link to={`/doctors/${localStorage.getItem("userId")}`}>Doctors</Link>
              <Link to="/appointments">Appointments</Link>
            </>
          )}

          {isLoggedIn && role === "doctor" && (
            <Link to="/doctor/home">Dashboard</Link>
          )}

          {isLoggedIn && role === "admin" && (
            <Link to="/ad">Admin Dashboard</Link>
          )}

          {/* Login/Logout */}
          {!isLoggedIn ? (
            <>
              <Link to="/login-user">User Login</Link>
              <Link to="/doctor/login">Doctor Login</Link>
              <Link to="/ad">Admin Login</Link> {/* ✅ Admin Login */}
            </>
          ) : (
            <>
              {userName && <span className="user-name">👤 {userName}</span>}
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
