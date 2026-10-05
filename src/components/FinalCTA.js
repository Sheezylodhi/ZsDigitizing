"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden py-24 sm:py-28 md:py-32"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src="/videos/final-cta.mp4" type="video/mp4" />
      </video>

      {/* Light dark overlay — keeps video visible */}
      <div className="absolute inset-0 -z-10 bg-black/35" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Small label */}
        <div className="mb-6 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
            Let&apos;s Create Something Great
          </span>
        </div>

        {/* Heading */}
        <h2
          id="final-cta-heading"
          className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Your Design.
          <span className="block text-white/85">
            Our Expertise.
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
          Send us your artwork and let our digitizing experts prepare it
          for clean, professional embroidery.
        </p>

        {/* CTA */}
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/quote"
            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#173526] transition-all duration-300 hover:-translate-y-1 hover:bg-[#edf3ee] sm:px-8"
          >
            Get a Quote
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Bottom line */}
        <div className="mx-auto mt-12 h-px w-20 bg-white/40" />

        <p className="mt-5 text-xs text-white/60">
          Professional digitizing • Clean stitch quality • Reliable delivery
        </p>
      </div>
    </section>
  );
}