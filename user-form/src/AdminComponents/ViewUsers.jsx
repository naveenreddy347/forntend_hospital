import React, { useState, useEffect } from "react";
import "./CommonStyles.css";
const ViewUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/admin/users")
            .then((response) => response.json())
            .then((data) => {
                const filteredUsers = data.map((user) => ({
                    name: user.name,
                    email: user.email,
                    weight: user.weight,
                    address: user.address,
                }));
                setUsers(filteredUsers);
            })
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    return (
        <div className="form-wrapper">
            <div className="form">
                <h2>All Users</h2>
                <ul className="appointment-list">
                    {users.map((user, index) => (
                        <li key={index} className="appointment-card">
                            <strong>{user.name}</strong><br />
                            Userid:{user.userid}<br />
                            Email: {user.email}<br />
                            weight:{user.weight}<br />
                            address:{user.address}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewUsers;