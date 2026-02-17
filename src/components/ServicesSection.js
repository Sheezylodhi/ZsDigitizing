"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";

const services = [
  {
    id: "embroidery-digitizing",
    title: "Embroidery Digitizing",
    desc: "High-quality embroidery digitizing with clean stitches and fast delivery.",
  },
  {
    id: "vector-art",
    title: "Vector Art",
    desc: "Raster to vector conversion for screen printing & branding.",
  },
  {
    id: "custom-patches",
    title: "Custom Patches",
    desc: "Cap, jacket & badge patches with premium finishing.",
  },
  {
    id: "embroidery-fixes",
    title: "Embroidery Fixes",
    desc: "Editing, resizing & fixing old embroidery files.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-gradient-to-b from-white to-gray-50 scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A4E3B] tracking-tight">
            Our Services
          </h2>
          <p className="text-gray-600 mt-3 max-w-3xl mx-auto text-lg">
            Trusted by apparel brands, factories & individual clients worldwide for premium digitizing services.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <ServiceCard key={service.id} index={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: "easeOut",
      }}
      className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100
        hover:border-[#2A4E3B]/60 transition-all duration-300"
    >
      <h3 className="text-xl font-bold text-[#2A4E3B] mb-3 group-hover:underline underline-offset-4">
        {service.title}
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        {service.desc}
      </p>
      <Link
        href={`/services/${service.id}`}
        className="text-[#2A4E3B] font-semibold hover:text-green-700 transition"
      >
        Learn More →
      </Link>
    </motion.div>
  );
}
