"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Embroidery Digitizing",
    desc: "High-quality embroidery digitizing with clean stitches and fast delivery.",
  },
  {
    title: "Vector Art",
    desc: "Raster to vector conversion for screen printing & branding.",
  },
  {
    title: "Custom Patches",
    desc: "Cap, jacket & badge patches with premium finishing.",
  },
  {
    title: "Logo Digitizing",
    desc: "Professional logo digitizing for all embroidery machines.",
  },
  {
    title: "Embroidery Fixes",
    desc: "Editing, resizing & fixing old embroidery files.",
  },
  {
    title: "3D Puff Embroidery",
    desc: "Premium 3D puff digitizing for caps & hats.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
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
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide professional embroidery digitizing services tailored
            for businesses, brands & individuals worldwide.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border hover:border-[#2A4E3B] transition group"
            >
              <h3 className="text-xl font-bold text-[#2A4E3B] mb-3 group-hover:underline">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.desc}
              </p>

              <a
                href="#quote"
                className="text-[#2A4E3B] font-semibold hover:text-green-700 transition"
              >
                Get Quote →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
