import React from "react";
import { motion } from "framer-motion";

const NavbarText = () => {
  const menuItems = ["Beranda", "Kategori", "Tentang Kami"];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
      className="flex space-x-7 text-[13.5px] absolute left-1/2 transform -translate-x-1/2 font-navbar italic"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {menuItems.map((menu, index) => (
        <motion.li
          key={index}
          variants={item}
          whileHover={{ scale: 1.05 }} // Sedikit membesar saat hover
          className="cursor-pointer text-black hover:text-invaPink transition-all duration-100 tracking-wide relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1.5px] after:bg-invaPink hover:after:w-full after:transition-all after:duration-300"
        >
          <a href={`#${menu}`}>{menu}</a>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default NavbarText;
