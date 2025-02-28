import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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

  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
    } else {
      setPasswordError("");
    }
  }, [formData.password, formData.confirmPassword]);

  // Handle email/password signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) return;

    try {
      await axios.post("https://loginsignupbackend-th96.onrender.com/signup", formData);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  // Handle Google Signup
  const handleGoogleSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential); // Decode Google token
      const googleUser = {
        email: decoded.email,
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        googleId: decoded.sub, // Unique Google ID
      };

      // Send Google user data to the backend
      const res = await axios.post("https://loginsignupbackend-th96.onrender.com/auth/google", googleUser);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Google Signup successful!");
        navigate("/dashboard");
      } else {
        alert("Google Signup failed!");
      }
    } catch (err) {
      alert("Google authentication failed");
    }
  };

  // Handle Google Signup Failure
  const handleGoogleFailure = () => {
    alert("Google Signup failed. Please try again.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-4">Create an Account</h2>

        {/* Traditional Signup Form */}
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

          <input type="password" name="password" placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg" onChange={handleChange} required />

          <input type="password" name="confirmPassword" placeholder="Confirm Password"
            className={`w-full px-3 py-2 border rounded-lg ${passwordError ? "border-red-500" : ""}`}
            onChange={handleChange} required />

          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <div className="flex space-x-2">
            <select name="gender" className="w-1/2 px-3 py-2 border rounded-lg" onChange={handleChange}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input type="date" name="dob"
                className="w-full px-3 py-2 border rounded-lg" onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Sign Up
          </button>
        </form>

        {/* Google Signup Button */}
        <div className="mt-4">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-500">Log in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
