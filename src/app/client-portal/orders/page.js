"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import NotificationIcon from "@/components/NotificationIcon";
import ClientGuard from "@/components/ClientGuard";
import { User, Eye, Pencil, Trash2 } from "lucide-react";

export default function ClientOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [client, setClient] = useState(null);

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

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/client-orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setOrders(prev => prev.filter(o => o._id !== id));
    } catch (err) {
      alert("Delete failed ❌ " + err.message);
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
    if (status === "Completed") return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
    if (status === "Pending") return "bg-gray-100 text-gray-600 ring-1 ring-gray-200";
    if (status === "In Progress") return "bg-blue-100 text-blue-700 ring-1 ring-blue-200";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <ClientGuard>
      <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-10 flex flex-col gap-6 sm:gap-10">

        {/* HEADER CARD */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0e2c1c]">Orders List</h1>
            <p className="text-gray-500 text-sm mt-1 sm:mt-2">Track your orders, progress & delivery status</p>
          </div>

          {client && (
            <div className="flex items-center gap-3 md:gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-xl shadow-sm">
                <User size={18} className="text-gray-600" />
                <span className="font-semibold text-gray-700">{client.name}</span>
              </div>
              <NotificationIcon userId={client._id} />
            </div>
          )}
        </div>

        {/* FILTER CARD */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-4 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <input
            placeholder="Search order title or serial..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-[60px] sm:h-[70px] px-4 sm:px-6 border border-gray-300 bg-white rounded-xl text-[14px] sm:text-[15px] outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-64 h-[60px] sm:h-[70px] px-4 sm:px-6 border border-gray-300 bg-white rounded-xl text-[14px] sm:text-[15px] outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl overflow-x-auto">
          <table className="w-full min-w-[700px] sm:min-w-full">
            <thead className="bg-[#0e2c1c] text-left text-sm text-white">
              <tr>
                <th className="p-4 sm:p-5">Serial</th>
                <th className="p-4 sm:p-5">Type</th>
                <th className="p-4 sm:p-5">Title</th>
                <th className="p-4 sm:p-5">Status</th>
                <th className="p-4 sm:p-5">Created</th>
                <th className="p-4 sm:p-5 text-right">View</th>
                <th className="p-4 sm:p-5 text-right">Edit</th>
                <th className="p-4 sm:p-5 text-right">Delete</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-12 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                paginated.map((order) => (
                  <motion.tr
                    key={order._id}
                    whileHover={{ scale: 1.002 }}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 sm:p-5 font-mono">{order.serialNumber}</td>
                    <td className="p-4 sm:p-5">{order.orderType}</td>
                    <td className="p-4 sm:p-5 font-medium">{order.title}</td>
                    <td className="p-4 sm:p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 sm:p-5 text-right">
                      <a href={`/client-portal/orders/${order._id}`} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 shadow hover:shadow-lg hover:scale-105 transition">
                        <Eye size={15} />
                      </a>
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <a href={`/client-portal/orders/edit/${order._id}`} className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white shadow hover:shadow-lg hover:scale-105 transition">
                        <Pencil size={15} />
                      </a>
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <button onClick={() => handleDelete(order._id)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-600 text-white shadow hover:shadow-lg hover:scale-105 transition">
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
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base ${
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
    </ClientGuard>
  );
}