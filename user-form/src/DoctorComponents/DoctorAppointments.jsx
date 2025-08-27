// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// export default function DoctorAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userDetails, setUserDetails] = useState({});
//   const navigate = useNavigate();

//   const doctorId = localStorage.getItem("doctorId");
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     if (!isLoggedIn || role !== "doctor") {
//       navigate("/doctor/login");
//       return;
//     }

//     const fetchDoctorDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/doctors/${doctorId}`);
//         if (!response.ok) throw new Error("Failed to fetch doctor details");
//         const data = await response.json();
//         setUserDetails(data);
//       } catch (error) {
//         console.error("Error fetching doctor details:", error);
//       }
//     };

//     if (doctorId) {
//       fetchDoctorDetails();
//     }
//   }, [doctorId, isLoggedIn, role, navigate]);

//   useEffect(() => {
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
//   }, [doctorId, selectedDate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/doctor/login");
//   };

//   return (
//     <div className="layout-container">
//       {/* Hamburger Icon */}
//       <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
//         ☰
//       </div>

//       {/* Sidebar */}
//       {sidebarOpen && (
//         <div className="sidebar">
//           <h1>Doctor Dashboard</h1>
//           <h4>Welcome, {userDetails.name}</h4>
//           <p><strong>Doctor Id:</strong> {userDetails.docid}</p>
//           <p><strong>Name:</strong> {userDetails.name}</p>
//           <p><strong>Designation:</strong> {userDetails.designation}</p>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="doctor-selection-box">
//           <h2>Appointments</h2>

//           {/* Always show calendar */}
//           <div style={{ marginBottom: "20px" }}>
//             <label>
//               Select Date:{" "}
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//               />
//             </label>
//           </div>

//           {/* Appointments List */}
//           {appointments.length === 0 ? (
//             <p>No appointments found.</p>
//           ) : (
//             <ul className="appointment-list">
//               {appointments.map((appt) => (
//                 <li key={appt.id}>
//                   <strong>Appointment ID:</strong> {appt.appointmentNo} <br />
//                   <strong>Date:</strong> {appt.appointmentDate} <br />
//                   {appt.user ? (
//                     <>
//                       <strong>User ID:</strong> {appt.user.userid} <br />
//                       <strong>Name:</strong> {appt.user.name} ({appt.user.age} yrs) <br />
//                       <strong>Email:</strong> {appt.user.email} <br />
//                       <strong>Address:</strong> {appt.user.address} <br />
//                       <strong>Weight:</strong> {appt.user.weight} kg
//                     </>
//                   ) : (
//                     <strong>No user info available</strong>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}

//           <button onClick={handleLogout} className="logout-button">
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    dosage: "",
    instructions: "",
    medication: "",
    medicines: "",
    details: ""
  });

  const navigate = useNavigate();
  const doctorId = localStorage.getItem("doctorId");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!isLoggedIn || role !== "doctor") {
      navigate("/doctor/login");
      return;
    }

    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/doctors/${doctorId}`);
        if (!response.ok) throw new Error("Failed to fetch doctor details");
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId, isLoggedIn, role, navigate]);

  useEffect(() => {
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
  }, [doctorId, selectedDate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/doctor/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPrescription = async (appointment) => {
    const payload = {
      ...prescriptionData,
      appointmentId: appointment.id,
      userId: appointment.user.userid,
      docId: appointment.doctor.docid
    };

    try {
      const response = await fetch("http://localhost:8080/prescriptions/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Failed to submit prescription");
      alert("Prescription submitted successfully!");
      setSelectedAppointmentId(null);
      setPrescriptionData({
        dosage: "",
        instructions: "",
        medication: "",
        medicines: "",
        details: ""
      });
    } catch (error) {
      console.error("Error submitting prescription:", error);
      alert("Error submitting prescription");
    }
  };

  return (
    <div className="layout-container">
      <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </div>

      {sidebarOpen && (
        <div className="sidebar">
          <h1>Doctor Dashboard</h1>
          <h4>Welcome, {userDetails.name}</h4>
          <p><strong>Doctor Id:</strong> {userDetails.docid}</p>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Designation:</strong> {userDetails.designation}</p>
        </div>
      )}

      <div className="main-content">
        <div className="doctor-selection-box">
          <h2>Appointments</h2>

          <div style={{ marginBottom: "20px" }}>
            <label>
              Select Date:{" "}
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </label>
          </div>

          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Appointment No</th>
                  <th>Date</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Weight</th>
                  <th>Prescription</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <React.Fragment key={appt.id}>
                    <tr>
                      <td>{appt.appointmentNo}</td>
                      <td>{appt.appointmentDate}</td>
                      <td>{appt.user?.userid}</td>
                      <td>{appt.user?.name}</td>
                      <td>{appt.user?.age}</td>
                      <td>{appt.user?.email}</td>
                      <td>{appt.user?.address}</td>
                      <td>{appt.user?.weight} kg</td>
                      <td>
                        <button onClick={() => setSelectedAppointmentId(appt.id)}>
                          Add Prescription
                        </button>
                      </td>
                    </tr>
                    {selectedAppointmentId === appt.id && (
                      <tr className="prescription-row">
                        <td colSpan="9">
                          <div className="inline-form">
                            <h4>Prescription for Appointment #{appt.appointmentNo}</h4>
                            <input name="dosage" placeholder="Dosage" value={prescriptionData.dosage} onChange={handleInputChange} />
                            <input name="instructions" placeholder="Instructions" value={prescriptionData.instructions} onChange={handleInputChange} />
                            <input name="medication" placeholder="Medication" value={prescriptionData.medication} onChange={handleInputChange} />
                            <input name="medicines" placeholder="Medicines" value={prescriptionData.medicines} onChange={handleInputChange} />
                            <input name="details" placeholder="Details" value={prescriptionData.details} onChange={handleInputChange} />
                            <div className="form-buttons">
                              <button onClick={() => handleSubmitPrescription(appt)}>Submit</button>
                              <button onClick={() => setSelectedAppointmentId(null)}>Cancel</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
