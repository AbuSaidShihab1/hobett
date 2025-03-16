import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEye } from "react-icons/fa";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    email:"",
    currency: "BDT",
    verificationCode: Math.floor(1000 + Math.random() * 9000).toString(),
    referralCode: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const base_url=import.meta.env.VITE_API_KEY_Base_URL;
  const navigate=useNavigate();
  const validate = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "এই ঘরটি অবশ্যই পূরণ করতে হবে";
    if (!formData.phone) newErrors.phone = "এই ঘরটি অবশ্যই পূরণ করতে হবে";
    if (!formData.password) newErrors.password = "এই ঘরটি অবশ্যই পূরণ করতে হবে";
    if (!formData.email) newErrors.email = "এই ঘরটি অবশ্যই পূরণ করতে হবে";
    if (formData.password.length < 6) newErrors.password = "পাসওয়ার্ড কমপক্ষে 6 অক্ষরের হতে হবে";
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post(`${base_url}/auth/signup`, formData)
        .then(response => {
          console.log(response)
          if(response.data.success){
            swal.fire({
              icon: "success",
              title: "Successful",
              text: `${response.data.message}`,
            });
            setTimeout(() => {
              navigate("/login")
            }, 1000);
          }else{
            swal.fire({
              icon: "error",
              title: `${response.data.message}`,
              text: "Error",
            });
          }
        })
        .catch(error => {
          alert("নিবন্ধন ব্যর্থ হয়েছে।");
        });
    }
  };

  return (
    <section>
        <Header/>
   <section className="w-full h-auto py-[50px] bg-gray-100">
   <div className="flex flex-col items-center  m-auto w-[40%] h-auto bg-white">
      <img src="https://www.babu88h.com/static/image/banner/registerBanner/register_banner_bd.jpg" alt="Banner" className="w-full max-w-4xl mb-5" />
      <form onSubmit={handleSubmit} className="p-6 rounded-lg w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700">ব্যবহারকারীর নাম *</label>
          <input name="username" value={formData.username} onChange={handleChange} className="w-full border p-2  text-black rounded" placeholder="গ্রাহক নাম প্রদান করুন" />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">ব্যবহারকারীর ইমেইল *</label>
          <input name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" placeholder="ব্যবহারকারীর ইমেইল " />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">গোপন নম্বর *</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full border p-2 rounded" placeholder="গোপন নম্বর প্রদান করুন" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute flex justify-center items-center right-2 p-2 top-1 text-[22px] text-gray-500"><FaEye/></button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">পাসওয়ার্ড নিশ্চিত করুন *</label>
          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full border p-2 rounded" placeholder="পাসওয়ার্ড নিশ্চিত করুন" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-1 p-2 text-[22px] text-gray-500"><FaEye/></button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">মুদ্রা *</label>
          <select name="currency" value={formData.currency} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="BDT">BDT</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">মোবাইল নম্বর *</label>
          <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" placeholder="+880" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">ভেরিফিকেশন কোড *</label>
          <input name="verificationCode" value={formData.verificationCode} readOnly className="w-full border p-2 rounded bg-gray-100" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">রেফারেল কোড</label>
          <input name="referralCode" value={formData.referralCode} onChange={handleChange} className="w-full border p-2 rounded" placeholder="রেফারেল কোড (যদি থাকে)" />
        </div>
        <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded w-full">নিবন্ধন</button>
      </form>
    </div>
   </section>
   <Footer/>
    </section>
  );
};

export default Registration;
