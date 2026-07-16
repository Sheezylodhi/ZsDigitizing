// components/PortfolioContent.js
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextImage from "next/image";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

export default function PortfolioContent() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Data Fetching
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("/api/admin/portfolio");
        const data = await res.json();
        setPortfolioItems(data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const categories = ["All", ...new Set(portfolioItems.map((i) => i.category))];

  const getFilteredItems = () => {
    if (selectedCategory === "All") {
      const limitedItems = [];
      categories.forEach((cat) => {
        if (cat === "All") return;
        const limit = cat === "Vector" ? 4 : 2;
        const catItems = portfolioItems
          .filter((item) => item.category === cat)
          .slice(0, limit);
        limitedItems.push(...catItems);
      });
      return limitedItems;
    }
    return portfolioItems.filter((item) => item.category === selectedCategory);
  };

  const filteredItems = getFilteredItems();

  const openModal = (index) => {
    const originalIndex = portfolioItems.findIndex(item => item._id === filteredItems[index]._id);
    setCurrentIndex(originalIndex);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex(currentIndex === 0 ? portfolioItems.length - 1 : currentIndex - 1);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex(currentIndex === portfolioItems.length - 1 ? 0 : currentIndex + 1);
  };

  const getButtonText = () => {
    if (selectedCategory === "All") return "Request a Quote";
    return `Request a ${selectedCategory} Design`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="cursor-pointer relative overflow-hidden shadow-md hover:shadow-xl group"
              onClick={() => openModal(i)}
            >
              <NextImage
                src={item.img}
                alt={item.title}
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-gray-200 text-xs mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/quote" className="bg-[#2A4E3B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg">
            {getButtonText()}
          </a>
        </div>
      </section>

      {portfolioItems.length > 0 && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-85 z-[9998]"
        >
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button onClick={closeModal} className="absolute -top-10 right-0 text-white text-4xl">&times;</button>
            <button onClick={prevImage} className="absolute left-[-20px] md:left-[-60px] top-1/2 text-white text-5xl">&lsaquo;</button>
            <button onClick={nextImage} className="absolute right-[-20px] md:right-[-60px] top-1/2 text-white text-5xl">&rsaquo;</button>

            <NextImage
              src={portfolioItems[currentIndex]?.img}
              alt="Selected"
              width={800}
              height={600}
              className="max-h-[75vh] w-auto rounded-lg shadow-2xl"
            />
            <div className="text-center mt-4 bg-black bg-opacity-50 p-4 rounded-lg w-full">
              <h3 className="text-white text-2xl font-bold">{portfolioItems[currentIndex]?.title}</h3>
              <p className="text-gray-300">{portfolioItems[currentIndex]?.desc}</p>
            </div>
          </div>
        </Modal>
      )}
      <Footer />
    </div>
  );
}