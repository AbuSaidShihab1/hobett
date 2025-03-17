import React, { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import toast,{ Toaster } from "react-hot-toast";

const Alldeposit = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [pending_deposit, set_pending_deposit] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusPopupOpen, setStatusPopupOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState("");
  const admin_info=JSON.parse(localStorage.getItem("admin"))

  // Fetch pending deposits from API
  const pending_deposit_info = () => {
    axios
      .get(`${base_url}/admin/all-deposits`)
      .then((res) => {
        set_pending_deposit(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    pending_deposit_info();
  }, []);

  const filter_deposit = pending_deposit.filter((transaction) =>
    transaction.payment_method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle status change
  const handleStatusChange = async () => {
    if (!newStatus || !reason) {
      toast.error("Both status and reason are required!");
      return;
    }

    try {
      const response = await axios.put(
        `${base_url}/admin/update-deposit-status/${selectedTransaction._id}`,
        { status: newStatus, reason,updated_by:admin_info.name}
      );
      toast.success("Status updated successfully!");
      setStatusPopupOpen(false);
      setNewStatus("");
      setReason("");
      pending_deposit_info(); // Refresh data
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="w-full font-bai overflow-y-auto">
      {/* Your Header component */}
      <Toaster/>
      <section className="p-4">
        <div className="p-6">
          <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                All Deposits
              </h1>
              <div className="relative w-[30%]">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#4634FF] text-white">
                    <th className="p-3 text-left">Gateway</th>
                    <th className="p-3 text-left">Method</th>
                    <th className="p-3 text-left">Initiated</th>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Action</th>
                    {/* <th className="p-3 text-left">Change Status</th> New Column */}
                  </tr>
                </thead>
                <tbody>
                  {filter_deposit.map((transaction, index) => (
                    <tr key={index} className="border-b even:bg-gray-50">
                      <td>
                        <span className="text-purple-600 font-semibold cursor-pointer hover:underline">
                          Eassypay
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                          {transaction?.payment_method}
                        </span>
                        <div className="text-gray-500 text-sm">{transaction.transactionId}</div>
                      </td>
                      <td className="p-3 text-gray-700">
                        <p>{moment(transaction?.createdAt).format("MMMM Do YYYY, h:mm A")}</p>
                        {
                          transaction?.updated_by==""? "": <p className="text-orange-500">Updated By: {transaction?.updated_by}</p>
                        }
                        {
                          transaction?.reason==""? "": <p className="text-orange-500">Reason: {transaction?.reason}</p>
                        }
                       
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-gray-700">{transaction?.customer_email}</span>
                        <div className="text-blue-600 cursor-pointer hover:underline">
                          {transaction?.customer_name}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-gray-700 ">৳{transaction.amount}</div>
                        <div className="font-semibold text-gray-800">{transaction.totalAmount}</div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-md text-sm
                            ${transaction.status === "success" ? "bg-green-100 text-green-600" : ""}
                            ${transaction.status === "fully paid" ? "bg-green-100 text-green-600" : ""}
                            ${transaction.status === "failed" ? "bg-red-100 text-red-600" : ""}
                            ${transaction.status === "pending" ? "bg-yellow-100 text-yellow-600" : ""}
                          `}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <NavLink to={`/deposits/pending-deposit-details/${transaction._id}`}>
                          <button className="flex items-center gap-1 border border-blue-600 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition">
                            <FaRegCommentDots /> Details
                          </button>
                        </NavLink>
                      </td>
                      {/* <td className="p-3">
                        <button
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setStatusPopupOpen(true);
                          }}
                          className="flex items-center gap-1 border border-yellow-600 text-yellow-600 px-3 py-1 rounded-md hover:bg-yellow-600 hover:text-white transition"
                        >
                          Change Status
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Status Change Popup */}
      {statusPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[400px]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Change Status</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2 border text-gray-700 outline-blue-800 border-gray-300 rounded-md"
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border border-gray-300 outline-blue-800 text-gray-700 rounded-md"
                rows="4"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setStatusPopupOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alldeposit;
