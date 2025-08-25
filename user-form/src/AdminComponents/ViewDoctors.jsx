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
          docid:doc.docid // assuming 'designation' is the specialty
        }));
        setDoctors(filteredDoctors);
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);
 
  return (
    <div className="form-wrapper">
    <div className="form">
     
      <ul className="appointment-list">
        {doctors.map((doc, index) => (
          <li key={index} className="appointment-card">
            <strong>{doc.name}</strong><br />
            Specialty: {doc.specialty}<br/>
            doc id : {doc.docid}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};
 
export default ViewDoctors;