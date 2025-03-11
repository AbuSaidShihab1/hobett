import { useState } from "react";
import { IoClose } from "react-icons/io5";

const Dicegame = ({ setIsOpen }) => {
    const [selectedOption, setSelectedOption] = useState(1);
    const [betAmount, setBetAmount] = useState("");
    const [balance, setBalance] = useState(0.5);
    const [diceResult, setDiceResult] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const base_url = import.meta.env.VITE_API_KEY_Base_URL;



    const diceImages = [
        "https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/dice1.png",
        "https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/dice2.png",
        "https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/dice3.png",
        "https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/dice4.png",
        "https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/dice5.png",
        "https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/dice6.png"
    ];

    const handleOptionSelection = (option) => {
        setSelectedOption(option);
    };

    const handlePlay = () => {
        if (!betAmount || betAmount < 1 || betAmount > 100) {
            alert("Please enter a valid bet amount between $1 and $100.");
            return;
        }

        setIsPlaying(true);
        let playInterval = setInterval(() => {
            const randomRoll = Math.floor(Math.random() * 6) + 1;
            setDiceResult(randomRoll);
        }, 100);

        setTimeout(() => {
            clearInterval(playInterval);
            const finalRoll = Math.floor(Math.random() * 6) + 1;
            setDiceResult(finalRoll);
            setIsPlaying(false);

            if (selectedOption === finalRoll) {
                alert("You Win!");
                setBalance(balance + betAmount * 1.05);
            } else {
                alert("You Lose!");
                setBalance(balance - betAmount);
            }
        }, 5000);
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
            <div className="flex-1 bg-black flex justify-center items-center relative">
            <div className="flex gap-8 w-full max-w-4xl">
            <div className="w-1/2 bg-[#071020] p-10 flex justify-center items-center">
                    {isPlaying || diceResult ? (
                        <img 
                            src={diceImages[(diceResult || 1) - 1]} 
                            alt="Dice Roll" 
                            className={`w-40 h-40 ${isPlaying ? "animate-spin" : ""}`} 
                        />
                    ) : (
                        <img 
                            src="https://script.viserlab.com/xaxino/demo/assets/templates/basic/images/play/dice1.png" 
                            alt="Default Dice" 
                            className="w-40 h-40"
                        />
                    )}
                </div>
                <div className="w-1/2 bg-[#071020] p-6 rounded-lg border-l border-gray-700 text-white">
                    <h2 className="text-lg font-bold mb-2">Current Balance: <span className="text-yellow-400">{balance.toFixed(2)} USD</span></h2>
                    <div className="relative mb-4">
                        <input 
                            type="number" 
                            placeholder="Enter amount" 
                            value={betAmount} 
                            onChange={(e) => setBetAmount(e.target.value)} 
                            className="w-full p-2 pr-12 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none" 
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 px-3 py-1 rounded text-black font-bold">USD</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">Minimum: $1.00 USD | Maximum: $100.00 USD | Win Amount: <span className="text-yellow-400">105%</span></p>
                    <div className="flex items-center gap-4 mb-4">
                        {diceImages.map((img, index) => (
                            <div 
                                key={index}
                                className={`relative p-2 rounded border ${selectedOption === index + 1 ? "border-yellow-400" : "border-gray-600"}`} 
                                onClick={() => handleOptionSelection(index + 1)}
                            >
                                {selectedOption === index + 1 && <span className="absolute top-0 right-0 bg-yellow-500 w-4 h-4 rounded-full flex items-center justify-center text-xs">✔</span>}
                                <img src={img} alt={`Dice ${index + 1}`} className="w-12 h-8" />
                            </div>
                        ))}
                    </div>
                    <button onClick={handlePlay} className="w-full bg-yellow-500 py-2 rounded text-black font-bold hover:bg-yellow-600">PLAY NOW</button>
                    <p className="text-center mt-2 text-gray-400 cursor-pointer hover:text-white">Game Instruction ⓘ</p>
                </div>
              </div>
              
              </div>
               
                <button className="absolute top-2 right-2 bg-gray-700 p-2 rounded-full text-white shadow-md hover:bg-gray-600 transition" onClick={() => setIsOpen(false)}>
                    <IoClose size={24} />
                </button>
            </div>
        </div>
    );
};

export default Dicegame;