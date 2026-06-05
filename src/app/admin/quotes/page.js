"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Eye, Trash2, Search, Mail } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const perPage = 6;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { userId } = JSON.parse(atob(token.split('.')[1]));
      setAdminId(userId);
    } catch {}

    fetch("/api/admin/quotes", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => Array.isArray(data) ? setQuotes(data) : setQuotes([]))
      .catch(console.error);
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/quotes/${deleteTarget._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuotes(prev => prev.filter(q => q._id !== deleteTarget._id));
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const filtered = useMemo(() => {
    return quotes.filter(q =>
      q.name?.toLowerCase().includes(search.toLowerCase()) ||
      q.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [quotes, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <AdminGuard>
      <div className="min-h-screen  px-4 py-15 sm:px-6 lg:px-12 sm:py-10">
        
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 overflow-hidden">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
              <Mail size={20} />
            </div>
            <div className="truncate">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">Quotes List</h1>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">Manage all client quotes</p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 shrink-0">
              <User size={14} className="text-gray-600" />
              <span className="text-xs sm:text-sm font-bold text-gray-700">Admin</span>
            </div>
            {adminId && <NotificationIcon userId={adminId} />}
          </div>
        </header>

        {/* SEARCH */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full h-12 pl-11 pr-4 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0e2c1c]/10 outline-none transition-all shadow-sm"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-100 shadow-md rounded-[24px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#0e2c1c] text-white">
                  <th className="p-5 text-left text-xs font-bold uppercase tracking-wider">Name</th>
                  <th className="p-5 text-left text-xs font-bold uppercase tracking-wider">Email</th>
                  <th className="p-5 text-left text-xs font-bold uppercase tracking-wider">Date</th>
                  <th className="p-5 text-right text-xs font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.length === 0 ? (
                  <tr><td colSpan="4" className="p-20 text-center text-gray-400 font-medium">No quotes found.</td></tr>
                ) : (
                  paginated.map(q => (
                    <motion.tr key={q._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-5 text-sm font-bold text-gray-800">{q.name}</td>
                      <td className="p-5 text-sm text-gray-600">{q.email}</td>
                      <td className="p-5 text-sm text-gray-400">{new Date(q.createdAt).toLocaleDateString()}</td>
                      <td className="p-5">
                        <div className="flex justify-end gap-2">
                          <a href={`/admin/quotes/${q._id}`} className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-[#0e2c1c] hover:text-white transition shadow-sm">
                            <Eye size={16} />
                          </a>
                          <button onClick={() => setDeleteTarget(q)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                  page === i + 1 ? "bg-[#0e2c1c] text-white scale-110 shadow-lg" : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* DELETE MODAL */}
        <AnimatePresence>
          {deleteTarget && (
            <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[99] px-4">
              <motion.div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl border border-gray-100 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Quote?</h2>
                <p className="text-gray-500 text-sm mb-8">This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)} className="flex-1 h-12 bg-gray-100 rounded-xl font-bold">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 h-12 bg-red-600 text-white rounded-xl font-bold">{isDeleting ? "Deleting..." : "Delete"}</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminGuard>
  );
}