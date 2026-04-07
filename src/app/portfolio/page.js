"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextImage from "next/image"; // ✅ Use Next.js optimized Image

const portfolioItems = [
    { title: "Embriodery", img: "/portfolio/embroidery1.BMP", category: "Embriodery Digitizing", desc: "High-quality logo digitizing." },
    { title: "Embriodery", img: "/portfolio/embroidery2.BMP", category: "Embriodery Digitizing", desc: "High-quality logo digitizing." },
    { title: "Embriodery", img: "/portfolio/embroidery3.BMP", category: "Embriodery Digitizing", desc: "High-quality logo digitizing." },
    { title: "Embriodery", img: "/portfolio/embroidery4.BMP", category: "Embriodery Digitizing", desc: "High-quality logo digitizing." },
    { title: "Embriodery", img: "/portfolio/embroidery5.BMP", category: "Embriodery Digitizing", desc: "High-quality logo digitizing." },
    { title: "Embriodery", img: "/portfolio/embroidery6.BMP", category: "Embriodery Digitizing", desc: "High-quality logo digitizing." },
    { title: "Embriodery", img: "/portfolio/embroidery7.BMP", category: "Embriodery Digitizing", desc: "High-quality logo digitizing." },
    { title: "Embriodery", img: "/portfolio/embroidery8.BMP", category: "Embriodery Digitizing", desc: "High-quality logo digitizing." },
    { title: "Vector ", img: "/portfolio/vector1.webp", category: "Vector", desc: "Premium Vector embroidery." },
    { title: "Vector ", img: "/portfolio/vector2.webp", category: "Vector", desc: "Premium Vector embroidery." },
    { title: "Vector ", img: "/portfolio/vector5.webp", category: "Vector", desc: "Premium Vector embroidery." },
    { title: "Vector ", img: "/portfolio/vector3.webp", category: "Vector", desc: "Premium Vector embroidery." },
    { title: "Vector ", img: "/portfolio/vector4.webp", category: "Vector", desc: "Premium Vector embroidery." },
    { title: "Patch ", img: "/portfolio/patch1.BMP", category: "Patches", desc: "Custom patches." },
    { title: "Patch ", img: "/portfolio/patch2.BMP", category: "Patches", desc: "Custom patches." },
    { title: "Patch ", img: "/portfolio/patch3.BMP", category: "Patches", desc: "Custom patches." },
];

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = ["All", ...new Set(portfolioItems.map((i) => i.category))];

  const getFilteredItems = () => {
    if (selectedCategory === "All") {
      const limitedItems = [];

      categories.forEach(cat => {
        if (cat === "All") return;

        const limit = cat === "Vector" ? 4 : 2; // ✅ Vector = 4, baqi = 2

        const catItems = portfolioItems
          .filter(item => item.category === cat)
          .slice(0, limit);

        limitedItems.push(...catItems);
      });

      return limitedItems;
    }

    return portfolioItems.filter((item) => item.category === selectedCategory);
  };

  const filteredItems = getFilteredItems();

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex(currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex(currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1);
  };

  const getButtonText = () => {
    if (selectedCategory === "All") return "Request a Quote";
    if (selectedCategory === "Embriodery Digitizing") return "Request an Embroidery Design";
    if (selectedCategory === "Vector") return "Request an Vector Design";
    if (selectedCategory === "Patches") return "Request an Custom Patches";
    return "Request a Quote";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <TopAnnouncementBar />
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-[#2A4E3B] mb-8 text-center">Our Portfolio</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === cat ? "bg-[#2A4E3B] text-white shadow-lg" : "bg-white text-[#2A4E3B] border border-[#2A4E3B] hover:bg-[#2A4E3B] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, i) => (
            <motion.div
              key={`${selectedCategory}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer relative overflow-hidden shadow-md hover:shadow-xl group"
              onClick={() => openModal(i)}
            >
              {/* ✅ Optimized Image */}
              <NextImage
                src={item.img}
                alt={item.title}
                width={400}
                height={192}
                className="w-full h-48 object-contain"
                loading="lazy"
                priority={false}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-gray-200 text-xs mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/quote"
            className="bg-[#2A4E3B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg transform hover:scale-105"
          >
            {getButtonText()}
          </a>
        </div>
      </section>

      {isClient && filteredItems.length > 0 && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={true}
          className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-85 z-[9998]"
        >
          <div className="relative max-w-4xl w-full flex flex-col items-center outline-none">
            <button
              onClick={closeModal}
              className="absolute -top-10 cursor-pointer right-0 text-white text-4xl hover:text-red-500 transition"
            >
              &times;
            </button>

            <button onClick={prevImage} className="absolute left-[-20px] md:left-[-60px] top-1/2 text-white text-5xl hover:scale-110 transition">&lsaquo;</button>
            <button onClick={nextImage} className="absolute right-[-20px] md:right-[-60px] top-1/2 text-white text-5xl hover:scale-110 transition">&rsaquo;</button>

            <NextImage
              src={filteredItems[currentIndex]?.img}
              alt="Selected"
              width={800}
              height={600}
              className="max-h-[75vh] w-auto rounded-lg shadow-2xl"
              priority={true} // Popup image should load quickly
            />
            <div className="text-center mt-4 bg-black bg-opacity-50 p-4 rounded-lg w-full">
               <h3 className="text-white text-2xl font-bold">{filteredItems[currentIndex]?.title}</h3>
               <p className="text-gray-300">{filteredItems[currentIndex]?.desc}</p>
            </div>
          </div>
        </Modal>
      )}
      <Footer />
    </div>
  );
}