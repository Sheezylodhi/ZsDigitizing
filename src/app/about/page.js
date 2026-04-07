"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";

export default function AboutPage() {
  return (
    <>
      <TopAnnouncementBar />
      <Navbar />

      <main className="pt-[140px] bg-gradient-to-b from-white via-green-50/30 to-white text-gray-700 overflow-hidden">

        {/* HERO */}
        <section className="py-28 text-center px-4 relative">

          {/* PREMIUM GLOW */}
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
            className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            At ZS Digitizing, we specialize in embroidery digitizing, vector conversion, and custom patch creation for businesses and designers who require precision and quality.
          </motion.p>

        </section>

        {/* WHO WE ARE */}
        <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#0e2c1c] mb-6">
              Our Services
            </h2>

            <p className="leading-relaxed mb-4 text-gray-600">
              Our embroidery digitizing service transforms any design into clean, machine-ready stitch files that ensure smooth production and perfect results. Every detail is carefully crafted to maintain accuracy, proper stitch density, and professional finishing.
            </p>

            <p className="leading-relaxed mb-4 text-gray-600">
              With vector conversion, we provide precise, scalable artwork suitable for embroidery, printing, and other applications. This ensures your designs remain sharp, clear, and consistent across all formats.
            </p>

            <p className="leading-relaxed text-gray-600">
              Our custom patch service allows you to bring unique designs to life with durable, high-quality patches that can be used for branding, uniforms, or personal projects. We pay close attention to every detail, making sure the final product matches your vision.
            </p>

            <p className="leading-relaxed mt-4 text-gray-600">
              We focus on fast turnaround and client satisfaction. Every file is carefully reviewed, and we offer revisions to ensure it meets your exact requirements. We aim to make your production process smooth, efficient, and reliable.
            </p>

            <p className="leading-relaxed mt-4 text-gray-600">
              Experience our professional digitizing, vector, and patch services today and see how ZS Digitizing can help bring your designs to life with precision and quality.
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

    {/* Contact Info */}
    <p className="text-center text-gray-700 mt-4">
      Email:{" "}
      <a href="mailto:info@zsdigitizing.com" className="font-semibold text-blue-600 hover:underline">
        info@zsdigitizing.com
      </a>
    </p>
  </div>
</motion.div>

        </section>

        {/* SERVICES */}
       {/* SERVICES */}
<section className="py-24 px-6">
  <div className="max-w-6xl mx-auto text-center mb-14">
    <h2 className="text-4xl font-bold text-[#0e2c1c]">
      What We Do
    </h2>
  </div>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[
      { name: "Embroidery Digitizing", id: "embroidery-digitizing" },
      { name: "Vector Art Conversion", id: "RastertoVector" },
      { name: "Custom Patch Digitizing", id: "custom-patches" },
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        whileHover={{ scale: 1.08, rotateX: 8, rotateY: 8 }}
        className="group relative cursor-pointer"
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-green-400/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>

        <Link href={`/services/${item.id}`} className="relative block bg-white p-7 rounded-2xl border shadow-xl group-hover:shadow-2xl transition">
          <h3 className="font-semibold text-[#0e2c1c] text-lg mb-2">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500">
            Professional precision with high-end quality results.
          </p>
        </Link>
      </motion.div>
    ))}
  </div>
</section>

        {/* WHY CHOOSE US */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0e2c1c] text-center mb-16">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Fast Turnaround",
              "Premium Quality",
              "Affordable Pricing",
              "Unlimited Revisions",
              "All Formats Supported",
              "24/7 Support",
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

        {/* CTA */}
        <section className="py-24 text-center px-10 relative">

          <div className="absolute inset-0  opacity-90"></div>

          <div className="relative text-grey">
            <h2 className="text-4xl font-bold mb-4">
              Let’s Build Something Great
            </h2>

            <p className="mb-8 text-gray">
              Start your project with premium digitizing services today.
            </p>

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