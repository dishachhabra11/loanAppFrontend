import React from "react";
import { useState } from "react";
import UserDashLayout from "../components/UserDashLayout";
import RangeField from "../components/RangeField";
import Button from "../components/Buttons/Buton";
import axios from "axios";

const CreateLoan = () => {
  const [loanAmount, setLoanAmount] = useState(34000);
  const [loanDuration, setLoanDuration] = useState(5);

  const createLoan = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/createLoan`, { loanAmount, loanTerm: loanDuration }, { withCredentials: true });
      console.log(res.data);
      alert("Loan created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoanAmountChange = (e) => {
    const value = Math.max(100, Math.min(100000, Number(e.target.value)));
    setLoanAmount(value);
  };

  const handleLoanDurationChange = (e) => {
    const value = Math.max(1, Math.min(30, Number(e.target.value)));
    setLoanDuration(value);
  };
  return (
    <>
      <UserDashLayout>
        <div className=" flex  justify-center ">
          <div className=" bg-white h-auto rounded-2xl shadow-md max-w-md px-4 py-8">
            <p className="text-xl font-semibold text-center">Create Loan</p>
            <div className="flex flex-col space-y-8 p-6">
              <div className="space-y-2">
                <div className="border-gray border-[2px] py-1 px-4 rounded-3xl ">
                  <label className="text-gray-600 text-sm font-medium">Loan Amount</label>
                  <div className="text-xl font-bold text-gray-800 flex ">
                    ₹ <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full pb-1 px-2 rounded-lg outline-none appearance-none" />
                  </div>
                </div>

                <RangeField label="Loan Amount" min={100} max={100000} value={loanAmount} onChange={handleLoanAmountChange} step={100} />

                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹ 100</span>
                  <span>₹ 100,000</span>
                </div>
              </div>

              {/* Loan Duration */}
              <div className="space-y-2">
                <div className="border-gray border-[2px] py-1 px-4 rounded-3xl">
                  <label className="text-gray-600 text-sm font-medium">Loan Duration</label>
                  <div className="text-lg font-bold text-gray-800 flex items-center">
                    <input type="number" value={loanDuration} onChange={(e) => setLoanDuration(Number(e.target.value))} className="flex pb-1 px-2 rounded-lg outline-none appearance-none" />
                    <span className="ml-2">Weeks</span>
                  </div>
                </div>
                <RangeField label="Loan Duration (Weeks)" min={1} max={30} value={loanDuration} onChange={handleLoanDurationChange} step={1} />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 Week</span>
                  <span>30 Week</span>
                </div>

                <div className="justify-center flex">
                  <Button text="Create Loan" onClick={createLoan} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserDashLayout>
    </>
  );
};

export default CreateLoan;
