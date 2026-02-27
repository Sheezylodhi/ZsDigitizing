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
import { CheckCircle, Clock, Loader, CalendarDays, User } from "lucide-react";

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
  const progress = filteredOrders.filter((o) => o.status === "In Progress").length;

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "In Progress", value: progress },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#3b82f6"];

  const barData = [
    { name: "Completed", orders: completed },
    { name: "Pending", orders: pending },
    { name: "In Progress", orders: progress },
  ];

  const cardStyle =
    "bg-white border border-gray-200 shadow-lg rounded-3xl p-6 sm:p-8 relative overflow-hidden";

  const glowOverlay =
    "absolute inset-0 opacity-20 bg-gradient-to-br from-white to-transparent";

  return (
    <ClientGuard>
     <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4 sm:px-6 md:px-8 lg:px-10 pt-10 pb-10">

        {/* HEADER */}
{/* HEADER */}
<div className="bg-white border border-gray-200 shadow-lg rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between mb-8">

  {/* LEFT — HEADING */}
  <div>
    <h1 className="text-lg sm:text-2xl font-semibold text-slate-800">
      Client Dashboard
    </h1>
    <p className="text-gray-500 text-xs sm:text-sm">
      See your orders chart
    </p>
  </div>

  {/* RIGHT — USER + NOTIFICATION */}
  {client && (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-2 py-1.5 border border-gray-200 bg-gray-50 rounded-lg">
        <User size={14} className="text-gray-500" />
        <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
          {client.name}
        </span>
      </div>

      <NotificationIcon userId={client._id} />
    </div>
  )}
</div>

        {/* DATE FILTER */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
          <input
            type="date"
            className="w-full sm:w-auto rounded-3xl px-4 py-3 border border-gray-200 shadow-lg bg-white focus:ring-2 focus:ring-blue-400"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            onClick={() => setSelectedDate("")}
            className="w-full sm:w-auto px-4 py-3 rounded-3xl border border-gray-200 shadow-lg bg-white hover:scale-105 transition"
          >
            Reset
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {[
            { title: "Completed", value: completed, color: "green", Icon: CheckCircle },
            { title: "Pending", value: pending, color: "amber", Icon: Clock },
            { title: "In Progress", value: progress, color: "blue", Icon: Loader },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.03 }}
              className={cardStyle}
            >
              <div className={glowOverlay} />

              <div className="relative flex justify-between items-center mb-4">
                <div>
                  <p className={`text-${card.color}-600 font-medium text-sm`}>
                    {card.title}
                  </p>
                  <p className="text-3xl sm:text-4xl font-extrabold mt-1 text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div className={`bg-${card.color}-100 p-3 rounded-xl`}>
                  <card.Icon className={`text-${card.color}-600`} size={24} />
                </div>
              </div>

              <div className={`h-2 bg-${card.color}-200 rounded-full overflow-hidden`}>
                <div
                  className={`h-full bg-${card.color}-500`}
                  style={{
                    width: `${
                      filteredOrders.length
                        ? ((card.value / filteredOrders.length) * 100).toFixed(0)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10 mb-10">
          <div className={cardStyle}>
            <h2 className="font-semibold mb-6 text-gray-700 text-lg">
              Orders Overview
            </h2>
            {mounted && (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={100}
                    innerRadius={45}
                    paddingAngle={3}
                    cornerRadius={8}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className={cardStyle}>
            <h2 className="font-semibold mb-6 text-gray-700 text-lg">
              Orders Performance
            </h2>
            {mounted && (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" radius={[8, 8, 0, 0]}>
                    {barData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* TODAY CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${cardStyle} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6`}
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <CalendarDays className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Today</p>
              <p className="text-base sm:text-xl font-semibold">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-2xl sm:text-3xl font-bold">
              {filteredOrders.length}
            </p>
          </div>
        </motion.div>
      </div>
    </ClientGuard>
  );
}