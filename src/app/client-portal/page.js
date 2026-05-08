"use client";

import { useEffect, useState, useMemo } from "react";
import ClientGuard from "@/components/ClientGuard";
import NotificationIcon from "@/components/NotificationIcon";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { CheckCircle, Clock, Loader, CalendarDays, User, LayoutDashboard } from "lucide-react";

export default function ClientDashboard() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [mounted, setMounted] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/client/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?._id) setClient(data);
      });
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.userId);
    } catch {}
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    }
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    if (!selectedDate) return orders;
    return orders.filter((o) => {
      if (!o.createdAt) return false;
      return (
        new Date(o.createdAt).toDateString() ===
        new Date(selectedDate).toDateString()
      );
    });
  }, [orders, selectedDate]);

  const completed = filteredOrders.filter((o) => o.status === "Completed").length;
  const pending = filteredOrders.filter((o) => o.status === "Pending").length;
  const Process = filteredOrders.filter((o) => o.status === "In Process").length;

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "In Process", value: Process },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#3b82f6"];

  const barData = [
    { name: "Completed", orders: completed },
    { name: "Pending", orders: pending },
    { name: "In Process", orders: Process },
  ];

  const cardStyle = "bg-white border border-gray-100 shadow-md rounded-[24px] p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xl";

  return (
    <ClientGuard>
      <div className="min-h-screen bg-[#fcfdfd] px-4 py-20 sm:px-6 lg:px-12 py-6 sm:py-10">
        
        {/* HEADER SECTION - FIXED FOR MOBILE */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 overflow-hidden">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
              <LayoutDashboard size={20} />
            </div>
            <div className="truncate">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">
                Client Dashboard
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">
                See your orders chart
              </p>
            </div>
          </div>

          {client && (
            <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0 border-t sm:border-t-0 pt-3 sm:pt-0">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 max-w-[180px]">
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <User size={14} className="text-green-700" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 truncate">
                  {client.name}
                </span>
              </div>
              <div className="shrink-0">
                <NotificationIcon userId={client._id} />
              </div>
            </div>
          )}
        </header>

        {/* DATE FILTER */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
          <input
            type="date"
            className="w-full sm:w-64 appearance-none rounded-xl px-4 py-3 border border-gray-200 bg-white text-gray-700 font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            onClick={() => setSelectedDate("")}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 font-bold hover:bg-gray-50 transition active:scale-95 shadow-sm"
          >
            Reset Filter
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[
            { title: "Completed", value: completed, color: "green", Icon: CheckCircle, bg: "bg-green-50", text: "text-green-600", progress: "bg-green-500", track: "bg-green-100" },
            { title: "Pending", value: pending, color: "amber", Icon: Clock, bg: "bg-amber-50", text: "text-amber-600", progress: "bg-amber-500", track: "bg-amber-100" },
            { title: "In Process", value: Process, color: "blue", Icon: Loader, bg: "bg-blue-50", text: "text-blue-600", progress: "bg-blue-500", track: "bg-blue-100" },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={cardStyle}
            >
              <div className="relative flex justify-between items-center mb-6">
                <div>
                  <p className={`${card.text} font-bold text-xs uppercase tracking-wider`}>
                    {card.title}
                  </p>
                  <p className="text-3xl sm:text-4xl font-black mt-1 text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div className={`${card.bg} p-4 rounded-2xl`}>
                  <card.Icon className={card.text} size={26} />
                </div>
              </div>

              <div className={`h-2.5 ${card.track} rounded-full overflow-hidden`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${filteredOrders.length ? ((card.value / filteredOrders.length) * 100) : 0}%` 
                  }}
                  className={`h-full ${card.progress}`}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          <div className={cardStyle}>
            <h2 className="font-bold mb-8 text-gray-800 text-lg flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              Orders Overview
            </h2>
            <div className="h-[300px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={5}
                      stroke="none"
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className={cardStyle}>
            <h2 className="font-bold mb-8 text-gray-800 text-lg flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
              Orders Performance
            </h2>
            <div className="h-[300px] w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="orders" radius={[6, 6, 0, 0]} barSize={40}>
                      {barData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* TODAY'S FOOTER CARD */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-blue-50 p-4 rounded-2xl shrink-0">
              <CalendarDays className="text-blue-600" size={28} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Today&apos;s Date</p>
              <p className="text-lg sm:text-xl font-bold text-gray-800">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Filtered Orders</p>
            <p className="text-3xl sm:text-4xl font-black text-[#0e2c1c]">
              {filteredOrders.length}
            </p>
          </div>
        </motion.div>
      </div>
    </ClientGuard>
  );
}