"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Pencil, Trash2 } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
import { jwtDecode } from "jwt-decode";

export default function ClientListPage() {
  const [clients, setClients] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const router = useRouter();
  const perPage = 6;

  /* 🔹 FETCH CLIENTS */
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/admin/clients", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setClients(data);

        const decoded = jwtDecode(token);
        setAdminId(decoded.userId);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClients();
  }, []);

  /* 🔹 DELETE */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/clients/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setClients((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* 🔹 FILTER */
  const filtered = useMemo(() => {
    return clients.filter((c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.company?.toLowerCase().includes(search.toLowerCase())
    );
  }, [clients, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f8fafc] p-10 flex flex-col gap-10">

        {/* HEADER CARD */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0e2c1c]">
              Clients List
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Manage all registered clients
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 border border-gray-200 bg-white rounded-xl shadow-sm">
              <User size={18} className="text-gray-600" />
              <span className="font-semibold text-gray-700">
                Admin
              </span>
            </div>
            {adminId && <NotificationIcon userId={adminId} />}
          </div>
        </div>

        {/* SEARCH CARD */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8">
          <input
            placeholder="Search by name, email, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                <th className="p-5">Phone</th>
                <th className="p-5">Email</th>
                <th className="p-5 text-right">Edit</th>
                <th className="p-5 text-right">Delete</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-20 text-center text-gray-400">
                    No clients found
                  </td>
                </tr>
              ) : (
                paginated.map((client) => (
                  <motion.tr
                    key={client._id}
                    whileHover={{ scale: 1.002 }}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-5 font-medium">{client.name}</td>
                    <td className="p-5">{client.company || "-"}</td>
                    <td className="p-5">{client.phone || "-"}</td>
                    <td className="p-5 text-gray-600">{client.email}</td>

                    {/* EDIT */}
                    <td className="p-5 text-right">
                      <button
                        onClick={() =>
                          router.push(`/admin/edit-client/${client._id}`)
                        }
                        className="w-10 h-9 inline-flex items-center justify-center rounded-lg bg-blue-600 text-white shadow hover:shadow-lg hover:scale-105 transition"
                      >
                        <Pencil size={15} />
                      </button>
                    </td>

                    {/* DELETE */}
                    <td className="p-5 text-right">
                      <button
                        onClick={() => handleDelete(client._id)}
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