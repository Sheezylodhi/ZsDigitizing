"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout");
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0e2c1c] text-white flex flex-col shadow-lg">
        <div className="p-6 font-bold text-2xl border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex flex-col mt-4 gap-2 p-2">
          <Link href="/admin/dashboard" className="p-3 rounded hover:bg-green-700 transition">
            Overview
          </Link>
          <Link href="/admin/quotes" className="p-3 rounded hover:bg-green-700 transition">
            Quotes
          </Link>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            className="p-3 rounded hover:bg-red-600 transition text-red-400 text-left"
          >
            Logout
          </motion.button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
