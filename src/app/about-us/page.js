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
      id: "rastertovector",
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

  const whyChoose = [
    "Fast Turnaround Time (Same-day delivery available)",
    "100% Manual Digitizing (No auto-digitizing software)",
    "Production-Ready Files with clean stitch paths",
    "Unlimited Revisions for customer satisfaction",
    "Affordable Pricing for businesses of all sizes",
    "24/7 Customer Support",
  ];

  const support = [
    "Fast response times",
    "Clear communication",
    "Expert guidance for embroidery, vectorization, and patch production",
    "Quick revisions to meet tight deadlines",
    "Accurate, production-ready files",
    "Reliable service quality",
  ];

  return (
    <>
      <TopAnnouncementBar />
      <Navbar />

      <main className="pt-[140px] overflow-hidden bg-[#f8f7f2] text-gray-700">

        {/* =====================================================
            HERO — LEFT CONTENT / RIGHT VIDEO
        ===================================================== */}
        <section className="relative px-6 py-20 sm:py-28">
          <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#b8ce9e]/20 blur-[130px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
             

              <h1 className="text-5xl font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0e2c1c] sm:text-6xl">
                 About 
                <span className="block text-[#56745e]">
                   ZS Digitizing
                </span>
              </h1>

              <div className="mt-7 h-px w-20 bg-[#c9a76a]" />

              <p className="mt-7 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
             
ZS Digitizing goes beyond mere conversion. We transform your artwork into embroidery digitizing, vector artwork, and patches ready for actual production. We have worked in the field for more than 10 years and provide our services to clothing manufacturers, embroidery houses, printers, promo firms, and fashion designers that require reliable and ready to go files. The members of our team concentrate on proper stitching, correct details, proper scaling, and machine compatibility to minimize potential production problems and prevent any further corrections and unnecessary delays. We study each particular artwork thoroughly and provide each file with respect to its purpose.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-8">
                <div>
                  <p className="text-3xl font-extrabold text-[#0e2c1c]">
                    13K+
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Completed Orders
                  </p>
                </div>

                <div className="h-10 w-px bg-[#0e2c1c]/10" />

                <div>
                  <p className="text-3xl font-extrabold text-[#0e2c1c]">
                    10+
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Years Experience
                  </p>
                </div>

                <div className="h-10 w-px bg-[#0e2c1c]/10" />

                <div>
                  <p className="text-3xl font-extrabold text-[#0e2c1c]">
                    4h
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Fast Turnaround
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT VIDEO */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-[2rem] bg-[#b8ce9e]/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-[#0e2c1c]/10 bg-[#0e2c1c] p-2 shadow-[0_30px_80px_rgba(14,44,28,0.18)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source
                      src="/videos/final-cta.mp4"
                      type="video/mp4"
                    />
                  </video>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e2c1c]/40 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            OUR EXPERTISE — LEFT TEXT / RIGHT INFO PANEL
        ===================================================== */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#6b806f]">
                Our Expertise
              </span>

              <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-[#0e2c1c] sm:text-5xl">
                Our Expertise in
                <span className="block text-[#56745e]">
                  Digitizing & Design Services
                </span>
              </h2>

              <div className="mt-7 h-px w-20 bg-[#c9a76a]" />

              <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
               We offer expert embroidery digitizing services that help ensure smooth machine performance, clean stitching, and consistent embroidery quality.
              </p>

              <p className="mt-8 text-sm text-gray-600">
                Email:{" "}
                <a
                  href="mailto:info@zsdigitizing.com"
                  className="font-semibold text-[#0e2c1c] transition hover:text-[#56745e]"
                >
                  info@zsdigitizing.com
                </a>
              </p>
            </motion.div>

            {/* RIGHT PREMIUM PANEL */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-[#b8ce9e]/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] bg-[#0e2c1c] p-8 text-white shadow-[0_30px_70px_rgba(14,44,28,0.18)] sm:p-10">

                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b8ce9e]">
                      Our Standard
                    </p>

                    <h3 className="mt-3 text-3xl font-bold">
                      Built for Production
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 font-bold text-[#c9a76a]">
                    ZS
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                  <div className="bg-[#0e2c1c] p-6">
                    <p className="text-3xl font-extrabold text-white">
                      13K+
                    </p>
                    <p className="mt-2 text-sm text-white/55">
                      Completed Orders
                    </p>
                  </div>

                  <div className="bg-[#0e2c1c] p-6">
                    <p className="text-3xl font-extrabold text-white">
                      10+
                    </p>
                    <p className="mt-2 text-sm text-white/55">
                      Years Experience
                    </p>
                  </div>

                  <div className="bg-[#0e2c1c] p-6">
                    <p className="text-3xl font-extrabold text-white">
                      4h
                    </p>
                    <p className="mt-2 text-sm text-white/55">
                      Turnaround
                    </p>
                  </div>

                  <div className="bg-[#0e2c1c] p-6">
                    <p className="text-3xl font-extrabold text-white">
                      24/7
                    </p>
                    <p className="mt-2 text-sm text-white/55">
                      Support
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-7">
                  <p className="leading-7 text-white/65">
                    Premium Quality Digitizing Experience
                  </p>

                  <div className="mt-5 flex items-center gap-3 text-sm text-[#b8ce9e]">
                    <span className="h-2 w-2 rounded-full bg-[#c9a76a]" />
                    Production-ready artwork
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-sm text-[#b8ce9e]">
                    <span className="h-2 w-2 rounded-full bg-[#c9a76a]" />
                    Clean stitch formation
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-sm text-[#b8ce9e]">
                    <span className="h-2 w-2 rounded-full bg-[#c9a76a]" />
                    Professional output quality
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            SERVICES
        ===================================================== */}
        <section className="border-y border-[#0e2c1c]/5 bg-white px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6b806f]">
                What We Do
              </span>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0e2c1c] sm:text-5xl">
                Our Services
              </h2>

              <p className="mt-5 text-gray-600">
                Professional artwork and production solutions built around
                quality, precision, and reliable results.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service, index) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="flex h-full min-h-[330px] flex-col rounded-[1.75rem] border border-[#0e2c1c]/10 bg-[#f8f7f2] p-8 transition-all duration-300 group-hover:border-[#56745e]/40 group-hover:shadow-[0_20px_50px_rgba(14,44,28,0.10)]"
                  >
                    <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-[#0e2c1c] text-sm font-bold text-white">
                      0{index + 1}
                    </div>

                    <h3 className="text-2xl font-bold text-[#0e2c1c]">
                      {service.title}
                    </h3>

                    <p className="mt-4 flex-1 leading-7 text-gray-600">
                      {service.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#0e2c1c]">
                      Learn More
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            WHY CHOOSE US
        ===================================================== */}
        <section className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto mb-16 max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6b806f]">
                The ZS Difference
              </span>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0e2c1c] sm:text-5xl">
                Why Choose ZS Digitizing
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {whyChoose.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-[#0e2c1c]/10 bg-white p-7 shadow-[0_10px_35px_rgba(14,44,28,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(14,44,28,0.09)]"
                >
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#e6eddf] text-sm font-bold text-[#0e2c1c]">
                    ✓
                  </div>

                  <p className="font-medium leading-7 text-gray-700">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            MISSION & VISION
        ===================================================== */}
        <section className="bg-[#0e2c1c] px-6 py-24 text-white sm:py-28">
          <div className="mx-auto max-w-7xl">

            <div className="mb-16 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b8ce9e]">
                Our Direction
              </span>

              <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
                Mission & Vision
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">

              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-9 backdrop-blur-sm"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c9a76a]">
                  Our Mission
                </span>

                <p className="mt-6 leading-8 text-white/70">
                 Our goal is to provide reliable embroidery digitizing and vector artwork services that businesses can depend on for their everyday production needs. We strive to deliver consistent service and build long term working relationships with our customers.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-9 backdrop-blur-sm"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c9a76a]">
                  Our Vision
                </span>

                <p className="mt-6 leading-8 text-white/70">
                We believe embroidery is more than just stitching; it is an important part of how a brand is represented. Our vision is to provide dependable embroidery digitizing and vector artwork services through skilled work, modern techniques, and a strong focus on customer satisfaction. We aim to build lasting relationships with our clients by delivering consistent results and reliable support.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* =====================================================
            CUSTOMER SUPPORT
        ===================================================== */}
        <section className="bg-white px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto mb-16 max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6b806f]">
                Here When You Need Us
              </span>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0e2c1c] sm:text-5xl">
                Customer Support You Can Trust
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {support.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-[#0e2c1c]/10 bg-[#f8f7f2] p-7 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-5 h-1 w-10 rounded-full bg-[#c9a76a]" />

                  <p className="font-medium leading-7 text-gray-700">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}
        <section className="relative overflow-hidden bg-grey px-6 py-24 text-center sm:py-28">
          <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#b8ce9e]/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-[#c9a76a]/10 blur-[120px]" />

          <div className="relative mx-auto max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#10291d]">
              Start Your Project
            </span>

            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-[#10291d] sm:text-5xl">
              Let’s Build Something Great
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/150">
              Start your project with premium digitizing services today.
            </p>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-9"
            >
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-[#0e2c1c] shadow-xl transition hover:bg-[#f3f1e8]"
              >
                Request a Quote
              </Link>
            </motion.div>
          </div>
        </section>
      </main> 

      <Footer />
    </>
  );
}