import React from 'react';

const categories = [
  { id: 1, name: 'Portfolio Website', color: 'bg-invaPink' },
  { id: 2, name: 'E-commerce Website', color: 'bg-invaPurple' },
  { id: 3, name: 'Landing Page', color: 'bg-invaPink' },
  { id: 4, name: 'Web Apps', color: 'bg-invaPurple' },
];

const Category = () => {
  return (
    <section id="Kategori" className="min-h-screen w-full bg-invaGray flex flex-col justify-center items-center py-20">
      <h2 className="text-4xl md:text-6xl font-bold text-invaPurple mb-12">Kategori</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 w-full max-w-6xl">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`h-40 flex justify-center items-center rounded-2xl text-white text-2xl font-semibold cursor-pointer ${cat.color} hover:scale-105 transition transform duration-300 shadow-lg`}
          >
            {cat.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
