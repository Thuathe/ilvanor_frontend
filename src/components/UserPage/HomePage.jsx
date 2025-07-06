import React from "react";
import Navbar from "./Navbars/Navbar";
import Hero from "./Homes/Hero";
import WebListBeforeLogin from "./WebLists/WebListBeforeLogin";
import About from "./Footers/About";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <WebListBeforeLogin />
      <About />
    </div>
  );
};

export default HomePage;
