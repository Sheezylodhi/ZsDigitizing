// TopAnnouncementBar.js
"use client";

import { Mail, Phone } from "lucide-react";

export default function TopAnnouncementBar() {
  return (
    <div
      className="
        fixed
        top-0
        left-0
        w-full
        h-[72px]
        sm:h-9
        z-[60]
        bg-white
        border-b
        border-[#e5ebe7]
        flex
        items-center
      "
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          px-3
          sm:px-4
          flex
          flex-col
          sm:flex-row
          items-center
          justify-center
          gap-1.5
          sm:gap-5
          text-[#0e2c1c]
        "
      >
        {/* Announcement */}
        <div className="flex items-center gap-2 text-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#315c45] shrink-0" />

          <span
            className="
              text-[11px]
              sm:text-[12px]
              md:text-[13px]
              font-semibold
              tracking-wide
              leading-tight
            "
          >
            Bulk Order? Get Max Discounts & Exclusive Deals – Contact ZS
            digitizing Now!
          </span>
        </div>

        {/* Contact Information */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Email */}
          <a
            href="mailto:info@zsdigitizing.com"
            className="
              flex
              items-center
              gap-1.5
              whitespace-nowrap
              text-[11px]
              sm:text-[12px]
              font-medium
              text-[#315c45]
              hover:text-[#0e2c1c]
              transition-colors
            "
          >
            <Mail size={13} className="shrink-0" />
            <span>info@zsdigitizing.com</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+17277617877"
            className="
              flex
              items-center
              gap-1.5
              whitespace-nowrap
              text-[11px]
              sm:text-[12px]
              font-medium
              text-[#315c45]
              hover:text-[#0e2c1c]
              transition-colors
            "
          >
            <Phone size={13} className="shrink-0" />
            <span>+1 727 761 7877</span>
          </a>
        </div>
      </div>
    </div>
  );
}


