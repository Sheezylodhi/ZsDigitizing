"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Eye, Pencil, Trash2 } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
import { jwtDecode } from "jwt-decode";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null); // popup target
  const router = useRouter();

  const perPage = 6;

  // 🔹 ORDERS FETCH
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));

    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setAdminId(decoded.userId);
    } catch {}
  }, []);

  // 🔹 DELETE FUNCTION
  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/orders/${deleteTarget._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Delete failed");

      setOrders((prev) => prev.filter((o) => o._id !== deleteTarget._id));
      setDeleteTarget(null); // close popup
    } catch (err) {
      alert("Delete failed: " + err.message);
      setDeleteTarget(null);
    }
  };

  // 🔹 FILTER
  const filtered = useMemo(() => {
    return orders.filter((o) => {
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
    if (status === "Completed")
      return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
    if (status === "Pending")
      return "bg-gray-100 text-gray-600 ring-1 ring-gray-200";
    if (status === "In Progress")
      return "bg-blue-100 text-blue-700 ring-1 ring-blue-200";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f8fafc] p-10 flex flex-col gap-10">
        {/* HEADER CARD */}
        <div className="bg-white pt-10 mt-10 border border-gray-200 shadow-lg rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between mb-8">
          <div>
            <h1 className="text-lg sm:text-3xl font-bold text-[#0e2c1c]">Order List</h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Manage all client orders & track progress
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

        {/* FILTER CARD */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 flex flex-col gap-6">
          <input
            placeholder="Search order title or serial..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[70px] px-6 border border-gray-300 bg-white rounded-xl text-[15px] outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-[70px] px-6 border border-gray-300 bg-white rounded-xl text-[15px] outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0e2c1c] text-left text-sm text-white">
                <tr>
                  <th className="p-5">Serial</th>
                  <th className="p-5">Type</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Client</th>
                  <th className="p-5">Created</th>
                  <th className="p-5 text-right">View</th>
                  <th className="p-5 text-right">Submit</th>
                  <th className="p-5 text-right">Edit</th>
                  <th className="p-5 text-right">Delete</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="p-20 text-center text-gray-400">
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
                      <td className="p-5 font-mono">{order.serialNumber}</td>
                      <td className="p-5">{order.orderType}</td>
                      <td className="p-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-5">{order.clientId?.name}</td>
                      <td className="p-5 text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-5 text-right">
                        <a
                          href={`/admin/orders/${order._id}`}
                          className="w-10 h-9 flex items-center justify-center rounded-lg text-grey shadow hover:shadow-lg hover:scale-105 transition"
                        >
                          <Eye size={15} />
                        </a>
                      </td>
                      <td className="p-5">
                        <a
                          href={`/admin/orders/${order._id}/submit`}
                          className="w-10 h-9 flex items-center justify-center rounded-lg bg-emerald-600 text-white shadow hover:shadow-lg hover:scale-105 transition"
                        >
                          <Eye size={15} />
                        </a>
                      </td>
                      <td className="p-5 text-right">
                        <a
                          href={`/admin/edit-order/${order._id}`}
                          className="w-10 h-9 inline-flex items-center justify-center rounded-lg bg-blue-600 text-white shadow hover:shadow-lg hover:scale-105 transition"
                        >
                          <Pencil size={15} />
                        </a>
                      </td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => setDeleteTarget(order)}
                          className="w-10 h-9 cursor-pointer inline-flex items-center justify-center rounded-lg bg-red-600 text-white shadow hover:shadow-lg hover:scale-105 transition"
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
                <h2 className="text-xl font-bold text-[#0e2c1c] mb-4">
                  Delete Order?
                </h2>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete order <span className="font-semibold">{deleteTarget.serialNumber}</span>?
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