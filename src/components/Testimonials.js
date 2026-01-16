"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// 1. Apni images ko public folder mein save karein: 
// usa-flag.png, finland-flag.png, uk-flag.png, canada-flag.png

const testimonials = [
  {
    name: "Robert J. Smith",
    role: "Ocean Shore Store Owner",
    feedback: "The ZS digitizing quality is top-notch! My logos look crisp on every towel and shirt. Highly recommended",
    img: "/client1.jpeg",
    flagImg: "/usaflag.png" // 1: USA
  },
  {
    name: "David Smith",
    role: "Bapparel Brand Owner",
    feedback: "Working with ZS digitizing was seamless. The results delivered far exceeded what we had envisioned.",
    img: "/client2.jpeg",
    flagImg: "/finlandflag.png" // 2: Finland
  },
  {
    name: "Emma",
    role: "Textile Ceo Texas",
    feedback: "ZS digitizing innovative approach and excellent customer support make them a trusted partner for any project.",
    img: "/client3.jpeg",
    flagImg: "/usaflag.png" // 3: USA
  },
  {
    name: "Adam Gabrial",
    role: "Startup Owner",
    feedback: "I m incredibly impressed by their ability to deliver top-notch solutions while meeting tight deadlines.",
    img: "/client4.jpeg",
    flagImg: "/ukflag.png" // 4: UK
  },
  {
    name: "Jake Harper",
    role: "MotorSport Team Owner",
    feedback: "I've tried many digitizing services, but none compare to the quality here. My logos look sharp on every shirt and cap. If you want your brand to look professional, ZS Digitizing is the way to go!",
    img: "/client5.jpeg",
    flagImg: "/canadaflag.png" // 5: CANADA
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A4E3B] mb-16">
          What Our Clients Say
        </h2>

        <div className="relative max-w-4xl mx-auto flex items-center">
          
          <button onClick={prevSlide} className="hidden md:block p-2 text-[#2A4E3B] hover:scale-110 transition">
            <ChevronLeft size={48} strokeWidth={3} />
          </button>

          <div className="relative w-full">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-70"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl relative z-20 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#2A4E3B]">
                      <img
                        src={testimonials[index].img}
                        alt={testimonials[index].name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#2A4E3B] text-lg md:text-xl leading-tight">
                          {testimonials[index].name}
                        </h4>
                        {/* Flag Image Rendering */}
                        <img 
                          src={testimonials[index].flagImg} 
                          alt="country flag" 
                          className="w-6 h-auto rounded-sm object-contain"
                        />
                      </div>
                      <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wider">
                        {testimonials[index].role}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <div className="text-center px-4">
                  <p className="text-gray-600 text-lg md:text-2xl leading-relaxed font-medium italic">
                    "{testimonials[index].feedback}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={nextSlide} className="hidden md:block p-2 text-[#2A4E3B] hover:scale-110 transition">
            <ChevronRight size={48} strokeWidth={3} />
          </button>
        </div>

        {/* Mobile & Dots Navigation */}
        <div className="flex justify-center gap-10 mt-8 md:hidden">
            <button onClick={prevSlide} className="text-[#2A4E3B]"><ChevronLeft size={32}/></button>
            <button onClick={nextSlide} className="text-[#2A4E3B]"><ChevronRight size={32}/></button>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-[#2A4E3B]" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}