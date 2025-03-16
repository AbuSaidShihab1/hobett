import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const Loader = () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        let loader_box=document.querySelector(".loader_box")
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            loader_box.classList.add("hidden")
            setTimeout(() => setIsComplete(true), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
  
      return () => clearInterval(interval);
    }, []);
  
    if (isComplete) return null;
  return (
    <div className="loader_box fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-gray-900 text-white">
    <div className="relative text-[28px] xl:text-4xl font-extrabold flex items-center tracking-wide">
      <span className="text-[#00b4d8] drop-shadow-lg">H</span>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-2 animate-spin">
        <circle cx="12" cy="12" r="10" stroke="#FFC312" strokeWidth="2" />
        <polygon points="10,8 14,12 10,16" fill="#F79F1F" />
      </svg>
      <span className="text-white drop-shadow-lg">BET</span>
    </div>
    <div className="w-3/4 mt-4 h-[17px] xl:h-[23px] bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-[#00b4d8]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "linear", duration: 0.3 }}
      ></motion.div>
    </div>
  </div>
  )
}

export default Loader
