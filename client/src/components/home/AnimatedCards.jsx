import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";
import { RiPokerDiamondsLine } from "react-icons/ri";
import "tailwindcss/tailwind.css";
import { BsSuitSpade } from "react-icons/bs";
import { BsSuitClub } from "react-icons/bs";
import Logo from "../Logo";
import { motion } from "framer-motion";
const cards = [
  { id: 1, icon: <BsSuitClub className="text-3xl text-gray-800" /> },
  { id: 2, icon: <RiPokerDiamondsLine className="text-3xl text-red-500" /> },
  { id: 3, icon: <BsSuitSpade className="text-3xl text-gray-800" /> },
  { id: 4, icon: <FaHeart className="text-3xl text-red-500" /> },
];

const AnimatedCards = () => {
  const [cardOrder, setCardOrder] = useState(cards);
  const cardColors = ["#DFF0EE", "#E6F7F2", "#F0FAF8", "#E0F2F1"]; 
  useEffect(() => {
    const interval = setInterval(() => {
      setCardOrder((prevOrder) => {
        const newOrder = [...prevOrder];
        newOrder.push(newOrder.shift()); // Move the first card to the end
        return [...newOrder];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center flex-col gap-[20px] fixed top-0 left-0 z-[10000] w-full h-[100vh] items-center min-h-screen bg-gray-700">
      <div className="relative w-56 h-40"> 
        {cardOrder.map((card, index) => (
       <div
       key={card.id}
       className={`absolute w-36 h-52 bg-white rounded-lg shadow-lg flex items-center justify-center border-4 border-brown-700 transition-transform duration-500 ease-in-out`}
       style={{
         transform: `rotate(${index * -10}deg) translate(${index * 20}px, ${index * 5}px)`,
         zIndex: 4 - index,
       }}
     >
       <div className="absolute top-2 left-2 text-sm">{card.icon}</div>
       <div className="absolute bottom-2 right-2 text-sm">{card.icon}</div>
       <div className="text-4xl mt-4">{card.icon}</div>
     </div>
     
        ))}
      </div>
      <div className="pt-[50px] flex justify-center">
  <motion.h2
    className="text-5xl font-extrabold text-indigo-600 drop-shadow-lg"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    exit={{ opacity: 0, scale: 0.5 }}
  >
    HoBet
  </motion.h2>
</div>
    </div>
  );
};

export default AnimatedCards;
