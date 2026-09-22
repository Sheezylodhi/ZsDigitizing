"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  {
    value: 13000,
    suffix: "+",
    label: "Completed Orders",
    eyebrow: "TRUSTED DELIVERY",
  },
  {
    value: 4,
    suffix: "h",
    label: "Fast Turnaround",
    eyebrow: "EXPRESS SERVICE",
  },
  {
    value: 90,
    suffix: "%",
    label: "Client Satisfaction",
    eyebrow: "CLIENT EXPERIENCE",
  },
  {
    value: 10,
    suffix: "+",
    label: "Years Experience",
    eyebrow: "CRAFT & EXPERTISE",
  },
];

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const element = document.getElementById("stats-section");

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setVisible(true);
          setTrigger((t) => t + 1);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats-section"
      aria-label="ZS Digitizing company statistics"
      className="relative overflow-hidden bg-[#f8f7f2] py-24 md:py-32"
    >
      {/* Ambient luxury glow */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#c9a96a]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#173c2b]/10 blur-3xl" />

      {/* Fine grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,60,43,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(23,60,43,0.7) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={
            visible
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{ duration: 0.8 }}
          className="mx-auto mb-14 max-w-3xl text-center md:mb-20"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#c9a96a]" />

            <span className="text-[10px] font-semibold tracking-[0.35em] text-[#697169]">
              BUILT ON EXPERIENCE
            </span>

            <span className="h-px w-12 bg-[#c9a96a]" />
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#173c2b] md:text-5xl lg:text-6xl">
            Precision backed by{" "}
            <span className="font-serif italic text-[#697169]">
              experience.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#687068] md:text-base">
            Trusted by businesses for precise embroidery digitizing,
            dependable turnaround, and production-ready artwork.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={
                visible
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.75,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <div
                className="
                  relative
                  min-h-[245px]
                  overflow-hidden
                  rounded-[28px]
                  border border-[#173c2b]/10
                  bg-white/80
                  px-7 py-8
                  shadow-[0_18px_60px_rgba(23,60,43,0.06)]
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-[#c9a96a]/50
                  hover:shadow-[0_25px_70px_rgba(23,60,43,0.13)]
                  md:px-8
                "
              >
                {/* Top luxury line */}
                <div
                  className="
                    absolute left-7 right-7 top-0 h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[#c9a96a]
                    to-transparent
                    opacity-60
                    transition-all duration-500
                    group-hover:left-4
                    group-hover:right-4
                  "
                />

                {/* Background number */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    -right-3
                    -top-7
                    select-none
                    font-serif
                    text-[110px]
                    font-medium
                    leading-none
                    text-[#173c2b]/[0.035]
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Eyebrow */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-[0.25em] text-[#9d7b43]">
                    {item.eyebrow}
                  </span>

                  <span
                    className="
                      h-2 w-2 rounded-full
                      bg-[#c9a96a]
                      shadow-[0_0_0_5px_rgba(201,169,106,0.10)]
                      transition-all duration-500
                      group-hover:scale-125
                      group-hover:shadow-[0_0_0_7px_rgba(201,169,106,0.12)]
                    "
                  />
                </div>

                {/* Number */}
                <div className="relative z-10 mt-12 overflow-hidden">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={
                      visible
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.7,
                      delay: index * 0.12 + 0.2,
                    }}
                    className="
                      text-5xl
                      font-semibold
                      tracking-[-0.05em]
                      text-[#173c2b]
                      md:text-6xl
                    "
                  >
                    {visible ? (
                      <CountUp
                        key={`${trigger}-${index}`}
                        to={item.value}
                        suffix={item.suffix}
                      />
                    ) : (
                      `0${item.suffix}`
                    )}
                  </motion.div>
                </div>

                {/* Label */}
                <div className="relative z-10 mt-3">
                  <p className="text-sm font-semibold tracking-wide text-[#37443c]">
                    {item.label}
                  </p>

                  <div className="mt-5 h-px w-full bg-[#173c2b]/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        visible
                          ? {
                              width: "38%",
                            }
                          : {}
                      }
                      transition={{
                        duration: 1,
                        delay: index * 0.15 + 0.5,
                      }}
                      className="h-px bg-[#c9a96a]"
                    />
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -right-24
                    h-48
                    w-48
                    rounded-full
                    bg-[#c9a96a]/10
                    blur-3xl
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom credibility strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            visible
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.8,
            delay: 0.65,
          }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#173c2b]/10 bg-[#173c2b] px-6 py-5 text-center shadow-[0_20px_60px_rgba(23,60,43,0.12)] sm:flex-row sm:text-left md:px-8"
        >
          <div>
            <p className="text-[10px] font-bold tracking-[0.28em] text-white">
              PRECISION • QUALITY • RELIABILITY
            </p>

            <p className="mt-1 text-sm text-white/70">
              Production-ready embroidery artwork, crafted with care.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-white/80">
            <span className="h-2 w-2 rounded-full bg-[#c9a96a] shadow-[0_0_12px_rgba(201,169,106,0.8)]" />
            Trusted craftsmanship
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CountUp({ to, suffix }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 1600;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - progress, 4);

      setValue(Math.floor(eased * to));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(to);
      }
    };

    const frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [to]);

  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}