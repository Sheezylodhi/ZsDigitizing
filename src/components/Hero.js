"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const words = [
  "Embroidery Digitizing",
  "Vector Art Designing",
  "Custom Patches",
  "Logo Digitizing",
  "Embroidery Fixes",
];

const images = [
  "/images/embroidory.png",
  "/images/vector.png",
  "/images/Patches.png",
  "/images/logo_digitizing.png",
  "/images/embroidery-fixes.png",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [hold, setHold] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  // ---- Manual Navigation ----
  const nextSlide = useCallback(() => {
    setDeleting(true);
    setHold(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
      setSubIndex(0);
      setDeleting(false);
      setAnimKey(Math.random());
    }, 300);
  }, []);

  const prevSlide = useCallback(() => {
    setDeleting(true);
    setHold(false);
    setTimeout(() => {
      setIndex((i) => (i - 1 + words.length) % words.length);
      setSubIndex(0);
      setDeleting(false);
      setAnimKey(Math.random());
    }, 300);
  }, []);

  // ---- Typewriter Effect ----
  useEffect(() => {
    if (hold) return;

    const timeout = setTimeout(() => {
      if (!deleting && subIndex === words[index].length) {
        setHold(true);
        setTimeout(() => {
          nextSlide();
        }, 1500);
      } else {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      }
      setText(words[index].substring(0, subIndex));
    }, deleting ? 60 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, hold, nextSlide]);

  return (
    <section className="pt-40 pb-24 bg-[#f7f9f8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* --- LEFT --- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-[#1e4030] leading-snug mb-5">
            Top Quality<br/>
            <span className="text-green-700">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-lg">
            Precision digital embroidery services with fast delivery, clean stitches,
            and competitive pricing trusted by global apparel brands and studios.
          </p>

          <div className="flex gap-4">
            <a href="/quote" className="px-8 py-3 rounded-lg bg-[#1e4030] text-white font-semibold shadow hover:bg-green-800 transition">
              Get a Quote
            </a>
            <a href="#services" className="px-8 py-3 rounded-lg border border-[#1e4030] text-[#1e4030] font-semibold shadow hover:bg-[#1e4030] hover:text-white transition">
              Our Services
            </a>
          </div>
        </motion.div>

        {/* --- RIGHT SLIDER --- */}
        <motion.div
          key={animKey}
          initial={{ opacity: 0, x: 30, scale: .96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center"
        >
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-green-200 rounded-full blur-3xl opacity-40"></div>

          <div className="relative">
            <Image
              src={images[index]}
              alt={words[index]}
              width={520}
              height={520}
              className="rounded-2xl shadow-2xl object-cover"
              priority
            />

            {/* Arrows */}
            <button onClick={prevSlide} className="absolute top-1/2 -left-8 -translate-y-1/2 bg-white/80 hover:bg-white shadow p-2 rounded-full">
              <ChevronLeft size={22}/>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 -right-8 -translate-y-1/2 bg-white/80 hover:bg-white shadow p-2 rounded-full">
              <ChevronRight size={22}/>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
