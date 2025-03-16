import React, { useRef, useState,useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Pagination,Autoplay} from 'swiper/modules';
import { GoStarFill } from "react-icons/go";
import { NavLink, useParams } from 'react-router-dom';
import { IoGameController } from "react-icons/io5";
import Sidebar from '../components/Sidebar';
import { FaBars, FaTimes, FaUser, FaHeart, FaGift, FaCrown, FaTh, FaBolt, FaTrophy, FaMobileAlt, FaFacebook, FaInstagram, FaTelegram, FaEnvelope, FaWifi } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { IoPlayOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Populargames from '../components/home/Populargames';
import Originalgame from '../components/home/Originalgame';
import GamePopup from '../components/modal/GamePopup';
import SpinGamePopup from '../components/modal/SpinGamePopup';
import Header from '../components/Header';
const Gamespage = () => {
    const swiperRef = useRef(null);
    const [wifiSpeed, setWifiSpeed] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [spingame, setspingame] = useState(false);

    const {name}=useParams();
        useEffect(() => {
          // Check the connection speed using the navigator.connection API
          if (navigator.connection) {
            const connection = navigator.connection;
            setWifiSpeed(connection.downlink); // Get the current downlink speed in Mbps
      
            // Listen to changes in network speed
            const updateSpeed = () => {
              setWifiSpeed(connection.downlink);
            };
      
            connection.addEventListener("change", updateSpeed);
            return () => connection.removeEventListener("change", updateSpeed);
          }
        }, []);
  
  return (
    <section className='w-full h-full bg-dark_theme flex justify-center font-bai'>
         <Sidebar/>
         <section className='w-[80%] px-[20px] py-[20px] h-[100vh] overflow-auto'>
           <Header/>
             {/* -------------------------------games-section----------------- */}
              <section className='bg-gray-800 border-[2px] border-gray-700 rounded-[5px] p-[20px]'>
              <div className="w-full h-[80vh] relative rounded-[5px] overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src={name=="head_tail" ? "https://script.viserlab.com/xaxino/demo/assets/images/game/6592b9b5aace01704114613.png":"https://script.viserlab.com/xaxino/demo/assets/images/game/61051d8469d731627725188.jpg"}
        alt=""
      />
      {/* Gradient Overlay */}
      <div className="w-full h-full absolute top-0 left-0 flex justify-center gap-[12px] items-center bg-gradient-to-t from-black/50 via-black/30 to-transparent">
    {/* Play Button */}
  {
    name=="head_tail" ?   <button
    className="px-6 py-3 bg-[#F79F1F] text-white rounded-lg text-lg font-semibold"
    onClick={() => setIsOpen(true)}
  >
    Play
  </button>:  <button
        className="px-6 py-3 bg-[#F79F1F] text-white rounded-lg text-lg font-semibold"
        onClick={() => setspingame(true)}
      >
        Play
      </button>
  }
      {/* Game Popup */}
      {isOpen && <GamePopup setIsOpen={setIsOpen} />}
      {spingame && <SpinGamePopup setIsOpen={setspingame} />}

        <div className="px-[30px] py-[10px] bg-gray-200 flex justify-center items-center gap-[6px] cursor-pointer text-[18px] rounded-[5px]">
          <IoPlayOutline className="text-[25px]" />
          <span className="font-semibold text-black">Demo</span>
        </div>
      </div>
    </div>
                     <div className='py-[20px] flex justify-between items-center'>
                            <span className='p-[10px] rounded-full bg-gray-600 text-white'>
                                Jill
                            </span>
                            <div className='flex justify-center items-center gap-[10px]'>
                                <div className='p-[12px] rounded-full bg-bg4 text-white'>
                                  <FaHeart/>
                                </div>
                                <div  className='p-[12px] rounded-full bg-gray-600 text-white'>
                                    <IoClose/>
                                </div>
                            </div>
                     </div>
                     <Populargames/>
                     <Originalgame/>
              </section>
             {/* ----------------games-section------------------------- */}
         </section>
    </section>
  )
}

export default Gamespage
