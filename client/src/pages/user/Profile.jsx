import { useState,useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { RiVipCrownFill } from "react-icons/ri";
import Sidebar from "../../components/Sidebar";
import { BiSupport } from "react-icons/bi";
import { FaBars, FaTimes, FaUser, FaHeart, FaGift, FaCrown, FaTh, FaBolt, FaTrophy, FaMobileAlt, FaFacebook, FaInstagram, FaTelegram, FaEnvelope, FaWifi } from "react-icons/fa";
import Header from "../../components/Header";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaBell, FaChevronDown } from "react-icons/fa";
import moment from "moment"; // ✅ Import Moment.js
import { FaCopy, FaUserFriends } from "react-icons/fa";
import { MdOutlineGroupAdd } from "react-icons/md";
import axios from "axios";
import { MdContentCopy } from "react-icons/md";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("my-account");
 const [wifiSpeed, setWifiSpeed] = useState(null);
 const [selectedFilters, setSelectedFilters] = useState([]);
 const [dropdownOpen, setDropdownOpen] = useState(false);
 const [calendarOpen, setCalendarOpen] = useState(false);
 const [selectedDates, setSelectedDates] = useState([]);
//  const base_url="https://hobet-site.onrender.com";
const base_url=import.meta.env.VITE_API_KEY_Base_URL;
const frontend_url=import.meta.env.VITE_API_KEY_Fontend;

  const games = [
    {
      id: "3486605011",
      date: "11.02.2025",
      time: "14:03",
      game: "Poker",
      result: "+500 ৳",
      status: "win",
    },
    {
      id: "3486594771",
      date: "11.02.2025",
      time: "14:01",
      game: "Blackjack",
      result: "-200 ৳",
      status: "loss",
    },
    {
      id: "3478061011",
      date: "10.02.2025",
      time: "15:10",
      game: "Roulette",
      result: "+300 ৳",
      status: "win",
    },
  ];
 const filters = [
   { category: "All", options: [] },
   { category: "Transaction Type", options: ["Deposit", "Withdraw", "Casino bet"] },
   { category: "Bonus", options: ["Level Up Bonus", "Extra Bonus", "Weekly Bonus", "Monthly Bonus"] }
 ];
 const transactionsData = [
  {
    id: "2486605011",
    date: "11.02.2025",
    time: "14:03",
    type: "Deposit",
    amount: "+600 ৳",
    status: "red",
  },
  {
    id: "2486594771",
    date: "11.02.2025",
    time: "14:01",
    type: "Deposit",
    amount: "+600 ৳",
    status: "red",
  },
  {
    id: "2478061011",
    date: "10.02.2025",
    time: "15:10",
    type: "Deposit",
    amount: "+600 ৳",
    status: "yellow",
  },
];
const user = {
  name: "Shihab",
  email: "shihabmoni77@gmail.com",
  phone: "016844941043",
  pin: "4223",
  currency: "BDT",
  role: "user",
  balance: 0,
  deposit: 0,
  withdraw: 0,
  invest: 0,
  accountId: "394868435",
  birthday: "1970.01.01",
};
const [filter, setFilter] = useState("");

const filteredTransactions = transactionsData.filter((transaction) =>
  transaction.type.toLowerCase().includes(filter.toLowerCase())
);

 const toggleFilter = (filter) => {
   setSelectedFilters((prev) =>
     prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
   );
 };

 const toggleDateSelection = (date) => {
   setSelectedDates((prev) =>
     prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
   );
 };

 const [activeSection, setActiveSection] = useState("personal-info");
 const [expandedSections, setExpandedSections] = useState({});

 const toggleSection = (section) => {
   setExpandedSections((prev) => ({
     ...prev,
     [section]: !prev[section],
   }));
 };
    useEffect(() => {
      // Check the connection speed using the navigator.connection API
      if (navigator.connection) {
        const connection = navigator.connection;
        setWifiSpeed(connection.downlink); // Get the current downlink speed in Mbps
  
        // Listen to changes in network speed
        const updateSpeed = () => {
          setWifiSpeed(connection.downlink);
        };
  
        connection.addEventListener("change", updateSpeed);
        return () => connection.removeEventListener("change", updateSpeed);
      }
    }, []);
  const user_info=JSON.parse(localStorage.getItem("user"))
  const [user_details,set_userdetails]=useState([])
  const user_data=()=>{
    axios.get(`${base_url}/auth/user/${user_info?._id}`, {
      headers: {
          'Authorization': localStorage.getItem('token')
      }
  })
    .then((res)=>{
      console.log(res)
      if(res.data.success){
        set_userdetails(res.data.user)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }   
  useEffect(()=>{
    user_data();
  },[])
  // ------------------transactions-tab-----------------------------------

  const [transaction_info,set_transaction_info]=useState([]);
  const transaction_history=()=>{
      axios.get(`${base_url}/user/single-user-transactions/${user_info._id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
      .then((res)=>{
        console.log(res)
          if(res.data.success){
            console.log(res.data.data)
            set_transaction_info(res.data.data)
          }
      }).catch((err)=>{
          console.log(err.name)
      })
  };
  useEffect(()=>{
    transaction_history()
  },[])
  // -------------withdrawal-history--------------------
  const [withdrawal_info,set_withdrawal_info]=useState([]);
  const withdrwal_history=()=>{
      axios.get(`${base_url}/user/withdrawal/${user_info._id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
      .then((res)=>{
        console.log(res)
          if(res.data.success){
            console.log(res.data.data)
            set_withdrawal_info(res.data.data)
          }
      }).catch((err)=>{
          console.log(err.name)
      })
  };
  useEffect(()=>{
    withdrwal_history()
  },[])
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };
  // ------------change-password-----------------
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Additional validation (e.g., check password strength) can go here

    // If everything is valid, proceed with the password change
    console.log("Password changed successfully!");
    setError(""); // Clear any previous errors
  };
  // ------------referal------------------
  const [referralCode] = useState("GMUCB47658");
  const referralLink = `https://www.website.eassypay.com?refer_code=${referralCode}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };
  return (
   <section className='w-full h-full bg-dark_theme flex justify-center font-bai overflow-hidden'>
    <Sidebar/>
    <section className="w-[100%] xl:w-[82%]  xl:pb-[20px] h-[100vh] overflow-auto">
   <Header/>
   <div className="bg-gray-800 text-white xl:px-[20px]  p-[10px] py-[20px] xl:p-6 ">
  <div className="flex flex-col xl:flex-row min-h-screen gap-[20px] pb-[100px]">
    {/* Sidebar */}
    <aside className="w-full xl:w-64 shadow-md lg:p-5 xl:p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center rounded-full">
          <FaUser className="text-white text-xl" />
        </div>
        <div>
          <h3 className="font-bold">{user_details.name}</h3>
        </div>
      </div>

      <div className="mb-5 p-3 border-[2px] border-gray-700 rounded-[5px]">
        <p className="text-[18px] font-[600] text-bg5">Real money</p>
        <p className="font-bold text-white">৳{user_details.balance?.toFixed(2)}</p>
      </div>
      <div className="mb-5 p-3 border-[2px] border-gray-700 rounded-[5px]">
        <p className="text-sm">Bonus money</p>
        <p className="font-bold">৳0.00</p>
      </div>

      {/* Sidebar Links */}
      <nav>
        <h4 className="font-bold mb-2">My account</h4>
        <button
          className={`w-full flex justify-between px-3 py-[10px] rounded-[5px] ${activeSection === "personal-info" ? "bg-bg5" : "hover:bg-bg4"}`}
          onClick={() => setActiveSection("personal-info")}
        >
          Personal info
        </button>
        <button
          className={`w-full mt-[10px] flex justify-between px-3 py-[10px] rounded-[5px] ${activeSection === "Transactions" ? "bg-bg5" : "hover:bg-bg4"}`}
          onClick={() => setActiveSection("Transactions")}
        >
          Deposit History
        </button>
        <button
          className={`w-full mt-[10px] flex justify-between px-3 py-[10px] rounded-[5px] ${activeSection === "Withdrawal History" ? "bg-bg5" : "hover:bg-bg4"}`}
          onClick={() => setActiveSection("Withdrawal History")}
        >
          Withdrawal History
        </button>
        <button
          className={`w-full mt-[10px] flex justify-between px-3 py-[10px] rounded-[5px] ${activeSection === "Referal" ? "bg-bg5" : "hover:bg-bg4"}`}
          onClick={() => setActiveSection("Referal")}
        >
          Referal
        </button>
        <button
          className={`w-full mt-[10px] flex justify-between px-3 py-[10px] rounded-[5px] ${activeSection === "Change Password" ? "bg-bg5" : "hover:bg-bg4"}`}
          onClick={() => setActiveSection("Change Password")}
        >
          Change Password
        </button>
      </nav>
    </aside>

    {/* Main Content */}
    <main className="flex-1 lg:p-10 shadow-md xl:p-5">
      {activeSection === "personal-info" && (
        <div>
          <h2 className="text-[18px] xl:text-2xl font-bold mb-5">Personal info</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm">Username</label>
              <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]" defaultValue={user_details?.name} />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input type="email" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]" defaultValue={user_details?.email} />
            </div>
            <div>
              <label className="block text-sm">Player ID</label>
              <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]" defaultValue={user_details?.player_id} />
            </div>
            <div>
              <label className="block text-sm">Currency</label>
              <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]" defaultValue="BDT" />
            </div>
            <div>
              <label className="block text-sm">Country</label>
              <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]" defaultValue="Bangladesh" />
            </div>
            <div>
              <label className="block text-sm">ID</label>
              <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]" defaultValue={user_details?._id} />
            </div>
            <div>
              <label className="block text-sm">Referral Code</label>
              <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px] text-bg5" defaultValue={`https://hobet.com/` + user_details?.referralCode} />
            </div>
            <div className="col-span-2">
              <button className="w-full bg-bg4 p-3 text-white font-bold rounded-md">SUBMIT</button>
            </div>
          </form>
        </div>
      )}

      {activeSection === "Transactions" && (
        <div>
          <h2 className="text-[17px] lg:text-[20px] xl:text-2xl font-bold mb-5">Deposit History</h2>
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-700 shadow-lg rounded-lg">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="p-3 border border-gray-700">Type</th>
                    <th className="p-3 border border-gray-700">Payment Method</th>
                    <th className="p-3 border border-gray-700">Amount</th>
                    <th className="p-3 border border-gray-700">Date</th>
                    <th className="p-3 border border-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction_info.length > 0 ? (
                    transaction_info.map((transaction, index) => (
                      <tr
                        key={transaction._id}
                        className={index % 2 === 0 ? "bg-gray-800 hover:bg-gray-700 transition-colors" : "bg-gray-700 hover:bg-gray-600 transition-colors"}
                      >
                        <td className={`p-3 border border-gray-700 ${transaction.payment_type === "Deposit" ? "text-green-500" : "text-orange-500"}`}>{transaction.payment_type}</td>
                        <td className="p-3 border border-gray-700">{transaction.payment_method}</td>
                        <td className="p-3 border border-gray-700">{transaction.amount}</td>
                        <td className="p-3 border border-gray-700">{moment(transaction.createdAt).fromNow()}</td>
                        <td className={`p-3 border border-gray-700 font-bold ${getStatusColor(transaction.status)}`}>{transaction.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-5">
                        <div className="flex flex-col items-center">
                          <img src="https://bc.game/assets/common/empty.png" alt="No Data" className="w-32 h-32 mb-2" />
                          <p className="text-gray-400">Oops! There is no data yet!</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeSection === "Withdrawal History" && (
        <div>
          <h2 className="text-[17px] lg:text-[20px] xl:text-2xl font-bold mb-5">Withdrawal History</h2>
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-700 shadow-lg rounded-lg">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="p-3 border border-gray-700">Payment Provider</th>
                    <th className="p-3 border border-gray-700">Amount</th>
                    <th className="p-3 border border-gray-700">Order ID</th>
                    <th className="p-3 border border-gray-700">Payee Account</th>
                    <th className="p-3 border border-gray-700">Date</th>
                    <th className="p-3 border border-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawal_info.length > 0 ? (
                    withdrawal_info.map((transaction, index) => (
                      <tr
                        key={transaction._id}
                        className={index % 2 === 0 ? "bg-gray-800 hover:bg-gray-700 transition-colors" : "bg-gray-700 hover:bg-gray-600 transition-colors"}
                      >
                        <td className="p-3 border border-gray-700">{transaction.provider}</td>
                        <td className="p-3 border border-gray-700">৳ {transaction.amount}</td>
                        <td className="p-3 border border-gray-700">{transaction.orderId}</td>
                        <td className="p-3 border border-gray-700">{transaction.payeeAccount}</td>
                        <td className="p-3 border border-gray-700">{moment(transaction.createdAt).fromNow()}</td>
                        <td className={`p-3 border border-gray-700 font-bold ${transaction.status === "pending" ? "text-yellow-400" : transaction.status === "success" ? "text-green-500" : "text-red-500"}`}>
                          {transaction.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center p-5">
                        <div className="flex flex-col items-center">
                          <img src="https://bc.game/assets/common/empty.png" alt="No Data" className="w-32 h-32 mb-2" />
                          <p className="text-gray-400">Oops! There is no data yet!</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeSection === "Game History" && (
        <div>
          <h2 className="text-[17px] lg:text-[20px] xl:text-2xl font-bold mb-5">Game History</h2>
        </div>
      )}
      {activeSection === "Referal" && (
     <div className="  flex items-center justify-center ">
     <div className="w-full">
       {/* Header Section */}
       <div className=" bg-gradient-to-b from-[#0F0D29] to-[#1B1440] text-white p-5 rounded-lg flex items-center justify-between shadow-md">
         <h2 className="text-[16px] lg:text-[18px] font-[600]">আপনার রেফারেল কোড শেয়ার করুন</h2>
         <span className="text-[16px] lg:text-[18px] font-[600]">৳{user_details?.balance}</span>
       </div>

       {/* Referral Code Section */}
       <div className="mt-6">
         <h3 className="text-lg font-semibold text-gray-200">রেফারেল কোড:</h3>
         <div className="flex items-center bg-gray-800 px-3 py-[8px] rounded-[4px] justify-between mt-2 border border-gray-600">
           <span className="font-medium text-indigo-400 text-[14px]">{user_details?.referralCode}</span>
           <button onClick={() => handleCopy(referralCode)} className="text-indigo-600 hover:text-indigo-800 transition">
             <MdContentCopy size={20} />
           </button>
         </div>
       </div>

       {/* Referral Link Section */}
       <div className="mt-4">
         <h3 className="text-lg font-semibold text-gray-800">আমার লিংক:</h3>
         <div className="flex items-center bg-gray-800 p-3 rounded-[4px] justify-between mt-2 border border-gray-500">
           <span className="truncate text-indigo-400 text-sm">{`${ frontend_url+'/'+user_details?.referralCode}`}</span>
           <button onClick={() => handleCopy(referralLink)} className="text-indigo-400 hover:text-indigo-800 transition">
             <MdContentCopy size={20} />
           </button>
         </div>
       </div>

       {/* Referral Commission */}
       <div className="mt-6">
         <h3 className="text-[16px] font-semibold text-gray-200">আজীবন রেফারেল কমিশন</h3>
         <p className="text-sm text-gray-300 mt-[5px]">আপনার বন্ধুরা আমানত করলে আপনি কমিশন পাবেন।</p>
       </div>

       {/* Referral Stats */}
       <div className="mt-6  bg-gradient-to-b from-[#0F0D29] to-[#1B1440] p-4 rounded-lg shadow-md">
         <div className="flex items-center justify-between bg-gradient-to-b from-[#0F0D29] to-[#1B1440] p-3 rounded-lg shadow-sm border border-gray-500">
           <span className="font-medium text-white">স্তর 1 (1%)</span>
           <span className="text-white font-semibold">0</span>
         </div>
         <div className="flex items-center justify-between bg-gradient-to-b from-[#0F0D29] to-[#1B1440] p-3 rounded-lg shadow-sm border border-gray-500 mt-2">
           <span className="font-medium text-white">স্তর 2 (0.7%)</span>
           <span className="text-white font-semibold">0</span>
         </div>
         <div className="flex items-center justify-between bg-gradient-to-b from-[#0F0D29] to-[#1B1440] p-3 rounded-lg shadow-sm border border-gray-500 mt-2">

           <span className="font-medium text-white">স্তর 3 (0.3%)</span>
           <span className="text-white font-semibold">0</span>
         </div>
       </div>

       {/* Invite Friends Button */}
       <div className="mt-6 text-center">
         <button className=" bg-gradient-to-b from-[#0F0D29] to-[#1B1440] text-white px-6 py-3 rounded-lg flex items-center justify-center shadow-lg transition">
           <FaUserFriends className="mr-2" /> বন্ধুদের আমন্ত্রণ জানান
         </button>
       </div>

       {/* Referral Bonus */}
       <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
         <h3 className="text-lg font-semibold text-gray-800">রেফারেল বোনাস</h3>
         <p className="text-sm text-gray-600">রেফারেলের ফ্রি বোনাস: <span className="font-semibold text-indigo-700">0.00</span></p>
       </div>
     </div>
   </div>
      )}
      {activeSection === "Change Password" && (
        <div>
          <h2 className="text-[17px] lg:text-[20px] xl:text-2xl font-bold mb-5">Change Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-300">Current Password</label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]"
              />
            </div>

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-300">New Password</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">Confirm New Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button type="submit" className="w-full px-4 py-2 mt-4 bg-bg4 text-white rounded-[4px]">
              Change Password
            </button>
          </form>
        </div>
      )}
    </main>
  </div>
</div>

    </section>
   </section>
  );
};

export default Profile;