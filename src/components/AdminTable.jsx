import React from "react";
import DropDown from "./DropDown";

const AdminTable = ({ filteredLoans, updateLoanStatus }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th scope="col" className="p-4 text-left text-sm font-medium text-gray-700">
            Person Name
          </th>
          <th scope="col" className="p-4 text-left text-sm font-medium text-gray-700">
            Email
          </th>
          <th scope="col" className="p-4 text-left text-sm font-medium text-gray-700">
            Loan Amount
          </th>
          <th scope="col" className="p-4 hidden sm:flex text-left text-sm font-medium text-gray-700">
            Loan Term
          </th>
          <th scope="col" className="p-4 text-left text-sm font-medium text-gray-700">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray">
        {filteredLoans.map((loan) => (
          <tr key={loan.id} className="hover:bg-gray-50 border border-gray">
            <td className="p-4 whitespace-nowrap text-sm text-gray-900">{loan.name}</td>
            <td className="p-4 whitespace-nowrap text-sm text-gray-900">{loan.email}</td>
            <td className="p-4 whitespace-nowrap text-sm text-gray-900">{loan.loanAmount}</td>
            <td className="p-4 whitespace-nowrap text-sm hidden sm:flex text-gray-900">{loan.loanTerm}</td>
            <td className="p-4 whitespace-nowrap text-sm text-gray-900 ">
              <DropDown
                name={loan.status}
                options={["APPROVED", "PENDING"]}
                onChange={(newStatus) => updateLoanStatus(loan.id, newStatus)}
                
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
