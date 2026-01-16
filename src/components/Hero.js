"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const words = [
  "Embroidery Digitizing",
  "Raster To Vector",
  "Custom Patches",
  "Embroidery Fixes",
];

const images = [
  "/images/embridorydigitizing1.jpeg", 
  "/images/rastertovector.jpeg",
  "/images/custompatches1.jpeg",
  "/images/embridoryfixes1.jpeg",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [hold, setHold] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setDeleting(true);
    setHold(false);
  }, []);

  const prevSlide = useCallback(() => {
    setDeleting(true);
    setHold(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + words.length) % words.length);
      setSubIndex(0);
      setDeleting(false);
    }, 500);
  }, []);

  useEffect(() => {
    const currentWord = words[index];
    const timeout = setTimeout(() => {
      if (hold) return;

      if (!deleting && subIndex < currentWord.length) {
        setSubIndex((prev) => prev + 1);
      } 
      else if (!deleting && subIndex === currentWord.length) {
        setHold(true);
        setTimeout(() => {
          setHold(false);
          setDeleting(true);
        }, 2000);
      } 
      else if (deleting && subIndex > 0) {
        setSubIndex((prev) => prev - 1);
      } 
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        setAnimKey(Math.random());
      }

      setText(currentWord.substring(0, subIndex));
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, hold]);

  return (
    <section className="pt-32 md:pt-40 pb-24 bg-[#f7f9f8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

        {/* Typewriter Section */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-20"
        >
          {/* Mobile size reduced to text-3xl for better fit */}
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e4030] leading-tight mb-5">
            Top Quality
            {/* Height ko h-auto kiya hai mobile ke liye taake overlap na ho */}
            <span className="block min-h-[1.2em] h-auto relative mt-2 text-green-600 break-words">
              <span className="inline">{text}</span>
              <span className="ml-1 animate-pulse border-r-4 border-green-600">&nbsp;</span>
            </span>
          </h1>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Precision digital embroidery services with fast delivery, clean stitches,
            and competitive pricing trusted by global apparel brands and studios.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="/quote" className="px-6 md:px-8 py-3 rounded-lg bg-[#1e4030] text-white font-semibold shadow hover:bg-green-800 transition text-sm md:text-base">
              Get a Quote
            </a>
            <a href="#services" className="px-6 md:px-8 py-3 rounded-lg border border-[#1e4030] text-[#1e4030] font-semibold shadow hover:bg-[#1e4030] hover:text-white transition text-sm md:text-base">
              Our Services
            </a>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          key={animKey}
          initial={{ opacity: 0, x: isMobile ? 0 : 30, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-green-200 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none"></div>

         <div className="relative w-full max-w-[1019px] aspect-[1019/859]">
  <Image
    src={images[index]}
    alt={words[index]}
    fill
    className="shadow-2xl object-cover rounded-lg" // 'object-cover' se box poora fill hoga
    priority
  />

  {/* Left Button */}
  <button 
    onClick={prevSlide} 
    className="absolute top-1/2 -left-2 md:-left-8 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg p-2 md:p-3 rounded-full z-20 transition"
  >
    <ChevronLeft size={20} className="text-[#1e4030] md:w-6 md:h-6"/>
  </button>

  {/* Right Button */}
  <button 
    onClick={nextSlide} 
    className="absolute top-1/2 -right-2 md:-right-8 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg p-2 md:p-3 rounded-full z-20 transition"
  >
    <ChevronRight size={20} className="text-[#1e4030] md:w-6 md:h-6"/>
  </button>
</div>
        </motion.div>
      </div>
    </section>
  );
}