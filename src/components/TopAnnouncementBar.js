// TopAnnouncementBar.js
"use client";

import { motion } from "framer-motion";

export default function TopAnnouncementBar() {
  const text = "Bulk Order? Get Max Discounts & Exclusive Deals – Contact Digit-It Now! ";
  const repeatedText = Array(10).fill(text);

  return (
    <div
      className="
        w-full bg-black text-white overflow-hidden py-2 px-4
        fixed top-0 left-0 z-50
      "
    >
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {repeatedText.map((t, idx) => (
          <span key={idx} className="whitespace-nowrap mr-16">
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
