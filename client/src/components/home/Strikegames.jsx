import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo";
import Logo2 from "../Logo2";

const games = [
  { name: "SLOTS", slug: "slots", image: "https://strike.games/img/home/slots.jpg" },
  { name: "CRASH", slug: "crash", image: "https://strike.games/img/home/crash_new.jpg" },
  { name: "MINES", slug: "mines", image: "https://strike.games/img/home/mines_new.jpg" },
  { name: "CRAZY SHOOT", slug: "crazy-shoot", image: "https://strike.games/img/home/crazyshoot.jpg" },
  { name: "X100", slug: "x100", image: "https://strike.games/img/home/x100.jpg" },
  { name: "X30", slug: "x30", image: "https://strike.games/img/home/x30.jpg" },
  { name: "DICE", slug: "dice", image: "https://strike.games/img/home/dice.jpg" },
  { name: "COIN FLIP", slug: "coin-flip", image: "https://strike.games/img/home/coinflip_new.jpg" },
  { name: "KENO", slug: "keno", image: "https://strike.games/img/home/keno.jpg" },
];

export default function Strikegames() {
  return (
  <section className="py-[20px]">
    <div className="pb-[20px] uppercase font-[600]  text-[14px] lg:text-[22px] xl:text-[25px]">
        <h1 className="flex justify-start items-center gap-[10px]">✨ Our Games</h1>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 bg-cover bg-center">
  {games.map((game, index) => (
    <motion.div
      key={index}
      className="relative overflow-hidden rounded-[5px] lg:rounded-xl shadow-lg cursor-pointer h-34 sm:h-40 md:h-48"
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={game.image}
        alt={game.name}
        className="w-full h-full object-cover rounded-[5px] lg:rounded-xl"
      />
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start p-3 sm:p-4 md:p-5 text-white text-[13px] sm:text-[14px] md:text-2xl font-bold"
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        {game.name}
      </motion.div>
    </motion.div>
  ))}
</div>

  </section>
  );
}
