// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // ===== User Components =====
// import RegistrationForm from "./Components/RegistrationForm";
// import DoctorSelection from "./Components/DoctorSelection";
// import AppointmentConfirmation from "./Components/AppointmentConfirmation";
// import UserLogin from "./Components/UserLogin";

// // ===== Doctor Components =====
// import Login from "./DoctorComponents/Login";
// import SignUp from "./DoctorComponents/SignUp";
// import DoctorAppointments from "./DoctorComponents/DoctorAppointments";

// import "./App.css";

// // ===== Login status check =====
// const isDoctorLoggedIn =
//   localStorage.getItem("role") === "doctor" &&
//   localStorage.getItem("isLoggedIn") === "true";

// // ===== User Routes =====
// function UserRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<RegistrationForm />} />
//       <Route path="/doctors/:userId" element={<DoctorSelection />} />
//       <Route path="/confirmation" element={<AppointmentConfirmation />} />
//       <Route path="/login-user" element={<UserLogin />} />
//     </Routes>
//   );
// }

// // ===== Doctor Routes =====
// function DoctorRoutes() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<SignUp />} />
//       <Route
//         path="/home"
//         element={
//           isDoctorLoggedIn ? (
//             <DoctorAppointments />
//           ) : (
//             <Navigate to="/doctor/login" />
//           )
//         }
//       />
//     </Routes>
//   );
// }

// // ===== Main App =====
// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* User Flow */}
//         <Route path="/*" element={<UserRoutes />} />
//         {/* Doctor Flow */}
//         <Route path="/doctor/*" element={<DoctorRoutes />} />
//         {/* Fallback Route */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ===== User Components =====
import RegistrationForm from "./Components/RegistrationForm";
import DoctorSelection from "./Components/DoctorSelection";
import AppointmentConfirmation from "./Components/AppointmentConfirmation";
import UserLogin from "./Components/UserLogin";

// ===== Doctor Components =====
import Login from "./DoctorComponents/Login";
import SignUp from "./DoctorComponents/SignUp";
import DoctorAppointments from "./DoctorComponents/DoctorAppointments";

import "./App.css";

// ===== User Routes =====
function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/doctors/:userId" element={<DoctorSelection />} />
      <Route path="/confirmation" element={<AppointmentConfirmation />} />
      <Route path="/login-user" element={<UserLogin />} />
    </Routes>
  );
}

// ===== Doctor Routes =====
function DoctorRoutes() {
  const isDoctorLoggedIn =
    localStorage.getItem("role") === "doctor" &&
    localStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/home"
        element={
          isDoctorLoggedIn ? (
            <DoctorAppointments />
          ) : (
            <Navigate to="/doctor/login" />
          )
        }
      />
    </Routes>
  );
}

// ===== Main App =====
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Flow */}
        <Route path="/*" element={<UserRoutes />} />
        {/* Doctor Flow */}
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
