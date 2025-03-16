import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Header from "../../common/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { toast,Toaster } from "react-hot-toast";

const Withdrawdetails = () => {
  const [withdraw_details, set_withdraw_details] = useState(null);
  const { id } = useParams();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const withdraw_info = async () => {
    try {
      const res = await axios.get(`${base_url}/admin/single-withdraw/${id}`);
      set_withdraw_details(res.data.data);
    } catch (err) {
      console.error("Error fetching withdraw details:", err);
    }
  };

  useEffect(() => {
    withdraw_info();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    axios
      .put(`${base_url}/admin/withdrawals/${id}/status`, { status: newStatus })
      .then((res) => {
        set_withdraw_details((prev) => ({ ...prev, status: newStatus }));
        toast.success(`Withdraw request ${newStatus}!`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update status");
      });
  };

  if (!withdraw_details) return <div>Loading...</div>;

  return (
    <section className="w-full bg-gray-1 font-bai">
      <Header />
      <Toaster position="bottom-center" />
      <div className="p-6 w-full flex flex-col">
        <h2 className="text-[25px] font-semibold mb-4 text-gray-700">
          {withdraw_details.username} ৳{withdraw_details.amount}
        </h2>
        <div className="flex gap-6 w-full">
          <div className="bg-white w-[35%] shadow-sm rounded-lg border-[1px] border-[#eee] p-6 flex-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Withdraw Via {withdraw_details.provider}
            </h3>
            <table className="w-full text-sm">
              <tbody>
                {[{ label: "Date", value: moment(withdraw_details?.createdAt).format("MMMM Do YYYY, h:mm A") },
                  { label: "Email", value: withdraw_details.username, highlight: true },
                  { label: "Username", value: withdraw_details.email, highlight: true },
                  { label: "Method", value: withdraw_details.provider, bold: true },
                  { label: "Amount", value: `৳${withdraw_details.amount.toFixed(2)} BDT`, bold: true }
                ].map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium text-[18px] text-gray-700">{item.label}</td>
                    <td className={`py-2 text-right text-[17px] ${item.bold ? "font-bold" : ""} ${item.highlight ? "text-blue-500" : "text-gray-900"}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3 font-medium text-gray-700 text-[17px]">Status</td>
                  <td className="py-2 text-right text-[17px]">
                    <span className={`px-3 py-1 text-[15px] font-semibold rounded-full ${withdraw_details.status === "pending" ? "text-orange-600 bg-orange-100" : withdraw_details.status === "approved" ? "text-green-600 bg-green-100" : withdraw_details.status === "in review" ? "text-yellow-500 bg-yellow-100" : "text-red-600 bg-red-100"}`}>
                      {withdraw_details.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white shadow-sm w-[65%] rounded-lg p-6 border-[1px] border-[#eee]">
            <h3 className="text-[20px] font-semibold mb-4 text-gray-700">User Withdraw Information</h3>
            <p className="text-[17px] mb-[10px] font-medium text-gray-700">Provider Name</p>
            <p className="text-gray-900 mb-3">{withdraw_details?.provider}</p>
            <p className="text-[17px] mb-[10px] font-medium text-gray-700">Account Number</p>
            <p className="text-gray-900 mb-3">{withdraw_details?.payeeAccount}</p>
            <p className="text-[17px] mb-[10px] font-medium text-gray-700">Order ID</p>
            <p className="text-gray-900 mb-3">{withdraw_details?.orderId}</p>
            <div className="flex gap-4 mt-[20px]">
              <button onClick={() => handleStatusChange(id, "approved")} className="flex items-center gap-2 border-[2px] border-green-500 text-green-500 px-4 py-2 rounded-[4px] text-sm font-medium hover:bg-green-600">
                <FaCheck /> Approve
              </button>
              <button onClick={() => handleStatusChange(id, "rejected")} className="flex items-center gap-2 border-[2px]  border-red-500 text-red-500 px-4 py-2 rounded-[4px] text-sm font-medium hover:bg-red-600">
                <FaTimes /> Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Withdrawdetails;