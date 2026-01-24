"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [path]);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Prices", href: "/#prices" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Quote", href: "/quote" },
    { name: "Testimonials", href: "/#Testimonials" },
  ];

  return (
    <header className="w-full bg-[#0e2c1c] fixed top-0 md:top-9 z-50 shadow-md h-20">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">

        {/* Logo */}
        <Link href="/" className="flex items-center h-full">
          <div className="relative h-full w-40">
            <Image
              src="/logo.png"
              alt="ZS Digitizing Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-6 text-white text-base font-medium h-full">
          {menuItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="hover:text-green-400 transition relative"
              whileHover={{ y: -2 }}
            >
              {item.name}
            </motion.a>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex space-x-2 h-full items-center">
          <Link href="/login">
            <motion.button
              className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-[#1E7A5B] transition text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Login
            </motion.button>
          </Link>

          <Link href="/register">
            <motion.button
              className="px-4 py-2 bg-[#0e2c1c] text-white rounded hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 transition text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Register
            </motion.button>
          </Link>
        </div>

        {/* Mobile Burger */}
        <div className="lg:hidden h-full flex items-center">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#0e2c1c] overflow-hidden"
          >
            <div className="flex flex-col px-4 py-3 space-y-2 text-white text-base font-medium">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  scroll={false}
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
