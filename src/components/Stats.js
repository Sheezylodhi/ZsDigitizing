"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Completed Orders" },
  { value: "24h", label: "Fast Turnaround" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "10+", label: "Years Experience" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white border-t border-b">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-4xl font-extrabold text-[#2A4E3B]">
              {item.value}
            </h3>
            <p className="text-gray-600 mt-2 font-medium">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
