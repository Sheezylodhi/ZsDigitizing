"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Eye, Trash2 } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null); // 🔹 popup target
  const perPage = 6;
  const router = useRouter();

  // 🔹 FETCH QUOTES + ADMIN ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Admin Decode
    try {
      const { userId } = JSON.parse(atob(token.split('.')[1]));
      setAdminId(userId);
    } catch {}

    fetch("/api/admin/quotes", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => Array.isArray(data) ? setQuotes(data) : setQuotes([]))
      .catch(console.error);
  }, []);

  // 🔹 DELETE HANDLER
  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/quotes/${deleteTarget._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setQuotes(prev => prev.filter(q => q._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message);
      setDeleteTarget(null);
    }
  };

  const filtered = useMemo(() => {
    return quotes.filter(q =>
      q.name?.toLowerCase().includes(search.toLowerCase()) ||
      q.email?.toLowerCase().includes(search.toLowerCase()) ||
      q.company?.toLowerCase().includes(search.toLowerCase()) ||
      q.message?.toLowerCase().includes(search.toLowerCase())
    );
  }, [quotes, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f8fafc] p-10 flex flex-col gap-10">

        {/* HEADER CARD */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0e2c1c]">Quotes List</h1>
            <p className="text-gray-500 text-sm mt-2">Manage all client quotes & track submissions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 border border-gray-200 bg-white rounded-xl shadow-sm">
              <User size={18} className="text-gray-600" />
              <span className="font-semibold text-gray-700">Admin</span>
            </div>
            {adminId && <NotificationIcon userId={adminId} />}
          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 flex flex-col gap-6">
          <input
            placeholder="Search by name, email, company or message..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full h-[70px] px-6 border border-gray-300 bg-white rounded-xl text-[15px] outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
          />
        </div>

        {/* TABLE CARD */}
        {/* TABLE CARD */}
<div className="bg-white border border-gray-200 shadow-lg rounded-3xl overflow-hidden">
  {/* Horizontal scroll wrapper */}
  <div className="w-full overflow-x-auto">
    <table className="w-full table-auto min-w-[700px]">
      <thead className="bg-[#0e2c1c] text-left text-sm text-white">
        <tr>
          <th className="p-4 md:p-5">Name</th>
          <th className="p-4 md:p-5">Email</th>
          <th className="p-4 md:p-5">Date</th>
          <th className="p-4 md:p-5 text-right">View</th>
          <th className="p-4 md:p-5 text-right">Delete</th>
        </tr>
      </thead>
      <tbody>
        {paginated.length === 0 ? (
          <tr>
            <td colSpan="6" className="p-10 md:p-20 text-center text-gray-400">No quotes found</td>
          </tr>
        ) : (
          paginated.map(q => (
            <motion.tr
              key={q._id}
              whileHover={{ scale: 1.002 }}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4 md:p-5 font-medium whitespace-nowrap">{q.name}</td>
              <td className="p-4 md:p-5 whitespace-nowrap">{q.email}</td>
              <td className="p-4 md:p-5 whitespace-nowrap">
                {q.fileUrl ? (
                  <a href={q.fileUrl} target="_blank" className="text-green-600 font-medium hover:underline">Download</a>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="p-4 md:p-5 text-gray-500 whitespace-nowrap">{new Date(q.createdAt).toLocaleDateString()}</td>
              <td className="p-4 md:p-5 text-right">
                <a href={`/admin/quotes/${q._id}`} className="w-10 h-9 flex items-center justify-center rounded-lg text-grey shadow hover:shadow-lg hover:scale-105 transition">
                  <Eye size={15} />
                </a>
              </td>
              <td className="p-4 md:p-5 text-right">
                <button
                  onClick={() => setDeleteTarget(q)}
                  className="w-10 h-9 inline-flex items-center justify-center rounded-lg bg-red-600 text-white shadow hover:shadow-lg hover:scale-105 transition"
                >
                  <Trash2 size={15} />
                </button>
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
          <div className="flex justify-center gap-3 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition ${
                  page === i + 1 ? "bg-[#0e2c1c] text-white shadow-lg" : "bg-white border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* DELETE CONFIRM POPUP */}
        <AnimatePresence>
          {deleteTarget && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl text-center border border-gray-200"
              >
                <h2 className="text-xl font-bold text-[#0e2c1c] mb-4">Delete Quote?</h2>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete quote from <span className="font-semibold">{deleteTarget.name}</span>?
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="cursor-pointer px-6 py-3 rounded-xl bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="cursor-pointer px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminGuard>
  );
}