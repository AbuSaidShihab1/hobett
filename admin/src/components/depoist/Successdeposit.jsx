import React,{useState,useEffect} from 'react';
import { FaCheck, FaEdit, FaHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FaSearch, FaRegCommentDots } from "react-icons/fa";
import Header from '../common/Header';
import moment from "moment"
import axios from "axios"
const Successdeposit = () => {
    const transactions = [
        {
          gateway: "Bank Transfer",
          transactionId: "S2CORWQ6WP4R",
          initiated: "2025-02-08 11:12 PM",
          user: "Antonio Ramirez",
          username: "@testing123123123",
          amount: "$10,000.00 USD + $105.00 USD",
          totalAmount: "$10,105.00 USD",
          conversion: "$1.00 USD = 1.00 USD",
          totalConversion: "10,105.00 USD",
          status: "Pending",
        },
        {
          gateway: "Bank Transfer",
          transactionId: "RFBGIUID786Y",
          initiated: "2025-02-06 09:43 AM",
          user: "Ghazanfhar Shafiq",
          username: "@ghazan",
          amount: "$500.00 USD + $10.00 USD",
          totalAmount: "$510.00 USD",
          conversion: "$1.00 USD = 1.00 USD",
          totalConversion: "510.00 USD",
          status: "Pending",
        },
        {
            gateway: "Bank Transfer",
            transactionId: "S2CORWQ6WP4R",
            initiated: "2025-02-08 11:12 PM",
            user: "Antonio Ramirez",
            username: "@testing123123123",
            amount: "$10,000.00 USD + $105.00 USD",
            totalAmount: "$10,105.00 USD",
            conversion: "$1.00 USD = 1.00 USD",
            totalConversion: "10,105.00 USD",
            status: "Pending",
          },
          {
            gateway: "Bank Transfer",
            transactionId: "RFBGIUID786Y",
            initiated: "2025-02-06 09:43 AM",
            user: "Ghazanfhar Shafiq",
            username: "@ghazan",
            amount: "$500.00 USD + $10.00 USD",
            totalAmount: "$510.00 USD",
            conversion: "$1.00 USD = 1.00 USD",
            totalConversion: "510.00 USD",
            status: "Pending",
          },
          {
            gateway: "Bank Transfer",
            transactionId: "S2CORWQ6WP4R",
            initiated: "2025-02-08 11:12 PM",
            user: "Antonio Ramirez",
            username: "@testing123123123",
            amount: "$10,000.00 USD + $105.00 USD",
            totalAmount: "$10,105.00 USD",
            conversion: "$1.00 USD = 1.00 USD",
            totalConversion: "10,105.00 USD",
            status: "Pending",
          },
          {
            gateway: "Bank Transfer",
            transactionId: "RFBGIUID786Y",
            initiated: "2025-02-06 09:43 AM",
            user: "Ghazanfhar Shafiq",
            username: "@ghazan",
            amount: "$500.00 USD + $10.00 USD",
            totalAmount: "$510.00 USD",
            conversion: "$1.00 USD = 1.00 USD",
            totalConversion: "510.00 USD",
            status: "Pending",
          },
          {
            gateway: "Bank Transfer",
            transactionId: "S2CORWQ6WP4R",
            initiated: "2025-02-08 11:12 PM",
            user: "Antonio Ramirez",
            username: "@testing123123123",
            amount: "$10,000.00 USD + $105.00 USD",
            totalAmount: "$10,105.00 USD",
            conversion: "$1.00 USD = 1.00 USD",
            totalConversion: "10,105.00 USD",
            status: "Pending",
          },
          {
            gateway: "Bank Transfer",
            transactionId: "RFBGIUID786Y",
            initiated: "2025-02-06 09:43 AM",
            user: "Ghazanfhar Shafiq",
            username: "@ghazan",
            amount: "$500.00 USD + $10.00 USD",
            totalAmount: "$510.00 USD",
            conversion: "$1.00 USD = 1.00 USD",
            totalConversion: "510.00 USD",
            status: "Pending",
          },
        // Add more transaction data here...
      ];
      const base_url = import.meta.env.VITE_API_KEY_Base_URL;
      const [pending_deposit,set_pending_deposit]=useState([]);
      const pending_deposit_info=()=>{
          axios.get(`${base_url}/admin/successful-deposit`)
          .then((res)=>{
            set_pending_deposit(res.data.data)
            console.log(res.data.data)
          }).catch((err)=>{
            console.log(err)
          })
      }
      useEffect(()=>{
        pending_deposit_info();
      },[])
      const [searchTerm, setSearchTerm] = useState("");
    
  const [searchQuery, setSearchQuery] = useState('');
  const filter_deposit = pending_deposit.filter((transaction) =>
    transaction.payment_method.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className=" w-full font-bai overflow-y-auto">
      <Header/>
          <section className="p-4  ">
            <div className="p-6">
              <div className="w-full  p-4">
                <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Successful Deposits</h1>

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
                <div className="overflow-x-auto">
                <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#4634FF] text-white">
              <th className="p-3  text-left">Gateway</th>
              <th className="p-3  text-left">Method</th>
              <th className="p-3 text-left">Initiated</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Amount</th>
              {/* <th className="p-3">Conversion</th> */}
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
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
                <td className="p-3 text-gray-700">{moment(transaction?.createdAt).format("MMMM Do YYYY, h:mm A")}</td>
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
                {/* <td className="p-3">
                  <div className="text-gray-700">{transaction.conversion}</div>
                  <div className="font-semibold text-gray-700">{transaction.totalConversion}</div>
                </td> */}
                <td className="p-3">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-sm">
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
              </tr>
            ))}
          </tbody>
        </table>
    </div>
              </div>
            </div>
            </div>

          </section>
    </div>
  );
};

export default Successdeposit;