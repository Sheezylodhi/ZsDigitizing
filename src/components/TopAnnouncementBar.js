// TopAnnouncementBar.js
"use client";

import { Mail, Phone } from "lucide-react";

export default function TopAnnouncementBar() {
  return (
    <div
      className="
        fixed top-0 left-0
        w-full
        h-9
        z-[60]
        bg-white
        border-b border-[#e5ebe7]
        flex items-center
      "
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          px-4
          flex items-center justify-center
          gap-5
          text-[#0e2c1c]
        "
      >
        {/* Announcement */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#315c45]" />

          <span className="text-[11px] sm:text-[12px] font-semibold tracking-wide">
            Bulk Order? Get Max Discounts & Exclusive Deals – Contact ZS digitizing Now!
          </span>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-4 bg-[#dce8df]" />

        {/* Email */}
        <a
          href="mailto:info@zsdigitizing.com"
          className="
            hidden sm:flex
            items-center gap-1.5
            whitespace-nowrap
            text-[11px]
            font-medium
            text-[#315c45]
            hover:text-[#0e2c1c]
            transition-colors
          "
        >
          <Mail size={13} />
          info@zsdigitizing.com
        </a>

        {/* Divider */}
        <div className="hidden md:block w-px h-4 bg-[#dce8df]" />

        {/* Phone */}
        <a
          href="tel:+1 727 761 7877"
          className="
            hidden md:flex
            items-center gap-1.5
            whitespace-nowrap
            text-[11px]
            font-medium
            text-[#315c45]
            hover:text-[#0e2c1c]
            transition-colors
          "
        >
          <Phone size={13} />
          +1 727 761 7877
        </a>
      </div>
    </div>
  );
}