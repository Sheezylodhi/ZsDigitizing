"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import AdminSidebar from "@/components/AdminSidebar";
import { motion, AnimatePresence } from "framer-motion";

export default function QuotesPage() {
  return (
    <AdminGuard>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <AdminSidebar />
        <ProtectedQuotes />
      </div>
    </AdminGuard>
  );
}

function ProtectedQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/admin/quotes", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setQuotes(data) : setQuotes([]))
      .catch(console.error);
  }, []);

  const filteredQuotes = quotes.filter(q =>
    (q.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (q.email?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (q.company?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (q.message?.toLowerCase() || "").includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * quotesPerPage;
  const indexOfFirst = indexOfLast - quotesPerPage;
  const currentQuotes = filteredQuotes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredQuotes.length / quotesPerPage);

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6 overflow-x-auto min-w-0">
      <h1 className="text-3xl font-bold text-gray-800">Quotes</h1>

      <input
        type="text"
        placeholder="Search quotes..."
        value={search}
        onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
        className="mb-4 p-3 border rounded-xl w-full max-w-lg shadow-sm"
      />

      <div className="overflow-x-auto rounded-xl border shadow-md bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-green-600 text-white text-sm uppercase tracking-wide">
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Company</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Message</th>
              <th className="px-4 py-3 text-left font-medium">File</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            <AnimatePresence>
              {currentQuotes.map((q, idx) => (
                <motion.tr
                  key={q._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{q.name}</td>
                  <td className="px-4 py-3 text-gray-700">{q.company || "-"}</td>
                  <td className="px-4 py-3 text-gray-700">{q.email}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate" title={q.message}>
                    {q.message}
                  </td>
                  <td className="px-4 py-3">
                    {q.fileUrl ? (
                      <a href={q.fileUrl} target="_blank" className="text-green-600 font-medium hover:underline">
                        Download
                      </a>
                    ) : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg border bg-white shadow-sm disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-medium">
          Page {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg border bg-white shadow-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
