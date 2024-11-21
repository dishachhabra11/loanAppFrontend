import React from "react";
import InputField from "../components/InputFields/InputField";
import Button from "../components/Buttons/Buton";
import { useState } from "react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);
    // Add API call for signup here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="container bg-white max-w-md mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
          <InputField label="Email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
          <InputField label="Password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
          <Button text="Sign Up" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
