"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Portfolio items (replace image paths with your real images in /public/portfolio/)
const portfolioItems = [
  {
    title: "Logo Digitizing",
    img: "/portfolio/logo1.jpg",
    category: "Logo",
  },
  {
    title: "Cap Embroidery",
    img: "/portfolio/cap1.jpg",
    category: "3D Puff",
  },
  {
    title: "Custom Patches",
    img: "/portfolio/patch1.jpg",
    category: "Patch",
  },
  {
    title: "Jacket Design",
    img: "/portfolio/jacket1.jpg",
    category: "Apparel",
  },
  {
    title: "Vector Artwork",
    img: "/portfolio/vector1.jpg",
    category: "Vector",
  },
  {
    title: "Embroidery Fix",
    img: "/portfolio/fix1.jpg",
    category: "Fix",
  },
];

export default function Portfolio() {
  const [selected, setSelected] = useState("All");

  const filteredItems =
    selected === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selected);

  const categories = ["All", "Logo", "3D Puff", "Patch", "Apparel", "Vector", "Fix"];

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-[#2A4E3B] mb-8">
          Our Portfolio
        </h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 rounded-full font-medium transition
                ${selected === cat ? "bg-[#2A4E3B] text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-[#2A4E3B] hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition transform hover:scale-105"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-lg font-bold text-[#2A4E3B]">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
