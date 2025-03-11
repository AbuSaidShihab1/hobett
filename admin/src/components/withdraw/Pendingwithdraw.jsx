import React, { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Header from "../common/Header";
import { nanoid } from "nanoid";
import toast,{Toaster} from "react-hot-toast"
const Pendingwithdraw = () => {
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 const [orderId, setOrderId] = useState("");
 const base_url = import.meta.env.VITE_API_KEY_Base_URL;

 const base_url2="http://localhost:6001";
  // Fetch Pending Withdrawals
  const fetchWithdrawals = () => {
    axios
      .get(`${base_url}/admin/pending-withdrawal`)
      .then((res) => {
        setPendingWithdrawals(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchWithdrawals();
    setOrderId(nanoid(8));

  }, []);

  // Handle Status Change
  const handleStatusChange = (id, newStatus, withdrawal) => {
    console.log(withdrawal)
    axios
      .put(`${base_url}/admin/withdrawals/${id}/status`, { status: newStatus })
      .then((res) => {
        setPendingWithdrawals((prevWithdrawals) =>
          prevWithdrawals.map((w) =>
            w._id === id ? { ...w, status: newStatus } : w
          )
        );
    // If status is "approved", initiate payout request
    if (newStatus === "approved") {
      axios
        .post(`${base_url2}/api/payment/payout`, {
          mid: "shihab",
          provider: withdrawal.provider,
          amount: withdrawal.amount,
          orderId: withdrawal.orderId,
          payeeId: withdrawal.playerId, // Correcting the field name
          payeeAccount: withdrawal.payeeAccount, // Correcting the field name
          callbackUrl: "http://localhost:5174/admin/withdrawals-take",
          currency: "BDT",
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            // Update withdrawal object with payout details
            setPendingWithdrawals((prevWithdrawals) =>
              prevWithdrawals.map((w) =>
                w._id === id
                  ? {
                      ...w,
                      status: "approved",
                      transactionId: res.data.transactionId || w.transactionId, // Save transaction ID if available
                      payoutTime: new Date().toISOString(), // Save timestamp of payout
                    }
                  : w
              )
            );
            fetchWithdrawals(); // Fetch updated user data
            toast.success("Withdrawal approved and payout initiated.");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong. Please try again.");
        });
    }
      
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating status.");
      });
  };
  
  
  // Filter Withdrawals Based on Search Query
  const filteredWithdrawals = pendingWithdrawals.filter((transaction) =>
    transaction.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status Colors
  const statusColors = {
    pending: "bg-orange-100 text-orange-600",
    "in review": "bg-yellow-100 text-yellow-600",
    approved: "bg-indigo-100 text-indigo-600",
    assigned: "bg-blue-100 text-blue-600",
    success: "bg-green-100 text-green-600",
    rejected: "bg-red-100 text-red-600",
  };
  return (
    <div className="w-full font-bai overflow-y-auto">
      <Header />
      <Toaster/>
      <section className="p-4">
        <div className="p-6">
          <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pending Withdrawals</h1>

              {/* Search Input */}
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

            <div className="custom-scrollbar overflow-x-auto">
              <table className="custom-scrollbar overflow-x-auto w-full border-collapse bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#4634FF] text-white">
                    <th className="p-3 text-left text-nowrap">Gateway</th>
                    <th className="p-3 text-left text-nowrap">Method</th>
                    <th className="p-3 text-left text-nowrap">Initiated</th>
                    <th className="p-3 text-left text-nowrap">User</th>
                    <th className="p-3 text-left text-nowrap">Post Balance</th>
                    <th className="p-3 text-left text-nowrap">Expected Amount</th>
                    <th className="p-3 text-left text-nowrap">Recieved Amount</th>
                    <th className="p-3 text-left text-nowrap">Tax Amount</th>
                    <th className="p-3 text-left text-nowrap">Current Status</th>
                    <th className="p-3 text-left text-nowrap">Change Status</th>
                    <th className="p-3 text-left text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWithdrawals.map((transaction, index) => (
                    <tr key={index} className="border-b even:bg-gray-50 text-nowrap">
                      <td className="font-semibold  text-purple-500 ">
                        Eassypay
                      </td>
                      <td className="p-3">
                        <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                          {transaction?.provider}
                        </span>
                        <div className="text-gray-500 text-sm">{transaction.transactionId}</div>
                      </td>
                      <td className="p-3 text-gray-700">
                        {moment(transaction?.createdAt).format("MMMM Do YYYY, h:mm A")}
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-gray-700">{transaction?.email}</span>
                        <div className="text-blue-600 cursor-pointer hover:underline">
                          {transaction?.username}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-gray-700 font-semibold">৳{transaction.post_balance}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-gray-700 font-semibold">৳{transaction.amount}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-green-500 font-semibold">৳{transaction.recieved_amount}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-red-500 font-semibold">৳{transaction.tax_amount}</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-md text-[15px] font-[500] ${statusColors[transaction.status]}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          className={`px-2 py-1 rounded-md text-sm border ${statusColors[transaction.status]}`}
                          value={transaction.status}
                          onChange={(e) => handleStatusChange(transaction._id, e.target.value,transaction)}
                          disabled={transaction.status === "approved"}
                        >
                          <option value="pending">Pending</option>
                          <option value="in review">In Review</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <NavLink to={`/withdraw/pending-withdraw-details/${transaction._id}`}>
                          <button className="flex items-center gap-1 border border-blue-600 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition">
                            <FaRegCommentDots /> Details
                          </button>
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pendingwithdraw;
