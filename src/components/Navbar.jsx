import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TitleText from "./Animate/TitleText"; // Import file animasi kamu
import NavbarText from "./Animate/NavbarText";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLogoClicked, setIsLogoClicked] = useState(false);

  // Deteksi scroll
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Navbar */}
      <AnimatePresence>
        {showNavbar && (
          <motion.nav
            key="navbar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.25 }}
           className="flex justify-between items-center px-8 py-4 bg-invaGray bg-opacity-40 fixed w-full z-50 backdrop-blur-sm"

          >
            {/* Logo dan Judul */}

            <div className="flex items-center space-x-3 cursor-pointer font-invanor">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-10 h-10 animate-spin-slow"
              />
              <TitleText text="INVANOR" />
            </div>

            {/* Menu Tengah */}
            <NavbarText />

            {/* Tombol Login/Daftar */}
            <div className="text-black text-sm italic border border-invaPink px-4 py-2 rounded-full cursor-pointer hover:bg-invaPink hover:text-invaGray transition-all duration-100 tracking-wide font-navbar">
              Login/Daftar
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Floating Logo Mewah */}
      <AnimatePresence>
        {!showNavbar && !isLogoClicked && (
          <motion.div
            key="floating-logo"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.25 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[999] cursor-pointer group"
            onClick={(e) => {
              const ripple = document.createElement("span");
              ripple.classList.add("ripple");
              ripple.style.left = `${e.nativeEvent.offsetX}px`;
              ripple.style.top = `${e.nativeEvent.offsetY}px`;
              e.currentTarget.appendChild(ripple);
              setTimeout(() => ripple.remove(), 500);

              setIsLogoClicked(true);
              setTimeout(() => {
                setShowNavbar(true);
                setIsLogoClicked(false);
              }, 500);
            }}
          >
            {/* Glass Button Background */}
            <div className="w-15 h-15 bg-gradient-to-br from-white/30 to-invaPurple/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 transition-transform duration-100 animate-glow relative overflow-hidden">
              {/* Ripple Container */}
              <div className="absolute inset-0 rounded-full"></div>

              {/* Logo Image */}
              <img
                src="/images/logo.png"
                alt="Menu Logo"
                className="w-10 h-10 animate-spin-slow"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
