"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NotificationIcon from "@/components/NotificationIcon";
import ClientGuard from "@/components/ClientGuard";
import { User, Eye, Pencil, Trash2, Search, Filter, Hash } from "lucide-react";

export default function ClientOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [client, setClient] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/client/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => data?._id && setClient(data));
  }, []);

  const perPage = 6;

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (Array.isArray(data)) setOrders(data);
        else if (Array.isArray(data.orders)) setOrders(data.orders);
        else setOrders([]);
      } catch { setOrders([]); }
    }
    fetchOrders();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/client-orders/${deleteTarget._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setOrders(prev => prev.filter(o => o._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message);
      setDeleteTarget(null);
    }
  };

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchSearch =
        o.title?.toLowerCase().includes(search.toLowerCase()) ||
        o.serialNumber?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const statusStyle = (status) => {
    if (status === "Completed") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (status === "Pending") return "bg-amber-50 text-amber-700 border-amber-200";
    if (status === "In Progress") return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-gray-50 text-gray-600 border-gray-200";
  };

  return (
    <ClientGuard>
      <div className="min-h-screen bg-[#fcfdfd] px-4 py-20 sm:px-6 lg:px-12 py-6 sm:py-10">
        
        {/* HEADER - CLEAN & NON-BREAKING */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 overflow-hidden">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
              <Hash size={20} />
            </div>
            <div className="truncate">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">Order List</h1>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">Manage your requests</p>
            </div>
          </div>

          {client && (
            <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 shrink-0">
                <User size={14} className="text-green-700" />
                <span className="text-xs sm:text-sm font-bold text-gray-700 truncate max-w-[100px] sm:max-w-none">{client.name}</span>
              </div>
              <NotificationIcon userId={client._id} />
            </div>
          )}
        </header>

        {/* SEARCH & FILTERS - STACKED ON MOBILE, ROW ON DESKTOP */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              placeholder="Search by title or serial..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0e2c1c]/10 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="relative w-full md:w-56">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0e2c1c]/10 outline-none appearance-none cursor-pointer shadow-sm"
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        {/* HIGH-LEVEL RESPONSIVE TABLE CONTAINER */}
        <div className="bg-white border border-gray-100 shadow-md rounded-[24px] overflow-hidden transition-all">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#0e2c1c] text-white">
                  <th className="p-5 text-left text-xs font-bold uppercase tracking-wider">Serial</th>
                  <th className="p-5 text-left text-xs font-bold uppercase tracking-wider">Order Type</th>
                  <th className="p-5 text-left text-xs font-bold uppercase tracking-wider">Title</th>
                  <th className="p-5 text-center text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="p-5 text-left text-xs font-bold uppercase tracking-wider">Created</th>
                  <th className="p-5 text-right text-xs font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-20 text-center text-gray-400 font-medium italic">No orders found matching your search criteria.</td>
                  </tr>
                ) : (
                  paginated.map((order) => (
                    <motion.tr 
                      key={order._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      <td className="p-5 font-mono text-xs font-bold text-gray-500 uppercase">{order.serialNumber}</td>
                      <td className="p-5 text-sm text-gray-600">{order.orderType}</td>
                      <td className="p-5 text-sm font-bold text-gray-800">{order.title}</td>
                      <td className="p-5 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-wider ${statusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-5 text-sm text-gray-400 font-medium">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-5">
                        <div className="flex justify-end gap-2 items-center">
                          <a href={`/client-portal/orders/${order._id}`} className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-[#0e2c1c] hover:text-white transition-all shadow-sm">
                            <Eye size={16} />
                          </a>
                          <a href={`/client-portal/orders/edit/${order._id}`} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                            <Pencil size={16} />
                          </a>
                          <button onClick={() => setDeleteTarget(order)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
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

        {/* PAGINATION - SMOOTH TRANSITION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPage(i + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  page === i + 1 ? "bg-[#0e2c1c] text-white scale-110 shadow-lg" : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* MODAL (UNCHANGED LOGIC - REFINED UI) */}
        <AnimatePresence>
          {deleteTarget && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[99] px-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={28} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Are you sure?</h2>
                <p className="text-gray-500 text-sm mb-8">Order &quot;{deleteTarget.title}&quot; will be permanently deleted.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)} className="flex-1 h-12 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 h-12 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition">Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClientGuard>
  );
}