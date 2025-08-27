// import React, { useState, useEffect } from "react";
// import "./CommonStyles.css";
// const ViewUsers = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetch("http://localhost:8080/admin/users")
//             .then((response) => response.json())
//             .then((data) => {
//                 const filteredUsers = data.map((user) => ({
//                     name: user.name,
//                     email: user.email,
//                     weight: user.weight,
//                     address: user.address,
//                 }));
//                 setUsers(filteredUsers);
//             })
//             .catch((error) => console.error("Error fetching users:", error));
//     }, []);

//     return (
//         <div className="form-wrapper">
//             <div className="form">
//                 <h2>All Users</h2>
//                 <ul className="appointment-list">
//                     {users.map((user, index) => (
//                         <li key={index} className="appointment-card">
//                             <strong>{user.name}</strong><br />
//                             Userid:{user.userid}<br />
//                             Email: {user.email}<br />
//                             weight:{user.weight}<br />
//                             address:{user.address}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default ViewUsers;
import React, { useState, useEffect } from "react";
import "./CommonStyles.css";

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/admin/users")
            .then((response) => response.json())
            .then((data) => {
                const filteredUsers = data.map((user) => ({
                    name: user.name,
                    email: user.email,
                    weight: user.weight,
                    address: user.address,
                    userid: user.userid, // Make sure this field exists in your backend response
                }));
                setUsers(filteredUsers);
            })
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const sortedUsers = [...users].sort((a, b) => {
        const aMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
        const bMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
        return bMatch - aMatch;
    });

    return (
        <div className="form-wrapper">
            <div className="form">
                <h2>All Users</h2>
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
                            <th>User ID</th>
                            <th>Email</th>
                            <th>Weight</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.userid}</td>
                                <td>{user.email}</td>
                                <td>{user.weight}</td>
                                <td>{user.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewUsers;