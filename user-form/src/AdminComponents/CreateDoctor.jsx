import React, { useState } from "react";
import "./CommonStyles.css";

const CreateDoctor = () => {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const doctorData = { name, designation, password };

        try {
            const response = await fetch("http://localhost:8080/admin/doctor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(doctorData),
            });

            const result = await response.json();
            setMessage(`Doctor created successfully with ID: ${result.docid}`);
        } catch (error) {
            console.error("Error creating doctor:", error);
            setMessage("Failed to create doctor.");
        }
    };

    return (
        <div className="form-wrapper">
            <div className="form">
                <h2>Create Doctor</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Doctor Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="👨‍⚕️ Enter doctor's name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Specialty (Designation)</label>
                        <input
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            placeholder="🏥 Enter specialty"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="🔒 Enter password"
                            required
                        />
                    </div>
                    <button type="submit">Create</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default CreateDoctor;
