"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image"; // Renamed to avoid conflict

const sewouts = [
  { before: "/sewout1.webp", after: "/sewoutafter1.webp" },
  { before: "/sewout2.webp", after: "/sewoutafter2c.webp" },
  { before: "/sewout3.webp", after: "/sewoutafter3c.webp" },
  { before: "/sewout4.webp", after: "/sewoutafter4c.webp" },
  { before: "/sewout5.webp", after: "/sewoutafter5.webp" },
  { before: "/sewout6.webp", after: "/sewoutafter6.webp" },
];

export default function HomeExtras() {
  const [popupIndex, setPopupIndex] = useState(null);
  const [showAfter, setShowAfter] = useState(false);

  const closePopup = () => {
    setPopupIndex(null);
    setShowAfter(false);
  };

  const nextImage = () => {
    setShowAfter(false);
    setPopupIndex((prev) => (prev + 1) % sewouts.length);
  };

  const prevImage = () => {
    setShowAfter(false);
    setPopupIndex((prev) => (prev - 1 + sewouts.length) % sewouts.length);
  };

  // Prefetch next/prev images for smooth popup
  useEffect(() => {
    if (popupIndex !== null) {
      const next = (popupIndex + 1) % sewouts.length;
      const prev = (popupIndex - 1 + sewouts.length) % sewouts.length;

      [next, prev].forEach((i) => {
        const imgs = [sewouts[i].before, sewouts[i].after];
        imgs.forEach((src) => {
          const img = new window.Image(); // Use native Image constructor explicitly
          img.src = src;
        });
      });
    }
  }, [popupIndex]);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* TITLE */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A4E3B]">
            Customer Sew-Out Gallery
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sewouts.map((item, index) => (
            <FlipCard
              key={index}
              beforeImage={item.before}
              afterImage={item.after}
              openPopup={() => setPopupIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {popupIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CLOSE */}
            <button
              onClick={closePopup}
              className="absolute top-6 right-8 text-white text-4xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* MODAL */}
            <motion.div
              initial={{ scale: 0.7, y: 80, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: 80, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative bg-white rounded-xl p-4 w-[440px] max-w-[92vw] shadow-2xl"
            >
              <div className="relative flex items-center justify-center">
                {/* LEFT ARROW */}
                <button
                  onClick={prevImage}
                  className=" cursor-pointer absolute -left-2 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/60 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 transition z-20"
                >
                  ‹
                </button>

                {/* IMAGE */}
                <NextImage
                  key={showAfter ? "after" : "before"}
                  src={
                    showAfter
                      ? sewouts[popupIndex].after
                      : sewouts[popupIndex].before
                  }
                  width={440}
                  height={420}
                  className="w-full max-h-[420px] object-contain rounded-lg"
                  alt="Sewout"
                  priority
                />

                {/* RIGHT ARROW */}
                <button
                  onClick={nextImage}
                  className=" cursor-pointer absolute -right-2 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/60 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 transition z-20"
                >
                  ›
                </button>
              </div>

              {/* TOGGLE */}
              <div className="flex justify-center mt-4 gap-4">
                <button
                  onClick={() => setShowAfter(false)}
                  className={`px-4 py-2 cursor-pointer rounded-md text-sm ${
                    !showAfter
                      ? "bg-[#2A4E3B] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Before
                </button>

                <button
                  onClick={() => setShowAfter(true)}
                  className={`px-4 py-2 cursor-pointer rounded-md text-sm ${
                    showAfter
                      ? "bg-[#2A4E3B] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  After
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FlipCard({ beforeImage, afterImage, openPopup }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full aspect-[4/5] sm:h-56 md:h-64 cursor-pointer rounded-xl overflow-hidden shadow-md group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* FRONT */}
      {!hovered && (
        <div className="w-full h-full relative">
          <NextImage
            src={beforeImage}
            alt="Sewout Before"
            fill
            className="object-contain bg-white transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-black/30 flex flex-col justify-between p-3 sm:p-4">
            <p className="text-white font-semibold text-sm sm:text-lg">
              Sew Out
            </p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={openPopup}
                className="bg-white text-black text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md"
              >
                View
              </button>

              <Link href="/quote">
                <button className="bg-[#0e2c1c] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md">
                  Get Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* BACK */}
      {hovered && (
        <div className="w-full h-full relative">
          <NextImage
            src={afterImage}
            alt="Sewout After"
            fill
            className="object-contain bg-white transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-black/30 flex flex-col justify-between p-3 sm:p-4">
            <p className="text-white font-semibold text-sm sm:text-lg">
              Customer Artwork
            </p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={openPopup}
                className="bg-white text-black text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md"
              >
                View
              </button>

              <Link href="/quote">
                <button className="bg-[#0e2c1c] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md">
                  Get Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}