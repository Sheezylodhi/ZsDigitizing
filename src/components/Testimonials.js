"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";

// random rating generator: 4, 4.5, 5
const ratingsPool = [4, 4.5, 5];
const getRandomRating = () =>
  ratingsPool[Math.floor(Math.random() * ratingsPool.length)];

const testimonials = [
  {
    name: "Robert J. Smith",
    role: "Ocean Shore Store Owner",
    feedback:
      "The ZS digitizing quality is top-notch! My logos look crisp on every towel and shirt. Highly recommended",
    img: "/client1.jpeg",
    flagImg: "/usaflag.png",
    rating: getRandomRating(),
  },
  {
    name: "David Smith",
    role: "Apparel Brand Owner",
    feedback:
      "Working with ZS digitizing was seamless. The results delivered far exceeded what we had envisioned.",
    img: "/client2.jpeg",
    flagImg: "/finlandflag1.svg",
    rating: getRandomRating(),
  },
  {
    name: "Emma",
    role: "Textile Ceo Texas",
    feedback:
      "ZS digitizing innovative approach and excellent customer support make them a trusted partner for any project.",
    img: "/client3.jpeg",
    flagImg: "/usaflag.png",
    rating: getRandomRating(),
  },
  {
    name: "Alex Miller",
    role: "Startup Owner",
    feedback:
      "I m incredibly impressed by their ability to deliver top-notch solutions while meeting tight deadlines.",
    img: "/client.jpeg",
    flagImg: "/ukflag.png",
    rating: getRandomRating(),
  },
  {
    name: "Jason Reed",
    role: "MotorSport Team Owner",
    feedback:
      "I've tried many digitizing services, but none compare to the quality here. My logos look sharp on every shirt and cap. If you want your brand to look professional, ZS Digitizing is the way to go!",
    img: "/client5.jpeg",
    flagImg: "/canadaflag.png",
    rating: getRandomRating(),
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const rating = testimonials[index].rating;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <section
      className="py-24 scroll-mt-24 md:scroll-mt-32 bg-gray-50 relative overflow-hidden"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A4E3B] mb-16">
          What Our Clients Say
        </h2>

        <div className="relative max-w-4xl mx-auto flex items-center">
          <button
            onClick={prevSlide}
            className="hidden md:block p-2 text-[#2A4E3B] hover:scale-110 transition"
          >
            <ChevronLeft size={48} strokeWidth={3} />
          </button>

          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2A4E3B]">
                      <img
                        src={testimonials[index].img}
                        alt={testimonials[index].name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#2A4E3B] text-xl">
                          {testimonials[index].name}
                        </h4>
                        <img
                          src={testimonials[index].flagImg}
                          alt="country flag"
                          className="w-6 h-auto"
                        />
                      </div>
                      <p className="text-gray-500 text-sm uppercase tracking-wider">
                        {testimonials[index].role}
                      </p>
                    </div>
                  </div>

                  {/* ⭐ Rating */}
                  <div className="flex flex-col items-end">
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(fullStars)].map((_, i) => (
                        <Star key={`f-${i}`} size={18} fill="currentColor" />
                      ))}
                      {hasHalfStar && (
                        <StarHalf size={18} fill="currentColor" />
                      )}
                      {[...Array(emptyStars)].map((_, i) => (
                        <Star key={`e-${i}`} size={18} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {rating} / 5
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-lg md:text-2xl italic font-medium">
                  "{testimonials[index].feedback}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={nextSlide}
            className="hidden md:block p-2 text-[#2A4E3B] hover:scale-110 transition"
          >
            <ChevronRight size={48} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
}
