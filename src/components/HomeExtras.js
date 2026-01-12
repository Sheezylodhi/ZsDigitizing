"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const sewouts = [
  "/sewouts/sew1.jpg",
  "/sewouts/sew2.jpg",
  "/sewouts/sew3.jpg",
  "/sewouts/sew4.jpg",
  "/sewouts/sew5.jpg",
  "/sewouts/sew6.jpg",
];

export default function HomeExtras() {

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A4E3B] tracking-tight">
            Customer Sew-Out Gallery
          </h2>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            These are real sew-outs stitched from our digitized embroidery files.
            Quality speaks for itself — yours could be next.
          </p>
        </motion.div>

        {/* Sew-Out Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {sewouts.map((img, index) => (
            <FlipCard key={index} img={img} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FlipCard({ img }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-56 md:h-64 perspective cursor-pointer"
    >
      {/* FRONT */}
      <motion.div
        animate={{ rotateY: hovered ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-md"
      >
        <img src={img} className="w-full h-full object-cover" />
      </motion.div>

      {/* BACK */}
      <motion.div
        animate={{ rotateY: hovered ? 0 : -180 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 backface-hidden rounded-xl bg-white shadow-xl p-4 flex flex-col justify-between"
      >
        <p className="text-gray-700 text-sm leading-tight">
          Sew-out created from our digitized file. Perfect for jackets, caps,
          patches & uniforms.
        </p>
        <button className="mt-3 w-full bg-[#2A4E3B] text-white py-2 text-sm rounded-lg hover:bg-[#244433] transition">
          Request Similar Order
        </button>
      </motion.div>
    </motion.div>
  );
}
