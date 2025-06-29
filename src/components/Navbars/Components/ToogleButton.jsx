import React from "react";
import { MoreVertical, X } from 'lucide-react';

const ToggleButton = ({ isOpen, toggleMenu }) => {
  return (
    <div className="md:hidden z-[999] cursor-pointer" onClick={toggleMenu}>
      {isOpen ? (
        <X  className="w-4 h-4 text-black transition-transform duration-300" />
      ) : (
        <MoreVertical  className="w-4 h-4 text-black transition-transform duration-300" />
      )}
    </div>
  );
};

export default ToggleButton;
