"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

    const res = await fetch("/api/admin/create-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      setMsg("Client created & email sent ✅");
      setForm({ name: "", company: "", phone: "", email: "" });
    } else {
      setMsg(data.error || "Error creating client");
    }

    setLoading(false);
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
                  Create Client Account
                </h1>
                <p className="text-gray-500 text-sm md:text-base mt-2">
                  Fill out client details & send welcome email
                </p>
              </div>
              <div className="flex items-center gap-4">
                <User size={28} className="text-gray-600" />
                <span className="font-semibold text-gray-700 text-sm md:text-base">Admin</span>
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
                className="w-full bg-[#0e2c1c] text-white h-[70px] rounded-xl font-semibold text-lg md:text-xl hover:bg-[#123825] transition shadow-xl mt-4"
              >
                {loading ? "Creating..." : "Create Client"}
              </button>
            </form>
          </motion.div>
        </main>
      </div>
    </AdminGuard>
  );
}