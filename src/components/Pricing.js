"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Clock3,
} from "lucide-react";

const plans = [
  {
    title: "LEFT CHEST / CAP",
    price: "10$ - 15$ ",
    sub: "No limit of stitch",
    note: "count Depends on complexity",
    features: [
      "6 hours turnaround",
      "3 hours if rush",
      "EMB DST PDF Jpeg File",
      "Other Formats (On request)",
      "Small edit free",
      "Discount on bulk order",
    ],
  },
  {
    title: "JACKET BACK",
    price: "20$ - 25$",
    sub: "",
    note: "Depends on complexity",
    features: [
      "6 hours turnaround",
      "4 hours if rush",
      "EMB DST PDF Jpeg File",
      "Other Formats (On request)",
      "Small edit free",
      "Discount on bulk order",
    ],
  },
  {
    title: "VECTOR GRAPHICS",
    price: "15$ - 150$",
    sub: "",
    note: "Depends on complexity",
    features: [
      "24 hours turnaround",
      "12 hours if rush",
      "All Formats (On request)",
      "Small edit free",
      "Discount on bulk orders",
    ],
  },
  {
    title: "CUSTOM PATCHES",
    price: "Vary By Quantity",
    sub: "Min Order: 30 Pcs",
    note: "(Negotiable)",
    features: [
      "8 - 10 days turnaround",
      "Other Formats (On request)",
      "Discount on bulk order",
    ],
    popular: true,
  },
];

export default function Pricing() {
  const sliderRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 5
    );
  };

  useEffect(() => {
    checkScroll();

    const el = sliderRef.current;

    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const amount = 340;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="prices"
      className="
        relative
        overflow-hidden
        py-24 md:py-28
        bg-[#f7f9f7]
      "
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            -top-40
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[500px]
            rounded-full
            bg-[#dce8df]/40
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-[-180px]
            w-[450px]
            h-[450px]
            rounded-full
            bg-[#e8efe9]
            blur-[110px]
          "
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-14"
        >
          {/* Small eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#315c45]" />

            <div className="flex items-center gap-2 text-[#315c45]">
              <Sparkles size={14} />

              <span className="text-[11px] font-bold uppercase tracking-[0.25em]">
                Simple & Transparent
              </span>
            </div>

            <span className="w-10 h-px bg-[#315c45]" />
          </div>

          <h2
            className="
              text-4xl
              md:text-5xl
              lg:text-[56px]
              leading-[1.05]
              font-extrabold
              tracking-tight
              text-[#0e2c1c]
            "
          >
            Pricing Plans
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg mt-5">
            Transparent pricing based on stitch count & design complexity.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          {/* Mobile helper */}
          <div className="md:hidden flex items-center gap-2 text-xs text-gray-500">
            <ArrowLeft size={14} />
            <span>Swipe to explore</span>
          </div>

          <div className="hidden md:block" />

          {/* Desktop arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous pricing plan"
              className={`
                group
                w-11 h-11
                rounded-full
                border
                flex items-center justify-center
                transition-all duration-300
                ${
                  canScrollLeft
                    ? "border-[#cbd9cf] bg-white text-[#0e2c1c] hover:bg-[#0e2c1c] hover:text-white hover:border-[#0e2c1c] shadow-sm"
                    : "border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed"
                }
              `}
            >
              <ArrowLeft
                size={17}
                className="transition-transform group-hover:-translate-x-0.5"
              />
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next pricing plan"
              className={`
                group
                w-11 h-11
                rounded-full
                border
                flex items-center justify-center
                transition-all duration-300
                ${
                  canScrollRight
                    ? "border-[#cbd9cf] bg-white text-[#0e2c1c] hover:bg-[#0e2c1c] hover:text-white hover:border-[#0e2c1c] shadow-sm"
                    : "border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed"
                }
              `}
            >
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          ref={sliderRef}
          className="
            flex
            gap-5 md:gap-6
            overflow-x-auto
            pb-6
            scroll-smooth
            snap-x
            snap-mandatory
            [scrollbar-width:none]
            [-ms-overflow-style:none]
          "
          style={{
            scrollbarWidth: "none",
          }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
              }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{
                y: -8,
              }}
              className="
                group
                relative
                min-w-[290px]
                md:min-w-[310px]
                lg:min-w-[calc((100%-72px)/4)]
                snap-start
              "
            >
              {/* Popular glow */}
              {plan.popular && (
                <div
                  className="
                    absolute
                    -inset-[1px]
                    rounded-[26px]
                    bg-[#315c45]
                    opacity-20
                    blur-md
                  "
                />
              )}

              {/* Card */}
              <div
                className={`
                  relative
                  h-full
                  min-h-[500px]
                  flex flex-col
                  overflow-hidden
                  rounded-[24px]
                  p-7 md:p-8
                  bg-white
                  border
                  transition-all duration-500
                  ${
                    plan.popular
                      ? "border-[#315c45] shadow-[0_20px_60px_rgba(14,44,28,0.14)]"
                      : "border-[#e1e8e3] shadow-[0_15px_45px_rgba(14,44,28,0.06)] group-hover:border-[#b7cbbd] group-hover:shadow-[0_25px_65px_rgba(14,44,28,0.12)]"
                  }
                `}
              >
                {/* Top decorative line */}
                <div
                  className={`
                    absolute
                    top-0 left-8 right-8
                    h-[2px]
                    ${
                      plan.popular
                        ? "bg-[#315c45]"
                        : "bg-[#dce8df]"
                    }
                  `}
                />

                {/* Popular badge */}
                {plan.popular && (
                  <div
                    className="
                      absolute
                      top-5
                      right-5
                      flex items-center gap-1.5
                      px-3 py-1.5
                      rounded-full
                      bg-[#0e2c1c]
                      text-white
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                    "
                  >
                    <Sparkles size={10} />
                    Popular
                  </div>
                )}

                {/* Number */}
                <div
                  className="
                    absolute
                    top-7
                    right-7
                    text-[52px]
                    leading-none
                    font-black
                    text-[#0e2c1c]/[0.035]
                    select-none
                    pointer-events-none
                  "
                >
                  0{index + 1}
                </div>

                {/* Plan title */}
                <div className="relative z-10 mb-7">
                  <p
                    className="
                      text-[11px]
                      font-bold
                      tracking-[0.18em]
                      text-[#315c45]
                      mb-3
                    "
                  >
                    SERVICE
                  </p>

                  <h3
                    className="
                      text-[15px]
                      font-extrabold
                      tracking-wide
                      text-[#0e2c1c]
                    "
                  >
                    {plan.title}
                  </h3>
                </div>

                {/* Price */}
                <div className="relative z-10 mb-2">
                  <div
                    className="
                      text-[34px]
                      md:text-[37px]
                      font-black
                      tracking-tight
                      text-[#0e2c1c]
                      leading-tight
                    "
                  >
                    {plan.price}
                  </div>
                </div>

                {/* Sub */}
                <div className="min-h-[24px]">
                  {plan.sub && (
                    <p className="text-sm font-medium text-[#315c45]">
                      {plan.sub}
                    </p>
                  )}
                </div>

                {/* Note */}
                <div
                  className="
                    flex items-center gap-2
                    mt-2
                    pb-6
                    border-b border-[#edf1ee]
                  "
                >
                  <Clock3
                    size={13}
                    className="text-[#6c8274]"
                  />

                  <p className="text-xs text-gray-500">
                    {plan.note}
                  </p>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3.5 py-7">
                  {plan.features.map((item, i) => (
                    <li
                      key={i}
                      className="
                        flex items-start
                        gap-3
                        text-[13px]
                        leading-5
                        text-gray-600
                      "
                    >
                      <span
                        className="
                          mt-0.5
                          w-5 h-5
                          shrink-0
                          rounded-full
                          bg-[#edf4ef]
                          flex items-center justify-center
                        "
                      >
                        <Check
                          size={12}
                          strokeWidth={2.5}
                          className="text-[#315c45]"
                        />
                      </span>

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="/quote"
                  className="
                    group/button
                    relative
                    overflow-hidden
                    flex items-center justify-center
                    w-full
                    py-3.5
                    rounded-xl
                    bg-[#0e2c1c]
                    text-white
                    text-[12px]
                    font-bold
                    tracking-[0.12em]
                    transition-all duration-300
                    hover:bg-[#234636]
                    hover:shadow-[0_10px_30px_rgba(14,44,28,0.2)]
                  "
                >
                  <span className="relative z-10">
                    ORDER NOW!
                  </span>

                  <ArrowRight
                    size={15}
                    className="
                      relative z-10
                      ml-2
                      transition-transform duration-300
                      group-hover/button:translate-x-1
                    "
                  />

                  <span
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      group-hover/button:translate-x-0
                      bg-white/10
                      transition-transform duration-500
                    "
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="md:hidden flex justify-center gap-3 mt-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous pricing plan"
            className={`
              w-10 h-10
              rounded-full
              border
              flex items-center justify-center
              transition-all
              ${
                canScrollLeft
                  ? "border-[#cbd9cf] bg-white text-[#0e2c1c] shadow-sm"
                  : "border-gray-200 bg-gray-100 text-gray-300"
              }
            `}
          >
            <ArrowLeft size={16} />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next pricing plan"
            className={`
              w-10 h-10
              rounded-full
              border
              flex items-center justify-center
              transition-all
              ${
                canScrollRight
                  ? "border-[#cbd9cf] bg-white text-[#0e2c1c] shadow-sm"
                  : "border-gray-200 bg-gray-100 text-gray-300"
              }
            `}
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Bottom reassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="
            flex items-center justify-center
            gap-2
            mt-10
            text-[11px]
            text-gray-500
          "
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#315c45]" />
          Transparent pricing • Professional quality • Fast turnaround
        </motion.div>
      </div>
    </section>
  );
}