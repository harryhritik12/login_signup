import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://loginsignupbackend-th96.onrender.com", {
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
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Login to your account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Sign In
          </button>
        </form>

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
