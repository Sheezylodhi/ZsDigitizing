"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Scissors,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f8fcfa] text-[#0e2c1c] overflow-hidden">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#dce8df]/50 blur-3xl" />

        <div className="absolute left-[-120px] top-[45%] h-[300px] w-[300px] rounded-full bg-[#e8f1eb] blur-3xl" />

        <div className="absolute right-[-120px] top-[25%] h-[300px] w-[300px] rounded-full bg-[#e8f1eb] blur-3xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#0e2c1c 1px, transparent 1px), linear-gradient(90deg, #0e2c1c 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative flex min-h-screen flex-col">
        {/* Header */}
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 pt-7 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="ZS Digitizing Home"
          >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[#dce8df] bg-white shadow-[0_10px_30px_rgba(14,44,28,0.08)]">
              <img
                src="/logo.webp"
                alt="ZS Digitizing"
                className="h-full w-full object-contain p-1.5"
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-[13px] font-bold tracking-[0.16em] text-[#0e2c1c]">
                ZS DIGITIZING
              </p>
              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#6f8076]">
                Embroidery & Vector Artwork
              </p>
            </div>
          </Link>

          <Link
            href="/quote"
            className="group inline-flex items-center gap-2 rounded-full border border-[#c9d9cf] bg-white px-4 py-2.5 text-[11px] font-semibold text-[#0e2c1c] shadow-[0_8px_24px_rgba(14,44,28,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#315c45] hover:bg-[#0e2c1c] hover:text-white"
          >
            Get a Quote
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Main */}
        <section className="flex flex-1 items-center justify-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#cddcd3] bg-white/80 px-3.5 py-2 shadow-sm backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#315c45] opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#315c45]" />
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#315c45]">
                    Page Not Found
                  </span>
                </div>

                <div className="relative">
                  <h1 className="text-[clamp(7rem,18vw,13rem)] font-black leading-[0.72] tracking-[-0.08em] text-[#0e2c1c]">
                    404
                  </h1>

                  <div className="absolute -right-1 top-2 hidden h-16 w-16 rounded-full border border-dashed border-[#9fbea9] sm:block" />
                </div>

                <div className="mt-8 max-w-xl">
                  <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#0e2c1c] sm:text-4xl">
                    Looks like this thread
                    <br className="hidden sm:block" /> went off the path.
                  </h2>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-[#64756b] sm:text-[15px]">
                    The page you're looking for may have been moved, removed,
                    or the link might be incorrect. Let's get you back to
                    something useful.
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0e2c1c] px-6 py-3.5 text-xs font-bold text-white shadow-[0_14px_30px_rgba(14,44,28,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#163b28]"
                  >
                    <Home size={15} />
                    Back to Home
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#b9cdc0] bg-white px-6 py-3.5 text-xs font-bold text-[#0e2c1c] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#315c45] hover:bg-[#eef5f0]"
                  >
                    Start a Project
                  </Link>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: "easeOut",
                }}
                className="relative mx-auto w-full max-w-[480px]"
              >
                {/* Outer decorative rings */}
                <div className="absolute inset-[-30px] rounded-[40px] border border-dashed border-[#c9d9cf] opacity-70" />
                <div className="absolute inset-[-15px] rounded-[32px] border border-[#dce8df]" />

                {/* Main Card */}
                <div className="relative overflow-hidden rounded-[32px] border border-[#d3e1d8] bg-white p-7 shadow-[0_30px_80px_rgba(14,44,28,0.12)] sm:p-9">
                  {/* Top mini label */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf2ed] text-[#315c45]">
                        <Scissors size={17} />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#7a8a81]">
                          ZS Digitizing
                        </p>
                        <p className="mt-0.5 text-xs font-semibold text-[#0e2c1c]">
                          Stitching the Details
                        </p>
                      </div>
                    </div>

                    <Sparkles
                      size={17}
                      className="text-[#6f8e7b]"
                    />
                  </div>

                  {/* Embroidery-inspired visual */}
                  <div className="relative mt-8 flex aspect-square items-center justify-center overflow-hidden rounded-[24px] bg-[#f3f7f4]">
                    {/* Circular stitch lines */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute h-[76%] w-[76%] rounded-full border border-dashed border-[#9fbea9]"
                    />

                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 28,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute h-[58%] w-[58%] rounded-full border border-dotted border-[#b7d0c0]"
                    />

                    {/* Stitch-style square */}
                    <div className="relative flex h-[48%] w-[48%] items-center justify-center rounded-[28px] border-2 border-dashed border-[#315c45] bg-white shadow-[0_15px_35px_rgba(14,44,28,0.09)]">
                      <div className="absolute inset-3 rounded-[20px] border border-[#dce8df]" />

                      <span className="relative text-5xl font-black tracking-[-0.08em] text-[#0e2c1c] sm:text-6xl">
                        404
                      </span>
                    </div>

                    {/* Stitch dots */}
                    <span className="absolute left-[15%] top-[23%] h-2 w-2 rounded-full bg-[#315c45]" />
                    <span className="absolute right-[17%] top-[32%] h-1.5 w-1.5 rounded-full bg-[#7d9c89]" />
                    <span className="absolute bottom-[20%] left-[25%] h-1.5 w-1.5 rounded-full bg-[#9fbea9]" />
                    <span className="absolute bottom-[27%] right-[22%] h-2 w-2 rounded-full bg-[#315c45]" />
                  </div>

                  {/* Bottom message */}
                  <div className="mt-6 rounded-2xl border border-[#e0e9e3] bg-[#f8fbf9] px-4 py-3.5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6f8076]">
                      Production Ready
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#315c45]">
                      But this page isn't stitched into our site.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-7 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-[#dce8df] pt-5 sm:flex-row">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#7b8a82]">
              ZS Digitizing • Professional Embroidery Artwork
            </p>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-[11px] font-bold text-[#315c45] transition-colors hover:text-[#0e2c1c]"
            >
              Explore Services
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}