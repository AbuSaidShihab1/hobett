import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { FaTimes } from "react-icons/fa";

const WelcomeBonusModal = ({ onClose }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Stop confetti after 4 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed w-full h-full top-0 left-0 inset-0 font-bai bg-black bg-opacity-70 flex justify-center items-center z-[10000]">
      {/* Confetti Animation */}
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}

      <div className="relative bg-[#1E1B29] w-[98%] md:w-[85%] lg:w-[55%] xl:w-[45%] 2xl:w-[480px] rounded-2xl shadow-2xl overflow-hidden transform scale-95 transition-all duration-300 hover:scale-100">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          onClick={onClose}
        >
          <FaTimes size={22} />
        </button>

        {/* Content Wrapper */}
        <div className="flex flex-col p-8 items-center text-center">
          {/* Header */}
          <h2 className="text-white font-bold text-3xl mb-3">🎉 Congratulations!</h2>
          <p className="text-gray-300 text-lg">
            <span className="text-indigo-400 text-[16px] font-semibold">One more step:</span>  
            Claim your **Welcome Bonus** now!
          </p>

          {/* Bonus Details Box */}
          <div className="bg-[#2A2339] w-full p-5 rounded-[5px] mt-5 shadow-md">
            <p className="text-white font-semibold text-lg leading-relaxed">
              🎁 <span className="text-yellow-400">+125% Deposit Bonus</span> <br /> 
              🎰 <span className="text-blue-400">250 Free Spin</span>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Deposit **300 BDT** to unlock your exclusive rewards.
            </p>
          </div>

          {/* Claim Bonus Button */}
          <button
            className="mt-6 w-full py-3 rounded-[5px] text-lg font-bold text-white transition-transform transform hover:scale-105 bg-gradient-to-r from-pink-500 to-red-500 shadow-lg"
            onClick={onClose}
          >
            🚀 Deposit Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBonusModal;
