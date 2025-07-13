import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import routes from "../../../../routes";
const NavbarText = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Beranda", link: routes.user },
    { name: "Kategori", link: routes.user },
    { name: "Tentang Kami", link: "#about" },
    { name: "Profil", link: routes.userProfile },
    { name: "WebUp", link: routes.userWeblist },
  ];

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

  const handleClick = (menu) => {
    setActivePage(menu.name);

    // Kalau link diawali dengan "#", berarti scroll lokal
    if (menu.link.startsWith("#")) return;

    // Kalau link biasa (bukan anchor), redirect
    navigate(menu.link);
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
          {/* Hybrid: href untuk #anchor, navigate untuk page */}
          {menu.link.startsWith("#") ? (
            <a
              href={menu.link}
              onClick={() => handleClick(menu)}
              className="relative"
            >
              {menu.name}
              {activePage === menu.name && (
                <span className="absolute -bottom-[3px] left-1/2 transform -translate-x-1/2 w-full h-[0.1px] bg-invaPurple rounded-full drop-shadow-[0_0_4px_#FF4FCB]"></span>
              )}
            </a>
          ) : (
            <button
              onClick={() => handleClick(menu)}
              className="relative outline-none"
            >
              {menu.name}
              {activePage === menu.name && (
                <span className="absolute -bottom-[3px] left-1/2 transform -translate-x-1/2 w-full h-[0.1px] bg-invaPurple rounded-full drop-shadow-[0_0_4px_#FF4FCB]"></span>
              )}
            </button>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default NavbarText;
