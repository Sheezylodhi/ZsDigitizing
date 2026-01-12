"use client";

import { useState } from "react";

const faqData = [
  {
    question: "What services do you offer?",
    answer:
      "We provide embroidery digitizing, vector conversion, logo stitching, 3D puff embroidery, patch digitizing and custom design services."
  },
  {
    question: "How fast can I get my order delivered?",
    answer:
      "Standard delivery is 12–24 hours. We also offer urgent/rush delivery within 2–6 hours depending on complexity."
  },
  {
    question: "What file formats do you support?",
    answer:
      "We deliver in DST, PES, EXP, JEF, VP3, EMB, PDF, PNG and many other formats requested by customers."
  },
  {
    question: "Do you offer revisions?",
    answer:
      "Yes, we provide free revisions until you are fully satisfied with the design."
  },
  {
    question: "How can I request a quote?",
    answer:
      "Simply submit your artwork through the quote form and our team will respond quickly with pricing & turnaround details."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-20" id="faq">
      <h2 className="text-4xl font-bold text-center mb-6 text-[#2A4E3B]">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Answers to the most common questions about our embroidery digitizing services.
      </p>

      <div className="space-y-4">
        {faqData.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl hover:shadow-md transition cursor-pointer"
            onClick={() => toggle(i)}
          >
            <div className="flex justify-between items-center p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.question}
              </h3>
              <span className="text-xl text-gray-600">
                {openIndex === i ? "−" : "+"}
              </span>
            </div>

            {openIndex === i && (
              <div className="px-5 pb-5 text-gray-600 leading-relaxed animate-fadeIn">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
