import { useState } from "react";
import { IoClose } from "react-icons/io5";

const SpinGamePopup = ({ setIsOpen }) => {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [betAmount, setBetAmount] = useState("");
  const [balance, setBalance] = useState(0.5);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningColor, setWinningColor] = useState(null);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;



  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handlePlay = () => {
    if (!betAmount || betAmount < 1 || betAmount > 100) {
      alert("Please enter a valid bet amount between $1 and $100.");
      return;
    }

    setIsSpinning(true);
    setTimeout(() => {
      const resultColor = Math.random() > 0.5 ? "blue" : "red";
      setWinningColor(resultColor);
      setIsSpinning(false);

      if (resultColor === selectedColor) {
        alert("You Win!");
        setBalance(balance + betAmount * 1.5);
      } else {
        alert("You Lose!");
        setBalance(balance - betAmount);
      }
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-[#0F0F0F] w-[90%] h-[80vh] rounded-lg flex overflow-hidden relative border-[1px] border-gray-800 shadow-[0_0_15px_rgba(75,0,130,0.6)]">
      {/* Left Sidebar */}
      <div className="w-[300px] bg-[#141414] p-4 flex flex-col gap-4 shadow-[0_0_10px_rgba(75,0,130,0.4)]">
        <div className="text-white text-lg font-semibold">Balance</div>
        <div className="bg-[#1E1E1E] p-3 rounded-md text-white shadow-md">0</div>

        <div className="text-white text-lg font-semibold">Bonus Balance</div>
        <div className="bg-[#1E1E1E] p-3 rounded-md text-white shadow-md">0</div>

        <button className="bg-bg2 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition">
          Deposit
        </button>

        <div className="text-white text-lg font-semibold">Best Games</div>

        {/* Scrollable Image List (Horizontal) */}
        <div className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-800">
          <div className="flex gap-4">
            <img
              src="https://elon.casino/image/vertical_2/30201.webp"
              className="w-[150px] rounded-md shadow-[0_0_10px_rgba(75,0,130,0.5)]"
              alt="Game 1"
            />
            <img
              src="https://elon.casino/image/vertical_2/30200.webp"
              className="w-[150px] rounded-md shadow-[0_0_10px_rgba(75,0,130,0.5)]"
              alt="Game 2"
            />
          </div>
        </div>
      </div>

      {/* Right Section (Game Display) */}
      <div className="flex-1 bg-black flex justify-center items-center relative">
      <div className="bg-[#0F0F0F]  rounded-lg flex overflow-hidden relative border-[1px] border-gray-800 shadow-md">
        {/* Left Side: Spinning Wheel */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className={`relative w-60 h-60 border-4 border-gray-700 rounded-full flex items-center justify-center ${isSpinning ? "animate-spin" : ""}`}>
            <div className="w-full h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full"></div>
            <div className="absolute top-0 w-4 h-4 bg-red-500 transform -translate-y-2"></div>
          </div>
        </div>

        {/* Right Side: Betting Panel */}
        <div className="flex-1 bg-[#071020] p-6 rounded-lg border border-gray-700 text-white">
          <h2 className="text-lg font-bold mb-2">Current Balance: <span className="text-yellow-400">{balance.toFixed(2)} USD</span></h2>
          <input type="number" placeholder="Enter amount" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} className="w-full p-2 bg-transparent border border-gray-600 rounded-md text-white mb-4" />
          <p className="text-xs text-gray-400 mb-4">Minimum: $1.00 USD | Maximum: $100.00 USD | Win Amount: <span className="text-yellow-400">150%</span></p>
          
          {/* Color Selection */}
          <div className="flex items-center gap-4 mb-4">
            <div className={`relative p-2 rounded border ${selectedColor === "blue" ? "border-yellow-400" : "border-gray-600"}`} onClick={() => handleColorSelection("blue")}> 
              <img src="https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/moneyblack.png" alt="Blue" className="w-20 h-20" />
            </div>
            <div className={`relative p-2 rounded border ${selectedColor === "red" ? "border-yellow-400" : "border-gray-600"}`} onClick={() => handleColorSelection("red")}> 
              <img src="https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/money.png" alt="Red" className="w-20 h-20" />
            </div>
          </div>
          
          <button onClick={handlePlay} className="w-full bg-yellow-500 py-2 rounded text-black font-bold hover:bg-yellow-600">PLAY NOW</button>
        </div>
        
        {/* Close Button */}
        <button className="absolute top-2 right-2 bg-gray-700 p-2 rounded-full text-white shadow-md hover:bg-gray-600 transition" onClick={() => setIsOpen(false)}>
          <IoClose size={24} />
        </button>
      </div>
      </div>

      {/* Close Button */}
      <button
        className="absolute top-2 right-2 bg-gray-700 p-2 rounded-full text-white shadow-md hover:bg-gray-600 transition"
        onClick={() => setIsOpen(false)}
      >
        <IoClose size={24} />
      </button>
    </div>
  </div>
 
  );
};

export default SpinGamePopup;
