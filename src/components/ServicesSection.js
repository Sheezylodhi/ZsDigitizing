"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const services = [
  {
    id: "embroidery-digitizing",
    number: "01",
    title: "Embroidery Digitizing",
    shortTitle: "Digitizing",
    desc: "Production-ready embroidery files engineered for clean stitches, smooth runs, and exceptional detail.",
    image: "/images/embridorydigitizing1.webp",
    tags: ["EMB", "DST", "PES"],
  },
  {
    id: "rastertovector",
    number: "02",
    title: "Vector Art",
    shortTitle: "Vector Artwork",
    desc: "Precise raster-to-vector artwork created for screen printing, embroidery, branding, and large-format production.",
    image: "/images/rastertovector.webp",
    tags: ["AI", "EPS", "SVG"],
  },
  {
    id: "custom-patches",
    number: "03",
    title: "Custom Patches",
    shortTitle: "Patches",
    desc: "Premium custom patches for caps, jackets, uniforms, brands, and specialty apparel.",
    image: "/images/custompatches.webp",
    tags: ["CAP", "JACKET", "BADGE"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-label="ZS Digitizing services"
      className="relative overflow-hidden bg-[#f7f6f1] py-28 md:py-36 scroll-mt-24 md:scroll-mt-32"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#c9a96a]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#173c2b]/10 blur-[120px]" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,60,43,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(23,60,43,0.8) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-4xl text-center md:mb-20"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#c9a96a]" />

            <span className="text-[10px] font-bold tracking-[0.35em] text-[#697169]">
              OUR EXPERTISE
            </span>

            <span className="h-px w-12 bg-[#c9a96a]" />
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#173c2b] md:text-5xl lg:text-6xl">
            Crafted for{" "}
            <span className="font-serif italic text-[#697169]">
              production.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#697169] md:text-base">
            From precision embroidery digitizing to vector artwork and custom
            patches — every file is prepared with production in mind.
          </p>
        </motion.div>

        {/* Services */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 45,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative h-[510px]"
    >
      <Link
        href={`/services/${service.id}`}
        aria-label={`Learn more about ${service.title}`}
        className="relative block h-full overflow-hidden rounded-[30px] border border-[#173c2b]/10 bg-white shadow-[0_20px_70px_rgba(23,60,43,0.07)] transition-all duration-700 hover:-translate-y-3 hover:border-[#c9a96a]/50 hover:shadow-[0_35px_90px_rgba(23,60,43,0.16)]"
      >
        {/* ========================= */}
        {/* IMAGE BACKGROUND */}
        {/* ========================= */}

        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={service.image}
            alt={`${service.title} service`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover opacity-0 scale-110 transition-all duration-1000 ease-out group-hover:scale-100 group-hover:opacity-100"
          />

          {/* Dark luxury overlay */}
          <div className="absolute inset-0 bg-[#102d20]/0 transition-all duration-700 group-hover:bg-[#102d20]/75" />

          {/* Image gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07150f]/95 via-[#102d20]/25 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>

        {/* ========================= */}
        {/* DEFAULT CONTENT */}
        {/* ========================= */}

        <div className="relative z-10 flex h-full flex-col p-7 md:p-8">
          {/* Top row */}
          <div className="flex items-start justify-between">
            <span className="font-serif text-5xl font-medium leading-none text-[#173c2b]/10 transition-all duration-700 group-hover:text-white/20">
              {service.number}
            </span>

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#173c2b]/10 bg-[#f7f6f1] transition-all duration-500 group-hover:border-[#c9a96a]/60 group-hover:bg-[#c9a96a]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 text-[#173c2b] transition-all duration-500 group-hover:rotate-45 group-hover:text-[#173c2b]"
              >
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Content */}
          <div className="transition-all duration-700 group-hover:-translate-y-1">
            {/* Small label */}
            <p className="mb-3 text-[9px] font-bold tracking-[0.3em] text-[#9d7b43] transition-colors duration-500 group-hover:text-[#dfc98e]">
              SPECIALIZED SERVICE
            </p>

            <h3 className="max-w-[320px] text-2xl font-semibold tracking-[-0.025em] text-[#173c2b] transition-colors duration-500 group-hover:text-white md:text-3xl">
              {service.title}
            </h3>

            <p className="mt-4 max-w-[340px] text-sm leading-6 text-[#6b746d] transition-colors duration-500 group-hover:text-white/75">
              {service.desc}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((tag, tagIndex) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#173c2b]/10 bg-[#f7f6f1] px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-[#536158] transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white/80"
                  style={{
                    transitionDelay: `${tagIndex * 40}ms`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom line */}
          <div className="mt-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#173c2b]/10 transition-colors duration-700 group-hover:bg-white/20" />

            <span className="text-[9px] font-bold tracking-[0.2em] text-[#173c2b]/50 transition-colors duration-500 group-hover:text-[#c9a96a]">
              EXPLORE
            </span>
          </div>
        </div>

        {/* ========================= */}
        {/* PREMIUM HOVER FRAME */}
        {/* ========================= */}

        <div className="pointer-events-none absolute inset-4 rounded-[22px] border border-transparent transition-all duration-700 group-hover:border-[#c9a96a]/40" />

        {/* Corner accents */}
        <div className="pointer-events-none absolute left-7 top-7 h-8 w-8 border-l border-t border-transparent transition-all duration-700 group-hover:border-[#c9a96a]/70" />

        <div className="pointer-events-none absolute bottom-7 right-7 h-8 w-8 border-b border-r border-transparent transition-all duration-700 group-hover:border-[#c9a96a]/70" />

        {/* Gold light sweep */}
        <div className="pointer-events-none absolute -left-[120%] top-0 h-full w-[80%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-[1200ms] ease-out group-hover:left-[150%]" />
      </Link>
    </motion.div>
  );
}