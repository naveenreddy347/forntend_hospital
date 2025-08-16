import React, { useState } from "react";

const DOCTOR_API = "http://localhost:8080/api/doctors";
const APPOINTMENT_API = "http://localhost:8080/appointments/book";

export default function DoctorAppointment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [status, setStatus] = useState({ loading: false, msg: "", ok: null });

  const userId = 1; // Replace with actual logged-in user ID

  async function fetchDoctors() {
    setStatus({ loading: true, msg: "", ok: null });

    try {
      const res = await fetch(DOCTOR_API);
      if (res.ok) {
        const data = await res.json();
        setDoctorList(data);
        setStatus({ loading: false, msg: "", ok: true });
      } else {
        setStatus({ loading: false, msg: "Failed to fetch doctors ❌", ok: false });
      }
    } catch {
      setStatus({ loading: false, msg: "Server unreachable ⚠️", ok: false });
    }
  }

  async function bookAppointment() {
    if (!selectedDoctor) return;

    setStatus({ loading: true, msg: "", ok: null });

    try {
      const res = await fetch(`${APPOINTMENT_API}?userid=${userId}&docid=${selectedDoctor.id}`, {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json(); // Expecting full appointment object
        setAppointmentDetails(data);
        setStatus({ loading: false, msg: "Appointment booked ✅", ok: true });
      } else {
        setStatus({ loading: false, msg: "Booking failed ❌", ok: false });
      }
    } catch {
      setStatus({ loading: false, msg: "Server unreachable ⚠️", ok: false });
    }
  }

  return (
    <div className="doctor-appointment">
      <h2>Search Doctor</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchDoctors()}
        placeholder="Press Enter to load doctors"
      />

      {doctorList.length > 0 && (
        <div className="doctor-list">
          <h3>Select a Doctor</h3>
          <ul>
            {doctorList.map((doc) => (
              <li key={doc.id} onClick={() => setSelectedDoctor(doc)}>
                {doc.name} - {doc.specialty}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedDoctor && (
        <div className="doctor-info">
          <h3>Doctor Info</h3>
          <p><strong>Name:</strong> {selectedDoctor.name}</p>
          <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
          <p><strong>Experience:</strong> {selectedDoctor.experience} years</p>
          <button onClick={bookAppointment} disabled={status.loading}>
            {status.loading ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      )}

      {appointmentDetails && (
        <div className="appointment-info">
          <h3>Appointment Confirmed</h3>
          <p><strong>Appointment ID:</strong> {appointmentDetails.id}</p>
          <p><strong>Doctor:</strong> {appointmentDetails.doctor.name}</p>
          <p><strong>Date:</strong> {appointmentDetails.appointmentDate}</p>
        </div>
      )}

      {status.msg && (
        <p className={`status ${status.ok ? "success" : "fail"}`}>{status.msg}</p>
      )}
    </div>
  );
}
