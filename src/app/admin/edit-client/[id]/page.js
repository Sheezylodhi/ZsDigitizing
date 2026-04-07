"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { User } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params?.id;

  const [adminId, setAdminId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [submittedClient, setSubmittedClient] = useState("");

  // Decode admin for notifications
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setAdminId(decoded.userId);
    } catch {}
  }, []);

  // Fetch client data
  useEffect(() => {
    if (!clientId) return;

    const fetchClient = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/admin/clients/${clientId}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch client");
        const data = await res.json();
        setForm(data);
      } catch (err) {
        setMsg("Error fetching client ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/admin/clients/${clientId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      setMsg("Client updated successfully ✅");
      setSubmittedClient(form.name);
      setShowPopup(true);
    } catch (err) {
      setMsg("Update failed ❌");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-8">Loading client...</p>;

  return (
    <AdminGuard>
      <div className="min-h-screen bg-white py-14 px-6 flex justify-center">
        <div className="w-full max-w-4xl space-y-6">

          {/* HEADER */}
          <div className="bg-white pt-10 mt-10  border border-gray-200 shadow-lg rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between mb-8">
            <div>
              <h1 className="text-lg sm:text-3xl font-bold text-[#0e2c1c] ">Edit Client</h1>
              <p className="text-gray-500 text-xs sm:text-sm">
                Update client details & contact information
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

          {/* MESSAGE */}
          {msg && (
            <div
              className={`px-5 py-3 rounded-xl text-sm font-medium border ${
                msg.includes("success")
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {msg}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">

              {/* Name */}
              <div className="space-y-2">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
                  Client Name
                </p>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
                  Company
                </p>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
                  Phone Number
                </p>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
                  Email Address
                </p>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
                />
              </div>
            </div>

            {/* BUTTON */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={saving}
                className="cursor-pointer w-full md:w-auto px-8 py-3 rounded-xl bg-[#0e2c1c] text-white font-semibold shadow-md hover:bg-[#123825] transition-all disabled:opacity-60 flex justify-center items-center gap-2"
              >
                {saving && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                {saving ? "Updating..." : "Update Client"}
              </button>
            </div>
          </form>
        </div>

        {/* SUCCESS POPUP */}
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
                  Update Successful 🎉
                </h2>
                <p className="text-gray-500 mb-4 text-sm">Client Name:</p>
                <div className="bg-gray-100 px-4 py-2 rounded-lg font-semibold text-[#0e2c1c] mb-6">
                  {submittedClient}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowPopup(false);
                    router.push("/admin/clients");
                  }}
                  className="cursor-pointer w-full bg-gradient-to-r from-green-700 to-green-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition"
                >
                  OK
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminGuard>
  );
}