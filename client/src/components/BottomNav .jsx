import { useState } from "react";
import { FaBars, FaFutbol, FaComments } from "react-icons/fa";
import { SiLegacygames } from "react-icons/si";
import { TbDeviceGamepad2 } from "react-icons/tb";
import Mobilesidebar from "./Mobilesidebar";

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("casino");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: "menu", label: "Menu", icon: <FaBars />, action: () => setSidebarOpen(true) },
    { id: "sports", label: "Sports", icon: <FaFutbol /> },
    { id: "casino", label: "Casino", icon: <SiLegacygames />, isCenter: true },
    { id: "bonus", label: "Bonus", icon: <TbDeviceGamepad2 /> },
    { id: "chat", label: "Chat", icon: <FaComments /> },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={`fixed left-0 top-0 h-full w-[80%]  bg-gray-900 shadow-xl transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform z-50`}
      >
        <button
          className="absolute top-4 z-[1000] right-4 text-gray-400 hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          ✖
        </button>
        <div className=" text-white  pt-[50px]">
        <Mobilesidebar/>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed lg:hidden flex bottom-0 left-0  right-0 bg-[#1A1F2B] text-white justify-around items-end py-3 shadow-lg">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`relative flex flex-col items-center px-4 py-2 ${
              activeTab === item.id ? "text-blue-400" : "text-gray-400"
            } transition-all`}
            onClick={() => {
              setActiveTab(item.id);
              if (item.action) item.action();
            }}
          >
            {item.isCenter ? (
              <div className="absolute top-[-130%] w-16 h-16 bg-gradient-to-b from-[#39414F] to-[#283040] flex justify-center items-center clip-diamond shadow-2xl border border-[#3D4756]">
                <div className="bg-[#1A1F2B] p-4 clip-diamond">
                  <span className="animate-spin-slow text-[15px]">{item.icon}</span>
                </div>
              </div>
            ) : (
              <div className="text-xl">{item.icon}</div>
            )}
            <span className="text-sm mt-2">{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default BottomNav;
