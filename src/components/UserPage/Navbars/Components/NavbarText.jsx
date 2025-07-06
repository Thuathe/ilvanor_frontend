import React from "react";
import { motion } from "framer-motion";

const NavbarText = ({ activePage, setActivePage }) => {
  const menuItems = ["Beranda", "Kategori", "Tentang Kami"];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <motion.ul
      className="flex space-x-7 text-[12.5px] absolute left-1/2 transform -translate-x-1/2 font-poppins italic"
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
        >
          <a
            href={`#${menu}`}
            onClick={() => setActivePage(menu)}
            className="relative"
          >
            {menu}

            {/* Garis indikator aktif */}
            {activePage === menu && (
              <span className="absolute -bottom-[3px] left-1/2 transform -translate-x-1/2 w-full h-[0.1px] bg-invaPurple rounded-full drop-shadow-[0_0_4px_#FF4FCB]"></span>
            )}
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default NavbarText;
