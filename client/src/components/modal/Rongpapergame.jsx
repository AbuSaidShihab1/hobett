import { useState } from "react";
import { IoClose } from "react-icons/io5";

const Rongpapergame = ({ setIsOpen }) => {
    const [selectedOption, setSelectedOption] = useState("rock");
    const [betAmount, setBetAmount] = useState("");
    const [balance, setBalance] = useState(0.5);
    const [computerChoice, setComputerChoice] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const options = [
        { name: "rock", img: "https://script.viserlab.com/xaxino/demo/assets/templates/basic//images/play/rock.png" },
        { name: "paper", img: "https://script.viserlab.com/xaxino/demo/assets/templates/basic//images/play/paper.png" },
        { name: "scissors", img: "https://script.viserlab.com/xaxino/demo/assets/templates/basic//images/play/scissors.png" }
    ];

    const handleOptionSelection = (option) => {
        setSelectedOption(option);
    };

    const determineWinner = (userChoice, computerChoice) => {
        if (userChoice === computerChoice) return "draw";
        if (
            (userChoice === "rock" && computerChoice === "scissors") ||
            (userChoice === "paper" && computerChoice === "rock") ||
            (userChoice === "scissors" && computerChoice === "paper")
        ) {
            return "win";
        }
        return "lose";
    };

    const handlePlay = () => {
        if (!betAmount || betAmount < 1 || betAmount > 100) {
            alert("Please enter a valid bet amount between $1 and $100.");
            return;
        }

        setIsPlaying(true);
        let playInterval = setInterval(() => {
            const randomChoice = options[Math.floor(Math.random() * options.length)].name;
            setComputerChoice(randomChoice);
        }, 100);

        setTimeout(() => {
            clearInterval(playInterval);
            const finalChoice = options[Math.floor(Math.random() * options.length)].name;
            setComputerChoice(finalChoice);
            setIsPlaying(false);

            const result = determineWinner(selectedOption, finalChoice);
            if (result === "win") {
                alert("You Win!");
                setBalance(balance + betAmount * 1.2);
            } else if (result === "lose") {
                alert("You Lose!");
                setBalance(balance - betAmount);
            } else {
                alert("It's a Draw!");
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
                        <div className="flex-1 flex justify-center items-center bg-[#071020] p-10 rounded-lg border border-gray-700">
                            {/* <img src={options.find(option => option.name === selectedOption).img} alt={selectedOption} className="w-40 h-40" />
                            <div className="text-white text-lg font-semibold mt-4">{selectedOption.toUpperCase()}</div> */}
                                <div className="flex justify-center items-center mt-4">
                                {isPlaying ? (
                                    <img src={options.find(option => option.name === computerChoice)?.img} alt="Computer Choice" className="w-[200px] h-[200px] animate-spin" />
                                ) : (
                                    computerChoice && <img src={options.find(option => option.name === computerChoice)?.img} alt="Computer Choice" className="w-[200px] h-[200px] " />
                                )}
                            </div>
                        </div>
                        <div className="flex-1 bg-[#071020] p-6 rounded-lg border border-gray-700 text-white">
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
                            <p className="text-xs text-gray-400 mb-4">Minimum: $1.00 USD | Maximum: $100.00 USD | Win Amount: <span className="text-yellow-400">120%</span></p>
                            <div className="flex items-center gap-4 mb-4">
                                {options.map(option => (
                                    <div 
                                        key={option.name}
                                        className={`relative p-2 rounded border ${selectedOption === option.name ? "border-yellow-400" : "border-gray-600"}`} 
                                        onClick={() => handleOptionSelection(option.name)}
                                    >
                                        {selectedOption === option.name && <span className="absolute top-0 right-0 bg-yellow-500 w-4 h-4 rounded-full flex items-center justify-center text-xs">✔</span>}
                                        <img src={option.img} alt={option.name} className="w-20 h-20" />
                                        <div className="text-center mt-2 text-sm font-bold">{option.name.toUpperCase()}</div>
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

export default Rongpapergame;
