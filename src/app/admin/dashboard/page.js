"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import VisitorTracker from "@/components/VisitorTracker";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    visitorsToday: 0,
    totalQuotes: 0,
    quotesToday: 0,
  });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/overview");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { title: "Visitors", value: stats.totalVisitors },
    { title: "Visitors Today", value: stats.visitorsToday },
    { title: "Quotes", value: stats.totalQuotes },
    { title: "Quotes Today", value: stats.quotesToday },
  ];

  const pieData = [
    { name: "Visitors Today", value: stats.visitorsToday },
    { name: "Other Visitors", value: stats.totalVisitors - stats.visitorsToday },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  const lineData = [
    { name: "Day 1", Visitors: 200, Quotes: 10 },
    { name: "Day 2", Visitors: 400, Quotes: 15 },
    { name: "Day 3", Visitors: 300, Quotes: 20 },
    { name: "Day 4", Visitors: 500, Quotes: 25 },
    { name: "Day 5", Visitors: stats.visitorsToday, Quotes: stats.quotesToday },
  ];

  return (
    <div className="space-y-6">
      <VisitorTracker />
      <h1 className="text-2xl font-bold">Overview</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 bg-white rounded-xl shadow cursor-pointer flex flex-col justify-between"
          >
            <h3 className="text-gray-500 font-medium">{card.title}</h3>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts + Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded-xl shadow"
        >
          <h3 className="font-semibold mb-2">Visitors Pie Chart</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded-xl shadow"
        >
          <h3 className="font-semibold mb-2">Visitors & Quotes Graph</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Visitors" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="Quotes" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded-xl shadow lg:col-span-2"
        >
          <h3 className="font-semibold mb-2">Filter by Date</h3>
          <Calendar onChange={setDate} value={date} className="rounded-lg" />
        </motion.div>
      </div>
    </div>
  );
}
