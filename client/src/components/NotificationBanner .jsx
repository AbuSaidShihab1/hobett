import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { FaBell } from "react-icons/fa";
import axios from "axios";

const NotificationBanner = () => {
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get(`${base_url}/admin/notice`);
        setNotice(res.data.notice?.content || "No new notices available.");
      } catch (error) {
        console.error("Error fetching notice:", error);
        setNotice("Failed to load notices.");
      }
    };

    fetchNotice();
  }, []);

  return (
    <div className="bg-gray-800 mt-[20px] mb-[10px] border-[1px] border-gray-700 text-white py-3 px-4 flex items-center rounded-[5px] shadow-md w-full">
      <FaBell className="text-yellow-400 text-xl mr-2 animate-pulse" />
      <Marquee speed={50} gradient={false} className="w-full">
        <p className="text-sm md:text-base font-medium">{notice}</p>
      </Marquee>
    </div>
  );
};

export default NotificationBanner;
