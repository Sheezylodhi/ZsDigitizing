"use client";

import { useState } from "react";

const faqData = [
  {
    question: "What services do you offer?",
    answer:
      "We provide embroidery digitizing, vector conversion, logo stitching, 3D puff embroidery, patch digitizing and custom design services."
  },
  {
    question: "How much does digitizing cost?",
    answer:
      "Embroidery digitizing typically starts at $10-15$ for left chest logos. Pricing depends on size, and design complexity. Yes, we offer bulk discounts and flat pricing for high-volume orders. Contact us for a custom quote."
  },
  {
    question: "What is the best  software for converting images into embroidery designs?",
    answer:
      "The best software for embroidery digitizing is different for everyone. It really depends on how good you're at it. For people who're really good at embroidery digitizing Wilcom and Hatch are the best. Wilcom has something called EmbroideryStudio and Hatch is also very popular. They are great for people who do embroidery digitizing all the time."
  },
  {
    question: "Can artificial intelligence AI digitize embroidery?",
    answer:
      "No artificial intelligence cannot fully turn embroidery into form. Artificial intelligence can change pictures into files that sewing machines can understand. It has a hard time with complicated parts, how close together the stitches are and getting the right settings, for the fabric. You have to fix things by hand to get the results. Artificial intelligence just cannot do it all on its own when it comes to embroidery."
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
