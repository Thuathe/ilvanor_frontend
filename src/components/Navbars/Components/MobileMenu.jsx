import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginText from "./LoginText";

const MobileMenu = ({ isOpen, handleMenuClick, activePage }) => {
  const menuItems = ["Beranda", "Kategori", "Tentang Kami"];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed top-[65px] right-4 w-[130px] bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-4 flex flex-col space-y-4 z-[999]"
        >
          <motion.ul
            className="flex flex-col space-y-4 text-[8px] font-poppins italic"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {menuItems.map((menu, index) => (
              <motion.li
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="relative tracking-wide text-black transition-all duration-100 cursor-pointer hover:text-invaPurple group"
                onClick={() => handleMenuClick(menu)}
              >
                <a href={`#${menu}`} className="relative">
                  {menu}

                  {/* Garis indikator aktif */}
                  {activePage === menu && (
                    <motion.span
                      key={menu} // penting untuk re-render saat ganti menu
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      exit={{ width: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="absolute -bottom-[3px] left-1/2 transform -translate-x-1/2 h-[0.1px] bg-invaPurple rounded-full drop-shadow-[0_0_4px_#FF4FCB]"
                    ></motion.span>
                  )}
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* LoginText */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-2 border-t border-black/10"
          >
            <LoginText />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
