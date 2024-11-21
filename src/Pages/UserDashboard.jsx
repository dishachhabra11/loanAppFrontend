import React, { useEffect, useState } from "react";
import DropDown from "../components/DropDown";
import SideBar from "../components/SideBar";
import AdminTable from "../components/AdminTable";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserDashLayout from "../components/UserDashLayout";

function UserDashboard() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState();
  const [filter, setFilter] = useState("All Loans");

  const fetchLoans = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/loans`,{withCredentials:true});
      
      setLoans(res.data.loans);
      console.log(loans);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchLoans();
  }, []);
   const filteredLoans =
     loans &&
     loans.filter((loan) => {
       if (filter === "Approved Loans") return loan.loanStatus === "APPROVED";
       if (filter === "Pending Loans") return loan.loanStatus === "PENDING";
       return true;
     });

  const updateLoanStatus = (id, newStatus) => {
    setLoans((prevLoans) => prevLoans.map((loan) => (loan.id === id ? { ...loan, status: newStatus } : loan)));
  };

  return (
    <UserDashLayout>
      <section className="bg-white sm:p-4 p-2  rounded-lg shadow w-full max-w-full">
        <div className="flex space-x-4">
          {["All Loans", "Approved Loans", "Pending Loans"].map((filterName) => (
            <FilterButton bgColor="bg-blue-300" hoverColor="hover:bg-blue-100" key={filterName} label={filterName} isActive={filter === filterName} onClick={() => setFilter(filterName)} />
          ))}
        </div>
        <div className="mt-6 space-y-4">
          <div className="p-2 sm:p-4">
            <div className="overflow-x-auto bg-white shadow rounded-lg max-h-[350px]">
              <UserTable loans={filteredLoans} updateLoanStatus={updateLoanStatus} />
            </div>
          </div>
        </div>
      </section>
    </UserDashLayout>
  );
}
export default UserDashboard;

const FilterButton = ({ label, isActive, onClick, bgColor = "bg-purple-300", hoverColor = "hover:bg-purple-100" }) => {
  return (
    <button className={`py-2 px-4 rounded-lg ${isActive ? `${bgColor} text-white` : `bg-gray-200 text-gray-700 ${hoverColor}`}`} onClick={onClick}>
      {label}
    </button>
  );
};
