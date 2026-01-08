"use client";

import { motion } from "framer-motion";
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
    }, 5000); // every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gray-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-[#2A4E3B] mb-12">
          What Our Clients Say
        </h2>

        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
        >
          <p className="text-gray-700 text-lg mb-6 italic">
            "{testimonials[index].feedback}"
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 relative rounded-full overflow-hidden">
              <img
                src={testimonials[index].img}
                alt={testimonials[index].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#2A4E3B]">
                {testimonials[index].name}
              </p>
              <p className="text-gray-500 text-sm">{testimonials[index].role}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
