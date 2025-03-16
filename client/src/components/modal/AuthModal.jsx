import React, { useState, useEffect,useRef} from "react";
import { IoClose } from "react-icons/io5";
import { FaUser, FaLock, FaEnvelope, FaMobileAlt,FaChevronDown} from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CurrencySelector = ({ selectedCurrency, setSelectedCurrency }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currencies = [
    { name: "BDT", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlLX94-uTEPQwlm7l69MF-P72nXIEhTmDmA&s" },
  ];

  return (
    <div className="relative">
      <div 
        className="flex justify-between items-center border rounded-md p-3 cursor-pointer bg-white"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="flex items-center">
          {selectedCurrency ? (
            <>
              <img 
                src={currencies.find(currency => currency.name === selectedCurrency)?.image} 
                alt={selectedCurrency} 
                className="w-6 h-6" 
              />
              <span className="ml-2 text-gray-700">{selectedCurrency}</span>
            </>
          ) : (
            <span className="text-gray-500">Select a currency</span>
          )}
        </div>
        <FaChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
      </div>

      {dropdownOpen && (
        <div className="absolute w-full mt-1 shadow-lg bg-white rounded-md border border-[#eee] z-10 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {currencies.map((currency) => (
            <div
              key={currency.name}
              className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedCurrency(currency.name);
                setDropdownOpen(false);
              }}
            >
              <img src={currency.image} alt={currency.name} className="w-6 h-6" />
              <span className="ml-2 text-gray-700">{currency.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const AuthModal = ({ isOpen, onClose }) => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [activeTab, setActiveTab] = useState("signin");
  const navigate=useNavigate();
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
   const [warning_message,set_warningmessage]=useState("");
   const [success_message,set_success_message]=useState("");
   
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    currency:"BDT"
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Clear form fields when tab changes
    if (activeTab === "signin") {
      setSignupData({ name: "", email: "", password: ""});
    } else {
      setSigninData({ email: "", password: "" });
    }
  }, [activeTab]);

  // if (!isOpen) return null;

  const validateSignIn = () => {
    let newErrors = {};

    if (!signinData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signinData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!signinData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (signinData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUp = () => {
    let newErrors = {};

    if (!signupData.name.trim()) newErrors.name = "Full Name is required";

    if (!signupData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!signupData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    if (activeTab === "signin") {
      setSigninData({ ...signinData, [e.target.name]: e.target.value });
    } else {
      setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!validateSignIn()) return;

    setLoadingSignIn(true);
    axios.post(`${base_url}/auth/login`, signinData)
        .then((response) => {
            console.log(response);
            if (!response.data.success) {
                toast.error(response.data.message, "error");
            set_success_message(response.data.message)
                return;
            }

            const { message, jwtToken, user } = response.data;
            toast.success(message, "success");
            localStorage.setItem("token", jwtToken);
            localStorage.setItem("user", JSON.stringify(user));

            setTimeout(() => {
                window.location.href = "/";
            }, 2000);

            onClose();
        })
        .catch((error) => {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong", "error");
        })
        .finally(() => setLoadingSignIn(false)); // Stop loading
};


const handleSignUp = (e) => {
  e.preventDefault();
  if (!validateSignUp()) return;

  setLoadingSignUp(true);
  axios.post(`${base_url}/auth/signup`, signupData)
      .then((response) => {
          console.log(response.data);
          if (response.data.success) {
              toast.success("Sign Up Successful!", "success");
              setActiveTab("signin");
              set_warningmessage("")
          }else{
            set_warningmessage(response.data.message)
            toast.error(response.data.message);
          }
      })
      .catch((error) => {
          Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
          console.log(error);
      })
      .finally(() => setLoadingSignUp(false)); // Stop loading
};

// ------------reset-passwrod------------------
const [showResetPassword, setShowResetPassword] = useState(false);
const [step, setStep] = useState(1); // Steps: 1 = Email, 2 = OTP, 3 = New Password
const [email, setEmail] = useState("");
const [newPassword, setNewPassword] = useState("");
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const handleSendOtp = async (e) => {
  e.preventDefault();
  setError("");
  try {
    const res = await axios.post(`${base_url}/user/send-otp`, { email });
    setMessage(res.data.message);
    setStep(2);
    console.log(res.data)
  } catch (err) {
    console.log(err)
    setError(err.response?.data?.error || "Something went wrong.");
  }
};

const [length] = useState(6); // Define OTP length inside state
const [otp, setOtp] = useState(new Array(length).fill(""));
const [loading, setLoading] = useState(false);
const inputRefs = useRef([]);

const handleotpChange = (index, value) => {
  if (!/^\d*$/.test(value)) return; // Allow only numbers
  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  if (value && index < length - 1) {
    inputRefs.current[index + 1]?.focus();
  }
};

const handleKeyDown = (index, e) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
};

const handleVerifyOtp = async (e) => {
  e.preventDefault();
  const otpValue = otp.join("");

  if (otpValue.length !== length) {
    setError("Please enter the full OTP.");
    return;
  }

  setError("");
  setLoading(true);
  try {
    const res = await axios.post(`${base_url}/user/verify-otp`, { email, otp: otpValue });
    if(!res.data.success){
      setLoading(false)
       return  setError(res.data.message);
    }
    setMessage(res.data.message);
    setStep(3);
  } catch (err) {
    // setError(err.response?.data?.error || "Invalid OTP.");
    console.log(err)

  }
  setLoading(false);
};
const handleResetPassword = async (e) => {
  e.preventDefault();
  setShowResetPassword(false);

  setError("");
  try {
    const res = await axios.post(`${base_url}/user/reset-password`, { email, newPassword });
    setMessage(res.data.message);
    setStep(1);
    toast.success(res.data.message)
    setShowResetPassword(false);
  } catch (err) {
    setError(err.response?.data?.error || "Failed to reset password.");
  }
};

  return (
    <>
    {
      isOpen ?  <div className="fixed inset-0 flex items-center justify-center min-h-screen overflow-y-auto bg-black bg-opacity-50 z-[1000]">
      <div className="flex justify-center relative bg-gradient-to-b from-[#0F0D29] to-[#1B1440] w-[98%] lg:w-[70%] xl:w-[70%] 2xl:w-[50%] rounded-[10px] overflow-hidden shadow-[0_0_20px_5px_rgba(75,0,130,0.5)]">
      <div className="w-[50%] lg:block hidden">
          <img src="https://roobet.com/cdn-cgi/image/dpr=1,width=auto,height=auto,quality=100,blur=0/https://roobet.com/assets/images/authDialog/snoopDogg.e7954f6a92136f4daf81.jpg" alt="" />
         </div>
         <button className="absolute top-4 right-4 z-[10000] p-[8px]  text-gray-200 hover:text-gray-300" onClick={onClose}>
                <IoClose size={24} />
              </button>
              <div className="w-full lg:w-[50%] p-6 relative">
            <Toaster position="bottom-center" toastOptions={{ style: { bottom: "20px" } }} />
      
            {showResetPassword ? (
              <>
                <h2 className="text-[20px] lg:text-[22px] font-semibold text-center text-white mb-2">
                  {step === 1 ? "Reset Password" : step === 2 ? "Enter OTP" : "Set New Password"}
                </h2>
      
                {message && <p className="text-green-500 text-center mb-3 font-[500]">{message}</p>}
                {error && <p className="text-red-500 text-center mb-3">{error}</p>}
      
                {step === 1 && (
                  <form className="space-y-4" onSubmit={handleSendOtp}>
                    <div className="flex items-center border-[2px] border-[#845ec2] rounded-md p-2">
                      <FaEnvelope className="text-gray-200 mr-3" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-transparent text-white outline-none"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-md">
                      Send OTP
                    </button>
                  </form>
                )}
      
                {step === 2 && (
               <form onSubmit={handleVerifyOtp} className="flex flex-col items-center space-y-4">
               <div className="flex justify-center gap-3">
                 {otp.map((digit, index) => (
                   <input
                     key={index}
                     ref={(el) => (inputRefs.current[index] = el)}
                     type="text"
                     maxLength="1"
                     value={digit}
                     onChange={(e) => handleotpChange(index, e.target.value)}
                     onKeyDown={(e) => handleKeyDown(index, e)}
                     className="w-12 h-12 text-2xl text-center border border-gray-500 bg-transparent text-white rounded-md focus:border-indigo-500 focus:outline-none transition-all"
                   />
                 ))}
               </div>
               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full max-w-xs py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:bg-gray-500"
               >
                 {loading ? "Verifying..." : "Verify OTP"}
               </button>
             </form>
                )}
      
                {step === 3 && (
                  <form className="space-y-4" onSubmit={handleResetPassword}>
                    <div className="flex items-center border-[2px] border-[#845ec2] rounded-md p-2">
                      <FaLock className="text-gray-200 mr-3" />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full bg-transparent text-white outline-none"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-md">
                      Reset Password
                    </button>
                  </form>
                )}
      
                <p
                  className="text-indigo-400 cursor-pointer hover:underline text-center mt-4"
                  onClick={() => {
                    setShowResetPassword(false);
                    setStep(1);
                  }}
                >
                  Back to Login
                </p>
              </>
            ) : (
              <>
    <h2 className="text-[20px] lg:text-[22px] 2xl:text-[23px] font-semibold text-center text-white mb-[6px]">Hey, Welcome Back</h2>
        <p className="text-gray-300 text-center text-[12px] xl:text-[14px] mb-4">Enter your credentials to access your account</p>
        <Toaster
  position="bottom-center"
  toastOptions={{
    style: {
      bottom: '20px',
    },
  }}
/>
        <div className="flex justify-center gap-6 pb-2">
          <button
            className={`pb-2 text-lg font-medium ${
              activeTab === "signin" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-300"
            }`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>
          <button
            className={`pb-2 text-lg font-medium ${
              activeTab === "signup" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-300"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === "signin" ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          {activeTab === "signin" ? (
     <form className="space-y-4" onSubmit={handleSignIn}>
     {
       success_message == "" ? "" : (
         <p className="w-full px-[15px] py-[10px] border-[1px] border-red-300 bg-red-100 text-red-500 rounded-[5px]">
           {success_message}
         </p>
       )
     }
     <div className="flex items-center border-[2px] border-[#845ec2] rounded-md p-2 lg:p-3">
       <FaEnvelope className="text-gray-200 mr-3" />
       <input
         type="email"
         name="email"
         placeholder="Email Address"
         className="w-full outline-none bg-transparent text-white font-[500]"
         required
         value={signinData.email}
         onChange={handleChange}
       />
     </div>
     {errors.email && <p className="text-gray-300 font-[600] text-sm">{errors.email}</p>}
   
     <div className="flex items-center border-[2px] border-[#845ec2] rounded-md p-2 lg:p-3">
       <FaLock className="text-gray-200 mr-3" />
       <input
         type="password"
         name="password"
         placeholder="Password"
         className="w-full outline-none bg-transparent text-white"
         value={signinData.password}
         onChange={handleChange}
         required
       />
     </div>
     {errors.password && <p className="text-gray-300 font-[600] text-sm">{errors.password}</p>}
   
     <div className="flex items-center justify-between">
       {/* Remember Me Checkbox */}
       <label className="flex items-center text-white text-sm cursor-pointer">
         <input 
           type="checkbox" 
           name="rememberMe" 
           className="mr-2 w-4 h-4 accent-indigo-600" 
         />
         Remember Me
       </label>
       
       <p className="text-indigo-400 cursor-pointer hover:underline"onClick={() => setShowResetPassword(true)}>Forget Password?</p>
     </div>
   
     {/* Sign In Button */}
     <button 
       type="submit" 
       className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
       disabled={loadingSignIn}
     >
       {loadingSignIn ? (
         <span className="flex items-center">
           <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
           </svg>
           Logging In...
         </span>
       ) : "Log In"}
     </button>
   </form>
   
          ) : (
            <form className="space-y-4" onSubmit={handleSignUp}>
            {
              warning_message == "" ? "" : (
                <p className="w-full px-[15px] py-[10px] border-[1px] border-red-300 bg-red-100 text-red-500 rounded-[5px]">
                  {warning_message}
                </p>
              )
            }
          
            <div className="flex items-center border-[2px] border-[#845ec2] rounded-md p-2 lg:p-3">
              <FaUser className="text-gray-200 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full outline-none bg-transparent text-white font-[500]"
                value={signupData.name}
                onChange={handleChange}
                required
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          
            <div className="flex items-center border-[2px] border-[#845ec2] rounded-md p-2 lg:p-3">
              <FaEnvelope className="text-gray-200 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full outline-none bg-transparent text-white font-[500]"
                value={signupData.email}
                onChange={handleChange}
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          
            <div className="flex items-center border-[2px] border-[#845ec2] rounded-md p-2 lg:p-3">
              <FaLock className="text-gray-200 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full outline-none bg-transparent text-white font-[500]"
                value={signupData.password}
                onChange={handleChange}
                required
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          
            {/* Terms & Privacy Policy Checkbox */}
            <div className="flex items-center space-x-2 text-white text-sm">
              <input 
                type="checkbox" 
                name="agreeTerms" 
                className="w-4 h-4 accent-indigo-600" 
                required
              />
              <label>
                I agree to the 
                <a href="/terms" className="text-indigo-400 hover:underline mx-1">Terms</a> 
                and 
                <a href="/privacy" className="text-indigo-400 hover:underline ml-1">Privacy Policy</a>.
              </label>
            </div>
          
            {/* Sign Up Button */}
            <button 
              type="submit" 
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
              disabled={loadingSignUp}
            >
              {loadingSignUp ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Signing Up...
                </span>
              ) : "Sign Up"}
            </button>
          </form>
          
          )}
        </motion.div>
              </>
            )}
          </div>
      </div>
          </div>:""
    }
    </>
   
  );
};

export default AuthModal;
