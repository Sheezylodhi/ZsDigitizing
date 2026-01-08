"use client";

import { motion } from "framer-motion";

const plans = [
  {
    title: "Basic",
    price: "$10",
    desc: "Perfect for simple logos & small designs",
    features: [
      "Simple logo digitizing",
      "Standard stitch quality",
      "24-48 hours delivery",
      "DST, PES, JEF formats",
    ],
  },
  {
    title: "Standard",
    price: "$20",
    popular: true,
    desc: "Best for professional embroidery needs",
    features: [
      "Complex logo digitizing",
      "High-quality stitching",
      "12-24 hours delivery",
      "Free minor revisions",
      "All machine formats",
    ],
  },
  {
    title: "Premium",
    price: "$30",
    desc: "Advanced & 3D embroidery projects",
    features: [
      "3D Puff & patches",
      "Ultra-clean stitch files",
      "Fast delivery (8-12 hours)",
      "Unlimited revisions",
      "Priority support",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="prices" className="py-24 bg-white border-t">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-[#2A4E3B] mb-4">
            Pricing Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transparent pricing with no hidden charges.  
            Final price depends on design complexity & stitch count.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl border p-8 shadow-md hover:shadow-xl transition 
                ${plan.popular ? "border-[#2A4E3B] scale-105" : "border-gray-200"}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2A4E3B] text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold text-[#2A4E3B] mb-2">
                {plan.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {plan.desc}
              </p>

              <div className="text-4xl font-extrabold text-gray-900 mb-6">
                {plan.price}
                <span className="text-base text-gray-500 font-medium">
                  / design
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-700 flex items-center">
                     <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#quote"
                className={`block text-center px-6 py-3 rounded-lg font-semibold transition
                  ${
                    plan.popular
                      ? "bg-[#2A4E3B] text-white hover:bg-green-700"
                      : "border-2 border-[#2A4E3B] text-[#2A4E3B] hover:bg-[#2A4E3B] hover:text-white"
                  }`}
              >
                Send Design for Quote
              </a>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-gray-500 mt-10 text-sm">
          ⚠ Prices may vary depending on design size, stitch count & complexity.
        </p>
      </div>
    </section>
  );
}
