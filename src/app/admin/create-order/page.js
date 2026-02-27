"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
import AdminSidebar from "@/components/AdminSidebar";
import { jwtDecode } from "jwt-decode";

export default function CreateOrderPage() {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [turnaround, setTurnaround] = useState("24 Hours");
  const [orderType, setOrderType] = useState("Digitizing PPO");
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    fetch("/api/clients")
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.error(err));

    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setAdminId(decoded.userId);
    } catch {}
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientId || !title || !orderType) {
      setMessage("Client, Title & Order Type required");
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        clientId,
        title,
        description,
        turnaround,
        orderType,
        status,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`Order Created Serial: ${data.serialNumber}`);
      setTitle("");
      setDescription("");
      setClientId("");
      setTurnaround("24 Hours");
      setOrderType("Digitizing PPO");
    } else {
      setMessage(data.message || "Error creating order");
    }
  };

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-[#f8fafc]">

        <main className="flex-1 p-8 md:p-12 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl space-y-16"
          >
            {/* ---------- HEADER CARD ---------- */}
            <div className="bg-white border border-gray-200 shadow-xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#0e2c1c]">
                  Create New Order
                </h1>
                <p className="text-gray-500 text-sm md:text-base mt-2">
                  Fill order details and assign to client
                </p>
              </div>

              <div className="flex items-center gap-4">
                <User size={28} className="text-gray-600" />
                <span className="font-semibold text-gray-700">
                  Admin
                </span>
                {adminId && <NotificationIcon userId={adminId} />}
              </div>
            </div>

            {/* ---------- MESSAGE ---------- */}
            {message && (
              <div className="text-green-600 font-medium text-center text-base md:text-lg">
                {message}
              </div>
            )}

            {/* ---------- FORM CARD ---------- */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-xl flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Client */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm md:text-base">
                    Client
                  </label>
                  <select
                    className="w-full h-[65px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    {clients.map(c => (
                      <option key={c._id} value={c._id}>
                        {c.name} ({c.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Order Type */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm md:text-base">
                    Order Type
                  </label>
                  <select
                    className="w-full h-[65px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                  >
                    <option value="Digitizing PPO">Digitizing PPO</option>
                    <option value="Vector PPV">Vector PPV</option>
                    <option value="Patches PO">Patches PO</option>
                  </select>
                </div>

                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm md:text-base">
                    Title
                  </label>
                  <input
                    className="w-full h-[65px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Turnaround */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm md:text-base">
                    Turnaround Time
                  </label>
                  <select
                    className="w-full h-[65px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
                    value={turnaround}
                    onChange={(e) => setTurnaround(e.target.value)}
                  >
                    <option>Rush 6 Hours</option>
                    <option>12 Hours</option>
                    <option>24 Hours</option>
                  </select>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm md:text-base">
                    Status
                  </label>
                  <select
                    className="w-full h-[65px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>

                {/* Description full width */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-semibold text-sm md:text-base">
                    Description
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-[65px] bg-[#0e2c1c] text-white rounded-xl font-semibold text-lg hover:bg-[#123825] transition shadow-lg mt-4"
              >
                Create Order
              </button>
            </form>
          </motion.div>
        </main>
      </div>
    </AdminGuard>
  );
}