"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Sew-out images: before and after
const sewouts = [
  { before: "/sewout1.jpeg", after: "/sewoutafter1.jpeg" },
  { before: "/sewout2.jpeg", after: "/sewoutafter2c.jpeg" },
  { before: "/sewout3.jpeg", after: "/sewoutafter3c.jpeg" },
  { before: "/sewout4.jpeg", after: "/sewoutafter4c.jpeg" },
  { before: "/sewout5.jpeg", after: "/sewoutafter5.jpeg" },
  { before: "/sewout6.jpeg", after: "/sewoutafter6.jpeg" },
];

export default function HomeExtras() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Title */}
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
          {sewouts.map((item, index) => (
            <FlipCard
              key={index}
              beforeImage={item.before}
              afterImage={item.after}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FlipCard({ beforeImage, afterImage }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative h-56 md:h-64 cursor-pointer rounded-xl overflow-hidden shadow-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* FRONT IMAGE */}
      {!hovered && (
        <motion.img
          src={beforeImage}
          alt="Before Sew-Out"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* BACK IMAGE */}
      {hovered && (
        <motion.div
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={afterImage}
            alt="After Sew-Out"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </div>
  );
}
