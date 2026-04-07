"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";

export default function AboutPage() {
  const services = [
  {
    id: "embroidery-digitizing",
    title: "Embroidery Digitizing",
    description:
      "Convert logos, artwork, and designs into machine-ready embroidery files (DST, PES, EMB, JEF, EXP) with clean stitch paths and optimized output.",
  },
  {
    id: "RastertoVector",
    title: "Vector Art Conversion",
    description:
      "Transform low-quality raster images into high-resolution vector files (AI, EPS, SVG, PDF) suitable for print, branding, and screen printing.",
  },
  {
    id: "custom-patches",
    title: "Custom Patch Manufacturing",
    description:
      "Design and produce premium-quality embroidered, woven, PVC, chenille, sublimation, and leather patches with multiple backing options.",
  },
];
  return (
    <>
      <TopAnnouncementBar />
      <Navbar />

      <main className="pt-[140px] bg-gradient-to-b from-white via-green-50/30 to-white text-gray-700 overflow-hidden">

        {/* HERO */}
        <section className="py-28 text-center px-4 relative">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-300/20 blur-[120px] rounded-full"></div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold text-[#0e2c1c] mb-6 tracking-tight"
          >
            About ZS Digitizing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            At ZS Digitizing, we go beyond simple design conversion — we transform your ideas into high-quality embroidery digitizing, vector artwork, and custom patches that are fully optimized for real-world production. With over 3 years of hands-on experience, we support apparel brands, embroidery businesses, print shops, and designers in achieving clean stitching, precise detailing, and professional results — without delays or costly errors.
          </motion.p>
        </section>

        {/* OUR EXPERTISE */}
        <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#0e2c1c] mb-6">
              Our Expertise in Digitizing & Design Services
            </h2>

            <p className="leading-relaxed mb-4 text-gray-600">
              We provide professional digitizing services that ensure smooth machine performance, accurate stitch formation, and premium output quality.
            </p>
          
          </motion.div>

          {/* 3D GLASS CARD */}
          <motion.div
            whileHover={{ rotateY: 15, rotateX: 8 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="relative group perspective"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 blur-2xl rounded-3xl"></div>

            <div className="relative bg-white/70 backdrop-blur-2xl p-10 rounded-3xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.1)] flex flex-col items-center gap-4">
              <p className="text-center text-gray-600 text-lg">
                Premium Quality Digitizing Experience
              </p>

              <p className="text-center text-gray-700 mt-4">
                Email:{" "}
                <a href="mailto:info@zsdigitizing.com" className="font-semibold text-blue-600 hover:underline">
                  info@zsdigitizing.com
                </a>
              </p>
            </div>
          </motion.div>
        </section>

         <section className="py-24 px-6 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0e2c1c] text-center mb-12">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`} passHref>
                <motion.div
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="relative p-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/40 shadow-lg cursor-pointer flex flex-col justify-between h-full"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-[#0e2c1c]">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 flex-1">{service.description}</p>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="mt-6 inline-block px-4 py-2 bg-green-600 text-white rounded-xl font-medium text-center"
                  >
                    Learn More
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>


        {/* WHY CHOOSE US */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0e2c1c] text-center mb-16">
            Why Choose ZS Digitizing
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Fast Turnaround Time (Same-day delivery available)",
              "100% Manual Digitizing (No auto-digitizing software)",
              "Production-Ready Files with clean stitch paths",
              "Unlimited Revisions for customer satisfaction",
              "Affordable Pricing for businesses of all sizes",
              "24/7 Customer Support",
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15, scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative p-6 rounded-2xl bg-white/60 backdrop-blur-xl border shadow-lg text-center">
                  <p className="font-medium text-gray-700">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0e2c1c] text-center mb-16">
            Mission & Vision
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide reliable, high-quality embroidery digitizing and vector conversion services that help businesses grow with confidence. We aim to become your long-term digitizing partner by delivering consistency, accuracy, and professional support.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}>
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe embroidery is more than stitching — it’s a representation of your brand identity. Our vision is to lead the industry through innovation in digital embroidery techniques, precision in stitch file creation, and commitment to customer satisfaction.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CUSTOMER SUPPORT */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0e2c1c] text-center mb-16">
            Customer Support You Can Trust
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Fast response times",
              "Clear communication",
              "Expert guidance for embroidery, vectorization, and patch production",
              "Quick revisions to meet tight deadlines",
              "Accurate, production-ready files",
              "Reliable service quality"
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -10, scale: 1.05 }} className="p-6 rounded-2xl bg-white/60 backdrop-blur-xl border shadow-lg text-center">
                <p className="font-medium text-gray-700">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center px-10 relative">
          <div className="absolute inset-0 opacity-90"></div>
          <div className="relative text-grey">
            <h2 className="text-4xl font-bold mb-4">Let’s Build Something Great</h2>
            <p className="mb-8 text-gray">Start your project with premium digitizing services today.</p>

            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="/quote"
              className="inline-block bg-[#0e2c1c] text-white px-8 py-4 rounded-xl font-semibold shadow-2xl"
            >
              Request a Quote
            </motion.a>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}