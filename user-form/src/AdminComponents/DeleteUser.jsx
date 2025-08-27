import React, { useState } from "react";
import "./CommonStyles.css";

const DeleteUser = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          return response.text().then((errorText) => {
            throw new Error(`Failed to delete user: ${errorText}`);
          });
        }
      })
      .then((text) => {
        setMessage(`✅ User deleted successfully: ${text}`);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setMessage("❌ An error occurred while deleting the user.");
      });

  };

  return (
    <div className="form-wrapper">
      <div className="form">
        <h2>Delete User</h2>
        <form onSubmit={handleDelete}>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="🆔 Enter User ID"
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

export default DeleteUser;
