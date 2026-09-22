"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What services do you offer?",
    answer:
      "We provide embroidery digitizing, vector conversion, logo stitching, 3D puff embroidery, patch digitizing, and custom design services.",
  },
  {
    question: "How much does digitizing cost?",
    answer:
      "Embroidery digitizing typically starts at $10–15 for left chest logos. Pricing depends on the size and complexity of the design. We also offer bulk discounts and flat pricing for high-volume orders. Contact us for a custom quote.",
  },
  {
    question:
      "What is the best software for converting images into embroidery designs?",
    answer:
      "The best embroidery digitizing software depends on your experience and workflow. Wilcom EmbroideryStudio and Hatch are two popular choices among professional digitizers. Both provide advanced tools for creating detailed, production-ready embroidery designs.",
  },
  {
    question: "Can artificial intelligence (AI) digitize embroidery?",
    answer:
      "AI can help convert artwork into embroidery-ready files, but it cannot reliably handle every aspect of professional digitizing on its own. Complex designs require decisions about stitch direction, density, underlay, pull compensation, sequencing, and fabric type. Manual adjustments by an experienced digitizer are often needed to achieve clean production results.",
  },
  {
    question: "How can I request a quote?",
    answer:
      "Simply submit your artwork through our quote form and our team will respond with pricing and turnaround details.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-[#f7f6f1] py-24 md:py-32"
    >
      {/* Luxury background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#dce8df]/60 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 h-[450px] w-[450px] rounded-full bg-[#e9e0cf]/60 blur-[120px]"
      />

      {/* Main container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Header */}
        <header className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          {/* Small label */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#234636]/10 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-xl">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#234636] text-white">
              <HelpCircle size={14} strokeWidth={2} />
            </span>

            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#234636]">
              Need To Know
            </span>
          </div>

          {/* Heading */}
          <h2
            id="faq-heading"
            className="text-4xl font-black tracking-[-0.04em] text-[#173526] sm:text-5xl md:text-6xl"
          >
            Frequently Asked
            <span className="block text-[#5b7765]">
              Questions
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            Everything you need to know about our embroidery
            digitizing services, pricing, turnaround times, and
            production-ready files.
          </p>
        </header>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={item.question}
                className={`group overflow-hidden rounded-[1.5rem] border transition-all duration-500 ${
                  isOpen
                    ? "border-[#234636]/20 bg-white shadow-[0_20px_60px_rgba(35,70,54,0.10)]"
                    : "border-white/80 bg-white/70 shadow-[0_10px_35px_rgba(35,70,54,0.05)] hover:-translate-y-0.5 hover:border-[#234636]/15 hover:bg-white hover:shadow-[0_18px_50px_rgba(35,70,54,0.09)]"
                }`}
              >
                {/* Question button */}
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  {/* Number */}
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-500 ${
                      isOpen
                        ? "bg-[#234636] text-white shadow-lg shadow-[#234636]/20"
                        : "bg-[#edf2ed] text-[#234636] group-hover:bg-[#234636] group-hover:text-white"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}
                  <span
                    className={`flex-1 pr-2 text-base font-bold leading-6 transition-colors duration-300 sm:text-lg ${
                      isOpen
                        ? "text-[#234636]"
                        : "text-[#26352d] group-hover:text-[#234636]"
                    }`}
                  >
                    {item.question}
                  </span>

                  {/* Arrow */}
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isOpen
                        ? "rotate-180 border-[#234636] bg-[#234636] text-white"
                        : "border-gray-200 bg-white text-gray-500 group-hover:border-[#234636]/20 group-hover:text-[#234636]"
                    }`}
                  >
                    <ChevronDown
                      size={19}
                      strokeWidth={2}
                    />
                  </span>
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 pl-[4.5rem] pr-5 sm:px-7 sm:pb-7 sm:pl-[5.5rem]">
                      {/* Divider */}
                      <div className="mb-5 h-px bg-gradient-to-r from-[#234636]/15 via-[#234636]/5 to-transparent" />

                      <p className="max-w-3xl text-[15px] leading-7 text-gray-600 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Luxury bottom accent */}
                <div
                  aria-hidden="true"
                  className={`h-[2px] origin-left bg-gradient-to-r from-[#234636] via-[#557762] to-[#C59A4A] transition-transform duration-500 ${
                    isOpen
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center md:mt-16">
          <p className="mb-4 text-sm text-gray-500">
            Still have a question about your design?
          </p>

          <a
            href="/quote"
            className="group inline-flex items-center gap-3 rounded-xl bg-[#234636] px-7 py-4 text-sm font-bold text-white shadow-[0_15px_35px_rgba(35,70,54,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#173526] hover:shadow-[0_20px_45px_rgba(35,70,54,0.25)]"
          >
            Get a Custom Quote

            <ChevronDown
              size={17}
              className="-rotate-90 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}