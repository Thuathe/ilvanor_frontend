import React from 'react';

const products = [
  {
    id: 1,
    title: 'Website Portfolio',
    description: 'Source code portfolio modern dan responsif.',
    image: 'https://via.placeholder.com/300x150', // Nanti ganti URL gambar produk kamu
  },
  {
    id: 2,
    title: 'Website E-commerce',
    description: 'Source code toko online siap pakai.',
    image: 'https://via.placeholder.com/300x150',
  },
  {
    id: 3,
    title: 'Landing Page Aesthetic',
    description: 'Landing page premium dengan animasi modern.',
    image: 'https://via.placeholder.com/300x150',
  },
];

const ProductList = () => {
  return (
    <section className="min-h-screen w-full bg-invaGray flex flex-col justify-center items-center py-20">
      <h2 className="text-4xl md:text-6xl font-bold text-invaPink mb-12">Produk Kami</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 w-full max-w-6xl">
        {products.map((product) => (
          <div key={product.id} className="bg-white text-black rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300 flex flex-col">
            
            {/* Gambar Produk */}
            <div className="h-48 w-full overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            
            {/* Info Produk */}
            <div className="p-4 flex flex-col justify-between flex-grow bg-invaGray text-white">
              <div>
                <h3 className="text-2xl font-bold text-invaPurple mb-2">{product.title}</h3>
                <p className="text-base mb-4">{product.description}</p>
              </div>
              <button className="mt-auto px-4 py-2 bg-invaPurple hover:bg-invaPink text-white rounded-xl transition">Lihat Detail</button>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductList;
