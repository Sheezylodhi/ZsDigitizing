"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [loading, setLoading] = useState(false); // button loading
const [showPopup, setShowPopup] = useState(false); // popup
const [orderSerial, setOrderSerial] = useState(""); // serial number from API

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

  setLoading(true);
  setMessage("");

  const token = localStorage.getItem("token");

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      setOrderSerial(data.serialNumber);
      setShowPopup(true); // ✅ show popup
      setTitle("");
      setDescription("");
      setClientId("");
      setTurnaround("24 Hours");
      setOrderType("Digitizing PPO");
    } else {
      setMessage(data.message || "Error creating order");
    }

  } catch (err) {
    setMessage("Error creating order");
  } finally {
    setLoading(false);
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
            <div className="bg-white pt-10 mt-10  border border-gray-200 shadow-lg rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between mb-8">
          <div>
              <h1 className="text-lg sm:text-3xl font-bold text-[#0e2c1c] ">Crate Order</h1>
            <p className="text-gray-500 text-xs sm:text-sm">
      Fill order details and assign to client
    </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 border border-gray-200 bg-white rounded-xl shadow-sm">
              <User size={18} className="text-gray-600" />
              <span className="font-semibold text-gray-700">Admin</span>
            </div>
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
                    Order Name
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
                    <option>Rush 4 Hours</option>
                    <option>6 Hours</option>
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
                    <option>In Process</option>
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
  disabled={loading}
  className={`cursor-pointer w-full h-[65px] rounded-xl font-semibold flex justify-center items-center gap-2 transition
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0e2c1c] hover:bg-[#123825] text-white"} mt-4`}
>
  {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
  {loading ? "Creating..." : "Create Order"}
</button>
            </form>
            <AnimatePresence>
  {showPopup && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    >
      <motion.div
        initial={{ scale: 0.6, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.6, y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-white/20"
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-400/30 blur-3xl rounded-full"></div>

        {/* Tick */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
        >
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <motion.path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </svg>
        </motion.div>

        <h2 className="text-2xl font-bold text-[#0e2c1c] mb-2">
          Order Created 
        </h2>

        <p className="text-gray-500 mb-4 text-sm">
          Order Serial Number:
        </p>

        <div className="bg-gray-100 px-4 py-2 rounded-lg font-semibold text-[#0e2c1c] mb-6">
          {orderSerial}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPopup(false)}
          className="cursor-pointer w-full bg-gradient-to-r from-green-700 to-green-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition"
        >
          OK
        </motion.button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
          </motion.div>
        </main>
      </div>
    </AdminGuard>
  );
}