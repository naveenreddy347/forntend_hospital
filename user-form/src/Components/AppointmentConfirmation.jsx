import React from "react";
import { useLocation } from "react-router-dom";
import success from '../assets/success.jpg'; // Ensure this path is correct

function AppointmentConfirmation() {
  const location = useLocation();
  const appointment = location.state?.appointment;

  const doctorName = appointment?.doctor?.name;
  const designation = appointment?.doctor?.designation;
  const appointmentDate = appointment?.appointmentDate;
  const userName = appointment?.user?.name;
  const appointmentNo = appointment?.appointmentNo;

  return (
    <div
      style={{
        backgroundImage: `url(${success})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        position: 'relative',
        color: 'white',
      }}
    >
      <h2 style={{ padding: '20px', color: "black" }}>Appointment Confirmed!</h2>

      {doctorName && appointmentDate && userName ? (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '20px', // 👈 changed from right to left
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '300px',
            textShadow: '1px 1px 2px black',
          }}
        >
          <p><strong>Patient Name:</strong> {userName}</p>
          <p><strong>Doctor:</strong> {doctorName} ({designation})</p>
          <p><strong>Date:</strong> {appointmentDate}</p>
          <p><strong>Appointment Id:</strong> {appointmentNo}</p>
        </div>
      ) : (
        <p style={{ padding: '20px' }}>No appointment details found.</p>
      )}
    </div>
  );
}

export default AppointmentConfirmation;
