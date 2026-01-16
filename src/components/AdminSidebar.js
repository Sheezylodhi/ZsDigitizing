"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function AdminSidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    router.replace("/login");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      {!isDesktop && (
        <div className="fixed top-0 left-0 right-0 bg-[#0e2c1c] text-white flex justify-between items-center p-4 z-[60] md:hidden h-16">
          <div className="font-bold text-xl">Admin Panel</div>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      )}

      {/* Overlay for Mobile */}
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[40]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isDesktop ? 0 : isOpen ? 0 : "-100%" }}
        transition={{ type: "tween" }}
        className={`${
          isDesktop ? "relative" : "fixed"
        } top-0 left-0 z-[50] w-64 bg-[#0e2c1c] text-white flex flex-col shadow-lg h-screen overflow-y-auto`}
      >
        {/* Logo/Title Section */}
        <div className="p-6 font-bold text-2xl border-b border-gray-700 h-16 flex items-center">
          Admin Panel
        </div>

        <nav className="flex flex-col mt-4 gap-2 p-2 flex-1">
          <Link
            href="/admin/dashboard"
            className="p-3 rounded hover:bg-green-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Overview
          </Link>
          <Link
            href="/admin/quotes"
            className="p-3 rounded hover:bg-green-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Quotes
          </Link>

          <button
            onClick={handleLogout}
            className="p-3 rounded hover:bg-red-600 transition text-red-400 text-left mt-auto mb-4"
          >
            Logout
          </button>
        </nav>
      </motion.aside>
    </>
  );
}