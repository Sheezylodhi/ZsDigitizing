"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { User, Eye, Trash2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import {
  Users,
  FileText,
  ShoppingCart,
  CalendarDays,
} from "lucide-react";

import AdminGuard from "@/components/AdminGuard";
import AdminSidebar from "@/components/AdminSidebar";
import NotificationIcon from "@/components/NotificationIcon";


export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [date, setDate] = useState("");
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setAdminId(decoded.userId);
    } catch {}
  }, []);

  useEffect(() => {
    async function fetchStats() {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `/api/admin/overview?date=${date}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setStats(data);
    }
    fetchStats();
  }, [date]);

  const cards = [
    { title: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, text: "text-blue-600", bg: "bg-blue-100" },
    { title: "Today Orders", value: stats.ordersToday, icon: CalendarDays, text: "text-green-600", bg: "bg-green-100" },
    { title: "Total Quotes", value: stats.totalQuotes, icon: FileText, text: "text-amber-600", bg: "bg-amber-100" },
    { title: "Today Quotes", value: stats.quotesToday, icon: FileText, text: "text-orange-600", bg: "bg-orange-100" },
    { title: "Total Visitors", value: stats.totalVisitors, icon: Users, text: "text-purple-600", bg: "bg-purple-100" },
    { title: "Today Visitors", value: stats.visitorsToday, icon: Users, text: "text-indigo-600", bg: "bg-indigo-100" },
  ];

  const pieData = [
    { name: "Visitors", value: stats.visitorsToday || 0 },
    { name: "Orders", value: stats.ordersToday || 0 },
    { name: "Quotes", value: stats.quotesToday || 0 },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#f59e0b"];

  const barData = [
    { name: "Visitors", value: stats.visitorsToday || 0 },
    { name: "Orders", value: stats.ordersToday || 0 },
    { name: "Quotes", value: stats.quotesToday || 0 },
  ];

  return (
    <AdminGuard>
      <div className="flex min-h-screen ">
        {/* Sidebar fixed width area */}
       

        {/* Main Content with more space */}
        <main className="flex-1 px-8 lg:px-12 py-12 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto space-y-16">
            
            {/* ---------- HEADER ---------- */}
           <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0e2c1c]">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-2">Complete Platform Overview</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 border border-gray-200 bg-white rounded-xl shadow-sm">
              <User size={18} className="text-gray-600" />
              <span className="font-semibold text-gray-700">Admin</span>
            </div>
            {adminId && <NotificationIcon userId={adminId} />}
          </div>
        </div>

            {/* ---------- DATE FILTER ---------- */}
            <div className="flex items-center gap-6">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-2xl px-6 py-4 border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
              <button
                onClick={() => setDate("")}
                className="px-8 py-4 rounded-2xl border border-gray-300 shadow-sm bg-white hover:bg-gray-50 transition font-bold"
              >
                Reset
              </button>
            </div>

            {/* ---------- CARDS GRID (3 per row on desktop for better space) ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 flex items-center justify-between hover:shadow-lg transition"
                >
                  <div>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-2">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {card.value || 0}
                    </p>
                  </div>
                  <div className={`p-4 rounded-2xl ${card.bg}`}>
                    <card.icon className={`${card.text}`} size={28} />
                  </div>
                </div>
              ))}
            </div>

            {/* ---------- CHARTS SECTION ---------- */}
            <div className="grid lg:grid-cols-2 gap-12 pb-12">
              
              {/* DONUT */}
              <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-10 min-h-[500px] flex flex-col">
                <h2 className="font-bold mb-10 text-gray-700 text-xl">Today Overview</h2>
                <div className="flex-1 w-full">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        innerRadius={85}
                        outerRadius={130}
                        paddingAngle={5}
                      >
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} strokeWidth={0} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* LEGEND */}
                <div className="flex justify-center gap-10 mt-8">
                  {pieData.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-500">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* BAR CHART */}
              <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-10 min-h-[500px]">
                <h2 className="font-bold mb-10 text-gray-700 text-xl">Today Performance</h2>
                <div className="w-full">
                  <ResponsiveContainer width="100%" height={380}>
                    <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 14}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 14}} />
                      <Tooltip cursor={{fill: '#f9fafb'}} />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                        {barData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}