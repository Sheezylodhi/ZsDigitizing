"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import EmbroideryStage from "./EmbroideryStage";

const trust = [
  "Quick Turnaround",
  "Embroidery & Vector Artwork",
  "EMB • DST • PES • PDF",
];

const marquee = [
  "LOGO DIGITIZING",
  "3D PUFF",
  "CAPS & JACKETS",
  "PATCHES",
  "APPLIQUE",
  "VECTOR ART",
  "LEFT CHEST",
  "TOWEL & KNITS",
];

function FeaturePill({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500">
      <Icon className="h-3.5 w-3.5 text-emerald-500" />
      {children}
    </div>
  );
}

function MiniMetric({ number, label }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-300">
        {number}
      </div>

      <div className="mt-1 text-[13px] font-semibold text-slate-600">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f8fcfa] text-slate-950">
      {/* =====================================================
          PREMIUM BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                circle at 72% 43%,
                rgba(16, 185, 129, 0.12) 0%,
                rgba(16, 185, 129, 0.055) 18%,
                transparent 38%
              ),
              radial-gradient(
                circle at 8% 18%,
                rgba(16, 185, 129, 0.065) 0%,
                transparent 30%
              ),
              linear-gradient(
                135deg,
                #ffffff 0%,
                #fbfefd 42%,
                #f4fbf7 100%
              )
            `,
          }}
        />

        {/* Large glow behind embroidery artwork */}
        <div className="absolute right-[-150px] top-[5%] h-[680px] w-[680px] rounded-full bg-emerald-300/[0.065] blur-[135px]" />

        {/* Upper left soft glow */}
        <div className="absolute left-[-190px] top-[-150px] h-[520px] w-[520px] rounded-full bg-emerald-200/[0.075] blur-[125px]" />

        {/* Bottom center atmosphere */}
        <div className="absolute bottom-[-250px] left-1/2 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-100/[0.16] blur-[120px]" />

        {/* Small emerald light near center */}
        <div className="absolute left-[58%] top-[48%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/[0.12] blur-[100px]" />

        {/* Very subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.7) 1px, transparent 1px)",
            backgroundSize: "110px 110px",
          }}
        />

        {/* Soft white vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 42%, rgba(255,255,255,0.58) 100%)",
          }}
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="relative mx-auto max-w-[1440px] px-6 pb-10 pt-8 lg:px-10">
        {/* ===================================================
            TOP STATUS BAR
        ==================================================== */}
        <div className="flex items-center justify-between border-b border-slate-900/[0.07] pb-5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-30" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
              Accepting New Orders
            </span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
              Professional Digitizing
            </span>

            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
              Worldwide Service
            </span>

            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-emerald-600">
              ZS Digitizing
            </span>
          </div>
        </div>

        {/* ===================================================
            HERO GRID
        ==================================================== */}
        <div className="grid min-h-[700px] items-center gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* =================================================
              LEFT CONTENT
          ================================================== */}
          <div className="relative z-10 max-w-[650px] py-16 lg:py-20">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2 border border-emerald-500/[0.12] bg-white/60 px-3 py-2 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                Digitizing - Vector - Patches - Apparel & Promotional
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-[700px] text-[52px] font-black leading-[0.94] tracking-[-0.055em] text-[#0e2c1c] sm:text-[64px] lg:text-[76px]">
              Your Design.

              <br />

              <span className="text-slate-200">
                Ready to Stitch.
              </span>

              <br />

              <span className="text-[#0e2c1c]">
                Made for Your Brand.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-[570px] text-[15px] leading-7 text-slate-500">
              At ZSDigitizing, we create embroidery files and vector artwork
              for your project. From simple logos to detailed designs, send us
              your artwork and we’ll prepare it for production.
            </p>

            {/* Features */}
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              <FeaturePill icon={Clock3}>
                Quick Turnaround
              </FeaturePill>

              <FeaturePill icon={ShieldCheck}>
                Ready for Production
              </FeaturePill>

              <FeaturePill icon={Zap}>
                Files You Can Use
              </FeaturePill>
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-3 bg-slate-950 px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-emerald-500"
              >
                Start Your Project

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="group inline-flex items-center gap-2 border border-slate-900/[0.1] bg-white/50 px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600 backdrop-blur-sm transition hover:border-slate-900/20 hover:bg-white hover:text-slate-950"
              >
                Explore Services

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Trust */}
            <div className="mt-11 flex flex-wrap gap-x-8 gap-y-4 border-t border-slate-900/[0.07] pt-6">
              {trust.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/[0.09]">
                    <Check className="h-2.5 w-2.5 text-emerald-600" />
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Process Metrics */}
            <div className="mt-14 flex items-center gap-10">
              <MiniMetric
                number="01"
                label="Your Design"
              />

              <div className="h-8 w-px bg-slate-900/[0.08]" />

              <MiniMetric
                number="02"
                label="Our Work"
              />

              <div className="h-8 w-px bg-slate-900/[0.08]" />

              <MiniMetric
                number="03"
                label="Ready to Use"
              />
            </div>
          </div>

          {/* =================================================
              RIGHT — EMBROIDERY VISUAL
          ================================================== */}
          <div className="relative min-h-[580px] lg:min-h-[680px]">
            <EmbroideryStage />
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM MARQUEE
      ====================================================== */}
      <div className="relative border-t border-slate-900/[0.07] bg-white/30">
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="flex min-w-max animate-[marquee_28s_linear_infinite] items-center gap-10 py-5">
            {[...marquee, ...marquee].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center gap-10"
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">
                  {item}
                </span>

                <span className="h-1 w-1 rounded-full bg-emerald-500/40" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          MARQUEE ANIMATION
      ====================================================== */}
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}