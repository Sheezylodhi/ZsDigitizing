"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Prices", href: "#prices" },
    { name: "Send Quote", href: "#quote" },
    { name: "Stats", href: "#Stats" },
    
    

  ];

  const services = [
    { name: "Logo Digitizing", href: "#ServicesSection" },
    { name: "3D Puff Digitizing", href: "#ServicesSection" },
    { name: "Applique Digitizing", href: "#ServicesSection" },
  ];

  return (
    <header className="w-full bg-[#0b3820] fixed top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-16 h-16">
            <Image
              src="/logo.png"
              alt="ZS Digitizing MD Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
         
        </Link>

        {/* Desktop Menu */}
        
        <nav className="hidden lg:flex items-center space-x-6 text-white text-sm font-medium">
          {/* Services Dropdown */}
          {menuItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="hover:text-gray-200 relative"
              whileHover={{ y: -2 }}
            >
              {item.name}
            </motion.a>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <motion.button
              className="hover:text-gray-200 font-medium relative"
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
                  className="absolute top-full left-0 mt-2 w-48 bg-white text-[#2A4E3B] rounded shadow-lg overflow-hidden z-50"
                >
                  {services.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-[#2A4E3B] hover:text-white transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          

          {/* Buttons */}
          <div className="flex space-x-3 ml-6">
            <motion.button
              className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-[#2A4E3B] transition duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              Login
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-white text-[#2A4E3B] rounded hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:text-white transition duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              Register
            </motion.button>
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
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
            className="lg:hidden bg-[#2A4E3B] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  className="text-white font-medium w-full text-left"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  Services ▼
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-col pl-4 mt-2 space-y-2"
                    >
                      {services.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-white hover:text-gray-200"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white font-medium hover:text-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Buttons */}
              <div className="flex space-x-3 mt-2">
                <button className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-[#2A4E3B] transition duration-300 shadow-md w-full">
                  Login
                </button>
                <button className="px-4 py-2 bg-white text-[#2A4E3B] rounded hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:text-white transition duration-300 shadow-md w-full">
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
