import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import taka_icon from "../../assets/taka.png";
import toast, { Toaster } from 'react-hot-toast';
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion"; // For animations
import { FaGift } from "react-icons/fa"; // Gift icon

const GamePopup = ({ setIsOpen }) => {
    const [selectedOption, setSelectedOption] = useState("rock");
    const [betAmount, setBetAmount] = useState("");
    const [balance, setBalance] = useState(0.5);
    const user_info=JSON.parse(localStorage.getItem("user"))
    const [isPlaying, setIsPlaying] = useState(false);
    const [computerChoice, setComputerChoice] = useState(null);
    const { width, height } = useWindowSize(); 
    const [showWinPopup, setShowWinPopup] = useState(false);
    const [showLosePopup, setShowLosePopup] = useState(false);
    const base_url = import.meta.env.VITE_API_KEY_Base_URL;



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
         const [newTotalAmount, setNewTotalAmount] = useState(balance); // New state for total amount

    const handlePlay = () => {
        if (!betAmount || betAmount < 20 || betAmount > 10000) {
            toast("Please enter a valid bet amount between ৳20 and ৳10000.", {
                icon: '⚠️',
                style: {
                    background: 'white',
                    color: 'green',
                },
            });
            return;
        }
        if (user_details.balance < betAmount) {
            toast("Insufficient Balance", {
                icon: '⚠️',
                style: {
                    background: 'white',
                    color: 'green',
                },
            });
            return;
        }
    
        axios.put(`${base_url}/user/after-play-minus-balance`, { betAmount, player_id: user_details.player_id }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res);
                user_data();
            }).catch((err) => {
                console.log(err)
            });
    
        setIsPlaying(true);
        const playInterval = setInterval(() => {
            setComputerChoice(options[Math.floor(Math.random() * options.length)].name);
        }, 100);
    
        setTimeout(() => {
            clearInterval(playInterval);
    
            let finalChoice;
            const randomValue = Math.random(); // Random number between 0 and 1
    
            if (randomValue < 0.3) {
                // 30% chance to win
                finalChoice = options.find(opt => determineWinner(selectedOption, opt.name) === "lose")?.name || options[0].name;
            } else if (randomValue < 0.85) {
                // 55% chance to lose
                finalChoice = options.find(opt => determineWinner(selectedOption, opt.name) === "win")?.name || options[0].name;
            } else {
                // 15% chance to draw
                finalChoice = selectedOption;
            }
    
            setComputerChoice(finalChoice);
            setIsPlaying(false);
    
            const result = determineWinner(selectedOption, finalChoice);
            if (result === "win") {
                setShowWinPopup(true);
                const winAmount = betAmount * 1.2; // 20% extra on win
                setBalance(balance + winAmount);  // Update balance with the win amount
                setNewTotalAmount(balance + winAmount); // Set the new total amount in the new state
                axios.put(`${base_url}/user/after-wind-add-balance`, { winAmount, player_id: user_details.player_id }, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                .then((res) => {
                    console.log(res);
                    user_data();
                }).catch((err) => {
                    console.log(err)
                });
            } else if (result === "lose") {
                setShowLosePopup(true);
                setBalance(balance - betAmount);
                setNewTotalAmount(balance - betAmount); // Set the new total amount after loss
            } else {
                toast("It's a Draw!", { icon: "🤝" });
            }
        }, 5000);
    };
    
    
    
// --------------------gaming-popup---------------------------
const [user_details,set_userdetails]=useState([])
const user_data=()=>{
  axios.get(`${base_url}/auth/user/${user_info?._id}`, {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
})
  .then((res)=>{
    console.log(res)
    if(res.data.success){
      set_userdetails(res.data.user)
    }
  }).catch((err)=>{
    console.log(err)
  })
}

useEffect(()=>{
    user_data();
},[])
    return (
        <div className="fixed inset-0 bg-black/50 flex z-[10000] justify-center items-center">
            <div className="bg-[#0F0F0F] w-[90%] h-[80vh] rounded-lg flex overflow-hidden relative border-[1px] border-gray-800 shadow-[0_0_15px_rgba(75,0,130,0.6)]">
            {/* Left Sidebar */}
            <Toaster/>
            <div className="w-[300px] bg-[#141414] p-4 flex flex-col gap-4 shadow-[0_0_10px_rgba(75,0,130,0.4)]">
        <div className="text-white text-lg font-semibold">Balance</div>
        <div className="bg-[#1E1E1E] p-3 rounded-md text-white shadow-md flex justify-between items-center">{user_details?.balance} <img className="w-[30px]" src={taka_icon} alt="" /></div>
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
                            <h2 className="text-lg font-bold mb-2">Current Balance: <span className="text-yellow-400">{user_details.balance?.toFixed(2)} ৳</span></h2>
                            <div className="relative mb-4">
                                <input 
                                    type="number" 
                                    placeholder="Enter amount" 
                                    value={betAmount} 
                                    onChange={(e) => setBetAmount(e.target.value)} 
                                    className="w-full p-2 pr-12 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none" 
                                />
                                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 px-3 py-1 rounded text-black font-bold">৳</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">Minimum: ৳20 | Maximum: ৳10000 | Win Amount: <span className="text-yellow-400">120%</span></p>
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
                   {/* Win Popup */}
                   {showWinPopup && (
                <>
                    <Confetti width={width} height={height} />
                    <div className="fixed inset-0 flex items-center z-[10000000] justify-center bg-[rgba(0,0,0,0.4)]  bg-opacity-50 backdrop-blur-md">
                        <motion.div 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="bg-white bg-opacity-30 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-center border border-white/20"
                        >
                            <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">🎉 You Win! 🎉</h2>
                            <p className="mt-3 text-lg text-white/90 drop-shadow-sm">
                                Congratulations! You won the bet.
                            </p>
                            <button
                                onClick={() => setShowWinPopup(false)}
                                className="mt-6 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-80 transition-all duration-300 shadow-lg"
                            >
                                Claim Reward
                            </button>
                        </motion.div>
                    </div>
                </>
            )}

            {/* Lose Popup with Unlucky Gift */}
            {showLosePopup && (
                <>
                    <div className="fixed inset-0 flex items-center z-[1000000] justify-center bg-[rgba(0,0,0,0.4)] bg-opacity-50 backdrop-blur-md">
                        <motion.div 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="bg-red-500 bg-opacity-40 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-center border border-white/20"
                        >
                            <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">😢 Unlucky! 😢</h2>
                            <p className="mt-2 text-lg text-white/90 drop-shadow-sm">
                                You lost this round... but here's a small gift!
                            </p>

                            {/* Animated Gift Box */}
                            <motion.div 
                                initial={{ y: -10 }}
                                animate={{ y: 10 }}
                                transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}
                                className="mt-4 flex justify-center"
                            >
                                <FaGift className="text-6xl text-yellow-400 drop-shadow-lg" />
                            </motion.div>

                            <button
                                onClick={() => {
                                    setShowLosePopup(false);
                                    setBalance(balance + 5); // Optional small reward
                                }}
                                className="mt-6 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 hover:opacity-80 transition-all duration-300 shadow-lg"
                            >
                                Claim Unlucky Gift 🎁
                            </button>
                        </motion.div>
                    </div>
                </>
            )}
                <button className="absolute top-2 right-2 bg-gray-700 p-2 rounded-full text-white shadow-md hover:bg-gray-600 transition" onClick={() => setIsOpen(false)}>
                    <IoClose size={24} />
                </button>
            </div>
        </div>
    );
};

export default GamePopup;
