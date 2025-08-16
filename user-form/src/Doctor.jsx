import React, { useState } from "react";

function Doctor() {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    id:"null",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, msg: "", ok: null });

  const API_URL = "http://localhost:8080/api/doctors"; // Replace with your actual API URL

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate(data) {
    const e = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!data.designation.trim()) e.designation = "Designation is required";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: false, msg: "", ok: null });

    const errs = validate(formData);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStatus({ loading: true, msg: "", ok: null });

    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          address: formData.designation.trim(),
        }),
      });

      if (res.ok) {
        setStatus({ loading: false, msg: "Registration successful ✅", ok: true });
        setFormData({ name: "", designation: "" });
      } else {
        setStatus({ loading: false, msg: "Registration failed ❌", ok: false });
      }
    } catch {
      setStatus({ loading: false, msg: "Server unreachable ⚠️", ok: false });
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Doctor Registration</h2>

      {["name", "designation"].map((field) => (
        <div className="form-group" key={field}>
          <label htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="text"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
          />
          {errors[field] && <p className="error">{errors[field]}</p>}
        </div>
      ))}

      <button type="submit" disabled={status.loading}>
        {status.loading ? "Submitting..." : "Register"}
      </button>

      {status.msg && (
        <p className={`status ${status.ok ? "success" : "fail"}`}>{status.msg}</p>
      )}
    </form>
  );
}

export default Doctor;
