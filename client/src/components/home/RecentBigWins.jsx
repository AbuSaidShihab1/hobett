import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { FaUser } from "react-icons/fa";
const tabs = ["All", "BC Originals", "Slots", "Live Casino"];
// Function to generate a random color
const getRandomColor = () => {
    const colors = [
      "text-red-400",
      "text-blue-400",
      "text-green-400",
      "text-yellow-400",
      "text-pink-400",
      "text-purple-400",
      "text-teal-400",
      "text-indigo-400",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
const games = [
  {
    name: "Crash",
    image: "https://bc.imgix.net/game/image/67fb72d610.png?_v=4&auto=format&dpr=1&w=200",
    user: "Hidden",
    amount: "BDT 14.96M",
  },
  {
    name: "Gates of Olympus 1000",
    image: "https://bc.imgix.net/game/image/15029_Gates%20of%20Olympus%201000.png?_v=4&auto=format&dpr=1&w=200",
    user: "Mupfpj...",
    amount: "BDT 24.24M",
  },
  {
    name: "Classic Dice",
    image: "https://bc.imgix.net/game/image/240032e09a.png?_v=4&auto=format&dpr=1&w=200",
    user: "Pixon1",
    amount: "BDT 12.37M",
  },
  {
    name: "Baccarat B",
    image: "https://bc.imgix.net/game/image/5346_First%20Person%20Baccarat.png?_v=4&auto=format&dpr=1&w=200",
    user: "Hudson...",
    amount: "BDT 10.62M",
  },
  {
    name: "Crash",
    image: "https://bc.imgix.net/game/image/67fb72d610.png?_v=4&auto=format&dpr=1&w=200",
    user: "Hidden",
    amount: "BDT 14.96M",
  },
  {
    name: "Gates of Olympus 1000",
    image: "https://bc.imgix.net/game/image/15029_Gates%20of%20Olympus%201000.png?_v=4&auto=format&dpr=1&w=200",
    user: "Mupfpj...",
    amount: "BDT 24.24M",
  },
  {
    name: "Classic Dice",
    image: "https://bc.imgix.net/game/image/240032e09a.png?_v=4&auto=format&dpr=1&w=200",
    user: "Pixon1",
    amount: "BDT 12.37M",
  },
  {
    name: "Baccarat B",
    image: "https://bc.imgix.net/game/image/5346_First%20Person%20Baccarat.png?_v=4&auto=format&dpr=1&w=200",
    user: "Hudson...",
    amount: "BDT 10.62M",
  },
  {
    name: "Crash",
    image: "https://bc.imgix.net/game/image/67fb72d610.png?_v=4&auto=format&dpr=1&w=200",
    user: "Hidden",
    amount: "BDT 14.96M",
  },
  {
    name: "Gates of Olympus 1000",
    image: "https://bc.imgix.net/game/image/15029_Gates%20of%20Olympus%201000.png?_v=4&auto=format&dpr=1&w=200",
    user: "Mupfpj...",
    amount: "BDT 24.24M",
  },
  {
    name: "Classic Dice",
    image: "https://bc.imgix.net/game/image/240032e09a.png?_v=4&auto=format&dpr=1&w=200",
    user: "Pixon1",
    amount: "BDT 12.37M",
  },
  {
    name: "Baccarat B",
    image: "https://bc.imgix.net/game/image/5346_First%20Person%20Baccarat.png?_v=4&auto=format&dpr=1&w=200",
    user: "Hudson...",
    amount: "BDT 10.62M",
  },
  {
    name: "Crash",
    image: "https://bc.imgix.net/game/image/67fb72d610.png?_v=4&auto=format&dpr=1&w=200",
    user: "Hidden",
    amount: "BDT 14.96M",
  },
  {
    name: "Gates of Olympus 1000",
    image: "https://bc.imgix.net/game/image/15029_Gates%20of%20Olympus%201000.png?_v=4&auto=format&dpr=1&w=200",
    user: "Mupfpj...",
    amount: "BDT 24.24M",
  },
  {
    name: "Classic Dice",
    image: "https://bc.imgix.net/game/image/240032e09a.png?_v=4&auto=format&dpr=1&w=200",
    user: "Pixon1",
    amount: "BDT 12.37M",
  },
  {
    name: "Baccarat B",
    image: "https://bc.imgix.net/game/image/5346_First%20Person%20Baccarat.png?_v=4&auto=format&dpr=1&w=200",
    user: "Hudson...",
    amount: "BDT 10.62M",
  },
  {
    name: "Crash",
    image: "https://bc.imgix.net/game/image/67fb72d610.png?_v=4&auto=format&dpr=1&w=200",
    user: "Hidden",
    amount: "BDT 14.96M",
  },
  {
    name: "Gates of Olympus 1000",
    image: "https://bc.imgix.net/game/image/15029_Gates%20of%20Olympus%201000.png?_v=4&auto=format&dpr=1&w=200",
    user: "Mupfpj...",
    amount: "BDT 24.24M",
  },
  {
    name: "Classic Dice",
    image: "https://bc.imgix.net/game/image/240032e09a.png?_v=4&auto=format&dpr=1&w=200",
    user: "Pixon1",
    amount: "BDT 12.37M",
  },
  {
    name: "Baccarat B",
    image: "https://bc.imgix.net/game/image/5346_First%20Person%20Baccarat.png?_v=4&auto=format&dpr=1&w=200",
    user: "Hudson...",
    amount: "BDT 10.62M",
  },
];

const RecentBigWins = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className=" rounded-lg text-white">
  <div className="w-full flex justify-start items-center gap-[15px] lg:pb-[20px] pt-[20px] lg:pt-[10px]">
  <div className="flex  items-center text-[14px] text-nowrap lg:text-lg font-bold">
        <span className="text-green-400 mr-2 text-[18px] lg:text-[20px] animate-pulse">●</span>
        <span>Recent Big Wins</span>
      </div>
      <div className="hidden lg:flex space-x-6 text-gray-400 text-sm ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[16px] font-medium transition-all duration-300 ease-in-out ${
              activeTab === tab
                ? "text-green-400 border-green-400"
                : "hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
  </div>
      <div className="overflow-hidden bg-gray-900  rounded-lg p-2">
        <Marquee  speed={80} gradient={false} className="flex">
          {games.map((game, index) => (
        <div
        key={index}
        className="lg:mx-[2px] text-center w-22 lg:w-28 flex flex-col justify-between px-[5px] py-2 rounded-lg "
      >
        <img
          src={game.image}
          alt={game.name}
          className="rounded-md lg:rounded-lg mb-2 w-full h-[90px] lg:h-[120px] object-cover"
        />
   <div className="flex items-center justify-center space-x-1 mb-[2px] lg:mb-[3px]">
    <FaUser className={`text-[16px] lg:flex hidden ${getRandomColor()}`} />
    <p className={`text-[11px] lg:text-[13px] font-medium `}>
      {game.user}
    </p>
  </div>
  
  <p className="text-[12px] lg:text-[13px] text-green-400 font-[400] lg:font-bold">{game.amount}</p>
      </div>
      
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default RecentBigWins;
