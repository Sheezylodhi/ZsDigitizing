"use client";

import { use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Layers3,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

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
    id: "rastertovector",
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
      "At ZS Digitizing, we convert your artwork into high-quality embroidery files with precision, clean stitch paths, and excellent machine performance. Our digitizing ensures smooth production with minimal thread breaks and perfect finishing.",
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
    final:
      "Whether you are an apparel brand, embroidery shop, or promotional company, we deliver production-ready files you can trust.",
  },

  rastertovector: {
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
      "Unlimited size scalability without quality loss",
    ],
    formats: "AI | EPS | PDF | SVG | CDR",
    final:
      "Perfect for screen printers, apparel brands, promotional product companies, and marketing agencies worldwide.",
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
    ],
    features: [
      "High-detail stitching & clean finishing",
      "Strong, durable materials",
      "Competitive bulk pricing",
      "Fast production time",
      "Worldwide delivery",
    ],
    formats: "Iron-On | Velcro | Sew-On | Adhesive",
    final:
      "From small custom runs to large bulk orders, we ensure consistent quality and professional service.",
  },
};

function InfoItem({ icon: Icon, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0e2c1c]/[0.06]">
        <Icon className="h-4 w-4 text-[#315c45]" strokeWidth={1.8} />
      </div>

      <span className="text-[13px] leading-6 text-slate-600">
        {children}
      </span>
    </div>
  );
}

export default function ServiceContent({ params }) {
  const { serviceId } = use(params);
  const service = services.find((s) => s.id === serviceId);
  const content = serviceContent[serviceId];

  const [expanded, setExpanded] = useState(false);

  if (!service || !content) return null;

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf8] text-slate-950">
      <TopAnnouncementBar />
      <Navbar />

      <main className="flex-grow">
        {/* =====================================================
            HERO / SERVICE INTRO
        ====================================================== */}
        <section className="relative overflow-hidden pt-[152px] sm:pt-[116px]">
          {/* Background atmosphere */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[-180px] top-[100px] h-[500px] w-[500px] rounded-full bg-emerald-100/40 blur-[120px]" />

            <div className="absolute right-[-160px] top-[150px] h-[600px] w-[600px] rounded-full bg-emerald-200/25 blur-[140px]" />

            <div className="absolute left-[50%] top-[45%] h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#dce8df]/35 blur-[100px]" />

            <div
              className="absolute inset-0 opacity-[0.018]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,23,42,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.8) 1px, transparent 1px)",
                backgroundSize: "100px 100px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-8 sm:px-6 lg:px-10 lg:pb-28">
            {/* Top breadcrumb/status */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center justify-between border-b border-slate-900/[0.07] pb-5"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-30" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 sm:text-[10px]">
                  Professional Digitizing
                </span>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  ZS Digitizing
                </span>

                <span className="h-px w-8 bg-[#315c45]/30" />

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#315c45]">
                  Worldwide Service
                </span>
              </div>
            </motion.div>

            {/* Main grid */}
            <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              {/* =================================================
                  LEFT
              ================================================== */}
              <motion.div
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10"
              >
                {/* Eyebrow */}
                <div className="mb-6 inline-flex items-center gap-2 border border-[#315c45]/10 bg-white/70 px-3 py-2 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-[#315c45]" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#315c45]">
                    ZS Digitizing Service
                  </span>
                </div>

                {/* Heading */}
                <h1 className="max-w-[680px] text-[45px] font-black leading-[0.95] tracking-[-0.055em] text-[#0e2c1c] sm:text-[58px] lg:text-[70px]">
                  {service.title}
                  <span className="mt-3 block text-slate-300">
                    Made for Production.
                  </span>
                </h1>

                {/* Intro */}
                <p className="mt-7 max-w-[610px] text-[15px] leading-7 text-slate-500 sm:text-[16px]">
                  {content.intro}
                </p>

                {/* Quick highlights */}
                <div className="mt-8 grid max-w-[620px] grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="border border-slate-900/[0.07] bg-white/70 p-4 backdrop-blur-sm">
                    <Clock3 className="mb-3 h-4 w-4 text-[#315c45]" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Turnaround
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#0e2c1c]">
                      Fast Delivery
                    </p>
                  </div>

                  <div className="border border-slate-900/[0.07] bg-white/70 p-4 backdrop-blur-sm">
                    <ShieldCheck className="mb-3 h-4 w-4 text-[#315c45]" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Quality
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#0e2c1c]">
                      Production Ready
                    </p>
                  </div>

                  <div className="border border-slate-900/[0.07] bg-white/70 p-4 backdrop-blur-sm">
                    <FileText className="mb-3 h-4 w-4 text-[#315c45]" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Formats
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#0e2c1c]">
                      Multiple Files
                    </p>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                        y: -10,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        y: -10,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: "easeOut",
                      }}
                      className="overflow-hidden"
                    >
                      {/* What We Offer */}
                      <div className="mt-10 border-t border-slate-900/[0.07] pt-8">
                        <div className="mb-5 flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0e2c1c] text-white">
                            <Layers3 className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                              Our Services
                            </p>

                            <h2 className="text-lg font-bold text-[#0e2c1c]">
                              What We Offer
                            </h2>
                          </div>
                        </div>

                        <div className="grid gap-2">
                          {content.services.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 border border-slate-900/[0.06] bg-white/70 px-4 py-3"
                            >
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/[0.09]">
                                <Check className="h-3 w-3 text-[#315c45]" />
                              </div>

                              <span className="text-[13px] text-slate-600">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Why Choose Us */}
                      <div className="mt-10 border-t border-slate-900/[0.07] pt-8">
                        <div className="mb-5 flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0e2c1c] text-white">
                            <ShieldCheck className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                              Our Standard
                            </p>

                            <h3 className="text-lg font-bold text-[#0e2c1c]">
                              Why Choose Us?
                            </h3>
                          </div>
                        </div>

                        <div className="grid gap-2">
                          {content.features.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 border border-slate-900/[0.06] bg-white/70 px-4 py-3"
                            >
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/[0.09]">
                                <Check className="h-3 w-3 text-[#315c45]" />
                              </div>

                              <span className="text-[13px] text-slate-600">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Formats */}
                      <div className="mt-8 border border-[#315c45]/10 bg-[#0e2c1c] p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                              Supported Formats
                            </p>

                            <p className="mt-2 text-sm font-semibold tracking-wide text-white">
                              {content.formats}
                            </p>
                          </div>

                          <FileText className="hidden h-5 w-5 text-[#b7d0c0] sm:block" />
                        </div>
                      </div>

                      {/* Final */}
                      <p className="mt-7 border-l-2 border-[#315c45]/30 pl-5 text-[14px] font-medium leading-7 text-slate-600">
                        {content.final}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      border
                      border-slate-900/[0.09]
                      bg-white/70
                      px-5
                      py-3.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.17em]
                      text-[#0e2c1c]
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:border-[#315c45]/30
                      hover:bg-white
                    "
                  >
                    {expanded ? "Show Less" : "See More"}

                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <Link
                    href="/quote"
                    className="
                      group
                      inline-flex
                      items-center
                      gap-3
                      bg-[#0e2c1c]
                      px-6
                      py-3.5
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.17em]
                      text-white
                      shadow-[0_12px_30px_rgba(14,44,28,0.15)]
                      transition-all
                      duration-300
                      hover:bg-[#315c45]
                    "
                  >
                    Get a Quote

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              {/* =================================================
                  RIGHT IMAGE
              ================================================== */}
              <motion.div
                initial={{ opacity: 0, x: 35, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="relative"
              >
                {/* Outer glow */}
                <div className="absolute -inset-10 rounded-[50px] bg-emerald-200/20 blur-[70px]" />

                {/* Image frame */}
                <div className="relative overflow-hidden rounded-[28px] border border-slate-900/[0.07] bg-white/70 p-3 shadow-[0_30px_80px_rgba(14,44,28,0.10)] backdrop-blur-sm sm:p-4">
                  <div className="relative overflow-hidden rounded-[20px] bg-[#f4f8f5]">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="
                        block
                        w-full
                        max-h-[520px]
                        object-contain
                        transition-transform
                        duration-700
                        hover:scale-[1.025]
                      "
                    />

                    {/* Image overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e2c1c]/10 via-transparent to-white/10" />
                  </div>

                  {/* Floating quality badge */}
                  <div className="absolute bottom-7 left-7 flex items-center gap-3 border border-white/60 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0e2c1c]">
                      <Check className="h-4 w-4 text-white" />
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        Quality Checked
                      </p>

                      <p className="text-xs font-bold text-[#0e2c1c]">
                        Production Ready
                      </p>
                    </div>
                  </div>

                  {/* Corner number */}
                  <div className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[10px] font-black tracking-widest text-[#0e2c1c] shadow-lg backdrop-blur-md">
                    01
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =====================================================
            EXPLORE OTHER SERVICES
        ====================================================== */}
        <section className="relative overflow-hidden border-t border-slate-900/[0.06] bg-[#eef4f0] py-24 lg:py-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-white/60 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            {/* Section heading */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
            >
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-[#315c45]" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#315c45]">
                    More From ZS
                  </span>
                </div>

                <h2 className="max-w-[650px] text-4xl font-black tracking-[-0.045em] text-[#0e2c1c] sm:text-5xl">
                  Explore Other Services
                </h2>
              </div>

              <p className="max-w-[380px] text-sm leading-6 text-slate-500">
                Explore our other professional artwork and production services
                designed for apparel, branding, and promotional work.
              </p>
            </motion.div>

            {/* Service cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.id !== serviceId)
                .map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: i * 0.08,
                    }}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-[24px] border border-slate-900/[0.07] bg-white p-3 shadow-[0_15px_45px_rgba(14,44,28,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(14,44,28,0.10)]">
                      {/* Image */}
                      <div className="relative overflow-hidden rounded-[18px] bg-[#f3f7f4]">
                        <img
                          src={s.img}
                          alt={s.title}
                          className="
                            h-56
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-[1.04]
                          "
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e2c1c]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/85 text-[9px] font-black text-[#0e2c1c] shadow-lg backdrop-blur-md">
                          0{i + 1}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-2 pb-2 pt-6">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="h-px w-5 bg-[#315c45]/40" />

                          <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-slate-400">
                            ZS Service
                          </span>
                        </div>

                        <h3 className="text-xl font-bold tracking-[-0.025em] text-[#0e2c1c]">
                          {s.title}
                        </h3>

                        <Link
                          href={`/services/${s.id}`}
                          className="
                            group/link
                            mt-5
                            inline-flex
                            items-center
                            gap-2
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.17em]
                            text-[#315c45]
                          "
                        >
                          Learn More

                          <ArrowUpRight
                            className="
                              h-3.5
                              w-3.5
                              transition-transform
                              duration-300
                              group-hover/link:-translate-y-0.5
                              group-hover/link:translate-x-0.5
                            "
                          />
                        </Link>
                      </div>
                    </div>
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