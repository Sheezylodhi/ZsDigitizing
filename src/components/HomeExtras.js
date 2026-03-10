"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const sewouts = [
  { before: "/sewout1.jpeg", after: "/sewoutafter1.jpeg" },
  { before: "/sewout2.jpeg", after: "/sewoutafter2c.jpeg" },
  { before: "/sewout3.jpeg", after: "/sewoutafter3c.jpeg" },
  { before: "/sewout4.jpeg", after: "/sewoutafter4c.jpeg" },
  { before: "/sewout5.jpeg", after: "/sewoutafter5.jpeg" },
  { before: "/sewout6.jpeg", after: "/sewoutafter6.jpeg" },
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
  <motion.img
    key={showAfter ? "after" : "before"}
    src={
      showAfter
        ? sewouts[popupIndex].after
        : sewouts[popupIndex].before
    }
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="w-full max-h-[420px] object-contain rounded-lg"
  />

  {/* RIGHT ARROW */}
  <button
    onClick={nextImage}
    className=" cursor-pointer absolute -right-2   top-1/2 -translate-y-1/2 text-white text-3xl bg-black/60 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 transition z-20"
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
      className="relative h-56 md:h-64 cursor-pointer rounded-xl overflow-hidden shadow-md group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* FRONT */}
      {!hovered && (
        <div className="w-full h-full relative">
          <img
            src={beforeImage}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
            <p className="text-white font-semibold text-lg">Sew Out</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={openPopup}
                className="bg-white cursor-pointer text-black text-sm px-3 py-1 rounded-md"
              >
                View
              </button>

              <Link href="/quote">
                <button className="cursor-pointer bg-[#0e2c1c]  text-white text-sm px-3 py-1 rounded-md">
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
          <img
            src={afterImage}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
            <p className="text-white font-semibold text-lg">
              Customer Artwork
            </p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={openPopup}
                className=" cursor-pointer bg-white text-black text-sm px-3 py-1 rounded-md"
              >
                View
              </button>

              <Link href="/quote">
                <button className="bg-[#0e2c1c] cursor-pointer text-white text-sm px-3 py-1 rounded-md">
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