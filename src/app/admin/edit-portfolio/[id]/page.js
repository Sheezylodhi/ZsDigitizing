"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Pencil, ImageIcon, User } from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import NotificationIcon from "@/components/NotificationIcon";
import { jwtDecode } from "jwt-decode";

export default function EditPortfolio({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [form, setForm] = useState({ title: "", category: "", desc: "", img: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    // Portfolio Fetch
    fetch(`/api/admin/portfolio/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setLoading(false);
      });

    // Token Decode for Header
    const token = localStorage.getItem("token");
    if (token) {
      try { const decoded = jwtDecode(token); setAdminId(decoded.userId); } catch {}
    }
  }, [id]);

  const updateItem = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("desc", form.desc);
    if (file) formData.append("file", file);

    await fetch(`/api/admin/portfolio/${id}`, { method: "PUT", body: formData });
    router.push("/admin/manage-portfolio");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <AdminGuard>
      <div className="min-h-screen py-15 px-4 sm:px-8 flex justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl space-y-8">
          
          {/* UPDATED HEADER SECTION */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
  {/* Left Side: Title & Description */}
  <div className="flex items-center gap-3 min-w-0">
    <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
      <Pencil size={20} />
    </div>
    <div className="truncate">
      <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">Edit Portfolio</h1>
      <p className="text-gray-500 text-xs sm:text-sm font-medium">Update your work item details</p>
    </div>
  </div>

  {/* Right Side: Admin Profile & Notifications */}
  <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0 border-t sm:border-t-0 pt-3 sm:pt-0">
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
        <User size={14} className="text-gray-600" />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-gray-700 truncate">Admin</span>
    </div>
    
    <div className="shrink-0">
      {adminId && <NotificationIcon userId={adminId} />}
    </div>
  </div>
</header>
          {/* FORM */}
          <form onSubmit={updateItem} className="bg-white p-5 sm:p-8 rounded-3xl border border-gray-100 shadow-xl flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 uppercase">Portfolio Image</label>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center">
                  {file || form.img ? (
                    <img src={file ? URL.createObjectURL(file) : form.img} className="w-full h-full object-cover" alt="Preview" />
                  ) : <ImageIcon className="text-gray-300" />}
                </div>
                <label className="cursor-pointer bg-gray-100 px-5 py-3 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-200 transition">
                  Change Image
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-bold text-gray-700 uppercase">Title</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-bold text-gray-700 uppercase">Category</label>
                <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 uppercase">Description</label>
              <textarea value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 h-32" />
            </div>

            <button disabled={isSubmitting} className="w-full h-14 bg-[#0e2c1c] text-white rounded-xl font-bold hover:bg-[#123825] transition shadow-lg active:scale-[0.99]">
              {isSubmitting ? "Updating..." : "Update Portfolio"}
            </button>
          </form>

        </motion.div>
      </div>
    </AdminGuard>
  );
}