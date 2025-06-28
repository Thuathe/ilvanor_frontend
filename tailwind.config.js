module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
            colors: {
        invaPink: '#FF69B4', // ganti dengan warna pink sesuai keinginan kamu
      },
      fontFamily: {
        invanor: ['"Uncial Antiqua"', 'cursive'], // Judul INVANOR
        navbar: ['Poppins', 'sans-serif'], // Font standar untuk menu
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
      },
    },
  },
  plugins: [],
};
