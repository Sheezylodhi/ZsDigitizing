"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    id: "embroidery-digitizing",
    title: "Embroidery Digitizing",
    desc: "High-quality embroidery digitizing with clean stitches and fast delivery. We create perfectly clean stitches, optimized for all embroidery machines.",
    img: "/images/embridorydigitizing1.jpeg",
  },
  {
    id: "RastertoVector",
    title: "Raster To Vector",
    desc: "Raster to vector conversion for screen printing & branding. Perfect for logos, apparel, and screen printing designs.",
    img: "/images/rastertovector.jpeg",
  },
  {
    id: "custom-patches",
    title: "Custom Patches",
    desc: "Cap, jacket & badge patches with premium finishing. We digitize your design and provide ready-to-embroider files.",
    img: "/images/custompatches1.jpeg",
  },
  {
    id: "embroidery-fixes",
    title: "Embroidery Fixes",
    desc: "Editing, resizing & fixing old embroidery files. Ensure your files stitch perfectly on all machines.",
    img: "/images/embridoryfixes1.jpeg",
  },
  {
    id: "3d-puff-embroidery",
    title: "3D Puff Embroidery",
    desc: "Premium 3D puff digitizing for caps & hats. Adds professional depth and volume to your designs.",
    img: "/services/3d-puff-embroidery.jpg",
  },
];

export default function ServicePage() {
  const { serviceId } = useParams();
  const service = services.find((s) => s.id === serviceId);

  if (!service)
    return (
      <div className="flex flex-col min-h-screen">
        <TopAnnouncementBar />
        <Navbar />
        <main className="flex-grow flex items-center justify-center text-gray-700 text-xl mt-16 lg:mt-20">
          Service not found.
        </main>
        <Footer />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Announcement Bar */}
      <TopAnnouncementBar />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero section for this service */}
        <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12 mt-16 lg:mt-20">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#2A4E3B] mb-6">
              {service.title}
            </h1>
            <p className="text-gray-700 mb-8">{service.desc}</p>
            <Link
              href="/quote"
              className="bg-[#2A4E3B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl"
            >
              Get a Quote
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <img
              src={service.img}
              alt={service.title}
              className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
            />
          </motion.div>
        </section>

        {/* Other Services Section */}
        <section className="py-24 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-[#2A4E3B] mb-12 text-center">
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
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border hover:border-[#2A4E3B] transition group"
                  >
                    <h3 className="text-xl font-bold text-[#2A4E3B] mb-3 group-hover:underline">
                      {s.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{s.desc}</p>
                    <Link
                      href={`/services/${s.id}`}
                      className="text-[#2A4E3B] font-semibold hover:text-green-700 transition"
                    >
                      Learn More →
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
