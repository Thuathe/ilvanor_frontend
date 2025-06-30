import React from 'react';
import Navbar from './components/Navbars/Navbar';
import Hero from './components/Homes/Hero';
import Category from './components/Category';
import WebList from './components/WebLists/WebList';
import About from './components/Footers/About';

function App() {
  return (
    <div >
      <Navbar />
      <Hero />
      {/* <Category /> */}
      <WebList />
      <About />
    </div>
  );
}

export default App;
