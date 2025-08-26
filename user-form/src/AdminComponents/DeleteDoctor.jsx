import React, { useState } from "react";
import "./CommonStyles.css";

const DeleteDoctor = () => {
  const [doctorId, setDoctorId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/admin/doctor/${doctorId}`, {
        method: "DELETE",
      });

      const text = await response.text();
      setMessage(text);
    } catch (error) {
      console.error("Error deleting doctor:", error);
      setMessage("An error occurred while deleting the doctor.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form">
        <h2>Delete Doctor</h2>
        <form onSubmit={handleDelete}>
          <div className="form-group">
            <label>Doctor ID</label>
            <input
              type="text"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              placeholder="🆔 Enter Doctor ID"
              required
            />
          </div>
          <button type="submit">Delete</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default DeleteDoctor;
