"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Send Your Design",
    desc: "Upload your embroidery design details, images, or sketches. Our team will review your requirements carefully.",
   
  },
  {
    title: "We Digitize & Process",
    desc: "Our experts digitize your design with precision, ensuring clean stitches and high-quality output for embroidery machines.",
   
  },
  {
    title: "Receive Your File",
    desc: "Once completed, you will receive the digitized embroidery file ready for production. Fast delivery guaranteed.",
   
  },
];

export default function HowItWorksPage() {
  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2A4E3B] mb-4">
          How It Works
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Follow these simple steps to get your embroidery designs digitized
          professionally and quickly.
        </p>
      </div>

      <div className="relative flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative flex flex-col items-center text-center bg-white rounded-3xl shadow-lg p-10 max-w-xs hover:shadow-2xl transition-all duration-500"
          >
            {/* Icon Circle */}
          

            {/* Step Title */}
            <h3 className="text-2xl font-bold text-[#2A4E3B] mb-3">{step.title}</h3>

            {/* Step Description */}
            <p className="text-gray-600 text-sm md:text-base">{step.desc}</p>

            {/* Arrow Connector for Desktop */}
            {index < steps.length - 1 && (
              <div className="hidden md:flex absolute right-[-70px] top-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA at bottom */}
      <div className="text-center mt-20">
        <a
          href="/quote"
          className="bg-gradient-to-r from-green-500 to-green-700 text-white px-10 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-800 transition transform hover:scale-105 shadow-xl"
        >
          Send Your Design Now
        </a>
      </div>
    </section>
  );
}
