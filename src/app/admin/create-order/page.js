"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ClipboardList, CheckCircle2 } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
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
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orderSerial, setOrderSerial] = useState("");

  useEffect(() => {
    fetch("/api/clients")
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.error(err));

    const token = localStorage.getItem("token");
    if (token) {
      try { const decoded = jwtDecode(token); setAdminId(decoded.userId); } catch {}
    }
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
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ clientId, title, description, turnaround, orderType, status }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrderSerial(data.serialNumber);
        setShowPopup(true);
        setTitle(""); setDescription(""); setClientId(""); setTurnaround("24 Hours"); setOrderType("Digitizing PPO");
      } else {
        setMessage(data.message || "Error creating order");
      }
    } catch (err) { setMessage("Error creating order"); } finally { setLoading(false); }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen py-10 px-4 sm:px-8 flex justify-center bg-[#fcfdfd]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl space-y-8">
          
          {/* HEADER SECTION */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
                <ClipboardList size={20} />
              </div>
              <div className="truncate">
                <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">Create Order</h1>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">Fill order details & assign to client</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0 border-t sm:border-t-0 pt-3 sm:pt-0">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <User size={14} className="text-gray-600" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 truncate">Admin</span>
              </div>
              <div className="shrink-0">{adminId && <NotificationIcon userId={adminId} />}</div>
            </div>
          </header>

          {message && <div className="text-red-500 font-medium text-center">{message}</div>}

          {/* FORM CARD */}
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Client</label>
                <select value={clientId} onChange={(e) => setClientId(e.target.value)} className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/10">
                  <option value="">Select Client</option>
                  {clients.map(c => <option key={c._id} value={c._id}>{c.name} ({c.email})</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order Type</label>
                <select value={orderType} onChange={(e) => setOrderType(e.target.value)} className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/10">
                  <option value="Digitizing PPO">Digitizing PPO</option>
                  <option value="Vector PPV">Vector PPV</option>
                  <option value="Patches PO">Patches PO</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order Name</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Logo Digitizing" className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/10" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Turnaround</label>
                <select value={turnaround} onChange={(e) => setTurnaround(e.target.value)} className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/10">
                  <option>Rush 4 Hours</option>
                  <option>6 Hours</option>
                  <option>12 Hours</option>
                  <option>24 Hours</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
                <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/10 resize-none" />
              </div>
            </div>

            <button disabled={loading} className="w-full h-14 bg-[#0e2c1c] text-white rounded-xl font-bold hover:bg-[#123825] transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2">
              {loading ? "Creating..." : "Create Order"}
            </button>
          </form>
        </motion.div>

        {/* POPUP */}
        <AnimatePresence>
          {showPopup && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[99] px-4">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-[2rem] p-8 w-full max-w-sm text-center shadow-2xl border border-gray-100">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Order Created!</h2>
                <p className="text-gray-500 text-sm mb-4">Serial Number:</p>
                <div className="bg-gray-50 py-3 rounded-xl font-mono font-bold text-[#0e2c1c] text-lg mb-8 border border-gray-100">{orderSerial}</div>
                <button onClick={() => setShowPopup(false)} className="w-full h-12 bg-[#0e2c1c] text-white font-bold rounded-xl hover:bg-[#123825] transition">OK</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminGuard>
  );
}