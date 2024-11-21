import React from "react";

const InputField = ({ label, type, value, onChange, placeholder, name }) => (
  <div className="flex flex-col space-y-1 ">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none" />
  </div>
);

export default InputField;
