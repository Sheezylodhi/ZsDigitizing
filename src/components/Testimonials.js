"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "John Doe",
    role: "Entrepreneur",
    feedback: "ZS Digitizing MD delivered my logo perfectly. Fast, professional & affordable!",
    img: "/clients/client1.jpg",
  },
  {
    name: "Jane Smith",
    role: "Brand Owner",
    feedback: "Amazing quality embroidery files. Highly recommend for businesses!",
    img: "/clients/client2.jpg",
  },
  {
    name: "Ali Khan",
    role: "Startup Owner",
    feedback: "Very responsive & creative team. My patches came out perfect!",
    img: "/clients/client3.jpg",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gray-50 relative" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A4E3B] mb-12">
          What Our Clients Say
        </h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Background Shapes */}
          <div className="absolute -top-20 -left-10 w-72 h-72 bg-green-100 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-green-200 rounded-full blur-3xl"></div>

          {/* Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 rounded-3xl shadow-2xl relative z-20"
            >
              <p className="text-gray-700 text-lg md:text-xl mb-6 italic">
                "{testimonials[index].feedback}"
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                <div className="w-16 h-16 md:w-20 md:h-20 relative rounded-full overflow-hidden shadow-lg flex-shrink-0">
                  <img
                    src={testimonials[index].img}
                    alt={testimonials[index].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-bold text-[#2A4E3B] text-lg md:text-xl">
                    {testimonials[index].name}
                  </p>
                  <p className="text-gray-500 text-sm md:text-base">
                    {testimonials[index].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300
                  ${i === index ? "bg-green-600 scale-125" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
