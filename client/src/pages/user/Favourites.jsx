import { useState,useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { RiVipCrownFill } from "react-icons/ri";
import Sidebar from "../../components/Sidebar";
import { BiSupport } from "react-icons/bi";
import { FaBars, FaTimes, FaUser, FaHeart, FaGift, FaCrown, FaTh, FaBolt, FaTrophy, FaMobileAlt, FaFacebook, FaInstagram, FaTelegram, FaEnvelope, FaWifi } from "react-icons/fa";
import Header from "../../components/Header";

const Favourites = () => {
  const [activeTab, setActiveTab] = useState("account");
 const [wifiSpeed, setWifiSpeed] = useState(null);
  
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
        
        const [games,set_games]=useState([
            {
                id:1,
                image:"https://elon.casino/image/vertical_2/38618.webp",
            },
            {
                id:2,
                image:"https://elon.casino/image/vertical_2/38622.webp",
            },
            {
                id:3,
                image:"https://elon.casino/image/vertical_2/49646.webp",
                title:"Game Console"
            },
            {
                id:4,
                image:"https://elon.casino/image/vertical_2/38603.webp",
                title:"Tablet"
            },
            {
                id:5,
                image:"https://elon.casino/image/vertical_2/39761.webp",
                title:"Tablet"
            },
            {
                id:6,
                image:"https://elon.casino/image/vertical_2/39762.webp",
                title:"Tablet"
            },
            {
                id:7,
                image:"https://elon.casino/image/vertical_2/38616.webp",
                title:"Tablet"
            },
            {
                id:8,
                image:"https://elon.casino/image/vertical_2/38616.webp",
                title:"Tablet"
            },
            {
                id:9,
                image:"https://elon.casino/image/vertical_2/38612.webp",
                title:"Tablet"
            },
            {
                id:10,
                image:"https://elon.casino/image/vertical_2/38615.webp",
                title:"Tablet"
            },
            {
                id:10,
                image:"https://elon.casino/image/vertical_2/38615.webp",
                title:"Tablet"
            },
            {
                id:10,
                image:"https://elon.casino/image/vertical_2/38615.webp",
                title:"Tablet"
            },
     
            {
                id:10,
                image:"https://elon.casino/image/vertical_2/38615.webp",
            },
            {
                id:10,
                image:"https://elon.casino/image/vertical_2/38605.webp",
            },
        ])
  return (
   <section className='w-full h-full bg-dark_theme flex justify-center font-bai'>
    <Sidebar/>
    <section  className='w-[80%] px-[20px] py-[20px] h-[100vh] overflow-auto'>
           <Header/>
            <div className="bg-gray-800 p-[30px] border-[2px] border-gray-700 rounded-lg overflow-hidden text-white">
            <div className="flex justify-start items-center gap-[20px]">
  <FaHeart className="text-[24px] text-indigo-500 glow animate-pulse" />
  <span className="text-[25px] font-[600]">Favourites</span>
</div>

<div className="grid grid-cols-6 gap-[12px] mt-[30px]">
    {
        games.map((data)=>{
            return(
                <div className="rounded-[10px] overflow-hidden">
                    <img  src={data.image} alt="" />
                </div>
            )
        })
    }
</div>

            </div>
    </section>
   </section>
  );
};

export default Favourites;
