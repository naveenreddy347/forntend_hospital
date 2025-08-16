import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const DOCTOR_API = "http://localhost:8080/api/doctors";
const APPOINTMENT_API = "http://localhost:8080/appointments/book";

export default function DoctorSelection() {
  const { userId: paramUserId } = useParams();
  const userId = paramUserId || localStorage.getItem("userId");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Received userId from URL or localStorage:", userId);

    fetch(DOCTOR_API)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        console.log("Doctors loaded:", data);
      })
      .catch(() => alert("Failed to load doctors"));
  }, [userId]);

  async function bookAppointment() {
    if (!selectedDoctor || !selectedDoctor.docid) {
      alert("Please select a doctor before booking.");
      return;
    }

    if (!userId) {
      alert("User ID is missing. Cannot book appointment.");
      return;
    }

    console.log("Booking appointment for:", {
      userId,
      doctorId: selectedDoctor.docid
    });

    try {
      const res = await fetch(
        `${APPOINTMENT_API}?userid=${userId}&docid=${selectedDoctor.docid}`,
        { method: "POST" }
      );
      if (res.ok) {
        const data = await res.json();
        navigate("/confirmation", { state: { appointment: data } });
      } else {
        alert("Booking failed: " + res.statusText);
      }
    } catch (error) {
      alert("Booking failed");
      console.error(error);
    }
  }

  return (
    <div className="doctor-selection-container">
      <h2>Select a Doctor</h2>
      <ul className="doctor-list">
        {doctors.map((doc, index) => (
          <li
            key={`${doc.docid || doc.name}-${index}`}
            onClick={() => setSelectedDoctor(doc)}
            style={{
              cursor: "pointer",
              backgroundColor: selectedDoctor?.docid === doc.docid ? "#e0f7fa" : "white",
              padding: "8px",
              marginBottom: "4px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
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
  );
}
