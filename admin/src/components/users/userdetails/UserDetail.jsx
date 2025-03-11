import { FaWallet, FaExchangeAlt, FaMoneyBillAlt } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import Header from "../../common/Header";
import { FaBalanceScale, FaSignInAlt, FaBell, FaUserSlash } from "react-icons/fa";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import { RiLoginCircleLine } from "react-icons/ri";
import { IoBanSharp } from "react-icons/io5";
import axios from "axios"
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaGlobe, FaMapPin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddBalanceModal from "./AddBalanceModal";
import { NavLink } from "react-router-dom";
import SubtractBalanceModal from "./SubtractBalanceModal";
import BanUserModal from "./BanUserModal";
const UserDetail = () => {
  const [user_detail,set_user_detail]=useState([]);
  const {id}=useParams();
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [transactionData, setTransactionData] = useState({
    totalDeposit: 0,
    totalWithdraw: 0,
    percentageDifference: 0,
    withdrawTrend: "down",
  });
  const user_info=()=>{
      axios.get(`${base_url}/admin/single-user-details/${id}`)
      .then((res)=>{
        console.log(res.data.data)
        set_user_detail(res.data.data)
      }).catch((err)=>{
        console.log(err)
      })
  }
  useEffect(()=>{
    user_info();
  },[])
  const [data, setData] = useState({
    totalDeposit: 0,
    totalWithdraw: 0,
    todaysDeposit: 0,
    todaysWithdraw: 0,
    depositDifference: 0,
    depositPercentageDifference: 0,
    withdrawDifference: 0,
    withdrawPercentageDifference: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/admin/user-financials/${id}`);
        if (response.data.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user financial data:", error);
      }
    };

    fetchData();
  }, [id]);
  
  // ------------------add-balance-------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubtractModalOpen, setIsSubtractModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);

  return (
   <section className="w-full font-bai bg-gray-100">
    <Header/>
    <div className="p-4  min-w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[25px] font-semibold text-black">User Detail - {user_detail?.name}</h2>
        <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-100">
          <FaExchangeAlt className="inline-block mr-1" /> Login as User
        </button>
      </div>
      <section className="mb-[20px]">
      <div className="grid grid-cols-2 gap-4">
      {/* Today's Deposit Box */}
      <div className="border border-indigo-500 p-4 rounded-lg shadow">
        <span className="flex items-center text-lg font-medium text-black">
          <FaWallet className="mr-2 text-indigo-500" size={20} />
          Today Deposit
        </span>
        <p className="text-3xl font-semibold text-black">৳{data.todaysDeposit.toFixed(2)}</p>
        <div className="mt-2 text-sm text-green-600">
          {data.depositDifference > 0 ? "↑" : "↓"} {data.depositDifference} ৳ ({data.depositPercentageDifference}%)
        </div>
      </div>

      {/* Today's Withdraw Box */}
      <div className="border border-orange-500 p-4 rounded-lg shadow">
        <span className="flex items-center text-lg font-medium text-black">
          <BsBank className="mr-2 text-orange-500" size={20} />
          Today Withdraw
        </span>
        <p className="text-3xl font-semibold text-black">৳{data.todaysWithdraw.toFixed(2)}</p>
        <div className="mt-2 text-sm text-red-600">
          {data.withdrawDifference > 0 ? "↑" : "↓"} {data.withdrawDifference} ৳ ({data.withdrawPercentageDifference}%)
        </div>
      </div>


    </div>
      </section>
      <div className="grid grid-cols-4 gap-4">
      <NavLink to={`/reports/transaction-history?q=${user_detail?.email}`}>
      <div className="flex items-center bg-blue-900 text-white px-4 py-[25px] rounded-lg shadow">
        
       
        <div className="flex-1">
            <p className="text-sm">Balance</p>
            <h3 className="text-xl font-bold">৳{user_detail?.balance} BDT</h3>
          </div>
          <FaMoneyBillAlt size={24} />
        </div>
   </NavLink> 
    <NavLink to={`/deposits/single-deposit-history/${user_detail.email}`}>
    <div className="flex items-center bg-teal-600 text-white px-4 py-[25px] rounded-lg shadow">
          <div className="flex-1">
            <p className="text-sm">Deposits</p>
            <h3 className="text-xl font-bold">৳{user_detail?.deposit} BDT</h3>
          </div>
          <FaWallet size={24} />
        </div>
    </NavLink>
    <NavLink to={`/withdraw/single-withdraw-history/${user_detail._id}`}>
    <div className="flex items-center bg-orange-600 text-white px-4 py-[25px] rounded-lg shadow">
          <div className="flex-1">
            <p className="text-sm">Withdrawals</p>
            <h3 className="text-xl font-bold">৳{user_detail?.withdraw} BDT</h3>
          </div>
          <BsBank size={24} />
        </div>
    </NavLink>
    
        <div className="flex items-center bg-blue-800 text-white p-4 rounded-lg shadow">
          <div className="flex-1">
            <p className="text-sm">Transactions</p>
            <h3 className="text-xl font-bold">{user_detail?.transactions}</h3>
          </div>
          <FaExchangeAlt size={24} />
        </div>
      </div>
    </div>
    <div className="w-full grid grid-cols-5 gap-4 p-4 bg-gray-100">
      <button onClick={() => setIsModalOpen(true)} className="flex justify-center items-center gap-2 bg-green-500 text-white text-[18px] px-6 py-2 rounded-[4px] shadow-md hover:bg-green-600">
        <MdOutlineAccountBalanceWallet className="text-[20px]" /> Balance
      </button>

      {/* Add Balance Modal */}
      <AddBalanceModal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <button onClick={() => setIsSubtractModalOpen(true)} className="flex justify-center items-center gap-2 bg-red-500 text-white px-6 py-2 text-[18px] rounded-[4px] shadow-md hover:bg-red-600">
        <FiMinusCircle className="text-[20px]"/> Balance
      </button>
      <SubtractBalanceModal isOpen={isSubtractModalOpen} onClose={() => setIsSubtractModalOpen(false)} />
      <NavLink to={`/report/login/history?name=${user_detail.name}`}  className="flex justify-center items-center gap-2 bg-blue-600 text-[18px] text-white px-6 py-2 rounded-[4px] shadow-md hover:bg-blue-700">
        <RiLoginCircleLine className="text-[20px]"/> Logins
      </NavLink>
      <NavLink className="flex justify-center items-center gap-2 bg-[#868E96] text-[18px] text-white px-6 py-2 rounded-[4px] shadow-md hover:bg-gray-600" to={`/report/nptification/history?email=${user_detail.email}`}>
      <button className="flex justify-center items-center gap-2">
        <FaBell className="text-[20px]"/> Notifications
      </button>
      </NavLink>
      <button onClick={() => setIsBanModalOpen(true)} className="flex justify-center items-center gap-2 bg-[#FF9F43] text-[18px] text-white px-6 py-2 rounded-[4px] shadow-md hover:bg-orange-500">
        <IoBanSharp className="text-[20px]"/> Ban User
      </button>
      <BanUserModal isOpen={isBanModalOpen} onClose={() => setIsBanModalOpen(false)} />
    </div>
    {/* ---------------profile-information------------------------- */}
   <div className="p-[20px]">
   <div className="w-full p-[10px] bg-white shadow-md border-[1px] border-[#eee]">
      <h2 className="text-lg font-semibold mb-5  pb-2 text-gray-800">Information of {user_detail?.name}</h2>
      <div>
          <label className="block text-[16px] font-medium text-gray-700 mb-[4px]">First Name *</label>
          <div className="flex items-center border-[1px] border-[#eee] rounded-[5px] p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input type="text" value={user_detail?.name} className="w-full outline-none text-[16px] font-medium text-gray-700" />
          </div>
        </div>
        <div>
          <label className="block text-[16px] font-medium text-gray-700 mb-[4px] mt-[15px]">Email *</label>
          <div className="flex items-center border-[1px] border-[#eee] rounded-[5px]  p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input type="email" value={user_detail?.email} className="w-full outline-none text-[16px] font-medium text-gray-700" readOnly />
          </div>
        </div>
        <button className="mt-[15px] px-[20px] py-[10px] text-center text-white text-[15px] bg-indigo-500 w-full rounded-[5px]">Submit</button>
    </div>
   </div>
    {/* ---------------profile-information------------------------- */}
   </section>
  );
};

export default UserDetail;
