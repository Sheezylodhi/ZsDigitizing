"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

/* =========================================================
   SEW-OUT / PORTFOLIO DATA
========================================================= */

const sewouts = [
  {
    image: "/sewout1.jpg",
    type: "Embroidery Work",
  },
  {
    image: "/sewout2.jpg",
    type: "PVC Patch",
  },
  {
    image: "/sewout3.jpg",
    type: "Embroidery Digitizing",
  },
  {
    image: "/sewout4.jpg",
    type: "Chenille Paches",
  },
  {
    image: "/sewout5.PNG",
    type: "Embroidery Digitizing",
  },
  {
    image: "/sewout6.jpg",
    type: "JB Embroidery Digitizing",
  },
  {
    image: "/sewout7.jpg",
    type: "Embroidery Patches",
  },
  {
    image: "/sewout8.png",
    type: "PVC Patches",
  },
  {
    image: "/sewout9.jpg",
    type: "Embrodiery Digitizing",
  },
  {
    image: "/sewout10.jpg",
    type: "Embroidery Patches",
  },
  {
    image: "/sewout11.jpg",
    type: "Lather Patches",
  },
  {
    image: "/sewout12.jpg",
    type: "Embroided Patches",
  },
  {
    image: "/sewout15.png",
    type: "Sublimation Patches",
  },
];

export default function HomeExtras() {
  const [popupIndex, setPopupIndex] = useState(null);

  /* =========================================================
     SLIDER REFS
  ========================================================= */

  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(null);
  const isPausedRef = useRef(false);
  const isManualRef = useRef(false);

  /* =========================================================
     POPUP
  ========================================================= */

  const closePopup = () => {
    setPopupIndex(null);
  };

  const nextImage = () => {
    setPopupIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % sewouts.length;
    });
  };

  const prevImage = () => {
    setPopupIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + sewouts.length) % sewouts.length;
    });
  };

  /* =========================================================
     KEYBOARD NAVIGATION
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (popupIndex === null) return;

      if (e.key === "Escape") {
        closePopup();
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupIndex]);

  /* =========================================================
     PREVENT PAGE SCROLL WHILE POPUP IS OPEN
  ========================================================= */

  useEffect(() => {
    document.body.style.overflow =
      popupIndex !== null ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [popupIndex]);

  /* =========================================================
     APPLY SLIDER POSITION
  ========================================================= */

  const applyPosition = () => {
    if (!trackRef.current) return;

    trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
  };

  /* =========================================================
     GET DUPLICATE SET WIDTH
  ========================================================= */

  const getHalfWidth = () => {
    if (!trackRef.current) return 0;

    return trackRef.current.scrollWidth / 2;
  };

  /* =========================================================
     INFINITE POSITION NORMALIZATION
  ========================================================= */

  const normalizePosition = () => {
    const halfWidth = getHalfWidth();

    if (!halfWidth) return;

    /*
      Moving forward:
      Once first set has completely passed,
      jump back by exactly one set.
    */

    if (positionRef.current <= -halfWidth) {
      positionRef.current += halfWidth;
    }

    /*
      Moving backward:
      If we go beyond the beginning,
      jump to the duplicate set.
    */

    if (positionRef.current > 0) {
      positionRef.current -= halfWidth;
    }
  };

  /* =========================================================
     AUTO SLIDER
  ========================================================= */

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const animate = (time) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!isPausedRef.current && !isManualRef.current) {
        /*
          Speed:
          Desktop = approx 38px/sec
          Mobile  = approx 30px/sec
        */

        const speed =
          window.innerWidth <= 768 ? 30 : 38;

        positionRef.current -=
          (speed * delta) / 1000;

        normalizePosition();
        applyPosition();
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  /* =========================================================
     MANUAL BUTTON MOVEMENT
  ========================================================= */

  const moveSlider = (direction) => {
    if (!trackRef.current) return;

    const isMobile = window.innerWidth <= 768;

    const cardWidth = isMobile
      ? 215
      : window.innerWidth <= 1024
      ? 245
      : 295;

    const gap = isMobile ? 14 : 22;

    const moveAmount = cardWidth + gap;

    /*
      Pause automatic movement temporarily.
    */

    isManualRef.current = true;

    const currentPosition = positionRef.current;

    let newPosition =
      currentPosition +
      (direction === "next"
        ? -moveAmount
        : moveAmount);

    const halfWidth = getHalfWidth();

    if (halfWidth) {
      if (newPosition <= -halfWidth) {
        newPosition += halfWidth;
      }

      if (newPosition > 0) {
        newPosition -= halfWidth;
      }
    }

    positionRef.current = newPosition;

    /*
      Smooth button animation.
    */

    trackRef.current.style.transition =
      "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)";

    applyPosition();

    /*
      Remove transition and resume auto slider.
    */

    window.setTimeout(() => {
      if (!trackRef.current) return;

      trackRef.current.style.transition = "none";

      isManualRef.current = false;
      lastTimeRef.current = null;
    }, 480);
  };

  /* =========================================================
     HOVER CONTROLS
  ========================================================= */

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    lastTimeRef.current = null;
  };

  /* =========================================================
     TOUCH / MOBILE
  ========================================================= */

  const handleTouchStart = () => {
    isPausedRef.current = true;
  };

  const handleTouchEnd = () => {
    isPausedRef.current = false;
    lastTimeRef.current = null;
  };

  return (
    <>
      {/* =========================================================
          LUXURY SEW-OUT SECTION
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#f7f6f1] py-24 md:py-32">

        {/* =====================================================
            BACKGROUND ATMOSPHERE
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-[-180px] top-[10%] h-[420px] w-[420px] rounded-full bg-[#2A4E3B]/[0.035] blur-[100px]" />

          <div className="absolute bottom-[5%] right-[-180px] h-[450px] w-[450px] rounded-full bg-[#b4975a]/[0.06] blur-[110px]" />

        </div>

        <div className="relative">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="mx-auto mb-16 max-w-4xl px-6 text-center">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6 flex items-center justify-center gap-4"
            >

              <span className="h-px w-12 bg-[#b4975a]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#697169]">
                Signature Work
              </span>

              <span className="h-px w-12 bg-[#b4975a]" />

            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="text-[42px] font-semibold leading-[1.02] tracking-[-0.045em] text-[#18372a] sm:text-5xl md:text-6xl lg:text-[68px]"
            >

              Crafted With

              <span className="mt-2 block font-serif font-normal italic tracking-[-0.025em] text-[#697169]">
                Precision.
              </span>

            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.16 }}
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#70766f] md:text-[15px]"
            >
              A selection of embroidery work showcasing the detail,
              precision, and craftsmanship behind every stitch.
            </motion.p>

          </div>

          {/* =====================================================
              SLIDER
          ===================================================== */}

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

            {/* ===================================================
                LEFT FADE
            =================================================== */}

            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-gradient-to-r from-[#f7f6f1] via-[#f7f6f1]/85 to-transparent md:w-40" />

            {/* ===================================================
                RIGHT FADE
            =================================================== */}

            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-gradient-to-l from-[#f7f6f1] via-[#f7f6f1]/85 to-transparent md:w-40" />

            {/* ===================================================
                LEFT BUTTON
            =================================================== */}

            <button
              type="button"
              onClick={() => moveSlider("prev")}
              aria-label="Previous work"
              className="absolute left-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#18372a]/95 text-[28px] font-light leading-none text-white shadow-[0_10px_30px_rgba(24,55,42,0.28)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-[#10291f] hover:shadow-[0_15px_40px_rgba(24,55,42,0.35)] active:scale-95 md:left-7 md:h-14 md:w-14"
            >
              ‹
            </button>

            {/* ===================================================
                RIGHT BUTTON
            =================================================== */}

            <button
              type="button"
              onClick={() => moveSlider("next")}
              aria-label="Next work"
              className="absolute right-3 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#18372a]/95 text-[28px] font-light leading-none text-white shadow-[0_10px_30px_rgba(24,55,42,0.28)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-[#10291f] hover:shadow-[0_15px_40px_rgba(24,55,42,0.35)] active:scale-95 md:right-7 md:h-14 md:w-14"
            >
              ›
            </button>

            {/* ===================================================
                MARQUEE VIEWPORT
            =================================================== */}

            <div className="luxury-marquee">

              <div
                ref={trackRef}
                className="luxury-marquee-track"
              >

                {/* =================================================
                    FIRST SET
                ================================================= */}

                {sewouts.map((item, index) => (
                  <LuxuryCard
                    key={`first-${item.image}`}
                    image={item.image}
                    type={item.type}
                    index={index}
                    onClick={() => setPopupIndex(index)}
                  />
                ))}

                {/* =================================================
                    DUPLICATE SET
                ================================================= */}

                {sewouts.map((item, index) => (
                  <LuxuryCard
                    key={`second-${item.image}`}
                    image={item.image}
                    type={item.type}
                    index={index}
                    onClick={() => setPopupIndex(index)}
                  />
                ))}

              </div>

            </div>

          </div>

          {/* =====================================================
              BOTTOM CTA
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 flex justify-center px-6"
          >

            <Link
              href="/quote"
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-[#18372a] px-7 py-3.5 text-[13px] font-medium tracking-wide text-white shadow-[0_12px_35px_rgba(24,55,42,0.15)] transition-all duration-500 hover:bg-[#10291f] hover:shadow-[0_16px_45px_rgba(24,55,42,0.22)]"
            >

              <span>
                Start Your Project
              </span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>

            </Link>

          </motion.div>

        </div>

        {/* =========================================================
            SLIDER CSS
        ========================================================= */}

        <style jsx>{`

          .luxury-marquee {
            width: 100%;
            overflow: hidden;
          }

          .luxury-marquee-track {
            display: flex;
            width: max-content;
            align-items: stretch;
            gap: 22px;
            padding: 10px 0;

            will-change: transform;

            transform: translate3d(0, 0, 0);

            transition: none;
          }

          @media (max-width: 768px) {

            .luxury-marquee-track {
              gap: 14px;
            }

          }

          @media (prefers-reduced-motion: reduce) {

            .luxury-marquee-track {
              transform: none !important;
            }

          }

        `}</style>

      </section>

      {/* =========================================================
          IMAGE LIGHTBOX
      ========================================================= */}

      <AnimatePresence>

        {popupIndex !== null && (

          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07100b]/95 px-4 py-6 backdrop-blur-2xl md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closePopup}
          >

            {/* ===================================================
                GOLD GLOW
            =================================================== */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b4975a]/[0.035] blur-[100px]" />

            {/* ===================================================
                TOP BAR
            =================================================== */}

            <div
              className="absolute left-5 right-5 top-5 z-30 flex items-center justify-between md:left-8 md:right-8 md:top-7"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="flex items-center gap-3">

                <div className="h-9 w-px bg-[#b4975a]" />

                <div>

                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#b4975a]">
                    Portfolio
                  </p>

                  <p className="mt-1 text-sm font-medium tracking-wide text-white/90">
                    Embroidery Collection
                  </p>

                </div>

              </div>

              <button
                onClick={closePopup}
                aria-label="Close"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-xl font-light text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.14]"
              >
                ×
              </button>

            </div>

            {/* ===================================================
                MAIN IMAGE
            =================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 flex w-full max-w-6xl items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >

              {/* PREVIOUS */}

              <button
                onClick={prevImage}
                aria-label="Previous"
                className="absolute left-0 z-30 flex h-11 w-11 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#102019]/80 text-2xl font-light text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-[#b4975a]/50 hover:bg-[#18372a] md:h-14 md:w-14"
              >
                ‹
              </button>

              {/* IMAGE FRAME */}

              <div className="relative w-full max-w-5xl rounded-[22px] border border-white/10 bg-white/[0.035] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.45)] md:rounded-[28px] md:p-3">

                <div className="relative flex h-[65vh] min-h-[380px] items-center justify-center overflow-hidden rounded-[16px] bg-[#f8f8f5] md:h-[72vh] md:min-h-[500px] md:rounded-[20px]">

                  <NextImage
                    key={sewouts[popupIndex].image}
                    src={sewouts[popupIndex].image}
                    alt={`${sewouts[popupIndex].type} ${popupIndex + 1}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 92vw, 1100px"
                    className="object-contain p-5 md:p-10"
                  />

                </div>

              </div>

              {/* NEXT */}

              <button
                onClick={nextImage}
                aria-label="Next"
                className="absolute right-0 z-30 flex h-11 w-11 translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#102019]/80 text-2xl font-light text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-[#b4975a]/50 hover:bg-[#18372a] md:h-14 md:w-14"
              >
                ›
              </button>

            </motion.div>

            {/* ===================================================
                BOTTOM BAR
            =================================================== */}

            <div
              className="absolute bottom-6 left-0 right-0 z-30 flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 backdrop-blur-xl">

                <span className="text-[10px] tracking-[0.25em] text-white/40">
                  {String(popupIndex + 1).padStart(2, "0")}
                </span>

                <span className="h-px w-7 bg-white/15" />

                <Link
                  href="/quote"
                  className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-[#d1b878]"
                >
                  Get a Quote
                </Link>

                <span className="h-px w-7 bg-white/15" />

                <span className="text-[10px] tracking-[0.25em] text-white/40">
                  {String(sewouts.length).padStart(2, "0")}
                </span>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}

/* ================================================================
   LUXURY CARD
================================================================ */

function LuxuryCard({
  image,
  type,
  index,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative h-[270px] w-[215px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[20px] border border-[#18372a]/[0.08] bg-white text-left shadow-[0_18px_50px_rgba(24,55,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(24,55,42,0.15)] sm:h-[310px] sm:w-[245px] md:h-[370px] md:w-[295px] md:rounded-[26px]"
    >

      {/* ===================================================
          IMAGE CONTAINER
      =================================================== */}

      <div className="relative h-full w-full overflow-hidden rounded-[15px] bg-[#f4f3ee] md:rounded-[20px]">

        {/* FULL COVER IMAGE */}

        <NextImage
          src={image}
          alt={`${type} ${index + 1}`}
          fill
          sizes="(max-width: 640px) 215px, (max-width: 768px) 245px, 295px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />

        {/* DARK GRADIENT */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07140d]/80 via-transparent to-transparent opacity-80" />

        {/* ===================================================
            TOP NUMBER
        =================================================== */}

        <div className="absolute left-4 top-4 flex h-8 min-w-8 items-center justify-center rounded-full border border-white/20 bg-black/10 px-2 backdrop-blur-md md:left-5 md:top-5">

          <span className="text-[9px] font-medium tracking-[0.2em] text-white/80">
            {String(index + 1).padStart(2, "0")}
          </span>

        </div>

        {/* ===================================================
            HOVER ICON
        =================================================== */}

        <div className="absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:right-5 md:top-5">
          ↗
        </div>

        {/* ===================================================
            BOTTOM CONTENT
        =================================================== */}

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">

          <div className="mb-3 h-px w-8 bg-[#c1a665] transition-all duration-500 group-hover:w-14" />

          <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#d2b979]">
            {type}
          </p>

          <p className="mt-1.5 text-sm font-medium tracking-wide text-white md:text-[15px]">
            {type}
          </p>

        </div>

      </div>

    </button>
  );
}