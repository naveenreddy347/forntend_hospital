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
// import Layout from "./Layout";

// // ===== User Routes =====
// function UserRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout><RegistrationForm /></Layout>} />
//       <Route path="/doctors/:userId" element={<Layout><DoctorSelection /></Layout>} />
//       <Route path="/confirmation" element={<Layout><AppointmentConfirmation /></Layout>} />
//       <Route path="/login-user" element={<Layout><UserLogin /></Layout>} />
//     </Routes>
//   );
// }

// // ===== Doctor Routes =====
// function DoctorRoutes() {
//   const isDoctorLoggedIn =
//     localStorage.getItem("role") === "doctor" &&
//     localStorage.getItem("isLoggedIn") === "true";

//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<SignUp />} />
//       <Route path="/doctor/login" element={<DoctorAppointments />} />
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


import AdminDashboard from "./AdminComponents/AdminDashboard";
import CreateUser from "./AdminComponents/CreateUser";
import CreateDoctor from "./AdminComponents/CreateDoctor";
import DeleteDoctor from "./AdminComponents/DeleteDoctor";
import DeleteUser from "./AdminComponents/DeleteUser";
import ViewDoctors from "./AdminComponents/ViewDoctors";
import ViewUsers from "./AdminComponents/ViewUsers";

// ===== Doctor Components =====
import Login from "./DoctorComponents/Login";
import SignUp from "./DoctorComponents/SignUp";
import DoctorAppointments from "./DoctorComponents/DoctorAppointments";

import Header from "./CommonComponents/Header";
import Footer from "./CommonComponents/Footer";
import AboutPage from "./AboutComponents/AboutPage";
import "./App.css";

export default function App() {
  const isDoctorLoggedIn =
    localStorage.getItem("role") === "doctor" &&
    localStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/doctors/:userId" element={<DoctorSelection />} />
        <Route path="/confirmation" element={<AppointmentConfirmation />} />
        <Route path="/login-user" element={<UserLogin />} />

        <Route path="/ad" element={<AdminDashboard />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/create-doctor" element={<CreateDoctor />} />
      <Route path="/delete-doctor" element={<DeleteDoctor />} />
      <Route path="/delete-user" element={<DeleteUser />} />
      <Route path="/view-doctors" element={<ViewDoctors />} />
      <Route path="/view-users" element={<ViewUsers />} />
      {/* Aboutpage Routes */}
      <Route path="/about" element={<AboutPage />} />


        {/* Doctor Routes */}
        <Route path="/doctor/login" element={<Login />} />
        <Route path="/doctor/signup" element={<SignUp />} />
        <Route
          path="/doctor/home"
          element={
            isDoctorLoggedIn ? (
              <DoctorAppointments />
            ) : (
              <Navigate to="/doctor/login" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
  
