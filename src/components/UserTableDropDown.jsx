import React, { useState } from "react";

const StatusDropdown = ({ initialStatus = "Pending", onChange, isEnabled }) => {
  const [status, setStatus] = useState(initialStatus);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (newStatus) => {
    setStatus(newStatus); 
    setIsOpen(false); 
    onChange?.(newStatus); // Call the callback, if provided
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button onClick={toggleDropdown} className="text-white bg-blue-300 hover:bg-blue-400 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center" type="button">
        {status}
        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6" stroke="currentColor" strokeWidth="2">
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && isEnabled &&  (
        <div className="absolute mt-2 bg-white rounded-md shadow-lg w-36 z-10">
          <ul className="py-1">
            {["Pending", "Paid"].map((option) => (
              <li key={option}>
                <button onClick={() => handleOptionClick(option)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
