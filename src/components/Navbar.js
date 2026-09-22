"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/#services" },
    { name: "Prices", href: "/#prices" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Quote", href: "/quote" },
    { name: "Testimonials", href: "/#testimonials" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <header
      className="
        fixed
        top-0 md:top-9
        left-0
        w-full
        h-20
        z-50
        bg-[#0e2c1c]
        shadow-[0_8px_35px_rgba(7,26,16,0.18)]
        border-b border-white/[0.08]
      "
    >
      {/* Very subtle top light */}
      <div
        className="
          absolute
          top-0 left-0
          w-full h-px
          bg-gradient-to-r
          from-transparent
          via-[#b7d0c0]/40
          to-transparent
        "
      />

      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="
            relative
            flex items-center
            h-full
            group
            shrink-0
          "
        >
          <div className="relative w-50 h-30">
            <Image
              src="/logo.webp"
              alt="ZS Digitizing Logo"
              fill
              priority
              className="
                object-contain
                transition-transform
                duration-500
                group-hover:scale-[1.035]
              "
            />
          </div>

          {/* Tiny logo glow */}
          <div
            className="
              absolute
              left-5
              bottom-2
              w-16 h-3
              bg-[#b7d0c0]/10
              blur-xl
              rounded-full
              pointer-events-none
            "
          />
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <nav
          className="
            hidden lg:flex
            items-center
            gap-1
            ml-auto
            mr-8
            p-1
            rounded-full
            border border-white/[0.07]
            bg-white/[0.035]
            backdrop-blur-md
          "
        >
          {menuItems.map((item) => {
            const active = isActive(item.href);

            return (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -1 }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  relative
                  px-3.5
                  py-2.5
                  rounded-full
                  text-[13px]
                  font-medium
                  tracking-wide
                  transition-all
                  duration-300
                  group
                "
              >
                {/* Active background */}
                {active && (
                  <motion.span
                    layoutId="activeNav"
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-white/[0.10]
                      border border-white/[0.08]
                    "
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                {/* Hover background */}
                <span
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-white/[0.06]
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                  "
                />

                <span
                  className={`
                    relative z-10
                    ${
                      active
                        ? "text-white"
                        : "text-white/75 group-hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </span>

                {/* Active dot */}
                {active && (
                  <span
                    className="
                      absolute
                      bottom-1
                      left-1/2
                      -translate-x-1/2
                      w-1 h-1
                      rounded-full
                      bg-[#b7d0c0]
                      shadow-[0_0_8px_rgba(183,208,192,0.8)]
                    "
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* ================= DESKTOP LOGIN ================= */}
        <div className="hidden lg:flex items-center">
          <Link href="/login">
            <motion.div
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                relative
                w-11
                h-11
                flex
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/[0.05]
                text-white
                overflow-hidden
                transition-all
                duration-300
                hover:bg-white
                hover:text-[#0e2c1c]
                hover:border-white
                hover:shadow-[0_8px_25px_rgba(255,255,255,0.12)]
              "
            >
              <User
                size={18}
                strokeWidth={1.8}
                className="
                  relative z-10
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

              {/* Hover shine */}
              <span
                className="
                  absolute
                  inset-0
                  bg-white
                  translate-y-full
                  group-hover:translate-y-0
                  transition-transform
                  duration-300
                "
              />

              <User
                size={18}
                strokeWidth={1.8}
                className="
                  absolute
                  z-20
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-200
                "
              />
            </motion.div>
          </Link>
        </div>

        {/* ================= MOBILE CONTROLS ================= */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Login */}
          <Link href="/login">
            <motion.div
              whileTap={{ scale: 0.94 }}
              className="
                w-9
                h-9
                flex
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/[0.05]
                text-white
              "
            >
              <User size={17} strokeWidth={1.8} />
            </motion.div>
          </Link>

          {/* Menu button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
            className="
              w-9
              h-9
              flex
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-white/[0.05]
              text-white
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={19} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={19} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="
                fixed
                inset-0
                top-20
                bg-black/30
                backdrop-blur-[2px]
                lg:hidden
              "
            />

            {/* Menu panel */}
            <motion.div
              initial={{
                opacity: 0,
                y: -15,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -15,
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="
                absolute
                top-full
                left-0
                w-full
                lg:hidden
                bg-[#0e2c1c]
                border-t
                border-white/[0.07]
                border-b
                border-white/[0.08]
                shadow-[0_20px_50px_rgba(7,26,16,0.3)]
              "
            >
              <div className="max-w-7xl mx-auto px-5 py-5">
                {/* Mobile menu heading */}
                <div className="flex items-center gap-2 mb-4 px-2">
                  <Sparkles
                    size={13}
                    className="text-[#b7d0c0]"
                  />

                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.22em]
                      text-white/45
                      font-semibold
                    "
                  >
                    Navigation
                  </span>
                </div>

                <div className="grid gap-1">
                  {menuItems.map((item, index) => {
                    const active = isActive(item.href);

                    return (
                      <motion.div
                        key={item.name}
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: index * 0.035,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`
                            group
                            relative
                            flex
                            items-center
                            justify-between
                            px-4
                            py-3.5
                            rounded-xl
                            transition-all
                            duration-300
                            ${
                              active
                                ? "bg-white/[0.09] text-white"
                                : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`
                                w-1.5
                                h-1.5
                                rounded-full
                                transition-all
                                ${
                                  active
                                    ? "bg-[#b7d0c0] shadow-[0_0_8px_rgba(183,208,192,0.8)]"
                                    : "bg-white/20 group-hover:bg-[#b7d0c0]"
                                }
                              `}
                            />

                            <span className="text-sm font-medium">
                              {item.name}
                            </span>
                          </div>

                          <ArrowUpRight
                            size={15}
                            className="
                              opacity-0
                              -translate-x-1
                              group-hover:opacity-100
                              group-hover:translate-x-0
                              transition-all
                              duration-300
                              text-[#b7d0c0]
                            "
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom accent */}
                <div className="mt-5 pt-4 border-t border-white/[0.07]">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] text-white/35 tracking-wide">
                      Professional Embroidery Digitizing
                    </span>

                    <span className="text-[10px] text-[#b7d0c0]/70">
                      ZS
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}