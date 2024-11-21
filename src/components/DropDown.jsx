import React, { useState } from "react";

const DropDown = ({ name, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left cursor-pointer" >
      {/* Dropdown Button */}
      <button onClick={toggleDropdown} className={`text-white ${name === "PENDING" ? "bg-purple-300 hover:bg-purple-400" : "bg-purple-300 cursor-default"} sm:font-normal font-medium rounded-lg text-sm sm:px-5 px-3 py-2 sm:py-2.5 inline-flex items-center`} type="button">
        {name}
        {name === "PENDING" && (
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && name === "PENDING" && (
        <div className="z-20 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2">
          <ul className="py-2 text-sm text-gray-700">
            {options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleOptionClick(option)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
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

export default DropDown;
