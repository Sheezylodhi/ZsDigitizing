"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { id: 1, image: "/images/ourservices.jpg" },
  { id: 2, image: "/images/rastertovector.png" },
  { id: 3, image: "/images/custompatches.png" },
  { id: 4, image: "/images/embridorydigitizing.png" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic Slider Logic - Ab yeh hamesha chalta rahega
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // Har 5 seconds baad slide change hogi

    return () => clearInterval(interval);
  }, [isPaused]);

  // Next Slide function with temporary pause on click
  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
    setIsPaused(true);
    const resumeTimer = setTimeout(() => setIsPaused(false), 8000); // 8 seconds baad autoplay resume ho jayega
    return () => clearTimeout(resumeTimer);
  }, []);

  // Previous Slide function with temporary pause on click
  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPaused(true);
    const resumeTimer = setTimeout(() => setIsPaused(false), 8000);
    return () => clearTimeout(resumeTimer);
  }, []);

  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] mt-0 md:mt-31 overflow-hidden bg-black flex items-center justify-center">
      
      {/* Background Image Slider with Crossfade Animation */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <Image
              src={slides[index].image}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === 0}
              className="object-contain md:object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white p-3 md:p-4 rounded-full z-20 transition border border-white/20 cursor-pointer shadow-2xl"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} className="md:w-7 md:h-7" />
      </button>

      {/* Navigation Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white p-3 md:p-4 rounded-full z-20 transition border border-white/20 cursor-pointer shadow-2xl"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} className="md:w-7 md:h-7" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 8000);
            }}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === i ? "w-6 h-2 bg-green-500" : "w-2 h-2 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}