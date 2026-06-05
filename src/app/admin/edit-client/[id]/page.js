"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { User, Edit3, ChevronLeft } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params?.id;

  const [adminId, setAdminId] = useState(null);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try { const decoded = jwtDecode(token); setAdminId(decoded.userId); } catch {}
    }
  }, []);

  useEffect(() => {
    if (!clientId) return;
    fetch(`/api/admin/clients/${clientId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => { setForm(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [clientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/clients/${clientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(form),
      });
      if (res.ok) setShowPopup(true);
    } catch (err) { alert("Update failed"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="p-20 text-center text-gray-400">Loading client data...</div>;

  return (
    <AdminGuard>
      <div className="min-h-screen  px-4 py-15 sm:px-6 lg:px-12">
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-xl transition">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex">
              <Edit3 size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c]">Edit Client</h1>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">Update profile details</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
              <User size={14} className="text-green-700" />
              <span className="text-xs sm:text-sm font-bold text-gray-700">Admin</span>
            </div>
            {adminId && <NotificationIcon userId={adminId} />}
          </div>
        </header>

        {/* FORM */}
        <div className="max-w-2xl bg-white border border-gray-100 shadow-md rounded-[24px] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Client Name</label>
                <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c]/10 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Company</label>
                <input value={form.company} onChange={(e) => setForm({...form, company: e.target.value})} className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c]/10 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c]/10 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</label>
                <input value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c]/10 outline-none transition-all" />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={saving}
              className="w-full h-12 bg-[#0e2c1c] text-white font-bold rounded-xl hover:bg-[#1a4a30] transition-all shadow-lg disabled:opacity-50"
            >
              {saving ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* SUCCESS POPUP */}
        <AnimatePresence>
          {showPopup && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[99] px-4">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl border border-gray-100 text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Edit3 size={28} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Updated!</h2>
                <p className="text-gray-500 text-sm mb-8">Client details have been saved successfully.</p>
                <button onClick={() => router.push("/admin/clients")} className="w-full h-12 bg-[#0e2c1c] text-white font-bold rounded-xl hover:bg-[#1a4a30] transition">Back to List</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminGuard>
  );
}