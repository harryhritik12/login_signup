import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    countryCode: "+91",
    gender: "",
    dob: "",
  });

  const [passwordError, setPasswordError] = useState(""); // State for password mismatch error
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validate password in real-time (without clicking submit)
  useEffect(() => {
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
    } else {
      setPasswordError(""); // Clear error when passwords match
    }
  }, [formData.password, formData.confirmPassword]); // Runs when either password field changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) return; // Prevent form submission if passwords don't match

    try {
      await axios.post("https://loginsignupbackend-th96.onrender.com", formData);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-4">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <input type="text" name="firstName" placeholder="First Name"
              className="w-1/2 px-3 py-2 border rounded-lg" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name"
              className="w-1/2 px-3 py-2 border rounded-lg" onChange={handleChange} required />
          </div>

          <input type="email" name="email" placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg" onChange={handleChange} required />

          <div className="flex space-x-2">
            <select name="countryCode" className="w-1/3 px-3 py-2 border rounded-lg" onChange={handleChange}>
              <option value="+91">+91 (IN)</option>
            </select>
            <input type="text" name="mobile" placeholder="Mobile"
              className="w-2/3 px-3 py-2 border rounded-lg" onChange={handleChange} required />
          </div>

          {/* Password Field */}
          <input type="password" name="password" placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg" onChange={handleChange} required />

          {/* Confirm Password Field */}
          <input type="password" name="confirmPassword" placeholder="Confirm Password"
            className={`w-full px-3 py-2 border rounded-lg ${passwordError ? "border-red-500" : ""}`}
            onChange={handleChange} required />

          {/* ✅ Show password mismatch error in real time */}
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <div className="flex space-x-2">
            <select name="gender" className="w-1/2 px-3 py-2 border rounded-lg" onChange={handleChange}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input type="date" name="dob"
              className="w-1/2 px-3 py-2 border rounded-lg" onChange={handleChange} required />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-500">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
