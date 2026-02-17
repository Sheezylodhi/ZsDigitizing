"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Prices", href: "/#prices" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Quote", href: "/quote" },
    { name: "Testimonials", href: "/#testimonials" },
  ];

  return (
    <header className="fixed top-0 md:top-9 w-full h-20 bg-[#0e2c1c] z-50 shadow-md">
      
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center h-full">
          <div className="relative w-50 h-30">
            <Image
              src="/logo.png"
              alt="ZS Digitizing Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
       
        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-6 text-white font-medium">
          {menuItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -2 }}
              className="hover:text-green-400 transition"
            >
              {item.name}
            </motion.a>
          ))}
        </nav>

        {/* Desktop Buttons */}
      <div className="hidden lg:flex items-center">
  <Link href="/login">
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-white text-white cursor-pointer hover:bg-white hover:text-[#1E7A5B] transition"
    >
      <User size={20} />
    </motion.div>
  </Link>
</div>
<div className="lg:hidden flex items-center gap-3">

         <Link href="/login">
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#1E7A5B] transition"
    >
      <User size={18} />
    </motion.div>
  </Link>
        {/* Mobile Burger */}
        <button
          className="lg:hidden text-white text-2xl"
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
            <div className="flex flex-col px-4 py-4 space-y-3 text-white">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
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
