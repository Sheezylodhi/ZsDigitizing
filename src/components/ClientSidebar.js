"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react";

export default function ClientSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", href: "/client-portal", icon: LayoutDashboard },
    { name: "My Orders", href: "/client-portal/orders", icon: ClipboardList },
    { name: "Request for Order", href: "/client-portal/create-order", icon: PlusCircle },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("clientToken");
    router.replace("/login");
  };

  return (
    <>
      {/* ✅ MOBILE HEADER (ONLY MENU ICON) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center px-4 py-3 bg-white shadow-sm">
        <button onClick={() => setOpen(true)}>
          <Menu size={26} className="text-[#0e2c1c]" />
        </button>
      </div>

      {/* Spacer so content doesn't hide under fixed header */}
      <div className="lg:hidden h-14" />

      {/* ✅ MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 h-full w-72 bg-[#0e2c1c] text-white z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 flex justify-between items-center border-b border-white/20">
                <span className="font-semibold">Menu</span>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              {/* Menu */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menu.map((item, i) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <Link key={i} href={item.href} onClick={() => setOpen(false)}>
                      <div
                        className={`flex items-center gap-3 p-3 rounded-xl transition
                        ${
                          active
                            ? "bg-white text-[#0e2c1c] shadow font-semibold"
                            : "hover:bg-white/10"
                        }`}
                      >
                        <Icon size={18} />
                        {item.name}
                      </div>
                    </Link>
                  );
                })}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl transition hover:bg-red-500/20 text-left"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </nav>

              <div className="p-4 text-xs border-t border-white/20 opacity-70">
                Client Portal
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ✅ DESKTOP SIDEBAR (ONLY VISIBLE LG AND ABOVE) */}
      <aside className="hidden lg:flex w-72 min-h-screen bg-[#0e2c1c] text-white flex-col shadow-2xl">
        <nav className="flex-1 p-6 space-y-2">
          {menu.map((item, i) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link key={i} href={item.href}>
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl transition
                  ${
                    active
                      ? "bg-white text-[#0e2c1c] shadow font-semibold"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </div>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl transition hover:bg-white/10 text-left"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>

        <div className="p-4 text-xs border-t border-white/20 opacity-70">
          Client Portal
        </div>
      </aside>
    </>
  );
}