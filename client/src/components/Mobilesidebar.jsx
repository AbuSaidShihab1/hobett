import { useState, useEffect } from "react";
import { FiClipboard, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaUser, FaHeart, FaGift, FaCrown, FaTh, FaBolt, FaTrophy, FaMobileAlt, FaFacebook, FaInstagram, FaTelegram, FaEnvelope, FaWifi } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import AuthModal from "./modal/AuthModal";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { nanoid } from "nanoid";
import { GiFireBowl } from "react-icons/gi";
import { CgCardSpades } from "react-icons/cg";
import { FaSearch, FaFire,FaDice,FaAward ,FaSmile } from "react-icons/fa";
import axios from "axios";
import { RiCouponLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // To get screen size for confetti
import Logo from "./Logo";
import { ca } from "date-fns/locale";
import {FaGamepad } from "react-icons/fa";
import { MdCasino, MdNewReleases } from "react-icons/md";
import { IoIosFlash } from "react-icons/io";

const categories = [
  { name: "1win Games", count: 22, icon: <FaGamepad className="text-blue-400" /> },
  { name: "Jili Games", count: 163, icon: <FaGamepad className="text-blue-400" /> },
  { name: "Fishing Games", count: 48, icon: <FaDice className="text-blue-400" /> },
  { name: "Quick Games", count: 631, icon: <IoIosFlash className="text-purple-500" /> },
  { name: "Live Casino", count: 776, icon: <MdCasino className="text-red-500" /> },
  { name: "Drops & Wins", count: 70, icon: <FaTrophy className="text-orange-500" /> },
  { name: "PGSoft", count: 41, icon: <FaAward className="text-pink-500" /> },
  { name: "New", count: 434, icon: <MdNewReleases className="text-blue-400" /> },
  { name: "Slots", count: 11756, icon: <FaDice className="text-orange-500" /> },
  { name: "Only on 1win", count: 38, icon: <FaFire className="text-blue-400" /> },
  { name: "Top Games", count: 354, icon: <FaTrophy className="text-orange-500" /> },
  { name: "Spinoleague", count: 436, icon: <FaAward className="text-blue-400" /> },
  { name: "Bonus Buy", count: 2856, icon: <FaGift className="text-pink-500" /> },
];
const providers = [
  { name: "AmigoGaming", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amigogaming.svg" },
  { name: "Amusnet", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amusnet.svg" },
  { name: "Betsoft", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/betsoft.svg" },
  { name: "AmigoGaming", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amigogaming.svg" },
  { name: "Amusnet", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amusnet.svg" },
  { name: "Betsoft", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/betsoft.svg" },
  { name: "AmigoGaming", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amigogaming.svg" },
  { name: "Amusnet", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amusnet.svg" },
  { name: "Betsoft", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/betsoft.svg" }
];
const paymentMethods = {
    deposit: [
      { name: "Bkash", src: "https://elon.casino/icons-elon/payments/218.svg" },
      { name: "Nagad", src: "https://elon.casino/icons-elon/payments/223.svg" },
      { name: "Rocket", src: "https://elon.casino/icons-elon/payments/103.svg" },
    ],
    withdraw: [
      { name: "Bkash", src: "https://elon.casino/icons-elon/payments/218.svg" },
      { name: "Nagad", src: "https://elon.casino/icons-elon/payments/223.svg" },
      { name: "Rocket", src: "https://elon.casino/icons-elon/payments/103.svg" },
    ],
  };
const Mobilesidebar = () => {
  const [activeTab, setActiveTab] = useState("casino");
  const [isOpen, setIsOpen] = useState(true);
  const [wifiSpeed, setWifiSpeed] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("deposit");
  const navigate=useNavigate();
  const user_info=JSON.parse(localStorage.getItem("user"))
  const [amount, setAmount] = useState(0);
  const [phone, setPhone] = useState("");
  const [agentNumber, setAgentNumber] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionid,settransactionid]=useState("")
  const [isCopied, setIsCopied] = useState(false);  // To track the copied state
  const [loading, setLoading] = useState(false);
  const [active_tab,set_activetab]=useState("make_payment")
  const [orderId, setOrderId] = useState("");
  const [paymnet_id,set_paymentid]=useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { width, height } = useWindowSize(); // Get window size for confetti
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const base_url2="https://api.eassypay.com";
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
        axios.get(`${base_url}/auth/user/${user_info?._id}`)
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
  //       `https://api.eassypay.com/api/payment/payment`,
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
        axios.put(`${base_url2}/auth/update-user-balance/${user_info._id}`,{amount})
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
  const handle_bkash_deposit = async (e) => {
    e.preventDefault();
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

    if (!transactionAmount || isNaN(transactionAmount) || Number(transactionAmount) < 300 || Number(transactionAmount) > 10000) {
      toast.error("Please enter a valid amount between 300 and 10000!");
      return;
    }

    // If all validations pass
    try {
      const {data} = await axios.post(`${base_url2}/api/payment/bkash`,{mid:"merchant1",payerId:user_details.player_id,amount:transactionAmount,currency:"BDT",redirectUrl:"https://www.babu88.com",orderId:orderId,callbackUrl:"https://admin.eassypay.com/bkash_api"});
      window.location.href = data.link;
      if (data.status === 200) {
        console.log("Deposit Success:", data.data);
      } else{
        Swal.fire({
          icon: "error",
          title: "Deposit Failed",
          text:"An error occurred while processing your deposit.",
        });
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

    }
  };
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
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
    const handlewithdraw = (e) => {
      e.preventDefault();
    
      // Validate the transaction amount before making the API call
      const amount = parseFloat(transactionAmount);
      
      if (isNaN(amount) || amount < 300) {
        toast.error("Withdrawal must be greater than 300 Taka.");
        return;
      }
      if(user_details?.balance < 0){
        toast.error("You have not enough balance!");
        return;
      }
    
      if (amount > 10000) {
        toast.error("Withdrawal must be less than 10,000 Taka.");
        return;
      }
    
      setLoading(true);
    
      axios
        .post(`${base_url2}/api/payment/payout`, {
          mid: "shihab",
          provider: selectedMethod.name,
          amount: amount,
          orderId: orderId,
          payeeId: user_info.player_id,
          payeeAccount: payeer_account,
          callbackUrl: "http://localhost:5173/profile",
          currency: "BDT"
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            user_data();
            axios
              .put(`${base_url}/user/after-withdraw-minus-balance`, {
                amount: transactionAmount,
                player_id: user_info.player_id
              })
              .then((res) => {
                console.log("Hello");
                if(res.data.success){
                  user_data();
                }
              })
              .catch((err) => {
                console.log(err);
              });
              setPopupOpen(false)
            toast.success(res.data.message);
            setPaymentSuccess(true); // Trigger confetti animation
    
            // Show success popup here
            setSuccessPopupVisible(true);  // Set the success popup visibility to true
             
            setTimeout(() => {
              setPaymentSuccess(false);
              setSuccessPopupVisible(false); // Hide success popup after 5 seconds
            }, 5000);
            
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
    // ---------bonus-sidebar------------------
    const [bonuspopup, setbonuspopup] = useState(false);
    //----------menu-item---------------------------------
    const [menuOpen, setMenuOpen] = useState(false);

    // -------------close popup-------------
    const handleclosepopup=()=>{
     setPopupOpen(false);
     setTransactionAmount("")
    }
  return (
   <section className="font-bai w-full h-screen bg-gray-900 pb-[20px] overflow-y-auto no-scrollbar z-[10000] sticky top-0">
    {/* ----------------------sidebar------------------------- */}
         <section className="w-full">

            <Toaster/>
         <div className={`h-screen bg-gray-900 text-white p-4 flex flex-col relative transition-all duration-300 ${isOpen ? "w-full" : "w-20"}`}>
      {/* <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#023e8a] via-[#48cae4] to-[#00b4d8] blur-3xl opacity-50"></div> */}
      {/* <button 
        className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button> */}
    <Logo/>
      {/* <div className="flex space-x-2 bg-gray-800 p-2 rounded-lg mb-4 mt-6">
        <button 
          className={`w-1/2 text-center py-2 rounded-lg border-2 transition-all duration-300 ${activeTab === "casino" ? "bg-bg1 text-white border-bg2" : "text-gray-400 border-transparent hover:border-gray-400"}`}
          onClick={() => setActiveTab("casino")}
        >
          <NavLink to="/">Casino</NavLink>
        </button>
        <button 
          className={`w-1/2 text-center py-2 rounded-lg border-2 transition-all duration-300 ${activeTab === "sportsbook" ? "bg-bg1 text-white border-bg2" : "text-gray-400 border-transparent hover:border-gray-400"}`}
          onClick={() => setActiveTab("sportsbook")}
        >Sportsbook</button>
      </div> */}

          {/* ---------------------deposit-button------------------------ */}
          <div className="w-full bg-gray-900 rounded-lg">
      {/* Search Bar */}
      <div className="relative mt-[20px]">
        <FaSearch className="absolute left-3 top-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Categories */}
      <div className="mt-4 w-full mb-[15px]">
        <h3 className="text-gray-400 text-[16px]">CATEGORIES</h3>
        <div className="flex gap-1 mt-2">
          {/* Heated */}
          <div className="flex w-[50%] items-center gap-2 py-[13px] bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3  rounded-md cursor-pointer hover:opacity-80">
            <FaFire className="text-xl" />
            <span className="text-sm">Heated</span>
            <span className="text-xs bg-black bg-opacity-30 px-2 py-1 rounded-md">21</span>
          </div>

          {/* Popular */}
          <div className="flex w-[50%] items-center gap-2 bg-gradient-to-r from-green-700 to-green-500 text-white px-3 py-[13px] rounded-md cursor-pointer hover:opacity-80">
            <FaSmile className="text-xl" />
            <span className="text-sm">Popular</span>
            <span className="text-xs bg-black bg-opacity-30 px-2 py-1 rounded-md">314</span>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full bg-gray-900  rounded-lg">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-3 rounded-md bg-gray-800 hover:bg-gray-700 cursor-pointer transition-all mb-2"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{category.icon}</span>
            <span className="text-white text-sm font-medium">{category.name}</span>
          </div>
          <span className="text-gray-400 text-[14px] font-[500]">{category.count}</span>
        </div>
      ))}
    </div>
    <div>
    <div className="py-[10px] flex justify-between items-center">
    <h3 className="text-gray-400 text-[16px]">Providers</h3>
    <h3 className="text-blue-400 text-[16px] ">100</h3>
    </div>
    <ul className="custom-scrollbar mt-2 space-y-2 ">
          {providers.map((provider, index) => (
            <li key={index} className="flex items-center space-x-2 p-2 bg-gray-800 rounded-md hover:bg-gray-700 cursor-pointer">
              <img src={provider.logo} alt={provider.name} className="w-6 h-6" />
              <span>{provider.name}</span>
            </li>
          ))}
        </ul>
    </div>
 

    <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <div className="mt-auto flex space-x-4 items-center justify-center py-4">
        <FaInstagram className="text-pink-500 text-2xl cursor-pointer" />
        <FaFacebook className="text-blue-500 text-2xl cursor-pointer" />
        <FaTelegram className="text-blue-400 text-2xl cursor-pointer" />
      </div>
      <button className="mt-4 w-full bg-gray-800 py-2 rounded-lg flex items-center justify-center space-x-2">
        <FaEnvelope className="text-gray-400" />
        {isOpen && <span>support@hobet.com</span>}
      </button>
      <footer className="w-full bg-gray-800 text-center text-gray-400 py-2 mt-4 rounded-lg">
        {isOpen && "© 2025 HIBET. All rights reserved."}
      </footer>
    </div>
         </section>
    {/* ----------------------sidebar------------------------- */}
   </section>
  )
}

export default Mobilesidebar
