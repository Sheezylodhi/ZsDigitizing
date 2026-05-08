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
import { 
  User, 
  Users, 
  FileText, 
  ShoppingCart, 
  CalendarDays,
  LayoutDashboard,
  Filter
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

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
    { title: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, text: "text-blue-600", bg: "bg-blue-50" },
    { title: "Today Orders", value: stats.ordersToday, icon: CalendarDays, text: "text-green-600", bg: "bg-green-50" },
    { title: "Total Quotes", value: stats.totalQuotes, icon: FileText, text: "text-amber-600", bg: "bg-amber-50" },
    { title: "Today Quotes", value: stats.quotesToday, icon: FileText, text: "text-orange-600", bg: "bg-orange-50" },
    { title: "Total Visitors", value: stats.totalVisitors, icon: Users, text: "text-purple-600", bg: "bg-purple-50" },
    { title: "Today Visitors", value: stats.visitorsToday, icon: Users, text: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Completed Orders", value: stats.completedOrders, icon: ShoppingCart, text: "text-emerald-700", bg: "bg-emerald-50" },
    { title: "Pending Orders", value: stats.pendingOrders, icon: ShoppingCart, text: "text-yellow-600", bg: "bg-yellow-50" },
    { title: "In Process", value: stats.inProcessOrders, icon: ShoppingCart, text: "text-blue-700", bg: "bg-blue-50" },
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
      <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc]">
        {/* Sidebar Space Holder */}
       

        <main className="flex-1 w-full overflow-x-hidden">
          <div className="p-4 py-20 md:p-8 lg:p-12 max-w-[1600px] mx-auto space-y-8 md:space-y-12">
            
            {/* ---------- REFINED HEADER ---------- */}
            {/* ---------- REFINED HEADER (FIXED FOR MOBILE) ---------- */}
<header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
  
  {/* Left Side: Title and Subtitle */}
  <div className="flex items-center gap-3 min-w-0">
    <div className="p-2.5 bg-green-600 rounded-xl text-white hidden xs:flex shrink-0">
      <LayoutDashboard size={20} />
    </div>
    <div className="truncate">
      <h1 className="text-lg md:text-2xl font-extrabold text-gray-900 tracking-tight truncate">
        Admin Dashboard
      </h1>
      <p className="text-gray-500 text-[10px] md:text-sm font-medium">
        Real-time platform metrics
      </p>
    </div>
  </div>

  {/* Right Side: Admin Profile & Notification */}
  <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 mt-2 sm:mt-0 border-t sm:border-t-0 pt-3 sm:pt-0">
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 max-w-[150px]">
      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
        <User size={14} className="text-green-700" />
      </div>
      <span className="text-xs font-bold text-gray-700 truncate">Admin</span>
    </div>
    
    <div className="shrink-0">
      {adminId && <NotificationIcon userId={adminId} />}
    </div>
  </div>
</header>

            {/* ---------- DATE FILTER ---------- */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="relative w-full sm:w-auto">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full sm:w-64 appearance-none rounded-xl px-4 py-3 pl-11 border border-gray-200 bg-white text-gray-700 font-medium focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all shadow-sm"
                />
                <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={() => setDate("")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all font-semibold shadow-sm active:scale-95"
              >
                Reset Filter
              </button>
            </div>

            {/* ---------- STATS CARDS ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex items-center justify-between group hover:shadow-md hover:border-green-100 transition-all duration-300"
                >
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      {card.title}
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-gray-800">
                      {card.value?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 duration-300 ${card.bg}`}>
                    <card.icon className={`${card.text}`} size={24} />
                  </div>
                </div>
              ))}
            </div>

            {/* ---------- CHARTS SECTION ---------- */}
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 pb-10">
              
              {/* DONUT CHART */}
              <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8 flex flex-col">
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800">Distribution Overview</h2>
                    <p className="text-sm text-gray-500 font-medium">Daily traffic breakdown</p>
                </div>
                
                <div className="flex-1 w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={8}
                        stroke="none"
                      >
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip 
                         contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-6">
                  {pieData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BAR CHART */}
              <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8">
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800">Performance Metrics</h2>
                    <p className="text-sm text-gray-500 font-medium">Activity comparison</p>
                </div>

                <div className="w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} 
                        dy={10} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#64748b', fontSize: 12}} 
                      />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={45}>
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