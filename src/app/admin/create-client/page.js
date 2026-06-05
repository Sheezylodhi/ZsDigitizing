"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, UserPlus, CheckCircle2 } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
import { jwtDecode } from "jwt-decode";

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
        setShowPopup(true);
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
      <div className="min-h-screen py-15 px-4 sm:px-8 flex justify-center ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl space-y-8"
        >
          {/* HEADER SECTION */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
                <UserPlus size={20} />
              </div>
              <div className="truncate">
                <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">Create Client</h1>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">Add new client & send access details</p>
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

          {/* MESSAGE */}
          {msg && <div className="text-red-500 font-medium text-center">{msg}</div>}

          {/* FORM CARD */}
          <form
            onSubmit={submit}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Client Name</label>
                <input name="name" required placeholder="John Doe" value={form.name} onChange={handleChange} className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/10" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Name</label>
                <input name="company" placeholder="Acme Corp" value={form.company} onChange={handleChange} className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/10" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                <input name="phone" required placeholder="+1 234 567 890" value={form.phone} onChange={handleChange} className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/10" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Client Email</label>
                <input name="email" type="email" required placeholder="client@example.com" value={form.email} onChange={handleChange} className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/10" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#0e2c1c] text-white rounded-xl font-bold hover:bg-[#123825] transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : "Create Client"}
            </button>
          </form>
        </motion.div>

        {/* SUCCESS POPUP */}
        <AnimatePresence>
          {showPopup && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[99] px-4">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-[2rem] p-8 w-full max-w-sm text-center shadow-2xl border border-gray-100">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Client Created!</h2>
                <p className="text-gray-500 text-sm mb-8">Account details have been successfully created and sent to the client.</p>
                <button onClick={() => setShowPopup(false)} className="w-full h-12 bg-[#0e2c1c] text-white font-bold rounded-xl hover:bg-[#123825] transition">OK</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminGuard>
  );
}