import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://your-backend.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  // Handle Google Login Success
  const handleGoogleSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential); // Decode JWT response
      const googleUser = {
        email: decoded.email,
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        googleId: decoded.sub,
      };

      const res = await fetch("https://your-backend.onrender.com/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleUser),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Google authentication failed");
    }
  };

  // Handle Google Login Failure
  const handleGoogleFailure = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Login to your account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="email" name="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full px-4 py-3 border rounded-lg" onChange={handleChange} required />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Sign In
          </button>
        </form>

        {/* Google Login Button */}
        <div className="mt-6 text-center">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
