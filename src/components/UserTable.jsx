import React, { useState } from "react";
import axios from "axios";
import StatusDropdown from "../components/UserTableDropDown";
import { formatDate } from "../../utils/formatDate";

const UserTable = ({ loans = [], updateLoanStatus }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (loanId) => {
    setExpandedRow((prev) => (prev === loanId ? null : loanId));
  };

  const updatePaymentStatus = async (loanId, paymentIndex, newStatus) => {
    try {
      const loan = loans.find((loan) => loan._id === loanId);
      const payment = loan?.payments?.[paymentIndex];

      if (!payment || payment.status === newStatus) return;

      // API call to update the payment status
      const paymentId = payment._id;
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user/payPayment/${paymentId}`;

      // Send the PUT request with credentials (cookies)
      const res = await axios.put(
        apiUrl,
        { status: newStatus }, // Pass the new status in the request body
        { withCredentials: true } // Include cookies in the request
      );

      console.log("Response from server:", res.data);

      // Update the local state after a successful API call
      const updatedLoans = loans.map((loan) => {
        if (loan._id === loanId) {
          const updatedPayments = loan.payments.map((p, index) => (index === paymentIndex ? { ...p, status: newStatus } : p));

          const allPaid = updatedPayments.every((p) => p.status === "Paid");

          return {
            ...loan,
            payments: updatedPayments,
            loanStatus: allPaid ? "Paid" : loan.loanStatus,
          };
        }
        return loan;
      });

      updateLoanStatus?.(updatedLoans);
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th scope="col" className="p-4 text-left text-sm font-medium text-gray-700">
            Date
          </th>
          <th scope="col" className="p-4 text-left text-sm font-medium text-gray-700">
            Loan Amount
          </th>
          <th scope="col" className="p-4 text-left text-sm font-medium text-gray-700">
            Term
          </th>
          <th scope="col" className="p-4 text-left text-sm font-medium text-gray-700">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray">
        {loans?.length > 0 ? (
          loans.map((loan) => (
            <React.Fragment key={loan?._id || Math.random()}>
              <tr className={`hover:bg-gray-50 border border-gray cursor-pointer ${expandedRow === loan?._id ? "bg-gray-50" : ""}`} onClick={() => toggleRow(loan?._id)}>
                <td className="p-4 whitespace-nowrap text-sm text-gray-900">{formatDate(loan?.createdAt) || "N/A"}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-900">{"₹ " + loan?.loanAmount || 0}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-900">{loan?.loanTerm + " Weeks" || "N/A"}</td>
                <td className="p-4 whitespace-nowrap text-sm text-gray-900">{loan?.loanStatus || "N/A"}</td>
              </tr>
              {expandedRow === loan?._id && (
                <tr>
                  <td colSpan={5} className="p-4">
                    <div className="bg-gray-50 p-4 rounded-lg shadow">
                      <p className="font-semibold mb-2">Payment Information</p>
                      <table className="min-w-full text-sm text-gray-700">
                        <thead>
                          <tr>
                            <th className="p-2 text-left">Payment Amount</th>
                            <th className="p-2 text-left">Due Date</th>
                            <th className="p-2 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loan?.payments?.length > 0 ? (
                            loan.payments.map((payment, index) => (
                              <tr key={payment?._id || index} className="border-t">
                                <td className="p-2">{"₹ " + payment?.paymentAmount || 0}</td>
                                <td className="p-2">{payment?.dueDate ? formatDate(payment.dueDate) : "N/A"}</td>
                                <td className="p-2">
                                  <StatusDropdown initialStatus={payment?.status || "Pending"} options={["Paid"]} onChange={(newStatus) => updatePaymentStatus(loan._id, index, newStatus)} isEnabled={loan?.loanStatus !== "PENDING"} />
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3} className="p-2 text-center text-gray-500">
                                No payments available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="p-4 text-center text-gray-500">
              No loans available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
