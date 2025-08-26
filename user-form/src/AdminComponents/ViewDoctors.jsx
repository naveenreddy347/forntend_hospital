import React, { useState, useEffect } from "react";
import "./CommonStyles.css";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/admin/doctor")
      .then((response) => response.json())
      .then((data) => {
        const filteredDoctors = data.map((doc) => ({
          name: doc.name,
          specialty: doc.designation,
          docid: doc.docid,
        }));
        setDoctors(filteredDoctors);
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const sortedDoctors = [...doctors].sort((a, b) => {
    const aMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
    const bMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
    return bMatch - aMatch; // true > false
  });

  return (
    <div className="form-wrapper">
      <div className="form">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Doctor ID</th>
            </tr>
          </thead>
          <tbody>
            {sortedDoctors.map((doc, index) => (
              <tr key={index}>
                <td>{doc.name}</td>
                <td>{doc.specialty}</td>
                <td>{doc.docid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDoctors;
