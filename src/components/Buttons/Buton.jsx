// components/Button.jsx
import React from "react";

const Button = ({ text, onClick, type = "button", disabled }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed`}>
      {text}
    </button>
  );
};

export default Button;
