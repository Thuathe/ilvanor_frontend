import React from 'react';

const About = () => {
  return (
    <section id="Tentang Kami" className="min-h-screen w-full bg-invaGray flex flex-col justify-center items-center text-center px-8 py-20">
      <h2 className="text-4xl md:text-6xl font-bold text-invaPurple mb-8">Tentang Kami</h2>
      <p className="text-lg md:text-2xl max-w-4xl text-white mb-6 leading-relaxed">
        InvanoR adalah portal digital tempat kamu menemukan berbagai source code website berkualitas, modern, dan estetik.  
        Kami hadir untuk membantu kamu membangun website impian dengan desain yang memukau dan fungsionalitas yang handal.  
        <br /><br />
        Dengan sentuhan dunia magis dan nuansa unik, kami percaya setiap kode memiliki ceritanya sendiri. Mari jelajahi dunia InvanoR dan temukan website terbaik untuk kamu.
      </p>
      <span className="text-invaPink font-semibold text-xl">#CodeYourWorld</span>
    </section>
  )
}

export default About;
