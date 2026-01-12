"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 10;

  useEffect(() => {
    fetch("/api/admin/quotes")
      .then(res => res.json())
      .then(data => setQuotes(data))
      .catch(err => console.error(err));
  }, []);

  const filteredQuotes = quotes.filter(q =>
    q.name.toLowerCase().includes(search.toLowerCase()) ||
    q.company?.toLowerCase().includes(search.toLowerCase()) ||
    q.email.toLowerCase().includes(search.toLowerCase()) ||
    q.phone?.toLowerCase().includes(search.toLowerCase()) ||
    q.website?.toLowerCase().includes(search.toLowerCase()) ||
    q.type?.toLowerCase().includes(search.toLowerCase()) ||
    q.deadline?.toLowerCase().includes(search.toLowerCase()) ||
    q.message.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * quotesPerPage;
  const indexOfFirst = indexOfLast - quotesPerPage;
  const currentQuotes = filteredQuotes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredQuotes.length / quotesPerPage);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Quotes</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by any field..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // reset page on search
        }}
        className="mb-4 p-3 border rounded-xl w-full max-w-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder-gray-400"
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-green-50 sticky top-0">
            <tr>
              {["Name","Company","Email","Phone","Website","Type","Deadline","Message","File","Date"].map((head) => (
                <th key={head} className="p-3 text-left text-gray-600 font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {currentQuotes.map((q, idx) => (
                <motion.tr
                  key={q._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`border-t hover:bg-green-50 transition cursor-pointer ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="p-3 font-medium text-gray-700">{q.name}</td>
                  <td className="p-3 text-gray-600">{q.company || "-"}</td>
                  <td className="p-3 text-gray-600">{q.email}</td>
                  <td className="p-3 text-gray-600">{q.phone || "-"}</td>
                  <td className="p-3 text-gray-600">{q.website || "-"}</td>
                  <td className="p-3 text-gray-600">{q.type || "-"}</td>
                  <td className="p-3 text-gray-600">{q.deadline || "-"}</td>
                  <td className="p-3 text-gray-600 max-w-xs truncate" title={q.message}>
                    {q.message}
                  </td>
                  <td className="p-3 text-blue-500 hover:underline">
                    {q.fileUrl ? (
                      <a href={q.fileUrl} target="_blank" rel="noopener noreferrer">Download</a>
                    ) : "-"}
                  </td>
                  <td className="p-3 text-gray-500">{new Date(q.createdAt).toLocaleDateString()}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition disabled:bg-gray-300"
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className="px-4 py-2 font-medium text-gray-700">
          {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition disabled:bg-gray-300"
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}
