import React from "react";

const RangeField = ({ label, min, max, value, onChange, step }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="range-field" className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <input id="range-field" type="range" min={min} max={max} value={value} step={step} onChange={onChange} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer bg-gray custom-range-slider" />
    </div>
  );
};



export default RangeField;
