"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


// Portfolio items with title, description, category
const portfolioItems = [
  {
    title: "Logo Digitizing",
    img: "/portfolio/logo1.jpg",
    category: "Logo",
    desc: "High-quality logo digitizing with clean stitches and fast delivery.",
  },
  {
    title: "Cap Embroidery",
    img: "/portfolio/cap1.jpg",
    category: "Patches",
    desc: "Premium cap embroidery with detailed 3D designs.",
  },
  {
    title: "Custom Patches",
    img: "/portfolio/patch1.jpg",
    category: "Patches",
    desc: "Custom patches for jackets, hats, and apparel.",
  },
  {
    title: "Jacket Design",
    img: "/portfolio/jacket1.jpg",
    category: "Apparel",
    desc: "Full embroidery jackets with intricate designs.",
  },
  {
    title: "Vector Artwork",
    img: "/portfolio/vector1.jpg",
    category: "Logo",
    desc: "Raster to vector artwork for embroidery & printing.",
  },
  {
    title: "Embroidery Fix",
    img: "/portfolio/fix1.jpg",
    category: "Fixes",
    desc: "Resizing, fixing, and optimizing existing embroidery files.",
  },
  {
    title: "3D Puff Logo",
    img: "/portfolio/3dpuff1.jpg",
    category: "3D Puff",
    desc: "Premium 3D puff embroidery for caps and hats.",
  },
  {
    title: "Apparel Design",
    img: "/portfolio/apparel1.jpg",
    category: "Apparel",
    desc: "Customized apparel embroidery for businesses and brands.",
  },
];

// Modal setup
Modal.setAppElement("body");

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = ["All", ...new Set(portfolioItems.map((i) => i.category))];

  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const prevImage = () => {
    setCurrentIndex(
      currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex(
      currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (

    
    <div className="min-h-screen bg-gray-50 pt-24">
        <TopAnnouncementBar />
      
            {/* Navbar */}
            <Navbar />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-[#2A4E3B] mb-8 text-center">
          Our Portfolio
        </h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition
                ${selectedCategory === cat
                  ? "bg-[#2A4E3B] text-white shadow-lg"
                  : "bg-white text-[#2A4E3B] border border-[#2A4E3B] hover:bg-[#2A4E3B] hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transform hover:scale-105 transition group"
              onClick={() => openModal(i)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-gray-200 text-sm mt-1">{item.category}</p>
                <p className="text-gray-200 text-xs mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="/quote"
            className="bg-[#2A4E3B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg transform hover:scale-105"
          >
            Request a Custom Design
          </a>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isClient && filteredItems.length > 0 && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-70"
        >
          <div className="relative flex items-center justify-center">
            {/* Prev Arrow */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-50 w-12 h-12 rounded-full hover:bg-opacity-70 transition"
            >
              &#10094;
            </button>

            {/* Image + Title + Desc */}
            <div className="max-w-3xl mx-auto">
              <img
                src={filteredItems[currentIndex].img}
                alt={filteredItems[currentIndex].title}
                className="max-h-[80vh] rounded-lg shadow-lg"
              />
              <h3 className="text-white text-xl font-bold mt-4 text-center">
                {filteredItems[currentIndex].title}
              </h3>
              <p className="text-gray-200 text-sm mt-2 text-center">
                {filteredItems[currentIndex].desc}
              </p>
            </div>

            {/* Next Arrow */}
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-50 w-12 h-12 rounded-full hover:bg-opacity-70 transition"
            >
              &#10095;
            </button>

            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-red-600 transition"
            >
              &times;
            </button>
          </div>
        </Modal>
      )}
              <Footer />
      
    </div>
  );
}
