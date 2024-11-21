import React, { useState } from "react";
import DropDown from "../components/DropDown";
import SideBar from "../components/SideBar";
import AdminTable from "../components/AdminTable";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useAuth } from "../hooks/useAuth";

function UserDashLayout({ children }) {
  const navigate = useNavigate();
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const toggleDropdown = () => {
     setIsDropdownOpen((prev) => !prev);
   };
  const route = window.location.pathname;
  console.log(route);
  const logout = useAuth().logout; 

  return (
    <div className={`flex flex-col md:flex-row h-screen w-full bg-background overflow-hidden `}>
      <SideBar textColor="text-primary">
        <ul>
          <li
            className={`py-2 px-2 rounded-lg hover:bg-blue-100 cursor-pointer flex gap-2 ${route === "/" ? "bg-blue-100" : ""}`}
            onClick={() => {
              navigate("/");
            }}>
            {<HomeOutlinedIcon />}Home
          </li>
          <li
            className={`py-2 px-2 rounded-lg hover:bg-blue-100 cursor-pointer flex gap-2 ${route === "/create-loan" ? "bg-blue-100" : ""}`}
            onClick={() => {
              navigate("/create-loan");
            }}>
            {<MonetizationOnOutlinedIcon />}Create Loan
          </li>
          <li
            className="py-2 px-2 rounded-lg hover:bg-blue-100 cursor-pointer flex gap-2"
            onClick={() => {
              logout();
              navigate("/signIn");
              alert("Logged out successfully");
            }}>
            {<LogoutIcon />}Logout
          </li>
        </ul>
      </SideBar>

      <main className="flex-1 flex flex-col p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <p className="sm:text-2xl text-lg sm:font-bold font-semibold">Welcome User!!</p>

          <div className="relative">
            <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleDropdown}>
              <MenuIcon className="text-2xl" />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <button className=" w-full px-4 py-2 text-left text-gray-700 border-none" onClick={() => logout()}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
export default UserDashLayout;

const FilterButton = ({ label, isActive, onClick }) => {
  return (
    <button className={`py-2 px-4 rounded-lg ${isActive ? "bg-purple-300 text-white" : "bg-gray-200 text-gray-700 hover:bg-purple-100"}`} onClick={onClick}>
      {label}
    </button>
  );
};
