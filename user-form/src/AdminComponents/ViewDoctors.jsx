import React, { useState, useEffect } from "react";
import "./CommonStyles.css";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/admin/doctor")
      .then((response) => response.json())
      .then((data) => {
        const filteredDoctors = data.map((doc) => ({
          name: doc.name,
          specialty: doc.designation,
          docid: doc.docid
        }));
        setDoctors(filteredDoctors);
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  return (
    <div className="form-wrapper">
      <div className="form">
        <h2>Doctor List</h2>
        <table className="doctors-table">
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Name</th>
              <th>Specialty</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc, index) => (
              <tr key={index}>
                <td>{doc.docid}</td>
                <td>{doc.name}</td>
                <td>{doc.specialty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDoctors;
