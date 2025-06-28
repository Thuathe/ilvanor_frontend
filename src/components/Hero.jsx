import React from 'react';

const Hero = () => {
  return (
    <section id="Beranda" className="relative h-screen w-full overflow-hidden">
      <video
        src="\public\videos\bg_beranda.mp4"
        // autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full  flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-invaPurple mb-4 animate-pulse">Selamat Datang di INVANOR</h1>
        <p className="text-xl md:text-2xl text-invaPink mb-8">Dunia Kode dan Kreasi Digital</p>
        <button className="px-6 py-3 bg-invaPurple text-white rounded-2xl text-lg hover:bg-invaPink transition">Jelajahi Sekarang</button>
      </div>
    </section>
  )
}

export default Hero;
