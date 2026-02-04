"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    title: "STITCH COUNT PRICE",
    price: "$5.00",
    sub: "/1K Stitches",
    note: "(Negotiable)",
    features: [
      "8 hours turnaround",
      "4 hours if rush",
      "DST PDF Jpeg File",
      "Other Formats (On request)",
      "Small edit/revision free",
      "Discount on bulk order",
    ],
    popular: true,
  },
  {
    title: "LEFT CHEST / CAP",
    price: "$30.00",
    sub: "No limit of stitch",
    note: "count Depends on complexity",
    features: [
      "8 hours turnaround",
      "4 hours if rush",
      "DST PDF Jpeg File",
      "Other Formats (On request)",
      "Small edit/revision free",
      "Discount on bulk order",
    ],
  },
  {
    title: "JACKET BACK",
    price: "$80.00",
    sub: "",
    note: "Depends on complexity",
    features: [
      "8 hours turnaround",
      "4 hours if rush",
      "DST PDF Jpeg File",
      "Other Formats (On request)",
      "Small edit/revision free",
      "Discount on bulk order",
    ],
  },
  {
    title: "VECTOR GRAPHICS",
    price: "$20 - $200",
    sub: "",
    note: "Depends on complexity",
    features: [
      "24 hours turnaround",
      "12 hours if rush",
      "All Formats (On request)",
      "Small edit/revision free",
      "Discount on bulk orders",
    ],
  },
  {
    title: "CUSTOM PATCHES",
    price: "$5.00",
    sub: "/1K Stitches",
    note: "(Negotiable)",
    features: [
      "8 hours turnaround",
      "4 hours if rush",
      "DST PDF Jpeg File",
      "Other Formats (On request)",
      "Small edit/revision free",
      "Discount on bulk order",
    ],
    popular: true,
  },
];

export default function Pricing() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const amount = 320;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="prices" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A4E3B] mb-4">
            Pricing Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Transparent pricing based on stitch count & design complexity.
          </p>
        </motion.div>

        {/* DESKTOP ARROWS */}
        <div className="hidden md:flex justify-end gap-3 mb-6">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
          >
            →
          </button>
        </div>

        {/* SLIDER (Mobile + Desktop) */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative min-w-[280px] snap-center bg-white border rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition
                ${
                  plan.popular
                    ? "border-blue-500"
                    : "border-gray-200"
                }
              `}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 text-xs font-semibold rounded-full">
                  MOST POPULAR
                </span>
              )}

              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                {plan.title}
              </h3>

              <div className="text-4xl font-bold text-blue-500 mb-1">
                {plan.price}
              </div>

              {plan.sub && (
                <p className="text-sm text-gray-600">{plan.sub}</p>
              )}

              <p className="text-xs text-gray-500 mt-2 mb-6">
                {plan.note}
              </p>

              <ul className="space-y-3 text-sm text-gray-700 text-left mb-8">
                {plan.features.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2 text-green-600">✔</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="/quote"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
              >
                ORDER NOW!
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
