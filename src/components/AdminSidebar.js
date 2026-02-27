"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Users,
  LogOut,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Quotes", href: "/admin/quotes", icon: ClipboardList },
    { name: "Create Client", href: "/admin/create-client", icon: Users },
    { name: "Create Order", href: "/admin/create-order", icon: PlusCircle },
    { name: "Order List", href: "/admin/orders", icon: ClipboardList },
    { name: "Client List", href: "/admin/clients", icon: Users },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <div className="hidden lg:flex w-72 bg-[#0e2c1c] text-white flex-col shadow-2xl min-h-screen">
      {/* LOGO */}
      <div className="p-6 text-2xl font-bold border-b border-white/20 flex-shrink-0">
        Admin Panel
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link key={i} href={item.href}>
              <motion.div
                whileHover={{ x: 6 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition
                ${
                  active
                    ? "bg-white text-[#0e2c1c] shadow font-semibold"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </motion.div>
            </Link>
          );
        })}

        {/* LOGOUT */}
        <motion.button
          whileHover={{ x: 6 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 cursor-pointer "
        >
          <LogOut size={18} />
          Logout
        </motion.button>
      </nav>

      {/* FOOTER */}
      <div className="p-4 text-xs border-t border-white/20 opacity-70 flex-shrink-0">
        Admin Portal
      </div>
    </div>
  );
}