// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// export default function DoctorAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const navigate = useNavigate();

//   const doctorId = localStorage.getItem("doctorId");
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     if (!isLoggedIn || role !== "doctor") {
//       navigate("/doctor/login");
//       return;
//     }

//     if (doctorId && selectedDate) {
//       const fetchAppointments = async () => {
//         try {
//           const response = await fetch(
//             `http://localhost:8080/appointments/appointments/doctor/${doctorId}/${selectedDate}`
//           );
//           if (!response.ok) throw new Error("Failed to fetch appointments");
//           const data = await response.json();
//           setAppointments(data);
//         } catch (error) {
//           console.error("Error fetching appointments:", error);
//         }
//       };

//       fetchAppointments();
//     }
//   }, [doctorId, isLoggedIn, role, selectedDate, navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/doctor/login");
//   };

//   return (
//     <div className="appointments-container">
//       <h2>Appointments</h2>

//       <label>
//         Select Date:{" "}
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         />
//       </label>

//       {appointments.length === 0 ? (
//         <p>No appointments found.</p>
//       ) : (
//         <ul className="appointment-list">
//   {appointments.map((appt) => (
//     <li key={appt.id}>
//       <strong>Appointment ID:</strong> {appt.id} <br />
//       <strong>Date:</strong> {appt.appointmentDate} <br />
//       {appt.user ? (
//         <>
//           <strong>User ID:</strong> {appt.user.userid} <br />
//           <strong>Name:</strong> {appt.user.name} ({appt.user.age} yrs) <br />
//           <strong>Email:</strong> {appt.user.email} <br />
//           <strong>Address:</strong> {appt.user.address} <br />
//           <strong>Weight:</strong> {appt.user.weight} kg
//         </>
//       ) : (
//         <strong>No user info available</strong>
//       )}
//     </li>
//   ))}
// </ul>

//       )}
//       <button onClick={handleLogout} className="logout-button">
//         Logout
//       </button>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// export default function DoctorAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const navigate = useNavigate();

//   const doctorId = localStorage.getItem("doctorId");
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     if (!isLoggedIn || role !== "doctor") {
//       navigate("/doctor/login");
//       return;
//     }

//     if (doctorId && selectedDate) {
//       const fetchAppointments = async () => {
//         try {
//           const response = await fetch(
//             `http://localhost:8080/appointments/doctor/${doctorId}/${selectedDate}`
//           );
//           if (!response.ok) throw new Error("Failed to fetch appointments");
//           const data = await response.json();
//           setAppointments(data);
//         } catch (error) {
//           console.error("Error fetching appointments:", error);
//         }
//       };

//       fetchAppointments();
//     }
//   }, [doctorId, isLoggedIn, role, selectedDate, navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/doctor/login");
//   };

//   return (
//     <div className="appointments-container">
//       <h2>Appointments</h2>

//       <label>
//         Select Date:{" "}
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         />
//       </label>

//       {appointments.length === 0 ? (
//         <p>No appointments found.</p>
//       ) : (
//         <ul className="appointment-list">
//           {appointments.map((appt) => (
//             <li key={appt.id}>
//               <strong>Appointment ID:</strong> {appt.appointmentNo} <br />
//               <strong>Date:</strong> {appt.appointmentDate} <br />
//               {appt.user ? (
//                 <>
//                   <strong>User ID:</strong> {appt.user.userid} <br />
//                   <strong>Name:</strong> {appt.user.name} ({appt.user.age} yrs) <br />
//                   <strong>Email:</strong> {appt.user.email} <br />
//                   <strong>Address:</strong> {appt.user.address} <br />
//                   <strong>Weight:</strong> {appt.user.weight} kg
//                 </>
//               ) : (
//                 <strong>No user info available</strong>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}

//       <button onClick={handleLogout} className="logout-button">
//         Logout
//       </button>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const doctorId = localStorage.getItem("doctorId");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!isLoggedIn || role !== "doctor") {
      navigate("/doctor/login");
      return;
    }

    if (doctorId && selectedDate) {
      const fetchAppointments = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/appointments/doctor/${doctorId}/${selectedDate}`
          );
          if (!response.ok) throw new Error("Failed to fetch appointments");
          const data = await response.json();
          setAppointments(data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };

      fetchAppointments();
    }
  }, [doctorId, isLoggedIn, role, selectedDate, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/doctor/login");
  };

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>

      <label>
        Select Date:{" "}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="appointment-list">
          {appointments.map((appt) => (
            <li key={appt.id}>
              <strong>Appointment ID:</strong> {appt.appointmentNo} <br />
              <strong>Date:</strong> {appt.appointmentDate} <br />
              {appt.user ? (
                <>
                  <strong>User ID:</strong> {appt.user.userid} <br />
                  <strong>Name:</strong> {appt.user.name} ({appt.user.age} yrs) <br />
                  <strong>Email:</strong> {appt.user.email} <br />
                  <strong>Address:</strong> {appt.user.address} <br />
                  <strong>Weight:</strong> {appt.user.weight} kg
                </>
              ) : (
                <strong>No user info available</strong>
              )}
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}
