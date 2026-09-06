"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Sparkles,
  Scissors,
  Layers3,
  Zap,
} from "lucide-react";

const stitchValues = [8426, 8731, 9104, 9478, 9862, 10214];

const fileNames = [
  "ZS_LOGO.EMB",
  "CUSTOM_LOGO.DST",
  "BRAND_MARK.PES",
  "PATCH_DESIGN.PDF",
  "CAP_FRONT.EMB",
  "APPAREL_LOGO.DST",
];

const services = [
  "Embroidery Digitizing",
  "Vector Artwork",
  "Custom Patches",
  "3D Puff Embroidery",
  "Cap Digitizing",
  "Applique Artwork",
];

const formats = ["EMB", "DST", "PES", "PDF"];

function formatNumber(value) {
  return Math.round(value).toLocaleString();
}

export default function EmbroideryStage() {
  const [stitchIndex, setStitchIndex] = useState(0);
  const [fileIndex, setFileIndex] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(0);

  const [displayStitches, setDisplayStitches] = useState(
    stitchValues[0]
  );

  const [progress, setProgress] = useState(82);
  const [hovered, setHovered] = useState(false);

  const targetStitches = stitchValues[stitchIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setStitchIndex((prev) => (prev + 1) % stitchValues.length);

      setFileIndex((prev) => (prev + 1) % fileNames.length);

      setServiceIndex((prev) => (prev + 1) % services.length);

      setProgress((prev) => {
        const next = prev + 4;
        return next > 98 ? 78 : next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const start = displayStitches;
    const end = targetStitches;
    const duration = 900;
    const startTime = performance.now();

    let frame;

    const animate = (time) => {
      const elapsed = time - startTime;
      const raw = Math.min(elapsed / duration, 1);

      const eased =
        raw < 0.5
          ? 2 * raw * raw
          : 1 - Math.pow(-2 * raw + 2, 2) / 2;

      setDisplayStitches(start + (end - start) * eased);

      if (raw < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [targetStitches]);

  /*
   * Create actual stitch marks around the embroidery circle.
   */
  const stitches = useMemo(() => {
    return Array.from({ length: 72 }, (_, index) => {
      const angle = (index / 72) * 360;
      const active = index < Math.floor(progress * 0.72);

      return {
        angle,
        active,
        delay: `${index * 0.035}s`,
      };
    });
  }, [progress]);

  const currentFile = fileNames[fileIndex];
  const extension = currentFile.split(".")[1];

  /*
   * SVG completion arc
   */
  const radius = 202;
  const circumference = 2 * Math.PI * radius;

  const dashOffset =
    circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex min-h-[580px] w-full items-center justify-center lg:min-h-[680px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* =====================================================
          AMBIENT LIGHT
      ====================================================== */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/40 blur-[100px]" />

      {/* =====================================================
          BACKGROUND RINGS
      ====================================================== */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-100" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-100/80" />

      {/* =====================================================
          MAIN COMPOSITION
      ====================================================== */}
      <div
        className={`relative h-[520px] w-[520px] max-w-[92vw] transition-transform duration-700 ease-out ${
          hovered ? "-translate-y-1" : ""
        }`}
      >
        {/* =====================================================
            OUTER COMPLETION ARC
        ====================================================== */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 520 520"
        >
          {/* Base */}
          <circle
            cx="260"
            cy="260"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
          />

          {/* Progress */}
          <circle
            cx="260"
            cy="260"
            r={radius}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* =====================================================
            ROTATING THREAD RING
        ====================================================== */}
        <div className="absolute inset-[48px] animate-[spin_35s_linear_infinite] rounded-full border border-dashed border-emerald-200/70" />

        <div className="absolute inset-[65px] animate-[spinReverse_24s_linear_infinite] rounded-full border border-slate-200/80" />

        {/* =====================================================
            ACTUAL STITCHES
        ====================================================== */}
        <div className="absolute inset-[30px] animate-[spin_45s_linear_infinite]">
          {stitches.map((stitch, index) => (
            <span
              key={index}
              className={`absolute left-1/2 top-1/2 h-[7px] w-[2px] origin-[0_230px] rounded-full transition-all duration-500 ${
                stitch.active
                  ? "bg-emerald-500 opacity-90"
                  : "bg-slate-200 opacity-40"
              }`}
              style={{
                transform: `rotate(${stitch.angle}deg) translateY(-230px)`,
                animationDelay: stitch.delay,
              }}
            />
          ))}
        </div>

        {/* =====================================================
            MOVING THREAD TRAIL
        ====================================================== */}
        <svg
          className="pointer-events-none absolute inset-[75px] h-[370px] w-[370px] animate-[spinReverse_18s_linear_infinite]"
          viewBox="0 0 370 370"
        >
          <defs>
            <linearGradient
              id="threadGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#10b981"
                stopOpacity="0"
              />

              <stop
                offset="45%"
                stopColor="#10b981"
                stopOpacity="0.15"
              />

              <stop
                offset="75%"
                stopColor="#10b981"
                stopOpacity="0.8"
              />

              <stop
                offset="100%"
                stopColor="#10b981"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <circle
            cx="185"
            cy="185"
            r="166"
            fill="none"
            stroke="url(#threadGradient)"
            strokeWidth="2"
            strokeDasharray="35 140"
            strokeLinecap="round"
          />
        </svg>

        {/* =====================================================
            MAIN FABRIC
        ====================================================== */}
        <div
          className={`absolute left-1/2 top-1/2 h-[315px] w-[315px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] transition-transform duration-700 ${
            hovered ? "scale-[1.015]" : ""
          }`}
        >
          {/* Fabric texture */}
          <div
            className="absolute inset-0 overflow-hidden rounded-full opacity-[0.32]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  rgba(15,23,42,0.045) 0px,
                  rgba(15,23,42,0.045) 1px,
                  transparent 1px,
                  transparent 4px
                ),
                repeating-linear-gradient(
                  90deg,
                  rgba(15,23,42,0.035) 0px,
                  rgba(15,23,42,0.035) 1px,
                  transparent 1px,
                  transparent 4px
                )
              `,
            }}
          />

          {/* Green inner embroidery border */}
          <div className="absolute inset-[15px] rounded-full border border-dashed border-emerald-400/60" />

          <div className="absolute inset-[27px] rounded-full border border-slate-100" />

          {/* Soft center */}
          <div className="absolute inset-[40px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.09),transparent_65%)]" />

          {/* =================================================
              LOGO
          ================================================== */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 scale-125 rounded-full bg-emerald-100/30 blur-3xl" />

              <img
                src="/Herologo.jpeg"
                alt="ZS Digitizing embroidery logo"
                className="relative h-[205px] w-[205px] object-contain drop-shadow-[0_12px_20px_rgba(15,23,42,0.10)]"
              />

              {/* Stitch texture */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[repeating-linear-gradient(125deg,transparent_0px,transparent_3px,rgba(16,185,129,0.06)_4px)]" />

              {/* Moving shine */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute -left-[45%] top-0 h-full w-[25%] rotate-[22deg] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-md animate-[shine_4.5s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            NEEDLE
        ====================================================== */}
        <div className="absolute left-1/2 top-[15px] -translate-x-1/2">
          <div className="relative">
            {/* Needle body */}
            <div className="absolute left-1/2 top-0 h-[72px] w-[2px] -translate-x-1/2 bg-slate-300" />

            {/* Needle head */}
            <div className="h-[11px] w-[25px] rounded-full border border-slate-300 bg-white shadow-sm" />

            {/* Needle point */}
            <div className="absolute left-1/2 top-[62px] h-[14px] w-[1px] -translate-x-1/2 bg-emerald-500 animate-[needle_2.8s_ease-in-out_infinite]" />

            {/* Thread */}
            <div className="absolute left-1/2 top-[72px] h-[92px] w-px -translate-x-1/2 bg-emerald-400/60 animate-[thread_2.8s_ease-in-out_infinite]" />

            {/* Stitch sparks */}
            <div className="absolute left-1/2 top-[158px] -translate-x-1/2">
              <span className="absolute h-1 w-1 rounded-full bg-emerald-500 animate-[spark_2.8s_ease-out_infinite]" />

              <span className="absolute h-1 w-1 rounded-full bg-emerald-400 animate-[spark2_2.8s_ease-out_infinite]" />

              <span className="absolute h-1 w-1 rounded-full bg-emerald-300 animate-[spark3_2.8s_ease-out_infinite]" />
            </div>
          </div>
        </div>

        {/* =====================================================
            TOP LEFT — LIVE PROJECT
        ====================================================== */}
        <div className="absolute left-[3px] top-[105px]">
          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            Live Project
          </div>

          <div
            key={currentFile}
            className="mt-2 flex items-center gap-2 animate-[fileIn_600ms_ease-out]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
              <FileText className="h-3.5 w-3.5 text-emerald-500" />
            </div>

            <div>
              <div className="text-[11px] font-black tracking-wide text-slate-800">
                {currentFile.split(".")[0]}

                <span className="ml-1 text-emerald-500">
                  .{extension}
                </span>
              </div>

              <div className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Custom Logo
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            TOP RIGHT — OUTPUT FILES
        ====================================================== */}
        <div className="absolute right-[5px] top-[112px] text-right">
          <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Output Files
          </div>

          <div className="mt-2 flex gap-1.5">
            {formats.map((format) => (
              <span
                key={format}
                className={`rounded-md border px-2 py-1 text-[8px] font-black tracking-wider transition-all duration-500 ${
                  format === extension
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm"
                    : "border-slate-100 bg-white text-slate-300"
                }`}
              >
                {format}
              </span>
            ))}
          </div>
        </div>

        {/* =====================================================
            BOTTOM LEFT — EMBROIDERY DIGITIZING
        ====================================================== */}
        <div className="absolute bottom-[91px] left-[3px]">
          <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.22em] text-slate-400">
            <Sparkles className="h-3 w-3 text-emerald-500" />

            Embroidery Digitizing
          </div>

          <div
            key={services[serviceIndex]}
            className="mt-2 max-w-[175px] animate-[serviceIn_650ms_ease-out]"
          >
            <div className="text-[14px] font-black tracking-tight text-slate-900">
              {services[serviceIndex]}
            </div>

            <div className="mt-1 h-px w-12 bg-emerald-400" />
          </div>
        </div>

        {/* =====================================================
            BOTTOM RIGHT — STITCH COUNT
        ====================================================== */}
        <div className="absolute bottom-[83px] right-[3px] text-right">
          <div className="flex items-center justify-end gap-2 text-[8px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Stitch Count

            <Scissors className="h-3 w-3 text-emerald-500" />
          </div>

          <div
            key={targetStitches}
            className="mt-1 text-[25px] font-black tracking-[-0.04em] text-slate-900 animate-[numberIn_500ms_ease-out]"
          >
            {formatNumber(displayStitches)}
          </div>

          <div className="text-[8px] font-semibold uppercase tracking-[0.18em] text-emerald-500">
            Precision Stitches
          </div>
        </div>

        {/* =====================================================
            BOTTOM PROGRESS — READY FOR PRODUCTION
        ====================================================== */}
        <div className="absolute bottom-[28px] left-1/2 w-[210px] -translate-x-1/2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Ready for Production
            </span>

            <span className="text-[9px] font-black text-emerald-500">
              {progress}%
            </span>
          </div>

          <div className="relative h-[3px] overflow-hidden rounded-full bg-slate-100">
            <div
              className="relative h-full rounded-full bg-emerald-500 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            >
              <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-400 blur-[2px]" />
            </div>
          </div>
        </div>

        {/* =====================================================
            MICRO LABELS
        ====================================================== */}
        <div className="absolute bottom-[1px] left-1/2 flex -translate-x-1/2 items-center gap-5 whitespace-nowrap">
          <span className="flex items-center gap-1 text-[7px] font-bold uppercase tracking-[0.2em] text-slate-300">
            <Layers3 className="h-2.5 w-2.5" />

            Thread Mapping
          </span>

          <span className="flex items-center gap-1 text-[7px] font-bold uppercase tracking-[0.2em] text-slate-300">
            <Zap className="h-2.5 w-2.5 text-emerald-400" />

            Ready for Production
          </span>
        </div>
      </div>

      {/* =====================================================
          CSS
      ====================================================== */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-120%) rotate(22deg);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          55% {
            opacity: 1;
          }

          75% {
            opacity: 0;
          }

          100% {
            transform: translateX(650%) rotate(22deg);
            opacity: 0;
          }
        }

        @keyframes needle {
          0%,
          35%,
          100% {
            transform: translateX(-50%) translateY(0);
          }

          48%,
          62% {
            transform: translateX(-50%) translateY(12px);
          }
        }

        @keyframes thread {
          0%,
          35%,
          100% {
            height: 92px;
            opacity: 0.45;
          }

          48%,
          62% {
            height: 105px;
            opacity: 0.85;
          }
        }

        @keyframes spark {
          0%,
          55% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }

          62% {
            transform: translate(-13px, 9px) scale(1);
            opacity: 1;
          }

          78% {
            transform: translate(-25px, 20px) scale(0);
            opacity: 0;
          }
        }

        @keyframes spark2 {
          0%,
          55% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }

          63% {
            transform: translate(12px, 7px) scale(1);
            opacity: 1;
          }

          80% {
            transform: translate(25px, 18px) scale(0);
            opacity: 0;
          }
        }

        @keyframes spark3 {
          0%,
          55% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }

          65% {
            transform: translate(3px, 14px) scale(1);
            opacity: 0.9;
          }

          82% {
            transform: translate(5px, 28px) scale(0);
            opacity: 0;
          }
        }

        @keyframes fileIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes serviceIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes numberIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}