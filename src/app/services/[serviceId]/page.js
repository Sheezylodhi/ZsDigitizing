"use client";

import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    id: "embroidery-digitizing",
    title: "Embroidery Digitizing",
    img: "/images/embridorydigitizing1.webp",
  },
  {
    id: "RastertoVector",
    title: "Raster To Vector",
    img: "/images/rastertovector.webp",
  },
  {
    id: "custom-patches",
    title: "Custom Patches",
    img: "/images/custompatches.webp",
  },
];

const serviceContent = {
  "embroidery-digitizing": {
    intro:
      "At ZS Digitizing, we convert your artwork into high-quality embroidery files with precision, clean stitch paths, and excellent machine performance. Our digitizing ensures smooth productionwith minimal thread breaks and perfect finishing.",

    services: [
      "Left Chest Logo Digitizing",
      "Cap & 3D Puff Digitizing",
      "Jacket Back Digitizing",
      "Applique Digitizing",
      "Complex & Detailed Logo Digitizing",
    ],

    features: [
      "Clean & optimized stitch paths",
      "Minimal trims & thread breaks",
      "Fast turnaround time (4–12 hours)",
      "Compatible with all embroidery machines",
      "Free minor revisions",
    ],

    formats: "DST | PES | JEF | EXP | VP3 | EMB | XXX",
     final: [
      "Whether you are an apparel brand, embroidery shop, or promotional company, we deliver production-ready files you can trust"
    ],
  },

  RastertoVector: {
    intro:
      "We convert low-resolution images into high-quality scalable vector files suitable for printing, branding, and promotional use. No more blurry logos. We recreate your artwork with precision and clean lines.",

    services: [
      "Raster to Vector Conversion",
      "Logo Redrawing & Recreation",
      "Screen Printing Artwork",
      "Color Separation",
      "Print Ready Artwork",
      "Large Format Artwork",
    ],

    features: [
      "100% manual vector tracing (no auto-trace tools)",
      "Crisp, scalable artwork",
      "Print-ready AI, EPS, PDF, SVG files",
      "Fast delivery",
      "Unlimited size scalability without quality loss"
    ],

    formats: "AI | EPS | PDF | SVG | CDR",
    
    final: [
      "Perfect for screen printers, apparel brands, promotional product companies, and marketing agencies worldwide."
    ],


  },

  "custom-patches": {
    intro:
      "At ZS Digitizing, we produce premium-quality custom patches designed for durability, sharp detailing, and professional finishing. Whether you need patches for uniforms, brands, events, or promotional use, we deliver high-standard results with worldwide shipping.",

    services: [
      "Embroidered Patches",
      "Woven Patches",
      "PVC Rubber Patches",
      "Chenille Patches",
      "Leather Patches",
      "Each patch is crafted with precision to ensure clean borders, vibrant colors, and long-lasting quality."
    ],

    features: [
      "High-detail stitching & clean finishing",
      "Strong, durable materials",
      "Competitive bulk pricing",
      "Fast production time",
      "Worldwide delivery"
    ],

    formats: "Iron-On | Velcro | Sew-On | Adhesive",
    final: "From small custom runs to large bulk orders, we ensure consistent quality and professional service."
  },
};

export default function ServicePage() {
  const { serviceId } = useParams();
  const service = services.find((s) => s.id === serviceId);
  const content = serviceContent[serviceId];

  const [expanded, setExpanded] = useState(false);

  if (!service) return null;

  return (

    <div className="flex flex-col min-h-screen bg-white">

      <TopAnnouncementBar />
      <Navbar />

      <main className="flex-grow">

        <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start gap-12 mt-16 lg:mt-20">

          <motion.div
            layout
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"

          >

            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0e2c1c] mb-6">
              {service.title}
            </h1>

            <p className="text-gray-700 mb-6">
              {content.intro}
            </p>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45 }}
                  className="overflow-hidden"
                >

                  <h2 className="font-bold text-lg mb-2 text-[#0e2c1c]">
                    What We Offer
                  </h2>

                  <ul className="mb-8 space-y-4 p-5 text-gray">
                    {content.services.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <h3 className="font-bold text-lg mb-2 text-[#0e2c1c]">
                   Why Choose Us?
                  </h3>

                  <ul className="mb-8 space-y-4  p-5 text-gray">
                    {content.features.map((item, i) => (
                      <li key={i}> {item}</li>
                    ))}
                  </ul>

                  <p className="text-sm text-gray-600 mb-6">
                    File Formats: {content.formats}
                  </p>
                   <p className="text-gray-100 mb-6">
              {content.final}
            </p>

                </motion.div>
              )} </AnimatePresence>

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[#0e2c1c] cursor-pointer font-semibold mb-8 hover:underline"

            >

              {expanded ? "Show Less" : "See More"} </button>

            <br />

            <Link
              href="/quote"
              className="bg-[#0e2c1c] text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
            >
              Get a Quote
            </Link>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"

          >

            <img
              src={service.img}
              alt={service.title}
              className="rounded-2xl  object-contain w-full max-h-[420px]"
            />

          </motion.div>

        </section>

        <section className="py-24 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-3xl font-extrabold text-[#0e2c1c] mb-12 text-center">
              Explore Other Services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {services
                .filter((s) => s.id !== serviceId)
                .map((s, i) => (

                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className=" p-6 rounded-2xl shadow-md hover:shadow-xl  transition"

                  >

                    <img
                      src={s.img}
                      className="rounded-xl mb-4 h-40 w-full object-cover"
                    />

                    <h3 className="text-xl font-bold text-[#0e2c1c] mb-3">
                      {s.title}
                    </h3>

                    <Link
                      href={`/services/${s.id}`}
                      className="text-[#0e2c1c] font-semibold"
                    >
                      Learn More →
                    </Link>

                  </motion.div>

                ))}

            </div>
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}
