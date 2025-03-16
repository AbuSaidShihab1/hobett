import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Favourites from "./pages/user/Favourites";
import Popular from "./pages/games/Popular";
import Casino from "./pages/games/Casino";
import Others from "./pages/games/Others";
import Profile from "./pages/user/Profile";
import Gamespage from "./pages/Gamespage";
import PaymentCallbackPage from "./components/payment/PaymentCallbackPage";
import GradientLoader from "./components/modal/GradientLoader ";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show the loader only when the page is reloaded
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Loader stays for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <GradientLoader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Registration />} />
        <Route exact path="/games/:name" element={<Gamespage />} />

        {/* ---------- User Pages ------------------- */}
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/popular" element={<Popular />} />
        <Route exact path="/casino" element={<Casino />} />
        <Route exact path="/others" element={<Others />} />
        <Route exact path="/favourites" element={<Favourites />} />
        <Route exact path="/callback-payment" element={<PaymentCallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
