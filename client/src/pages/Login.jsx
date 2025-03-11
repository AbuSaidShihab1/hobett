import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const base_url=import.meta.env.VITE_API_KEY_Base_URL;
  const navigate=useNavigate();
  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "ব্যবহারকারীর নাম আবশ্যক";
    if (!formData.password) tempErrors.password = "গোপন নম্বর আবশ্যক";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post(`${base_url}/auth/login`, formData)
        .then((response) => {
          if(response.data.success){
               swal.fire({
                          icon: "success",
                          title: "Successful",
                          text: `${response.data.message}`,
                        });
            localStorage.setItem("token", response.data.jwtToken);
            localStorage.setItem("user_data", JSON.stringify(response.data.user_data));
            navigate("/")
          }else{
           swal.fire({
              icon: "error",
              title: "Error",
              text: `${response.data.message}`,
            });
          }
          
        })
        .catch((error) => {
          console.error("Login Failed:", error);
        });
    }
    console.log(formData)
  };

  return (
  <section>
    <Header/>
    <div className="flex justify-center items-center py-[100px] bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-[30%]">
        <h2 className="text-center text-2xl font-semibold mb-2">প্রবেশ করুন</h2>
        <p className="text-center text-gray-500 mb-6">স্বাগতম!</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">ব্যবহারকারীর নাম *</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.username ? "border-red-500" : "border-gray-300"}`}
              placeholder="এখানে পূরণ করুন"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">গোপন নম্বর *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
              placeholder="এখানে পূরণ করুন"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-lg"
          >
            প্রবেশ করুন
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-blue-500">পাসওয়ার্ড ভুলে গেছেন</a>
          <p className="mt-2">কোনো একাউন্ট নেই? <a href="#" className="text-blue-500">Register here</a></p>
        </div>
      </div>
    </div>
    <Footer/>
  </section>
  );
};

export default Login;
