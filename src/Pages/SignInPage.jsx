import React, { useEffect } from "react";
import { useState } from "react";
import InputField from "../components/InputFields/InputField";
import Button from "../components/Buttons/Buton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Cookies from "js-cookie";

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {isAuthenticated} = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isUser, setIsUser] = useState(true);

  const handleClick = (isUserSelected) => {
    setIsUser(isUserSelected);
  };
  
  useEffect(() => { console.log(isAuthenticated)}, [isAuthenticated]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Document Cookies:", document.cookie);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/signin`, formData, {
        withCredentials: true,
      });
      console.log("Sign In Successful:", response.data);
      // Cookies.set("userToken", response.data.token, { expires: 15 * 24 * 60 * 60 * 1000, sameSite: "None", httpOnly: false, secure: false });
      login(response.data.token, "user");
      navigate("/");
    } catch (err) {
      console.error("Sign In Error:", err);
      setError(err.response?.data?.error || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/signin`, formData, {
        withCredentials: true,
      });
      console.log("Sign In Successful, admin:", response.data);
      login(response.data.token, "admin");
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign In Error:", err);
      setError(err.response?.data?.error || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="container bg-white max-w-md mx-auto px-4 py-8 rounded-2xl">
        <h2 className="sm:text-2xl text-lg font-semibold text-center  font-roboto ">Log In</h2>

        <div className="relative flex items-center rounded-full border-2 border-light-gray my-6 max-w-xs mx-auto">
          <div className={`absolute top-0 left-0 h-full w-1/2 bg-gray-300 rounded-full transition-transform duration-300 py-1 ${isUser ? "translate-x-0" : "translate-x-full"}`}></div>

          <h2 className={`z-10 flex-1 text-center cursor-pointer font-semibold rounded-full transition-colors duration-300 ${isUser == true ? "bg-gray rounded-full py-1" : ""}`} onClick={() => handleClick(true)}>
            User
          </h2>

          <h2 className={`z-10 flex-1 text-center cursor-pointer font-semibold rounded-full transition-colors duration-300 py-1 ${isUser == false ? "bg-gray" : ""} `} onClick={() => handleClick(false)}>
            Admin
          </h2>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={isUser ? handleSubmitUser : handleSubmitAdmin} className="max-w-md mx-auto space-y-4">
          <InputField type="email" name="email" value={formData.email} onChange={handleChange} label="Email" placeholder="Enter your email" />

          <InputField type="password" name="password" value={formData.password} onChange={handleChange} label="Password" placeholder="Enter your password" />

          <p className="text-xs text-right">
            Dont have a account.{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}>
              Sign up?
            </span>
          </p>

          <div className="flex justify-center">
            <Button text="Log In" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
