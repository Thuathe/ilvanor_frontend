import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TitleText from "./Components/TitleText";
import NavbarText from "./Components/NavbarText";
import LoginText from "./Components/LoginText";
import ToggleButton from "./Components/ToogleButton";
import MobileMenu from "./Components/MobileMenu";
import FloatingLogo from "./Components/FloatingLogo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLogoClicked, setIsLogoClicked] = useState(false);
  const [activePage, setActivePage] = useState("Beranda");
  const [timeoutId, setTimeoutId] = useState(null);

  const handleScroll = () => {
    if (isMenuOpen) return;
    if (window.scrollY > lastScrollY) {
      clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => {
        setShowNavbar(false);
      }, 300);
      setTimeoutId(newTimeoutId);
    } else {
      setShowNavbar(true);
      clearTimeout(timeoutId);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen, timeoutId]);

  const handleMenuClick = (menu) => {
    setActivePage(menu);
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsMenuOpen(false);
  };

  // Callback untuk klik logo floating
  const handleFloatingLogoClick = () => {
    setIsLogoClicked(true);
    setTimeout(() => {
      setShowNavbar(true);
      setIsLogoClicked(false);
    }, 500);
  };

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
            className="fixed top-0 z-50 flex items-center justify-between w-full px-4 py-4 shadow-lg md:px-8 bg-invaGray bg-opacity-60 backdrop-blur-lg"
          >
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer font-invanor">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-10 h-10 animate-spin-slow"
              />
              <TitleText text="INVANOR" />
            </div>

            {/* Menu Tengah */}
            <div className="items-center hidden space-x-8 md:flex">
              <NavbarText
                activePage={activePage}
                setActivePage={setActivePage}
              />
            </div>

            {/* Kanan */}
            <div className="flex items-center space-x-4">
              <div className="">
                <LoginText />
              </div>

              <ToggleButton
                isOpen={isMenuOpen}
                toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Garis Bawah */}
      {showNavbar && (
        <motion.div
          key="navbar-line"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-[1px] bg-invaPink bg-opacity-60 fixed top-[68px] w-full z-40"
        ></motion.div>
      )}

      <MobileMenu
        isOpen={isMenuOpen}
        handleMenuClick={handleMenuClick}
        activePage={activePage}
      />

      {/* Floating Logo */}
      <FloatingLogo
        show={!showNavbar && !isLogoClicked}
        onClick={handleFloatingLogoClick}
      />
    </>
  );
};

export default Navbar;
