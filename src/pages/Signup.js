import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    countryCode: "+91",
    gender: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-4">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-1/2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all hover:shadow-md"
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-1/2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all hover:shadow-md"
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all hover:shadow-md"
            onChange={handleChange}
          />

          <div className="flex space-x-2">
            <select
              name="countryCode"
              className="w-1/3 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all hover:shadow-md"
              onChange={handleChange}
            >
              <option value="+91">+91 (IN)</option>
            </select>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              className="w-2/3 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all hover:shadow-md"
              onChange={handleChange}
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all hover:shadow-md"
            onChange={handleChange}
          />

          <div className="flex space-x-2">
            <select
              name="gender"
              className="w-1/2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all hover:shadow-md"
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="date"
              name="dob"
              className="w-1/2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all hover:shadow-md"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">Or continue with</p>
          <div className="flex justify-center mt-2">
            <button className="flex items-center px-3 py-2 border rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 transform hover:scale-105 hover:shadow-md">
              <img
                src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Google
            </button>
          </div>
        </div>

        {/* Added Login Option */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
