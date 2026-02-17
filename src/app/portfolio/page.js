"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const portfolioItems = [
  { title: "Vector 1", img: "/portfolio/vector1.jpeg", category: "Vector", desc: "Premium Vector embroidery." },
  { title: "Vector 2", img: "/portfolio/vector2.jpeg", category: "Vector", desc: "Premium Vector embroidery." },
  { title: "Vector 3", img: "/portfolio/vector3.jpeg", category: "Vector", desc: "Premium Vector embroidery." },
  { title: "Logo 1", img: "/portfolio/logo1.jpg", category: "Logo", desc: "High-quality logo digitizing." },
  { title: "Logo 2", img: "/portfolio/logo2.jpg", category: "Logo", desc: "High-quality logo digitizing." },
  { title: "Cap 1", img: "/portfolio/cap1.jpg", category: "Patches", desc: "Premium cap embroidery." },
  { title: "Patch 1", img: "/portfolio/patch1.jpg", category: "Patches", desc: "Custom patches." },
  { title: "Jacket 1", img: "/portfolio/jacket1.jpg", category: "Apparel", desc: "Full embroidery jackets." },
  { title: "3D Puff", img: "/portfolio/3dpuff1.jpg", category: "3D Puff", desc: "Premium 3D puff embroidery." },
  // ... baqi items yahan add karein
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

  // LOGIC: Filter items based on "All" (limit 2 per cat) or specific category
  const getFilteredItems = () => {
    if (selectedCategory === "All") {
      const limitedItems = [];
      categories.forEach(cat => {
        if (cat === "All") return;
        const catItems = portfolioItems.filter(item => item.category === cat).slice(0, 2);
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
    e.stopPropagation(); // Modal band hone se rokne ke liye
    setCurrentIndex(currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1);
  };

  const nextImage = (e) => {
    e.stopPropagation(); // Modal band hone se rokne ke liye
    setCurrentIndex(currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <TopAnnouncementBar />
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-[#2A4E3B] mb-8 text-center">Our Portfolio</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === cat ? "bg-[#2A4E3B] text-white shadow-lg" : "bg-white text-[#2A4E3B] border border-[#2A4E3B] hover:bg-[#2A4E3B] hover:text-white"
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
              key={`${selectedCategory}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden shadow-md hover:shadow-xl cursor-pointer group"
              onClick={() => openModal(i)}
            >
              <img src={item.img} alt={item.title} className="w-full h-48 object-contain" />
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
            Request a Custom Design
          </a>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isClient && filteredItems.length > 0 && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={true} // Bahar click karne par band hoga
          className="fixed inset-0 flex items-center justify-center z-[9999] p-4" // High z-index for Navbar fix
          overlayClassName="fixed inset-0 bg-black bg-opacity-85 z-[9998]"
        >
          <div className="relative max-w-4xl w-full flex flex-col items-center outline-none">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-red-500 transition"
            >
              &times;
            </button>

            {/* Navigation */}
            <button onClick={prevImage} className="absolute left-[-20px] md:left-[-60px] top-1/2 text-white text-5xl hover:scale-110 transition">&lsaquo;</button>
            <button onClick={nextImage} className="absolute right-[-20px] md:right-[-60px] top-1/2 text-white text-5xl hover:scale-110 transition">&rsaquo;</button>

            {/* Content */}
            <img
              src={filteredItems[currentIndex]?.img}
              alt="Selected"
              className="max-h-[75vh] w-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Image click par band na ho
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
