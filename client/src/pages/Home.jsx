import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/home/Hero";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import WelcomeBonusModal from "../components/modal/WelcomeBonusModal ";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isFirstLogin = localStorage.getItem("firstLogin") !== "false";
    if (isFirstLogin) {
      setShowModal(true);
      localStorage.setItem("firstLogin", "false"); // Prevent it from showing again
    }
  }, []);

  return (
    <section>
      <section className="w-full h-full bg-dark_theme flex justify-center font-bai">
        <Sidebar />
        <Hero />
      </section>
      <Footer />

      {showModal && <WelcomeBonusModal onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default Home;
