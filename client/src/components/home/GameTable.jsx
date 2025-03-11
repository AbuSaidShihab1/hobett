import React, { useState, useEffect } from "react";
import { FaBomb, FaCoins, FaBullseye, FaDice, FaUserCircle } from "react-icons/fa";
import { MdOutlineCasino } from "react-icons/md";

const initialGamesData = [
  { game: "MINES", player: "MuditS", bet: 1584, coefficient: "0.00x", win: 0, icon: <FaBomb /> },
  { game: "COIN FLIP", player: "3009kassi", bet: 90, coefficient: "3.40x", win: 306, icon: <FaCoins /> },
  { game: "SHOOT", player: "Shruti", bet: 1835, coefficient: "2.50x", win: 4587.5, icon: <FaBullseye /> },
  { game: "MINES", player: "kuljeet", bet: 551, coefficient: "10.55x", win: 5813.05, icon: <FaBomb /> },
  { game: "DICE", player: "Satha", bet: 1059, coefficient: "3.10x", win: 3282.9, icon: <FaDice /> },
  { game: "DICE", player: "Pranav", bet: 1592, coefficient: "2.10x", win: 3343.2, icon: <FaDice /> },
  { game: "MINES", player: "Moumi", bet: 243, coefficient: "2.29x", win: 556.47, icon: <FaBomb /> },
  { game: "SLOTS", player: "rajesh", bet: 714, coefficient: "3.40x", win: 2427.6, icon: <MdOutlineCasino /> },
];

const randomBgColor = () => {
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateRandomCoefficient = () => {
  return (Math.random() * 10).toFixed(2) + "x";
};

const generateRandomBet = () => {
  return Math.floor(Math.random() * 2000) + 50;
};

const GameTable = () => {
  const [gamesData, setGamesData] = useState(initialGamesData);

  useEffect(() => {
    const interval = setInterval(() => {
      setGamesData((prevGames) => {
        const updatedGames = prevGames.map((game) => {
          if (Math.random() > 0.5) {
            const newBet = generateRandomBet();
            const newCoefficient = generateRandomCoefficient();
            const newWin = Math.floor(newBet * parseFloat(newCoefficient));
            return { ...game, bet: newBet, coefficient: newCoefficient, win: newWin };
          }
          return game;
        });
        return updatedGames;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-[20px]">
      <div className=" overflow-x-auto">
        <table className="min-w-full text-white  rounded-[4px]">
          <thead className="bg-gray-900">
            <tr className="text-[12px] lg:text-[17px]">
              <th className="p-3 text-left">GAME</th>
              <th className="p-3 text-left">PLAYER</th>
              <th className="p-3 text-left">BET</th>
              <th className="p-3 text-left">COEFFICIENT</th>
              <th className="p-3 text-left">WIN</th>
            </tr>
          </thead>
          <tbody>
            {gamesData.map((game, index) => (
              <tr key={index} className="border-b text-[13px] lg:text-[16px] bg-gray-900 border-gray-700 animate-pulse">
                <td className="p-3 flex items-center py-[20px] gap-2">{game.icon} {game.game}</td>
               <td>
               <td className="p-3 flex items-center gap-2">
                  <FaUserCircle className={`lg:w-6 lg:h-6 w-4 h-4 rounded-full p-1 text-white ${randomBgColor()}`} />
                  {game.player}
                </td>
               </td>
                <td className="p-3">{game.bet} 🪙</td>
                <td className="p-3">{game.coefficient}</td>
                <td className="p-3">{game.win} 🪙</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameTable;
