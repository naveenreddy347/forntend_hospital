import React from "react";
import { useLocation } from "react-router-dom";

function AppointmentConfirmation() {
  const location = useLocation();
  const { doctorName, appointmentDate, time, userName } = location.state || {};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Appointment Confirmed!</h2>
      {doctorName && appointmentDate && time && userName ? (
        <div>
          <p><strong>Patient Name:</strong> {userName}</p>
          <p><strong>Doctor:</strong> {doctorName}</p>
          <p><strong>Date:</strong> {appointmentDate}</p>
          <p><strong>Time:</strong> {time}</p>
        </div>
      ) : (
        <p>No appointment details found.</p>
      )}
    </div>
  );
}

export default AppointmentConfirmation;
