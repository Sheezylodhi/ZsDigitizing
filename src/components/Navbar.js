"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Prices", href: "#prices" },
    { name: "Send Quote", href: "/quote" },
    { name: "Portfolio", href: "/portfolio" },
  ];

  const services = [
    { name: "Logo Digitizing", href: "#services" },
    { name: "3D Puff Digitizing", href: "#services" },
    { name: "Applique Digitizing", href: "#services" },
  ];

  return (
    <header className="w-full bg-[#0e2c1c] fixed top-9 z-50 shadow-md h-30">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo + Menu */}
        <div className="flex items-center space-x-6 h-full">
          {/* Logo */}
          {/* Logo */}
<Link href="/" className="flex items-center h-full">
  <div className="relative h-full w-40"> {/* give it a fixed width */}
    <Image
      src="/logo.png"
      alt="ZS Digitizing MD Logo"
      fill
      style={{ objectFit: "contain" }} // fills height without stretching
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

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <motion.button
                className="hover:text-green-400 relative"
                whileHover={{ y: -2 }}
              >
                Services ▼
              </motion.button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-44 bg-white text-[#2A4E3B] rounded shadow-lg overflow-hidden z-50"
                  >
                    {services.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 hover:bg-[#2A4E3B] hover:text-white transition text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>

        {/* Buttons on Right */}
        <div className="hidden lg:flex space-x-2 h-full items-center">
          <motion.button
            className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-[#1E7A5B] transition text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 transition text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            Register
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
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
            className="lg:hidden bg-[#1E7A5B] overflow-hidden"
          >
            <div className="flex flex-col px-4 py-3 space-y-2 text-white text-base font-medium">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block hover:text-gray-200"
                >
                  {item.name}
                </Link>
              ))}
              <div>
                <span className="font-semibold">Services ▼</span>
                <div className="mt-1 ml-3 flex flex-col space-y-1">
                  {services.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block hover:text-gray-200 text-sm"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 mt-2">
                <Link
                  href="/admin/login"
                  className="px-3 py-1 border border-white text-white rounded hover:bg-white hover:text-[#1E7A5B] transition text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 transition text-sm"
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
