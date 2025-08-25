import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Make sure this CSS file exists

const AdminDashboard = () => {
  const navigate = useNavigate();

  const actions = [
    { label: "Create Doctor", path: "/create-doctor" },
    { label: "Create User", path: "/create-user" },
    { label: "Delete Doctor", path: "/delete-doctor" },
    { label: "Delete User", path: "/delete-user" },
    { label: "View All Doctors", path: "/view-doctors" },
    { label: "View All Users", path: "/view-users" },
  ];

  return (
    <div className="admin-container">
      {actions.map((action, index) => (
        <div
          key={index}
          className="admin-box"
          onClick={() => navigate(action.path)}
        >
          {action.label}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;