// Footer.js
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Facebook,
  Instagram,
  Music2,
} from "lucide-react";

export default function Footer() {
  const services = [
    "Embroidery Digitizing",
    "Vector Art",
    "Custom Patches",

  ];

  const payments = [
    {
      name: "Visa",
      src: "/images/payments/visa.jpeg",
    },
    {
      name: "Mastercard",
      src: "/images/payments/mastercard.jpeg",
    },
    {
      name: "PayPal",
      src: "/images/payments/paypal.jpeg",
    },
    {
      name: "Stripe",
      src: "/images/payments/stripe.jpeg",
    },
    {
      name: "Payoneer",
      src: "/images/payments/payooner.jpeg",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0e2c1c] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="absolute inset-0 pointer-events-none">
        {/* Large soft glow */}
        <div
          className="
            absolute
            -top-40
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[400px]
            rounded-full
            bg-[#315c45]/20
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            bottom-[-200px]
            right-[-150px]
            w-[500px]
            h-[500px]
            rounded-full
            bg-[#234636]/40
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            bottom-[-200px]
            left-[-180px]
            w-[450px]
            h-[450px]
            rounded-full
            bg-[#315c45]/15
            blur-[120px]
          "
        />

        {/* Subtle grid */}
        <div
          className="
            absolute inset-0
            opacity-[0.025]
            bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
            bg-[size:55px_55px]
          "
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* =========================================================
            TOP CTA
        ========================================================== */}

        <div className="pt-16 md:pt-20">
          <div
            className="
              relative
              overflow-hidden
              rounded-[28px]
              border border-white/[0.10]
              bg-white/[0.045]
              backdrop-blur-md
              px-6 py-8
              md:px-10 md:py-10
            "
          >
            {/* CTA glow */}
            <div
              className="
                absolute
                -right-20
                -top-32
                w-80
                h-80
                rounded-full
                bg-[#9fbea9]/10
                blur-[90px]
              "
            />

            <div
              className="
                absolute
                left-0
                top-0
                w-24
                h-full
                bg-gradient-to-r
                from-[#315c45]/20
                to-transparent
                pointer-events-none
              "
            />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles
                    size={14}
                    className="text-[#b7d0c0]"
                  />

                  <span
                    className="
                      text-[10px]
                      md:text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.25em]
                      text-[#b7d0c0]
                    "
                  >
                    Professional Embroidery Digitizing
                  </span>
                </div>

                <h2
                  className="
                    text-3xl
                    md:text-4xl
                    lg:text-5xl
                    font-extrabold
                    tracking-tight
                    leading-tight
                    text-white
                  "
                >
                  Your Artwork.
                  <br />
                  <span className="text-[#b7d0c0]">
                    Production Ready.
                  </span>
                </h2>
              </div>

              <Link
                href="/quote"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  shrink-0
                  px-6
                  py-3.5
                  rounded-xl
                  bg-white
                  text-[#0e2c1c]
                  text-sm
                  font-bold
                  transition-all
                  duration-300
                  hover:bg-[#dce8df]
                  hover:shadow-[0_15px_35px_rgba(255,255,255,0.12)]
                  hover:-translate-y-1
                "
              >
                Send Your Artwork

                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================
            MAIN FOOTER
        ========================================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
            lg:gap-14
            py-16
            md:py-20
          "
        >
          {/* BRAND */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center group"
            >
              <div className="relative w-48 h-20 -ml-3">
                <Image
                  src="/logo.webp"
                  alt="ZS Digitizing Logo"
                  fill
                  className="
                    object-contain
                    object-left
                    transition-transform
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />
              </div>
            </Link>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-white
                max-w-sm
              "
            >
              Professional embroidery digitizing and vector
              artwork services built for clean, production-ready
              results.
            </p>

            {/* Trust badge */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                mt-6
                px-3.5
                py-2
                rounded-full
                border border-white/[0.10]
                bg-white/[0.04]
              "
            >
              <ShieldCheck
                size={15}
                className="text-[#b7d0c0]"
              />

              <span className="text-[11px] font-medium text-white/65">
                Production Ready Quality
              </span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-7">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="
                  group
                  w-10 h-10
                  rounded-full
                  border border-white/[0.10]
                  bg-white/[0.035]
                  flex items-center justify-center
                  text-white/60
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-[#0e2c1c]
                  hover:border-white
                  hover:-translate-y-1
                "
              >
                <Facebook size={16} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  group
                  w-10 h-10
                  rounded-full
                  border border-white/[0.10]
                  bg-white/[0.035]
                  flex items-center justify-center
                  text-white/60
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-[#0e2c1c]
                  hover:border-white
                  hover:-translate-y-1
                "
              >
                <Instagram size={16} />
              </a>

              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="
                  group
                  w-10 h-10
                  rounded-full
                  border border-white/[0.10]
                  bg-white/[0.035]
                  flex items-center justify-center
                  text-white/60
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-[#0e2c1c]
                  hover:border-white
                  hover:-translate-y-1
                "
              >
                <Music2 size={16} />
              </a>
            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-5 h-px bg-[#9fbea9]" />

              <h3
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.22em]
                  font-bold
                  text-white/80
                "
              >
                Explore
              </h3>
            </div>

            <ul className="space-y-3.5">
              {[
                ["Home", "/"],
                ["About Us", "/about-us"],
                ["Services", "/#services"],
                ["Prices", "/#prices"],
                ["Portfolio", "/portfolio"],
                ["Testimonials", "/#testimonials"],
                ["Get a Quote", "/quote"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      text-white
                      hover:text-white
                      transition-colors
                      duration-300
                    "
                  >
                    <span
                      className="
                        w-0
                        group-hover:w-3
                        h-px
                        bg-[#9fbea9]
                        transition-all
                        duration-300
                      "
                    />

                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-5 h-px bg-[#9fbea9]" />

              <h3
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.22em]
                  font-bold
                  text-white/80
                "
              >
                Services
              </h3>
            </div>

            <ul className="space-y-3.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/#services"
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      text-white
                      hover:text-white
                      transition-colors
                      duration-300
                    "
                  >
                    <span
                      className="
                        w-0
                        group-hover:w-3
                        h-px
                        bg-[#9fbea9]
                        transition-all
                        duration-300
                      "
                    />

                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-5 h-px bg-[#9fbea9]" />

              <h3
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.22em]
                  font-bold
                  text-white/80
                "
              >
                Contact
              </h3>
            </div>

            <div className="space-y-5">
              {/* Email */}
              <a
                href="mailto:info@zsdigitizing.com"
                className="
                  group
                  flex
                  items-start
                  gap-3
                  text-sm
                  text-white
                  hover:text-white
                  transition-colors
                "
              >
                <span
                  className="
                    w-9 h-9
                    shrink-0
                    rounded-lg
                    bg-white/[0.05]
                    border border-white/[0.08]
                    flex items-center justify-center
                    group-hover:bg-white
                    group-hover:text-[#0e2c1c]
                    transition-all
                    duration-300
                  "
                >
                  <Mail size={15} />
                </span>

                <span className="pt-1.5 break-all">
                  info@zsdigitizing.com
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+1 727 761 7877"
                className="
                  group
                  flex
                  items-start
                  gap-3
                  text-sm
                  text-white
                  hover:text-white
                  transition-colors
                "
              >
                <span
                  className="
                    w-9 h-9
                    shrink-0
                    rounded-lg
                    bg-white/[0.05]
                    border border-white/[0.08]
                    flex items-center justify-center
                    group-hover:bg-white
                    group-hover:text-[#0e2c1c]
                    transition-all
                    duration-300
                  "
                >
                  <Phone size={15} />
                </span>

                <span className="pt-1.5">
                  Contact Us
                </span>
              </a>

              {/* Address */}
              <a
                href="https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=7901%204th%20St%20N%2C%20%235155%2C%20Saint%20Petersburg%2C%20FL%2C%20United%20States%2C%2033702&FORM=FBKPL1"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-start
                  gap-3
                  text-sm
                  leading-6
                  text-white
                  hover:text-white
                  transition-colors
                "
              >
                <span
                  className="
                    w-9 h-9
                    shrink-0
                    rounded-lg
                    bg-white/[0.05]
                    border border-white/[0.08]
                    flex items-center justify-center
                    group-hover:bg-white
                    group-hover:text-[#0e2c1c]
                    transition-all
                    duration-300
                  "
                >
                  <MapPin size={15} />
                </span>

                <span>
                  7901 4th St N, #5155
                  <br />
                  Saint Petersburg, FL
                  <br />
                  United States, 33702
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================
            PAYMENT METHODS
        ========================================================== */}

        <div
          className="
            border-t
            border-white/[0.08]
            py-8
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
            "
          >
            {/* Payment heading */}
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={15}
                  className="text-[#b7d0c0]"
                />

                <span
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-white/75
                  "
                >
                  Secure Payment Methods
                </span>
              </div>

              <p className="text-[11px] text-white/35 mt-1">
                Safe and trusted payment options
              </p>
            </div>

            {/* REAL LOGOS */}
            <div className="flex flex-wrap items-center gap-2.5">
              {payments.map((payment) => (
                <div
                  key={payment.name}
                  className="
                    w-[58px]
                    h-[38px]
                    rounded-lg
                    bg-white
                    border border-white/10
                    flex items-center justify-center
                    px-2
                    shadow-[0_5px_20px_rgba(0,0,0,0.12)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]
                  "
                >
                  <Image
                    src={payment.src}
                    alt={payment.name}
                    width={60}
                    height={50}
                    className="w-auto h-[100px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM BAR
        ========================================================== */}

        <div
          className="
            border-t
            border-white/[0.08]
            py-6
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-4
            "
          >
            {/* Copyright */}
            <p className="text-[11px] text-white text-center md:text-left">
              © {new Date().getFullYear()} ZS Digitizing. All rights reserved.
            </p>

            {/* Legal */}
            <div className="flex items-center gap-5">
              <Link
                href="/privacy"
                className="
                  text-[11px]
                  text-white
                  hover:text-white
                  transition-colors
                "
              >
                Privacy Policy
              </Link>

              <span className="w-1 h-1 rounded-full bg-white/15" />

              <Link
                href="/terms"
                className="
                  text-[11px]
                  text-white
                  hover:text-white
                  transition-colors
                "
              >
                Terms
              </Link>
            </div>

            {/* WebMashLabs */}
            <a
              href="https://www.webmashlabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-1.5
                text-[11px]
                text-white
                hover:text-white
                transition-colors
              "
            >
              Crafted by
              <span className="font-semibold text-[#b7d0c0]/70 group-hover:text-[#b7d0c0]">
                WebMashLabs
              </span>

              <ArrowUpRight
                size={11}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}