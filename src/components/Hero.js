"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
  "Embroidery Digitizing",
  "Vector Art Designing",
  "Custom Patches",
  "Logo Digitizing",
  "Embroidery Fixes",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting && subIndex === words[index].length) {
        setDeleting(true);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      }

      setText(words[index].substring(0, subIndex));
    }, deleting ? 60 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <section
      id="home"
      className="pt-36 pb-20 bg-gray-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2A4E3B] leading-tight mb-4">
            Professional <br />
            <span className="text-green-700">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="text-lg text-gray-700 mb-8 max-w-lg">
            High-quality embroidery digitizing with fast delivery,
            clean stitches, and affordable pricing for worldwide clients.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#quote"
              className="bg-[#2A4E3B] text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition transform hover:scale-105"
            >
              Get a Quote
            </a>

            <a
              href="#services"
              className="border-2 border-[#2A4E3B] text-[#2A4E3B] px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-[#2A4E3B] hover:text-white transition transform hover:scale-105"
            >
              Our Services
            </a>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-green-100 rounded-full blur-3xl"></div>

          <Image
            src="/embroidery-hero.png" // 👈 image public folder me rakho
            alt="Embroidery Digitizing"
            width={500}
            height={500}
            className="relative z-10 rounded-xl shadow-2xl"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}
