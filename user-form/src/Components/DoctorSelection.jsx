import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const DOCTOR_API = "http://localhost:8080/api/doctors";
const APPOINTMENT_API = "http://localhost:8080/appointments/book";
const USER_APPOINTMENT_API = "http://localhost:8080/appointments/user";

export default function DoctorSelection() {
  const { userId: paramUserId } = useParams();
  const userId = paramUserId || localStorage.getItem("userId");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(DOCTOR_API)
      .then((res) => res.json())
      .then(setDoctors)
      .catch(() => alert("Failed to load doctors"));

    if (userId) {
      fetch(`${USER_APPOINTMENT_API}/${userId}`)
        .then((res) => res.json())
        .then(setAppointments)
        .catch(() => alert("Failed to load appointments"));
    }
  }, [userId]);

  async function bookAppointment() {
    if (!selectedDoctor?.docid || !userId) {
      alert("Missing doctor or user ID");
      return;
    }

    try {
      const res = await fetch(
        `${APPOINTMENT_API}?userid=${userId}&docid=${selectedDoctor.docid}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );

      if (res.ok) {
        const data = await res.json();
        navigate("/confirmation", { state: { appointment: data } });
      } else {
        alert("Booking failed: " + await res.text());
      }
    } catch {
      alert("Network error during booking.");
    }
  }

  const userDetails = appointments[0]?.user || {};

  return (
    <div className="layout-container">
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="sidebar">
          <h1>  </h1><br/>
          <h4>  </h4><br/>
          <h3>User Info</h3>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>

          <h4>Appointments</h4>
          <ul className="appointment-list">
            {appointments.map((appt, idx) => (
              <li key={idx}>
                <strong>Doctor:</strong> {appt.doctor.name} <br />
                <strong>Date:</strong> {appt.appointmentDate}<br/>
                <strong>Token No:</strong> {appt.appointmentNo}<br/>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <div className="doctor-selection-box">
          <h2>Select a Doctor</h2>
          <ul className="doctor-list">
            {doctors.map((doc, index) => (
              <li
                key={`${doc.docid}-${index}`}
                onClick={() => setSelectedDoctor(doc)}
                className={`doctor-item ${selectedDoctor?.docid === doc.docid ? "selected" : ""}`}
              >
                {doc.name} - {doc.designation}
              </li>
            ))}
          </ul>

          {selectedDoctor && (
            <div className="doctor-info">
              <h3>Doctor Info</h3>
              <p>Name: {selectedDoctor.name}</p>
              <p>Designation: {selectedDoctor.designation}</p>
              <button onClick={bookAppointment}>Book Appointment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
