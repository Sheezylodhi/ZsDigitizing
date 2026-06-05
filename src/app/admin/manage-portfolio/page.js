"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Search, Briefcase, Plus, User } from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import { useRouter } from "next/navigation";
import NotificationIcon from "@/components/NotificationIcon";
import { jwtDecode } from "jwt-decode";

export default function PortfolioList() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch Portfolio
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []));

    // Get Admin ID from Token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdminId(decoded.userId);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

  const filtered = useMemo(() => {
    return items.filter((i) => 
      i.title?.toLowerCase().includes(search.toLowerCase()) ||
      i.category?.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await fetch(`/api/admin/portfolio?id=${deleteTarget._id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      alert("Delete failed");
      setDeleteTarget(null);
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen  py-15 px-4 sm:px-8 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-5xl space-y-8"
        >
          
          {/* HEADER SECTION */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
  {/* Left Side: Title & Description */}
  <div className="flex items-center gap-3 min-w-0">
    <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
      <Briefcase size={20} />
    </div>
    <div className="truncate">
      <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">Portfolio</h1>
      <p className="text-gray-500 text-xs sm:text-sm font-medium">Manage and organize your work items</p>
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

          {/* SEARCH & ADD NEW AREA */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                placeholder="Search by title or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition shadow-sm"
              />
            </div>
            <button 
              onClick={() => router.push("/admin/add-portfolio")} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0e2c1c] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#123825] transition shadow-lg active:scale-[0.98]"
            >
              <Plus size={18} /> Add New Item
            </button>
          </div>

          {/* TABLE SECTION */}
          <div className="bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-right text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((item) => (
                    <motion.tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <img src={item.img} className="w-14 h-14 rounded-xl object-cover border border-gray-100" alt={item.title} />
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">{item.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium">{item.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => router.push(`/admin/edit-portfolio/${item._id}`)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => setDeleteTarget(item)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* DELETE MODAL */}
        <AnimatePresence>
          {deleteTarget && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl border border-gray-100"
              >
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={30} />
                </div>
                <h2 className="text-xl font-bold text-[#0e2c1c] mb-2">Delete Item?</h2>
                <p className="text-gray-500 text-sm mb-8">Are you sure you want to remove "{deleteTarget.title}"? This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition">Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminGuard>
  );
}