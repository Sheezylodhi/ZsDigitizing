"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";
import Image from "next/image";

const ratingsPool = [4, 4.5, 5];
const getRandomRating = () =>
  ratingsPool[Math.floor(Math.random() * ratingsPool.length)];

const testimonials = [
  {
    name: "Robert J. Smith",
    role: "Ocean Shore Store Owner",
    feedback:
      "The ZS digitizing quality is top-notch! My logos look crisp on every towel and shirt. Highly recommended",
    img: "/client1.webp",
    flagImg: "/usaflag.webp",
  },
  {
    name: "David Smith",
    role: "Apparel Brand Owner",
    feedback:
      "Working with ZS digitizing was seamless. The results delivered far exceeded what we had envisioned.",
    img: "/client2.webp",
    flagImg: "/finlandflag1.svg",
  },
  {
    name: "Emma",
    role: "Textile Ceo Texas",
    feedback:
      "ZS digitizing innovative approach and excellent customer support make them a trusted partner for any project.",
    img: "/client3.webp",
    flagImg: "/usaflag.webp",
  },
  {
    name: "Alex Miller",
    role: "Startup Owner",
    feedback:
      "I m incredibly impressed by their ability to deliver top-notch solutions while meeting tight deadlines.",
    img: "/client.webp",
    flagImg: "/ukflag.webp",
  },
  {
    name: "Jason Reed",
    role: "MotorSport Team Owner",
    feedback:
      "I've tried many digitizing services, but none compare to the quality here. My logos look sharp on every shirt and cap. If you want your brand to look professional, ZS Digitizing is the way to go!",
    img: "/client5.webp",
    flagImg: "/canadaflag.webp",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [ratings, setRatings] = useState([]);

  // Generate ratings client-side only
  useEffect(() => {
    setRatings(testimonials.map(() => getRandomRating()));
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const rating = ratings[index] || 5; // SSR-safe default
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction > 0 ? -200 : 200, opacity: 0 }),
  };

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
            className="hidden cursor-pointer md:block p-2 text-[#2A4E3B] hover:scale-110 transition"
          >
            <ChevronLeft size={48} strokeWidth={3} />
          </button>

          <div className="relative w-full overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2A4E3B]">
                      <Image
                        src={testimonials[index].img}
                        alt={testimonials[index].name}
                        width={64}
                        height={64}
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#2A4E3B] text-xl">
                          {testimonials[index].name}
                        </h4>
                        <Image
                          src={testimonials[index].flagImg}
                          alt="country flag"
                          width={24}
                          height={16}
                          className="object-contain"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-gray-500 text-sm uppercase tracking-wider">
                        {testimonials[index].role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(fullStars)].map((_, i) => (
                        <Star key={`f-${i}`} size={18} fill="currentColor" />
                      ))}
                      {hasHalfStar && <StarHalf key="half" size={18} fill="currentColor" />}
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
            className="hidden cursor-pointer md:block p-2 text-[#2A4E3B] hover:scale-110 transition"
          >
            <ChevronRight size={48} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
}