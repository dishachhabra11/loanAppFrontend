import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import AdminTable from "../components/AdminTable";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import {useAuth} from "../hooks/useAuth";

function Dashboard() {
  const {logout} = useAuth();
  const [loans, setLoans] = useState([]);
  const [filter, setFilter] = useState("All Loans");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };


  // Fetch loans from API
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/loans", {
          withCredentials: true,
        });
        const fetchedLoans = response.data.loans.map((loan) => ({
          id: loan.id || loan._id || "N/A",
          name: loan.user?.name || "Unknown User",
          email: loan.user?.email || "No Email",
          loanAmount: `₹ ${loan.loanAmount || 0}`,
          loanTerm: `${loan.loanTerm || "N/A"} Months`,
          status: loan.loanStatus || "Unknown",
          createdAt: loan.createdAt || "N/A",
        }));
        setLoans(fetchedLoans);
      } catch (error) {
        console.error("Failed to fetch loans:", error.response?.data || error.message);
      }
    };

    fetchLoans();
  }, []);

  // Update loan status
  const updateLoanStatus = async(id, newStatus) => {
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/approveLoan/${id}`, { status: newStatus }, { withCredentials: true });
    console.log(res.data);
    setLoans((prevLoans) => prevLoans.map((loan) => (loan.id === id ? { ...loan, status: newStatus } : loan)));
  };

  // Filter loans based on the selected filter
  const filteredLoans = loans.filter((loan) => {
    if (filter === "Approved Loans") return loan.status === "APPROVED";
    if (filter === "Pending Loans") return loan.status === "PENDING";
    return true;
  });

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-background overflow-hidden">
      <SideBar>
        <ul>
          <li className="py-2 rounded-lg hover:bg-purple-100 cursor-pointer flex gap-1" onClick={logout}>
            <LogoutIcon />
            Logout
          </li>
        </ul>
      </SideBar>

      <main className="flex-1 flex flex-col p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <p className="sm:text-2xl text-lg sm:font-bold font-semibold">Welcome Admin !!</p>
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

        <section className="bg-white sm:p-4 p-2 rounded-lg shadow w-full max-w-full">
          <div className="flex space-x-4">
            {["All Loans", "Approved Loans", "Pending Loans"].map((filterName) => (
              <FilterButton key={filterName} label={filterName} isActive={filter === filterName} onClick={() => setFilter(filterName)} />
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <div className="p-2 sm:p-4">
              <div className="overflow-x-auto bg-white shadow rounded-lg max-h-[350px]">
                <AdminTable filteredLoans={filteredLoans} updateLoanStatus={updateLoanStatus} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;

// FilterButton Component
const FilterButton = ({ label, isActive, onClick }) => {
  return (
    <button className={`py-2 px-4 rounded-lg ${isActive ? "bg-purple-300 text-white" : "bg-gray-200 text-gray-700 hover:bg-purple-100"}`} onClick={onClick}>
      {label}
    </button>
  );
};
