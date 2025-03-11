import axios from "axios";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${base_url}/auth/admin-login`, formData).then((res) => { 
    if(res.data.success){
      toast.success("Success", res.data.message, "success");
      localStorage.setItem("token", res.data.jwtToken);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      window.location.href = "/";
    } else {  
      toast.error(res.data.message);          
    }
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gray-900 w-full relative overflow-hidden">
      {/* Background with Clip Path */}
      <Toaster/>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-gray-900 clip-path-custom opacity-30" />
      </div>

      <div className="relative w-full max-w-md p-8 space-y-6 bg-gray-800 bg-opacity-60 shadow-xl backdrop-blur-lg rounded-2xl border border-gray-700">
      <div className=' flex justify-center items-center'>
			<div className="relative text-[30px] font-extrabold flex items-center tracking-wide ">
        <span className="text-bg5 drop-shadow-lg">H</span>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-2 animate-spin">
        <circle cx="12" cy="12" r="10" stroke="#FFC312" strokeWidth="2" />
        <polygon points="10,8 14,12 10,16" fill="#F79F1F" />
        </svg>
        <span className="text-white drop-shadow-lg">BET</span>
      </div>
			</div>
        <h2 className="text-3xl font-bold text-center text-indigo-400">Admin Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-300 shadow-lg"
          >
            Login
          </button>
        </form>
      </div>

      {/* Tailwind Clip-Path Customization */}
      <style>
        {`
          .clip-path-custom {
            clip-path: polygon(0 0, 100% 0, 100% 85%, 60% 100%, 0 85%);
          }
        `}
      </style>
    </div>
  );
}
