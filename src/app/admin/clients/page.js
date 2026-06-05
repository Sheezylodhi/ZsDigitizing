"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, Pencil, Trash2, Search, Users, UserPlus } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
import { jwtDecode } from "jwt-decode";

export default function ClientListPage() {
  const [clients, setClients] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const router = useRouter();
  const perPage = 6;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/admin/clients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setClients(data);
        if (token) {
          try { const decoded = jwtDecode(token); setAdminId(decoded.userId); } catch {}
        }
      } catch (err) { console.error(err); }
    };
    fetchClients();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/clients/${deleteTarget._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients((prev) => prev.filter((c) => c._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) { alert("Delete failed"); setDeleteTarget(null); }
  };

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
      <div className="min-h-screen bg-[#fcfdfd] px-4 py-15 sm:px-6 lg:px-12">
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex">
              <Users size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c]">Clients</h1>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">Manage your registered users</p>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
              <User size={14} className="text-green-700" />
              <span className="text-xs sm:text-sm font-bold text-gray-700">Admin</span>
            </div>
            {adminId && <NotificationIcon userId={adminId} />}
          </div>
        </header>

        {/* SEARCH */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            placeholder="Search by name, email, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-11 pr-4 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#0e2c1c]/10 outline-none transition-all shadow-sm"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-100 shadow-md rounded-[24px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#0e2c1c] text-white">
                  <th className="p-5 text-left text-xs font-bold uppercase tracking-wider">Name</th>
                  <th className="p-5 text-left text-xs font-bold uppercase tracking-wider">Company</th>
                  <th className="p-5 text-left text-xs font-bold uppercase tracking-wider">Phone</th>
                  <th className="p-5 text-left text-xs font-bold uppercase tracking-wider">Email</th>
                  <th className="p-5 text-right text-xs font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((client) => (
                  <tr key={client._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 text-sm font-bold text-gray-800">{client.name}</td>
                    <td className="p-5 text-sm text-gray-600">{client.company || "-"}</td>
                    <td className="p-5 text-sm text-gray-600">{client.phone || "-"}</td>
                    <td className="p-5 text-sm text-gray-500">{client.email}</td>
                    <td className="p-5">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => router.push(`/admin/edit-client/${client._id}`)} className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Pencil size={16} /></button>
                        <button onClick={() => setDeleteTarget(client)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${page === i + 1 ? "bg-[#0e2c1c] text-white scale-110 shadow-lg" : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"}`}>{i + 1}</button>
            ))}
          </div>
        )}

        {/* DELETE MODAL */}
        <AnimatePresence>
          {deleteTarget && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[99] px-4">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl border border-gray-100 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><Trash2 size={28} /></div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Are you sure?</h2>
                <p className="text-gray-500 text-sm mb-8">Delete client &quot;{deleteTarget.name}&quot;?</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)} className="flex-1 h-12 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 h-12 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700">Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminGuard>
  );
}