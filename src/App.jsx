import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Category from './components/Category';
import WebList from './components/WebList';
import About from './components/About';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Category />
      <WebList />
      <About />
    </div>
  );
}

export default App;
