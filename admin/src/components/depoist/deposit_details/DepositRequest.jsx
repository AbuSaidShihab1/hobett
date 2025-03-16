import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Header from "../../common/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment"; // ✅ Import Moment.js

const DepositRequest = () => {
  const [deposit_details, set_deposit_details] = useState(null);
  const { id } = useParams();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const deposit_info = async () => {
    try {
      const res = await axios.get(`${base_url}/admin/single-deposit/${id}`);
      set_deposit_details(res.data.data);
    } catch (err) {
      console.error("Error fetching deposit details:", err);
    }
  };

  useEffect(() => {
    deposit_info();
  }, []);

  if (!deposit_details) return <div>Loading...</div>;

  // Convert date format
  const formattedDate = new Date(deposit_details.createdAt.$date).toLocaleString();

  return (
    <section className="w-full bg-gray-1 font-bai">
      <Header />
      <div className="p-6 w-full flex flex-col">
        <h2 className="text-[25px] font-semibold mb-4 text-gray-700">
          {deposit_details.name} ৳{deposit_details.amount}
        </h2>
        <div className="flex gap-6 w-full">
          {/* Left Panel */}
          <div className="bg-white w-[35%] shadow-sm rounded-lg border-[1px] border-[#eee] p-6 flex-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Deposit Via {deposit_details.payment_method}
            </h3>
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "Date", value:moment(deposit_details?.createdAt).format("MMMM Do YYYY, h:mm A")},
                  { label: "Transaction Number", value: "UOS4HVMF9NS1" }, // Replace if transaction ID is available
                  { label: "Username", value: deposit_details.email, highlight: true },
                  { label: "Method", value: deposit_details.payment_method, bold: true },
                  { label: "Amount", value: `৳${deposit_details.amount.toFixed(2)} BDT`, bold: true },
                ].map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium text-[18px] text-gray-700">{item.label}</td>
                    <td
                      className={`py-2 text-right  text-[17px] ${
                        item.bold ? "font-bold" : ""
                      } ${item.highlight ? "text-blue-500" : "text-gray-900"}`}
                    >
                      {item.value}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3 text-[17px] font-medium text-gray-700">Status</td>
                  <td className="py-3 text-right">
                    <span
                      className={` px-3 py-1 text-[15px]  font-semibold rounded-full ${
                        deposit_details.status === "pending"
                          ? "text-orange-600 bg-orange-100"
                          : deposit_details.status === "approved"
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {deposit_details.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Right Panel */}
          <div className="bg-white shadow-sm w-[65%] rounded-lg p-6 border-[1px] border-[#eee]">
          <h3 className="text-[20px] font-semibold mb-4 text-gray-700">User Deposit Information</h3>
            <p className="text-[17px] mb-[10px] font-medium text-gray-700">Provider Name</p>
            <p className="text-gray-900 mb-3">{deposit_details?.payment_method}</p>
            <p className="text-[17px] mb-[10px] font-medium text-gray-700">Amount</p>
            <p className="text-gray-900 mb-3">৳{deposit_details?.amount}</p>
        
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositRequest;
