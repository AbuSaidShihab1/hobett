import axios from 'axios';
import React, { useState, useEffect, useReducer, useRef } from 'react'
import { BiSupport } from "react-icons/bi";
import { FaBars, FaTimes, FaUser, FaHeart, FaGift, FaCrown, FaTh, FaBolt, FaTrophy, FaMobileAlt, FaFacebook, FaInstagram, FaTelegram, FaEnvelope, FaWifi } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router';
import AuthModal from './modal/AuthModal';
import { BsChatDotsFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Confetti from 'react-confetti';
import { PiCoinsDuotone } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa";
import { useWindowSize } from "react-use"; // To get screen size for confetti
import { nanoid } from "nanoid";
import { IoIosArrowBack } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import fire_gif from "../assets/fire.gif"
import Logo from './Logo';
import BottomNav from './BottomNav ';
import Logo2 from './Logo2';
import { TbLogout } from "react-icons/tb";
import { RxRocket } from "react-icons/rx";
import spin_img from "../assets/spin.png"
// Reducer function for managing sidebar state
function sidebarReducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return true;
    case "CLOSE":
      return false;
    case "TOGGLE":
      return !state;
    default:
      return state;
  }
}
const paymentMethods = {
  deposit: [
    { name: "Bkash", src: "https://elon.casino/icons-elon/payments/218.svg", amount: 300},
    { name: "Nagad", src: "https://elon.casino/icons-elon/payments/223.svg", amount: 300 },
    { name: "Rocket", src: "https://elon.casino/icons-elon/payments/103.svg", amount: 300 },
  
    // Crypto Deposit Methods
    { name: "Binance Pay", src: "https://origin-r2.ibbf55-resources.com/ContentCommon/payments/icons/new/ib_NEW_binance_pay_1.svg", amount: 300,bonus:"No Bonus"},
    { name: "Bitcoin (BTC)", src: "https://origin-r2.ibbf55-resources.com/ContentCommon/payments/icons/new/ib_NEW_cryptoprocessing_btc_1.svg", amount: 300,bonus:"No Bonus" },
    { name: "Ethereum (ETH)", src: "https://origin-r2.ibbf55-resources.com/ContentCommon/payments/icons/new/ib_NEW_cryptoprocessing_eth_1.svg", amount: 300,bonus:"No Bonus"},
    { name: "Litecoin (LTC)", src: "https://origin-r2.ibbf55-resources.com/ContentCommon/payments/icons/new/ib_NEW_cryptoprocessing_ltc_1.svg", amount: 300,bonus:"No Bonus" },
    { name: "Solana (SOL)", src: "https://origin-r2.ibbf55-resources.com/ContentCommon/payments/icons/new/ib_NEW_sol_1.svg", amount: 300,bonus:"No Bonus" },
    { name: "Cardano (ADA)", src: "https://origin-r2.ibbf55-resources.com/ContentCommon/payments/icons/new/ib_NEW_cryptoprocessing_ada_1.svg", amount: 300,bonus:"No Bonus" },
  ],
  
    withdraw: [
      { name: "Bkash", src: "https://elon.casino/icons-elon/payments/218.svg",amount:300 },
      { name: "Nagad", src: "https://elon.casino/icons-elon/payments/223.svg",amount:300 },
      { name: "Rocket", src: "https://elon.casino/icons-elon/payments/103.svg",amount:300 },
    ],
  };
const Header = () => {
  const user_info = JSON.parse(localStorage.getItem("user"))
  const [wifiSpeed, setWifiSpeed] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  // const base_url = "https://hobet-site.onrender.com";
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const base_url2 = import.meta.env.VITE_API_KEY_Base_URL2;
  const frontend_url=import.meta.env.VITE_API_KEY_Fontend;
  
  const [isSidebarOpen, dispatch] = useReducer(sidebarReducer, false);
  const navigate = useNavigate();
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
  const [currency, setCurrency] = useState("BDT");
  const user_data = () => {
    axios.get(`${base_url}/auth/user/${user_info?._id}`, {
      headers: {
          'Authorization': localStorage.getItem('token')
      }
  })
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          set_userdetails(res.data.user)
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    user_data();
  }, [])
  // ----logout function-------------------
  // logout funtion 
  const logoutfunction  = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Logout Successfully!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };
  const handlelogin = () => {
    setModalOpen(true)
  }
  const handlesignup = () => {
    setModalOpen(true);

  }
  const [isOpen, setIsOpen] = useState(false);
  // ----------------welcome-animation-------------------
  // -------------paymnet-methods--------------------------
  const [activeTab, setActiveTab] = useState("casino");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("deposit");
  const [amount, setAmount] = useState(0);
  const [phone, setPhone] = useState("");
  const [agentNumber, setAgentNumber] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionid,settransactionid]=useState("")
  const [isCopied, setIsCopied] = useState(false);  // To track the copied state
  const [loading, setLoading] = useState(false);
  const [active_tab,set_activetab]=useState("make_payment")
  const [orderId, setOrderId] = useState("");
  const [paymnet_id,set_paymentid]=useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { width, height } = useWindowSize(); // Get window size for confetti
  const merchant_name="hobet"

  useEffect(() => {
    setOrderId(nanoid(8));
  }, []);
  // ------------random agent number
  const handleCopy = () => {
    navigator.clipboard.writeText(agentNumber);  // Copy the agent number to clipboard
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);  // Reset after 2 seconds
  };
  const [random_agent,set_radom_agent]=useState([]);
  const random_agent_number=()=>{
      axios.get(`${base_url2}/api/user/checkout-page-agent/${merchant_name}`)
      .then((res)=>{
        console.log(res.data);
        set_radom_agent(res.data)
        setAgentNumber(res.data.accountNumber)
      }).catch((err)=>{
        console.log(err)
      })
  }
  useEffect(()=>{
       random_agent_number();     
  },[])
  // Preset amounts
  const presetAmounts = [300, 400, 600, 1000, 2000];

  const [user_details,set_userdetails]=useState([])


  useEffect(()=>{
    if(user_info){
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
    user_data();

    }
  },[])
  // Handle preset amount selection
  const handlePresetAmount = (value) => {
    setTransactionAmount(value);
  };
  useEffect(() => {
    if (user_details.balance === 0) {
      const timeout = setTimeout(() => {
        setPopupOpen(true);
      }, 100); // 3 minutes

      return () => clearTimeout(timeout); // Cleanup on component unmount
    }
  }, [user_details.balance]);
  // -------------------make-paymnet-data-first------------------------
  // const handle_paymnet_submit = async (e) => {
  //   e.preventDefault();
  //   const postData = {
  //     provider:selectedMethod.name,
  //     amount:transactionAmount,
  //     mid: "shihab",
  //     orderId: orderId,
  //     currency: "BDT",
  //     payerId: user_info.player_id,
  //     redirectUrl: "http://localhost:5173/profile",
  //   };
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:6001/api/payment/payment`,
  //       postData
  //     );
  //     if (response.data.success) {
  //       toast.success("Please send money and fill up information!");
  //        set_activetab("checkout");
  //        set_paymentid(response.data.paymentId)
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error!",
  //         text: response.data.message || "Payment failed.",
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: error.message || "Something went wrong.",
  //     });
  //   }
  // };
  // console.log(paymnet_id)
  // Handle form submission
  const [progress, setProgress] = useState(0); // New state to track progress
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${base_url2}/api/payment/paymentSubmit`, {
      paymentId: paymnet_id,
      provider: "bkash",
      agentAccount: agentNumber,
      payerAccount: phone,
      transactionId: transactionid,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success) {
        axios.put(`${base_url2}/auth/update-user-balance/${user_info._id}`,{amount}, {
          headers: {
              'Authorization': localStorage.getItem('token')
          }
      })
        .then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
        toast.success(res.data.message);
        setPaymentSuccess(true); // Trigger confetti animation
        setTimeout(() => setPaymentSuccess(false), 5000); // Hide confetti after 5s
        // setPopupOpen(false)
      } else {
        toast.error(res.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
    });

    setLoading(false);
  };
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [deposit_message,set_deposit_message]=useState("")
  const handle_bkash_deposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(20); // Set initial progress
    // Validation logic
    // if (!mid.trim()) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Validation Error",
    //     text: "Merchant ID (mid) is required!",
    //   });
    //   return;
    // }

    // if (!payerId.trim()) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Validation Error",
    //     text: "Payer ID is required!",
    //   });
    //   return;
    // }

    if (!transactionAmount) {
      toast.error("Enter a valid amount between 300 BDT and 10000 BDT!");
      setLoading(false);
      set_deposit_message("Enter a valid amount between 300 BDT and 10000 BDT!")
      setProgress(0);
      return;
    }
    console.log(selectedMethod)
      if(selectedMethod.name==="Bkash"){
    setLoading(true);

    // If all validations pass
    try {
      const {data} = await axios.post(`${base_url2}/api/payment/bkash`,{mid:"hobet",payerId:user_details.player_id,amount:transactionAmount,currency:"BDT",redirectUrl:`${frontend_url}`,orderId:orderId,callbackUrl:`${frontend_url}/callback-payment`});
      setProgress(70); // Update progress on successful request
      console.log(data)
      if (data.success) {
        window.location.href = data.link;
        console.log("Deposit Success:", data.message);
        setTransactionAmount("")
        setOrderId("")
      }
       else{
        console.log(data.message)
        set_deposit_message(data.message)
         toast.error("error",data.message,"error")
        console.error("Deposit Error:", data.data);
      }
    } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: error.response?.data?.message || "Failed to connect to the server. Please try again later.",
    //   });
      console.log(error);
      toast.error(error.name);

    }finally {
      setLoading(false);
      setProgress(100); // Finalize progress
    }
      }else{
        setLoading(false);
        setProgress(0);
        toast.error("Something went wrong.This payment is not included!");
      }

  };
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
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

    // ------------------withdraw--------------------
    const [payeer_account,setpayeer_account]=useState("")
    const [withdraw_message,setwithdraw_message]=useState("")
    const handlewithdraw = (e) => {
      e.preventDefault();
    
      const amount = parseFloat(transactionAmount);
    
      if (isNaN(amount) || amount < 300) {
        toast.error("Withdrawal must be greater than 300 Taka.");
        setwithdraw_message("Withdrawal must be greater than 300 Taka.");
        return;
      }
      if (user_details?.balance < 300) {
        toast.error("You have not enough balance!");
        setwithdraw_message("You have not enough balance!");
        return;
      }
      if (amount > 10000) {
        toast.error("Withdrawal must be less than 10,000 Taka.");
        setwithdraw_message("Withdrawal must be less than 10,000 Taka.");
        return;
      }
    
      // Check if user is eligible based on deposit_money and bet_number
      if (user_details.deposit_money > user_details.bet_deposit ) {
        toast.error("You are not eligible for withdrawal.");
        setwithdraw_message("You are not eligible for withdrawal.");
        return;
      }
    
      // Check if bet_deposit is 3 times deposit_money
      const totalDeposit = user_details.deposit_money * 3;
      let finalAmount = amount;
      let taxAmount = 0;
    
      if (user_details.bet_deposit < totalDeposit) {
        taxAmount = amount * 0.2;
        finalAmount = amount - taxAmount; // Deduct 20%
    
        // Show SweetAlert2 confirmation popup
        Swal.fire({
          title: "Withdrawal Fee Notice",
          text: `20% (${taxAmount} Taka) will be deducted due to withdrawal policy. You will receive ${finalAmount} Taka instead.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Accept",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            processWithdraw(finalAmount, taxAmount);
          }
        });
    
        return; // Stop execution until user confirms
      }
    
      // If no fee, proceed immediately with full amount
      processWithdraw(finalAmount, taxAmount);
    };
    
    
    // Function to process withdrawal request
    const processWithdraw = (finalAmount, taxAmount) => {
      axios
        .post(`${base_url}/user/payout`, {
          username: user_info?.name,
          email: user_info.email,
          amount: finalAmount + taxAmount, // Original requested amount
          playerId: user_info.player_id,
          userId: user_info._id,
          tax_amount: taxAmount, // 20% tax if applicable, otherwise 0
          recieved_amount: finalAmount, // Amount after deduction
          provider: selectedMethod.name,
          orderId: `order_${Date.now()}`,
          post_balance: user_details.balance,
          payeeAccount: payeer_account,
        }, {
          headers: {
              'Authorization': localStorage.getItem('token')
          }
      })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            user_data();
            setTransactionAmount("");
            setpayeer_account("")
            setSelectedMethod(null)
          } else {
            setwithdraw_message(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong. Please try again.");
        });
    
      setPopupOpen(false);
      setPaymentSuccess(true);
      setSuccessPopupVisible(true);
    
      setTimeout(() => {
        setPaymentSuccess(false);
        setSuccessPopupVisible(false);
      }, 5000);
    
      setLoading(false);
    };
    
    
    // ---------bonus-sidebar------------------
    const [bonuspopup, setbonuspopup] = useState(false);
    
    //----------menu-item---------------------------------
    const [menuOpen, setMenuOpen] = useState(false);

    // -------------close popup-------------
    const handleclosepopup=()=>{
      setSelectedMethod(null)
     setPopupOpen(false);
     setTransactionAmount("")

    }

    // -----------------------notification---------------------------
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
  
    // Fetch notifications using Axios
    const all_notifications=()=>{
      axios
      .get(`${base_url}/admin/notifications/${user_info?.email}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
      .then((response) => {
        if (response.data.success) {
          setNotifications(response.data.data);
          setFilteredNotifications(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
    }
    useEffect(() => {
      all_notifications();
    }, []);
   // Delete notification
   const deleteNotification = (id) => {
    axios
      .delete(`${base_url}/admin/notifications/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
      .then((res) => {
         if(res.data.success){
               all_notifications();
         }
      })
      .catch((err) => console.error("Error deleting notification:", err));
  };
    // Handle tab filtering
    const handleTabClick = (category) => {
      setActiveTab(category);
      if (category === "All") {
        setFilteredNotifications(notifications);
      } else {
        setFilteredNotifications(
          notifications.filter((notif) => notif.category === category)
        );
      }
    };
    const dropdownRef = useRef(null);

    // ---------------deposit-back-button------------------
    const handledepositback=()=>{
       setSelectedMethod(null);
       setAmount();
       setpayeer_account()
    }
    const handlewithdrawback=()=>{
      setSelectedMethod(null);
      setTransactionAmount();
      setpayeer_account();
      setwithdraw_message("")
   }
  //  ---------deposit--------------------
  const bonuses = [
    { name: "125% Deposit Bonus", img: "https://origin-r2.ibbf55-resources.com/ContentCommon/payments/offers/casino2.png" },
    { name: "250 Free Spin", img: "https://origin-r2.ibbf55-resources.com/ContentCommon/payments/offers/sport1.png" },
  ];
  
  const [bonusDropdown, setBonusDropdown] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState(bonuses[0]);
  const [paymentDropdown, setPaymentDropdown] = useState(false);

  return (
    <div className=' sticky top-0 bg-gray-900 shadow-xl border-b-[1px] border-gray-700 left-0 z-[100]'>
      <div className=" hidden xl:flex  text-white p-4  justify-between items-center">
        {/* Left side - Flag and Menu */}
           <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              bottom: '20px',
            },
          }}
        />
        {/* <div className=" fixed bottom-6 right-6 z-50">
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="w-80 h-96 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white flex justify-between items-center">
                <span className="font-semibold">Welcome to Hobet Games 👋</span>
                <button onClick={() => setIsOpen(false)} className="text-lg">✖</button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">We reply immediately</div>
              <div className="p-2 border-t flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 p-2 border text-gray-700 rounded-md focus:outline-none"
                />
                <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg">➤</button>
              </div>
            </motion.div>
          ) : (
            <div
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center w-14 h-14 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform"
            >
              <BsChatDotsFill className="text-white text-2xl" />
            </div>
          )}
        </div> */}
        {/* ----------------------------spin-game------------------------ */}
          <div className='fixed bottom-[2%] right-[1%]'>
            <img className='w-[100px]' src={spin_img} alt="" />
          </div>
        {/* -----------------------spin-game------------------------- */}
        <div className="flex items-center space-x-4">
          {/* Left Side: Navigation Links */}
          <div className="flex justify-between items-center w-full py-3 bg-gray-900">
            {/* Left-side navigation */}
            <ul className="flex items-center gap-6 text-white text-sm font-medium">
              <NavLink to="/" className="hover:text-blue-400 text-[16px] text-nowrap">Home</NavLink>
              <NavLink to="/live" className="hover:text-blue-400 text-[16px] text-nowrap">Live</NavLink>
              <NavLink to="/sports" className="hover:text-blue-400 text-[16px] text-nowrap">Sports</NavLink>
              <NavLink to="/casino" className="hover:text-blue-400 text-[16px] text-nowrap">Casino</NavLink>
              <NavLink to="/esports" className="hover:text-blue-400 text-[16px] text-nowrap">eSports</NavLink>
              <NavLink to="/twain-sport" className="hover:text-blue-400 text-[16px] text-nowrap mr-6">Twain Sport</NavLink>
            </ul>

            {/* Right-side navigation */}
            <ul className="flex items-center gap-6 text-white text-sm font-medium">
              <NavLink to="/promotions" className="hover:text-yellow-400 text-nowrap  text-[16px] flex items-center gap-1">
                Promotions
                 🔥
              </NavLink>
              <NavLink to="/vip" className="hover:text-yellow-400 text-nowrap text-[16px] flex items-center gap-1">
                VIP
                🔥
              </NavLink>
            </ul>
          </div>

          {/* Hamburger Icon */}
          {/* <div className="text-white text-xl cursor-pointer">
          <i className="fa fa-bars"></i>
          
        </div> */}
        </div>

        {/* Center - Empty, can be filled with logo or text */}


        {/* Right side - Login/Sign Up and Help */}
        {
          user_info ? <div className="flex justify-center bg-gray-900 p-3 rounded-xl w-fit space-x-3 text-white shadow-lg">
            {/* Balance Section */}
            <div className="flex items-center bg-gray-800 px-4 py-2 rounded-[4px] space-x-2 shadow-md">
              <span className="text-gray-400 text-[15px] font-[500] flex items-center">{currency} <IoIosArrowDown className="ml-1" /></span>
              <span className="text-[15px] font-[500]">{user_details.balance?.toFixed(2)}</span>
              <button className="bg-bg2 hover:bg-bg2 transition text-[15px] font-[500] text-white px-4 py-2 rounded-[4px] shadow" onClick={() => setPopupOpen(true)}>Deposit</button>
            </div>
{/* --------------------deposit-popup------------------------ */}
{popupOpen && (
        <div className="fixed inset-0 flex items-center z-[100000000000000] justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-[95%] md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%] h-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Wallet</h2>
              <button onClick={handleclosepopup} className="text-white text-xl">✕</button>
            </div>
            {!selectedMethod ? (
              <>
                <div className="flex bg-gray-800 p-1 rounded-lg mb-4">
                  <button className={`flex-1 py-2 rounded-lg ${selectedTab === "deposit" ? "bg-bg5 text-white font-bold" : "text-white"}`} onClick={() => setSelectedTab("deposit")}>Deposit</button>
                  <button className={`flex-1 py-2 rounded-lg ${selectedTab === "withdraw" ? "bg-bg5 text-white font-bold" : "text-white"}`} onClick={() => setSelectedTab("withdraw")}>Withdraw</button>
                </div>
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {paymentMethods[selectedTab].map((method, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-800 p-3 relative rounded-lg flex flex-col items-center justify-center border border-gray-700 cursor-pointer"
                      onClick={() => setSelectedMethod(method)}
                    >
                      {
                        method.bonus? <span className='px-[10px] py-[4px] absolute top-[1%] right-[1px] text-[10px] rounded-full text-green-400 font-[600]'>{method?.bonus}</span>:""
                      }
                    
                      <img src={method.src} alt={method.name} className="w-12 h-12 mb-2" />
                      <div className='text-center'>
                         <span className="text-xs text-white font-medium text-center">{method.name}</span> <br />
                         {/* <span className="text-xs text-white font-medium text-center">from {method.amount}TK</span> */}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </>
            ) : (
             <div>
                {paymentSuccess && <Confetti width={width} height={height} />}
                {
                  selectedTab=="deposit" ? <>
        <form onSubmit={handle_bkash_deposit} className="bg-gray-900  py-5 rounded-lg text-white w-full">
      {/* Payment Method Selection */}
      <div>
         <img className="w-12 m-auto h-12 mb-1"  src={selectedMethod.src} alt="" />
         <h3 className="text-center text-lg font-semibold mb-2">{selectedMethod.name}</h3>
       </div>
      {/* <div className="relative bg-gray-800 p-3 rounded-lg cursor-pointer" onClick={() => setPaymentDropdown(!paymentDropdown)}>
 
        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-3">
            <img src={selectedMethod.src} alt={selectedMethod.name} className="w-12 h-12" />
            <h3 className="text-lg font-semibold">{selectedMethod.name}</h3>
          </div>
          <IoIosArrowDown className={`transition-transform ${paymentDropdown ? 'rotate-180' : ''}`} />
        </div>
      </div> */}
      
      {deposit_message && <p className="mt-3 p-2 border border-red-300 bg-red-50 text-red-500 rounded">{deposit_message}</p>}
      
      {/* Amount Input */}
      <label className="text-sm mt-4 block">Amount (300৳ - 25,000৳)</label>
      <div className="flex items-center border-[2px] border-gray-500 px-3 py-2 rounded-[5px]  mt-1">
        <button type="button" className="text-gray-400 border-gray-500" onClick={() => setTransactionAmount(Math.max(500, transactionAmount - 100))}><FaMinus/></button>
        <input
          type="number"
          className="w-full text-center bg-transparent outline-none text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
        />
        <button type="button" className="text-gray-400" onClick={() => setTransactionAmount(Math.min(25000, transactionAmount + 100))}><FaPlus/></button>
      </div>
      
      {/* Preset Amounts */}
      <div className="flex space-x-2 mt-2">
        {presetAmounts.map((value) => (
          <div
            key={value}
            className={`flex-1 py-2 cursor-pointer text-center text-[12px] rounded-[5px] font-[500] transition ${transactionAmount == value ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}
            onClick={() => handlePresetAmount(value)}
          >
            ৳{value}
          </div>
        ))}
      </div>
      
      {/* Bonus Selection */}
      <label className="text-sm mt-4 block">Get Your Deposit Bonus</label>

      <div className="relative  px-3 py-2 border-[2px] border-gray-600 rounded-[5px] cursor-pointer mt-1" onClick={() => setBonusDropdown(!bonusDropdown)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={selectedBonus.img} alt={selectedBonus.name} className="w-8 h-8 rounded-full" />
            <h3 className="text-[15px]">{selectedBonus.name}</h3>
          </div>
          <IoIosArrowDown className={`transition-transform ${bonusDropdown ? 'rotate-180' : ''}`} />
        </div>
        {bonusDropdown && (
          <div className="absolute top-full left-0 w-full no-scrollbar bg-gray-800 rounded-lg mt-1 shadow-lg z-10 max-h-40 overflow-y-auto">
            {bonuses.map((bonus, index) => (
              <div key={index} className="flex items-center p-3 hover:bg-gray-700 cursor-pointer" onClick={() => { setSelectedBonus(bonus); setBonusDropdown(false); }}>
                <img src={bonus.img} alt={bonus.name} className="w-8 h-8 rounded-full" />
                <span className="ml-3 flex-1 text-[145x]">{bonus.name}</span>
                {selectedBonus.name === bonus.name && <IoIosCheckmarkCircle className="text-yellow-500" />}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Account Number Input */}
      {/* <label className="text-sm mt-4 block">Account number</label>
      <input
        type="text"
        className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700 text-white"
        placeholder="Enter account number"
        required
      /> */}
      
      {/* Submit Button */}
      <button
        disabled={loading}
        className="w-full mt-4 py-2 rounded-[5px] font-bold text-white bg-bg4 transition duration-300 hover:bg-bg5"
      >
        {loading ? "Processing..." : "Submit Payment"}
      </button>
      
      {selectedMethod && (
        <div className="mt-4 flex justify-start">
          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={handledepositback}>
            <IoIosArrowBack className="text-white" />
          </button>
        </div>
      )}
    </form>
                  </>: <form onSubmit={handlewithdraw}>
                  <img src={selectedMethod.src} alt={selectedMethod.name} className="w-12 h-12 m-auto mb-2" />
                <h3 className="text-center text-lg font-semibold mb-2">{selectedMethod.name}</h3>
                {
                withdraw_message=="" ? "":<p className="w-full px-[15px] py-[10px] border-[1px] border-red-300 bg-red-50 text-red-500 rounded-[5px]">{withdraw_message}</p>
              }
                <label className="text-sm mt-4 block">Account Number</label>
              <div className="flex items-center space-x-2 mb-4 mt-2 ">
                <input
                  type="text"
                  className="w-full p-2  rounded bg-gray-800 border  border-gray-700 text-white"
                  placeholder="Enter your number"
                  value={payeer_account}
                  onChange={(e)=>{setpayeer_account(e.target.value)}}
                  required
                />
              </div>
                <label className="text-sm mt-4 block">Amount (300৳ - 20000৳)</label>
                <input
                  type="number"
                  className="w-full p-2 mt-1 rounded bg-gray-800  border border-gray-700 text-white"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  placeholder="Enter amount or select below"
                  required
                />
          
                <div className="flex space-x-2 mt-2">
                  {presetAmounts.map((value) => (
                    <div
                      key={value}
                      className={`flex-1 py-2 text-center cursor-pointer text-[12px] rounded-[5px] font-[500] ${
                        transactionAmount == value
                          ? "bg-bg2 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                      onClick={() => handlePresetAmount(value)}
                    >
                      ৳ {value}
                    </div>
                  ))}
                </div>
          
                {/* Submit Button */}
                <button
                  disabled={loading}
                  className="w-full mt-4 py-2 rounded-lg font-bold text-white bg-bg5 transition duration-300"
                >
           {loading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Processing...
          </div>
        ) : (
          "Submit Withdraw"
        )}
        {/* Progress bar */}
        {loading && (
          <div className="relative mt-2 w-full h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
                </button>
                {selectedMethod && (
              <div className="mt-4 flex justify-start">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={handlewithdrawback}>
                  <IoIosArrowBack className="text-white" />
                </button>
              </div>
            )}
                  </form>
                }     
             </div>
            )}
           
          </div>
        </div>
      )}
          {successPopupVisible && (
            <div className="fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center bg-gray-500 bg-opacity-50 transition-all duration-300">
  <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-8 rounded-lg shadow-2xl text-center max-w-sm w-full">
    <h3 className="text-white text-2xl font-semibold mb-4">Withdrawal Successful!</h3>
    <p className="text-white text-lg mb-6">Your withdrawal request has been completed successfully.</p>
    <button
      onClick={() => setSuccessPopupVisible(false)}
      className="bg-white text-green-600 px-6 py-2 rounded-md text-lg font-semibold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-200"
    >
      Close
    </button>
  </div>
</div>

)}
{/* ------------------deposit-popup------------------------ */}
            {/* User Section */}
            <div ref={dropdownRef} className="relative cursor-pointer text-left">
      {/* Profile Button */}
      <div
        className="flex items-center h-full bg-gray-800 px-[15px] p-3 rounded-[4px] relative shadow-md hover:bg-gray-700 transition"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <FaUser className="text-gray-400 text-[19px]" />
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 shadow-lg rounded-[5px] z-[100]">
  {/* User Info Section */}
  <div className="p-4 border-b border-gray-200 flex items-center gap-3">
    <div className="p-3 rounded-full bg-blue-600 text-white">
      <FaRegUser />
    </div>
    <p className="font-semibold text-gray-800 truncate max-w-[120px]" title={user_info?.name}>
      {user_info.name?.length > 15 ? user_info?.name.slice(0, 15) + "..." : user_info?.name}
    </p>
  </div>

  {/* Navigation Links */}
  <ul className="py-2">
    <NavLink to="/profile">
      <li className="px-4 py-2 font-[500] flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-200 cursor-pointer">
        <RxRocket /> My Profile
      </li>
    </NavLink>
    <NavLink to="/profile">
      <li className="px-4 py-2 flex font-[500] items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-200 cursor-pointer">
        <IoWalletOutline /> <span>My Balance: ৳{user_details.balance?.toFixed(2)}</span>
      </li>
    </NavLink>
    <NavLink to="/profile">
      <li className="px-4 py-2 flex  font-[500] items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-200 cursor-pointer">
        <PiCoinsDuotone /> <span>Bonus Balance: ৳0</span>
      </li>
    </NavLink>
    <li
      onClick={logoutfunction}
      className="px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-100 transition duration-200 cursor-pointer"
    >
      <TbLogout /> Logout
    </li>
  </ul>
</div>

      )}
    </div>
     
            {/* Notification Section */}
            <div className="relative">
      {/* Bell Icon */}
      <div
        className="flex items-center bg-gray-800 h-full px-[15px] p-3 rounded-[4px] relative shadow-md hover:bg-gray-700 transition cursor-pointer"
        onClick={() => dispatch({ type: "OPEN" })}
      >
        <FaBell className="text-gray-400 text-[19px]" />
        <span className="absolute top-1 right-1 bg-bg5 h-2 w-2 rounded-full"></span>
      </div>

      {/* Sidebar */}
      <div
      className={`fixed top-0 right-0 w-[350px] max-w-full z-[10000] no-scrollbar h-full bg-white shadow-lg transition-transform transform ${
        isSidebarOpen ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black text-white">
        <h2 className="text-lg font-semibold">HoBet Notifications</h2>
        <FaTimes
          className="cursor-pointer"
          onClick={() => dispatch({ type: "CLOSE" })}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-4 border-b">
        {["All", "General", "Personal"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg text-[16px] font-[500] ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="p-4 space-y-4 overflow-y-auto max-h-[80vh] no-scrollbar ">
  {filteredNotifications.length > 0 ? (
    filteredNotifications.map((notif, index) => (
      <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
        <div className='flex justify-between items-center mb-[10px]'>
        <p className="text-[15px] font-[500] text-gray-500 ">
          {new Date(notif.createdAt).toLocaleDateString()}
        </p>
        <div className='text-red-500 cursor-pointer'onClick={()=>{deleteNotification(notif._id)}}>
          <FaTrashCan/>
        </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 ">
          {notif.subject}
        </h3>
        {notif.image && (
          <img
            src={notif.image}
            alt="Notification"
            className="w-full rounded-lg my-2"
          />
        )}
        {/* Render HTML safely */}
        <div
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: notif.message }}
        ></div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No notifications found</p>
  )}
</div>

    </div>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => dispatch({ type: "CLOSE" })}
        ></div>
      )}
    </div>
          </div> : <div className="flex items-center space-x-5">
            <div className="relative w-[40px] h-[40px] bg-green-600 flex items-center justify-center rounded-full shadow-lg">
              <div className="w-[20px] h-[20px] bg-red-600 rounded-full"></div>
            </div>
            {/* Login / Sign Up */}
            <div className="flex space-x-2">
              <button onClick={handlelogin} className="px-6 py-2 text-white text-[16px] font-semibold bg-blue-500 rounded-lg shadow-[0_0_10px_#3b82f6] transition duration-300 hover:shadow-[0_0_20px_#3b82f6]">
                Login
              </button>
              <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

              <button onClick={handlesignup} className="px-6 py-2 text-white text-[16px] font-semibold bg-green-500 rounded-lg shadow-[0_0_10px_#22c55e] transition duration-300 hover:shadow-[0_0_20px_#22c55e]">
                Registration
              </button>
            </div>

            {/* Help Icon */}
            <div className="text-white text-xl cursor-pointer p-[10px] rounded-full bg-gray-700 text-[30px]">
              <BiSupport />
            </div>
          </div>
        }
      </div>
      {/* ---------------bottom-navbar-------------------- */}
      <BottomNav/>
      {/* ------------------------mobile-version--------------------------- */}
      <div className="bg-gray-800  flex xl:hidden   text-white p-4  justify-between items-center">
        {/* Left side - Flag and Menu */}
        <div className='lg:flex hidden'>
        <Logo />
        </div>
        <div className='lg:hidden '>
        <Logo2 />
        </div>

        {/* Right side - Login/Sign Up and Help */}
        {
          user_info ? <div className='flex justify-center items-center gap-[10px]'>
     <div className="flex items-center bg-gray-900 px-3 py-1.5 rounded-[4px] space-x-2 shadow-md">
  <span className="text-gray-400 text-[13px] font-[500] flex items-center">
    {currency} <IoIosArrowDown className="ml-1" />
  </span>
  <span className="text-[13px] font-[500]">{user_details.balance?.toFixed(2)}</span>
  <button className="bg-bg2 hover:bg-bg2 transition text-[13px] font-[500] text-white px-3 py-1.5 rounded-[4px] shadow" onClick={() => setPopupOpen(true)}>Deposit</button>
</div>
{/* --------------------deposit-popup------------------------ */}
{popupOpen && (
        <div className="fixed inset-0 flex items-center z-[100000000000000] justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] h-auto  shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Wallet</h2>
              <button onClick={handleclosepopup} className="text-white text-xl">✕</button>
            </div>
            {!selectedMethod ? (
              <>
                <div className="flex bg-gray-800 p-1 rounded-lg mb-4">
                  <button className={`flex-1 py-2 rounded-lg ${selectedTab === "deposit" ? "bg-bg5 text-white font-bold" : "text-white"}`} onClick={() => setSelectedTab("deposit")}>Deposit</button>
                  <button className={`flex-1 py-2 rounded-lg ${selectedTab === "withdraw" ? "bg-bg5 text-white font-bold" : "text-white"}`} onClick={() => setSelectedTab("withdraw")}>Withdraw</button>
                </div>
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {paymentMethods[selectedTab].map((method, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-800 p-3 rounded-lg flex flex-col items-center justify-center border border-gray-700 cursor-pointer"
                      onClick={() => setSelectedMethod(method)}
                    >
                      <img src={method.src} alt={method.name} className="w-12 h-12 mb-2" />
                      <span className="text-xs text-white font-medium text-center">{method.name}</span>
                    </div>
                  ))}
                </motion.div>
              </>
            ) : (
             <div>
                {paymentSuccess && <Confetti width={width} height={height} />}
                {
                  selectedTab=="deposit" ? <>
                 <form onSubmit={handle_bkash_deposit}>
                <div>
                  <img className="w-12 m-auto h-12 mb-1"  src={selectedMethod.src} alt="" />
                  <h3 className="text-center text-lg font-semibold mb-2">{selectedMethod.name}</h3>
                </div>
                {
                deposit_message=="" ? "":<p className="w-full px-[15px] py-[10px] border-[1px] border-red-300 bg-red-50 text-red-500 rounded-[5px]">{deposit_message}</p>
              }
                <label className="text-sm mt-4 block">Amount (400৳ - 20000৳)</label>
                <input
                  type="number"
                  className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700 text-white"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  placeholder="Enter amount or select below"
                />
          
                <div className="flex space-x-2 mt-2">
                  {presetAmounts.map((value) => (
                    <div
                      key={value}
                      className={`flex-1 py-2 cursor-pointer text-center text-[14px] rounded-lg font-bold ${
                        transactionAmount == value
                          ? "bg-bg2 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                      onClick={() => handlePresetAmount(value)}
                    >
                      ৳ {value}
                    </div>
                  ))}
                </div>
          
                {/* Submit Button */}
                <button
                  disabled={loading}
                  className="w-full mt-4 py-2 rounded-lg font-bold text-white bg-bg4 transition duration-300"
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Submit Payment"
                  )}
                </button>
                {selectedMethod && (
              <div className="mt-4 flex justify-start">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={handledepositback}>
                  <IoIosArrowBack className="text-white" />
                </button>
              </div>
            )}
                 </form>
                  </>: <form onSubmit={handlewithdraw}>
                  <img src={selectedMethod.src} alt={selectedMethod.name} className="w-12 m-auto h-12 mb-1" />
                <h3 className="text-center text-lg font-semibold mb-2">{selectedMethod.name}</h3>
                {
                withdraw_message=="" ? "":<p className="w-full px-[15px] py-[10px] border-[1px] border-red-300 bg-red-50 text-red-500 rounded-[5px]">{withdraw_message}</p>
              }
                <label className="text-sm mt-4 block">Account Number</label>
              <div className="flex items-center space-x-2 mb-4 mt-2 ">
                <input
                  type="text"
                  className="w-full p-2  rounded bg-gray-800 border  border-gray-700 text-white"
                  placeholder="Enter your number"
                  value={payeer_account}
                  onChange={(e)=>{setpayeer_account(e.target.value)}}
                />
              </div>
                <label className="text-sm mt-4 block">Amount (300৳ - 20000৳)</label>
                <input
                  type="number"
                  className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700 text-white"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  placeholder="Enter amount or select below"
                />
          
                <div className="flex space-x-2 mt-2">
                  {presetAmounts.map((value) => (
                    <div
                      key={value}
                      className={`flex-1 py-2 text-center cursor-pointer text-[14px] rounded-lg font-bold ${
                        transactionAmount == value
                          ? "bg-bg2 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                      onClick={() => handlePresetAmount(value)}
                    >
                      ৳ {value}
                    </div>
                  ))}
                </div>
          
                {/* Submit Button */}
                <button
                  disabled={loading}
                  className="w-full mt-4 py-2 rounded-lg font-bold text-white bg-bg5 transition duration-300"
                >
           {loading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Processing...
          </div>
        ) : (
          "Submit Withdraw"
        )}
        {/* Progress bar */}
        {loading && (
          <div className="relative mt-2 w-full h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
                </button>
                {selectedMethod && (
              <div className="mt-4 flex justify-start">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={handlewithdrawback}>
                  <IoIosArrowBack className="text-white" />
                </button>
              </div>
            )}
                  </form>
                }     
             </div>
            )}
           
          </div>
        </div>
      )}
          {successPopupVisible && (
            <div className="fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center bg-gray-500 bg-opacity-50 transition-all duration-300">
  <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-8 rounded-lg shadow-2xl text-center max-w-sm w-full">
    <h3 className="text-white text-2xl font-semibold mb-4">Withdrawal Successful!</h3>
    <p className="text-white text-lg mb-6">Your withdrawal request has been completed successfully.</p>
    <button
      onClick={() => setSuccessPopupVisible(false)}
      className="bg-white text-green-600 px-6 py-2 rounded-md text-lg font-semibold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-200"
    >
      Close
    </button>
  </div>
</div>

)}
{/* ------------------deposit-popup------------------------ */}
<div ref={dropdownRef} className="relative cursor-pointer text-left">
      {/* Profile Button */}
      <div
        className="flex items-center h-full bg-gray-900 px-[15px] p-3 rounded-[4px] relative shadow-md hover:bg-gray-700 transition"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <FaUser className="text-gray-400 text-[19px]" />
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 shadow-lg rounded-[5px] z-[100]">
  {/* User Info Section */}
  <div className="p-4 border-b border-gray-200 flex items-center gap-3">
    <div className="p-3 rounded-full bg-blue-600 text-white">
      <FaRegUser />
    </div>
    <p className="font-semibold text-gray-800 truncate max-w-[120px]" title={user_info?.name}>
      {user_info.name?.length > 15 ? user_info.name.slice(0, 15) + "..." : user_info?.name}
    </p>
  </div>

  {/* Navigation Links */}
  <ul className="py-2">
    <NavLink to="/profile">
      <li className="px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-200 cursor-pointer">
        <RxRocket /> My Profile
      </li>
    </NavLink>
    <li
      onClick={logoutfunction}
      className="px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-100 transition duration-200 cursor-pointer"
    >
      <TbLogout /> Logout
    </li>
  </ul>
</div>

      )}
    </div>
          </div> : <div className="flex items-center space-x-5">

            {/* Login / Sign Up */}
            <div className="flex space-x-2">
              <button onClick={handlelogin} className="px-4 lg:px-6 py-[5px] lg:py-2 text-white text-[12px] lg:text-[16px] font-semibold bg-blue-500 rounded-[4px] lg:rounded-lg shadow-[0_0_10px_#3b82f6] transition duration-300 hover:shadow-[0_0_20px_#3b82f6]">
                Login
              </button>
              <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

              <button onClick={handlesignup} className="px-4 lg:px-6 py-[5px] lg:py-2 text-white text-[12px] lg:text-[16px] font-semibold bg-green-500 rounded-[4px] lg:rounded-lg shadow-[0_0_10px_#22c55e] transition duration-300 hover:shadow-[0_0_20px_#22c55e]">
                Registration
              </button>
            </div>


          </div>
        }
      </div>
      {/* -----------------------mobile-version---------------------------- */}
    </div>
  )
}

export default Header
