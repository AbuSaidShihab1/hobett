import { useState } from "react";

export default function DepositBonus() {
  return (
 <section className="py-[40px]">
   <div className="bg-[#161329] p-6 rounded-xl shadow-lg text-center text-white w-full relative overflow-hidden">
      <h2 className="text-lg lg:text-[35px] mb-[16px] font-bold">Get a bonus</h2>
      <p className="text-[40px] font-extrabold mb-[10px] text-green-400">650% <span className="text-pink-500">+ 700 FS</span></p>
      <p className="text-sm text-gray-400">Receive <span className="font-bold">up to 338750 INR</span> to your bonus balance just topping up your account balance!</p>
      
      <div className="flex justify-between mt-6 space-x-4">
        {/* 1st Deposit */}
        <div className="bg-orange-500 p-4 rounded-lg flex-1 text-left shadow-lg animate-pulse">
          <span className="bg-gray-900 px-2 py-1 text-xs font-bold rounded">1st deposit</span>
          <p className="text-2xl font-extrabold">125%</p>
          <p className="text-lg">100 FS</p>
        </div>
        
        {/* 2nd Deposit */}
        <div className="bg-gray-800 p-4 rounded-lg flex-1 text-left shadow-lg">
          <span className="bg-gray-900 px-2 py-1 text-xs font-bold rounded">2st deposit</span>
          <p className="text-2xl font-extrabold">150%</p>
          <p className="text-lg">150 FS</p>
        </div>
        
        {/* 3rd Deposit */}
        <div className="bg-gray-800 p-4 rounded-lg flex-1 text-left shadow-lg">
          <span className="bg-gray-900 px-2 py-1 text-xs font-bold rounded">3st deposit</span>
          <p className="text-2xl font-extrabold">175%</p>
          <p className="text-lg">200 FS</p>
        </div>
        
        {/* 4th Deposit */}
        <div className="bg-gray-800 p-4 rounded-lg flex-1 text-left shadow-lg">
          <span className="bg-gray-900 px-2 py-1 text-xs font-bold rounded">4st deposit</span>
          <p className="text-2xl font-extrabold">200%</p>
          <p className="text-lg">250 FS</p>
        </div>
      </div>
      
      <button className="mt-6 px-6 py-2 bg-green-400 text-black font-bold rounded-lg text-lg shadow-green-400 shadow-md hover:bg-green-500 transition-all animate-glow-once">
  REGISTER
</button>
    </div>
 </section>
  );
}
