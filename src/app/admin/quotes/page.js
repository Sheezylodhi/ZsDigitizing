"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Eye, Trash2 } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/quotes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setQuotes(prev => prev.filter(q => q._id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
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
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#0e2c1c] text-left text-sm text-white">
              <tr>
                <th className="p-5">Name</th>
                <th className="p-5">Company</th>
                <th className="p-5">Email</th>
                <th className="p-5">Message</th>
                <th className="p-5">File</th>
                <th className="p-5">Date</th>
                <th className="p-5 text-right">View</th>
                <th className="p-5 text-right">Delete</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-20 text-center text-gray-400">
                    No quotes found
                  </td>
                </tr>
              ) : (
                paginated.map(q => (
                  <motion.tr
                    key={q._id}
                    whileHover={{ scale: 1.002 }}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-5 font-medium">{q.name}</td>
                    <td className="p-5">{q.company || "-"}</td>
                    <td className="p-5">{q.email}</td>
                    <td className="p-5 max-w-xs truncate" title={q.message}>{q.message}</td>
                    <td className="p-5">
                      {q.fileUrl ? (
                        <a href={q.fileUrl} target="_blank" className="text-green-600 font-medium hover:underline">
                          Download
                        </a>
                      ) : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="p-5 text-gray-500">{new Date(q.createdAt).toLocaleDateString()}</td>
                    <td className="p-5 text-right">
                      <a
                        href={`/admin/quotes/${q._id}`}
                        className="w-10 h-9 flex items-center justify-center rounded-lg text-grey shadow hover:shadow-lg hover:scale-105 transition"
                      >
                        <Eye size={15} />
                      </a>
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => handleDelete(q._id)}
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

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition ${
                  page === i + 1
                    ? "bg-[#0e2c1c] text-white shadow-lg"
                    : "bg-white border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </AdminGuard>
  );
}