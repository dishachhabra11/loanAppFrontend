import React from "react";

const SideBar = ({ children, textColor = "text-purple-600" }) => {
  return (
    <aside className="hidden md:flex flex-col bg-white w-64 sm:p-6 p-4">
      <h1 className={`text-xl font-bold ${textColor}`}>loanApp</h1>
      <nav className="mt-6">{children}</nav>
    </aside>
  );
};

export default SideBar;
