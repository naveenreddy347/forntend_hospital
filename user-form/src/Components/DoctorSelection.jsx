// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../App.css";

// const DOCTOR_API = "http://localhost:8080/api/doctors";
// const APPOINTMENT_API = "http://localhost:8080/appointments/book";
// const USER_APPOINTMENT_API = "http://localhost:8080/appointments/user";

// export default function DoctorSelection() {
//   const { userId: paramUserId } = useParams();
//   const userId = paramUserId || localStorage.getItem("userId");
//   const [doctors, setDoctors] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(DOCTOR_API)
//       .then((res) => res.json())
//       .then(setDoctors)
//       .catch(() => alert("Failed to load doctors"));

//     if (userId) {
//       fetch(`${USER_APPOINTMENT_API}/${userId}`)
//         .then((res) => res.json())
//         .then(setAppointments)
//         .catch(() => alert("Failed to load appointments"));
//     }
//   }, [userId]);

//   async function bookAppointment() {
//     if (!selectedDoctor?.docid || !userId) {
//       alert("Missing doctor or user ID");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `${APPOINTMENT_API}?userid=${userId}&docid=${selectedDoctor.docid}`,
//         { method: "POST", headers: { "Content-Type": "application/json" } }
//       );

//       if (res.ok) {
//         const data = await res.json();
//         navigate("/confirmation", { state: { appointment: data } });
//       } else {
//         alert("Booking failed: " + await res.text());
//       }
//     } catch {
//       alert("Network error during booking.");
//     }
//   }

//   const userDetails = appointments[0]?.user || {};

//   return (
//     <div className="layout-container">
//       {/* Hamburger Icon */}
//       <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
//         ☰
//       </div>

//       {/* Sidebar */}
//       {sidebarOpen && (
//         <div className="sidebar">
//           <h1>  </h1><br/>
//           <h4>  </h4><br/>
//           <h3>User Info</h3>
//           <p><strong>Name:</strong> {userDetails.name}</p>
//           <p><strong>Address:</strong> {userDetails.address}</p>
//           <p><strong>Email:</strong> {userDetails.email}</p>

//           <h4>Appointments</h4>
//           <ul className="appointment-list">
//             {appointments.map((appt, idx) => (
//               <li key={idx}>
//                 <strong>Doctor:</strong> {appt.doctor.name} <br />
//                 <strong>Date:</strong> {appt.appointmentDate}<br/>
//                 <strong>Token No:</strong> {appt.appointmentNo}<br/>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="doctor-selection-box">
//           <h2>Select a Doctor</h2>
//           <ul className="doctor-list">
//             {doctors.map((doc, index) => (
//               <li
//                 key={`${doc.docid}-${index}`}
//                 onClick={() => setSelectedDoctor(doc)}
//                 className={`doctor-item ${selectedDoctor?.docid === doc.docid ? "selected" : ""}`}
//               >
//                 {doc.name} - {doc.designation}
//               </li>
//             ))}
//           </ul>

//           {selectedDoctor && (
//             <div className="doctor-info">
//               <h3>Doctor Info</h3>
//               <p>Name: {selectedDoctor.name}</p>
//               <p>Designation: {selectedDoctor.designation}</p>
//               <button onClick={bookAppointment}>Book Appointment</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
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
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("doctor"); // 'doctor', 'prescription', 'appointment'
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

      fetch(`http://localhost:8080/prescriptions/user/${userId}`)
        .then((res) => res.json())
        .then((data) => setPrescriptions(Array.isArray(data) ? data : [data]))
        .catch(() => alert("Failed to load prescriptions"));
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
          <h3>User Info</h3>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>

          <button onClick={() => setView("appointment")}>Appointments</button>
          <button onClick={() => setView("prescription")}>Prescriptions</button>
          <button onClick={() => setView("doctor")}>Doctor Selection</button>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <div className="doctor-selection-box">
          {view === "doctor" && (
            <>
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
            </>
          )}

          {view === "prescription" && (
            <>
              <h2>Prescription Details</h2>
              <table className="prescription-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Doctor</th>
                    <th>Appointment ID</th>
                    <th>Medicines</th>
                    <th>Dosage</th>
                    <th>Instructions</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((presc, idx) => (
                    <tr key={idx}>
                      <td>{presc.appointment.user.name}</td>
                      <td>{presc.appointment.doctor.name}</td>
                      <td>{presc.appointment.id}</td>
                      <td>{presc.medicines}</td>
                      <td>{presc.dosage}</td>
                      <td>{presc.instructions}</td>
                      <td>{presc.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {view === "appointment" && (
            <>
              <h2>Appointment Details</h2>
              <table className="prescription-table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Token No</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, idx) => (
                    <tr key={idx}>
                      <td>{appt.doctor.name}</td>
                      <td>{appt.appointmentDate}</td>
                      <td>{appt.appointmentNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}