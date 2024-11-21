import React, { useState } from "react";
import InputField from "../components/InputFields/InputField";
import Button from "../components/Buttons/Buton";
import axios from "axios"; // Import Axios for API calls
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useAuth } from "../hooks/useAuth";

const SignUpPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // To handle errors
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/signup", formData, {
        withCredentials: true,
      });
      console.log("API Response:", response.data);
      login(response.data.token, "user");
      alert("Sign up successful!");
      navigate("/"); // Navigate to home page after successful signup
    } catch (error) {
      setErrorMessage(error.response?.data.error[0].message || "Failed to sign up");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="container bg-white max-w-md mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        {errorMessage && <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter your name" name="name" />
          <InputField label="Email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" name="email" />
          <InputField label="Password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" name="password" />
          <Button text="Sign Up" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
