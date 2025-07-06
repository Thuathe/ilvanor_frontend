import React from "react";
import Navbar from "./Navbars/Navbar";
import Hero from "./Homes/Hero";
import WebList from "./WebLists/WebList";
import About from "./Footers/About";

const UserPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <WebList />
      <About />
    </div>
  );
};

export default UserPage;
