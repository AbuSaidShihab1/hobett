import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Gessinggame = ({ setIsOpen }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null); // Track selected color
    const [betAmount, setBetAmount] = useState("");
    const [balance, setBalance] = useState(0.5);
    const [result, setResult] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [runningColors, setRunningColors] = useState([]);
    const base_url = import.meta.env.VITE_API_KEY_Base_URL;


    const numbers = [1, 2, 3, 4, 5, 6, 7];
    const colors = ['bg-green-500', 'bg-purple-500', 'bg-red-500'];

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                const newColors = numbers.map(() => colors[Math.floor(Math.random() * colors.length)]);
                setRunningColors(newColors);
            }, 200);

            return () => clearInterval(interval);
        } else {
            setRunningColors([]);
        }
    }, [isPlaying]);

    const handleOptionSelection = (option) => {
        setSelectedOption(option);
    };

    const handleColorSelection = (color) => { // Handle color selection
        setSelectedColor(color);
    };

    const handlePlay = () => {
        if (!betAmount || betAmount < 10 || betAmount > 100) {
            alert("Please enter a valid bet amount between $10 and $100.");
            return;
        }

        setIsPlaying(true);

        setTimeout(() => {
            const finalResult = Math.floor(Math.random() * 7) + 1;
            setResult(finalResult);
            setIsPlaying(false);

            if (selectedOption === finalResult) {
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
                  <div className="m-auto flex justify-center items-center flex-col border-[2px] border-gray-800 p-[30px]">
                           
                <div className="flex justify-center gap-2 mb-4">
                    {numbers.map((num, index) => (
                        <div
                            key={index}
                            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${selectedOption === num ? 'border-yellow-400' : 'border-gray-600'} ${isPlaying ? runningColors[index] : (num % 3 === 0 ? 'bg-red-500' : num % 2 === 0 ? 'bg-green-500' : 'bg-purple-500')} text-white font-bold ${result === num ? 'scale-150 transition-transform duration-300' : ''}`}
                            onClick={() => handleOptionSelection(num)}
                        >
                            {num}
                        </div>
                    ))}
                </div>

                <h2 className="text-lg font-bold mb-2 text-white">Balance: <span className="text-yellow-400">${balance.toFixed(2)} USD</span></h2>

                {/* Color selection buttons */}
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        onClick={() => handleColorSelection('green')}
                        className={`px-6 py-2 rounded text-white font-bold ${selectedColor === 'green' ? 'bg-green-700' : 'bg-green-500'}`}
                    >
                        GREEN
                    </button>
                    <button
                        onClick={() => handleColorSelection('violet')}
                        className={`px-6 py-2 rounded text-white font-bold ${selectedColor === 'violet' ? 'bg-purple-700' : 'bg-purple-500'}`}
                    >
                        VIOLET
                    </button>
                    <button
                        onClick={() => handleColorSelection('red')}
                        className={`px-6 py-2 rounded text-white font-bold ${selectedColor === 'red' ? 'bg-red-700' : 'bg-red-500'}`}
                    >
                        RED
                    </button>
                </div>

                {/* Display selected color */}
                <div className="mb-4 text-white font-bold">
                    {selectedColor && <h3>You selected {selectedColor.toUpperCase()}</h3>}
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <div key={num} className={`w-12 h-12 flex items-center justify-center rounded text-white font-bold ${num % 3 === 0 ? 'bg-red-500' : num % 2 === 0 ? 'bg-green-500' : 'bg-purple-500'}`}>{num}</div>
                    ))}
                </div>

                <div className="relative mb-4 w-full max-w-xs">
                    <input
                        type="number"
                        placeholder="Enter amount"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        className="w-full p-2 pr-12 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 px-3 py-1 rounded text-black font-bold">USD</span>
                </div>

                <p className="text-xs text-gray-400 mb-4">Minimum: $10.00 USD | Maximum: $100.00 USD</p>

                <button onClick={handlePlay} className="w-full max-w-xs bg-yellow-500 py-2 rounded text-black font-bold hover:bg-yellow-600">PLAY NOW</button>

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

export default Gessinggame;
