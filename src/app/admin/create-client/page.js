"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
import AdminSidebar from "@/components/AdminSidebar";
import {jwtDecode} from "jwt-decode";

export default function CreateClientPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [msg, setMsg] = useState("");
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setAdminId(decoded.userId);
    } catch {}
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const submit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMsg("");

  try {
    const res = await fetch("/api/admin/create-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      setForm({ name: "", company: "", phone: "", email: "" });
      setShowPopup(true); // ✅ Show popup
    } else {
      setMsg(data.error || "Error creating client");
    }

  } catch (err) {
    setMsg("Error creating client");
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
              <h1 className="text-lg sm:text-3xl font-bold text-[#0e2c1c] ">Create Client</h1>
            <p className="text-gray-500 text-xs sm:text-sm">
      Fill out client details & send welcome email
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
            {msg && (
              <div className="text-green-600 font-medium text-center text-base md:text-lg">{msg}</div>
            )}

            {/* ---------- FORM CARD ---------- */}
            <form
              onSubmit={submit}
              className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-xl flex flex-col gap-6 md:gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Client Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm md:text-base font-semibold">Client Name</label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition text-sm md:text-base"
                  />
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm md:text-base font-semibold">Company Name</label>
                  <input
                    name="company"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition text-sm md:text-base"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm md:text-base font-semibold">Phone Number</label>
                  <input
                    name="phone"
                    placeholder="+92 300 1234567"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition text-sm md:text-base"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm md:text-base font-semibold">Client Email</label>
                  <input
                    name="email"
                    placeholder="client@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
  type="submit"
  disabled={loading}
  className={`cursor-pointer w-full h-[70px] rounded-xl font-semibold flex justify-center items-center gap-2 transition
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0e2c1c] hover:bg-[#123825] text-white"} mt-4`}
>
  {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
  {loading ? "Creating..." : "Create Client"}
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
          Client Created 
        </h2>

        <p className="text-gray-500 mb-6 text-sm">
          The client account has been successfully created and email sent.
        </p>

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