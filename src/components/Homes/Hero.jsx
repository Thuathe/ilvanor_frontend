import React from 'react';

const Hero = () => {
  return (
    <section id="Beranda" className="relative w-full h-screen overflow-hidden bg-black">
      <video
        src="\public\videos\bg_beranda.mp4"
        // autoPlay
        loop
        muted
        className="absolute top-0 left-0 object-cover w-full h-full opacity-50"
      />
      <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full px-4 text-center">
        <h1 className="mb-4 text-5xl font-bold md:text-7xl text-invaPurple animate-pulse">Selamat Datang di INVANOR</h1>
        <p className="mb-8 text-xl md:text-2xl text-invaPink">Dunia Kode dan Kreasi Digital</p>
        <button className="px-6 py-3 text-lg text-white transition bg-invaPurple rounded-2xl hover:bg-invaPink">Jelajahi Sekarang</button>
      </div>
    </section>
  )
}

export default Hero;
