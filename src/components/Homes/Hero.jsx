import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="Beranda" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        src="/videos/bg_beranda.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 object-cover w-full h-full"
      />

      {/* Content */}
      <div className="absolute top-0 left-0 flex items-center justify-start w-full h-full px-10 md:px-[100px]">
        <div className="max-w-xl space-y-10 text-left">
          {/* Judul */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl tracking-wider font-bold text-black font-satoshi md:text-[60px] leading-relaxed md:leading-[1]"
          >
            Temukan Website<br />Temukan Cerita Dibaliknya
          </motion.h1>

          {/* Deskripsi */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg italic text-black md:text-[13.5px] font-poppins"
          >
            "Galeri digital tempat website kami hidup dan bercerita. Jelajahi karya, temukan inspirasi di setiap halaman."
          </motion.p>

          {/* Tombol */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center justify-center px-8 py-3 space-x-2 overflow-hidden text-base font-medium text-black transition-all duration-300 border rounded-lg cursor-pointer bg-white/30 border-invaPurple font-poppins group"
          >
            {/* Ripple Fill Effect */}
            <span className="absolute inset-0 w-0 h-0 bg-invaPurple opacity-20 rounded-full group-hover:w-72 group-hover:h-72 group-hover:opacity-40 transition-all duration-700 ease-out transform group-hover:scale-150 drop-shadow-[0_0_8px_#FF4FCB]"></span>

            {/* Icon */}
            <ArrowRight size={18} className="relative z-10 transition-all duration-300 group-hover:text-invaGray" />

            {/* Button Text */}
            <span className="relative z-10 transition-all duration-300 group-hover:text-invaGray">
              Jelajahi Sekarang
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero;
