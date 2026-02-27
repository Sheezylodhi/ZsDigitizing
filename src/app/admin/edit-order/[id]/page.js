"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { User, Eye, Pencil, Trash2 } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
import { jwtDecode } from "jwt-decode";

export default function EditOrderPage() {
  const router = useRouter();
  const params = useParams();
    const [orders, setOrders] = useState([]);
    const [adminId, setAdminId] = useState(null);
  const orderId = params?.id;

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

  const [form, setForm] = useState({
    serialNumber: "",
    orderType: "",
    clientId: "",
    title: "",
    description: "",
    turnaround: "24 Hours",
    status: "Pending",
  });
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // Fetch clients for dropdown
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/clients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setClients(data);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/admin/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch order");
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error(err);
        setMsg("Error fetching order: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);
  setMsg("");

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) throw new Error("Update failed");

    setMsg("Order updated successfully ✅");

    setTimeout(() => {
      router.push("/admin/orders");
    }, 800);

  } catch (err) {
    console.error(err);
    setMsg("Update failed ❌: " + err.message);
  } finally {
    setSaving(false);
  }
};

  if (loading) return <p className="p-8">Loading order...</p>;

 return (
   <AdminGuard>
  <div className="min-h-screen bg-white py-14 px-6 flex justify-center">
    <div className="w-full max-w-4xl space-y-6">

      {/* HEADER */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#0e2c1c]">
                    Orders List
                  </h1>
                  <p className="text-gray-500 text-sm mt-2">
                    Manage all client orders & track progress
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

      {/* MESSAGE */}
      {msg && (
        <div className={`px-5 py-3 rounded-xl text-sm font-medium border ${
          msg.includes("success")
            ? "bg-green-50 border-green-200 text-green-700"
            : "bg-red-50 border-red-200 text-red-600"
        }`}>
          {msg}
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8"
      >

        {/* GRID SECTION */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Serial Number */}
          <div className="space-y-2">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
              Serial Number
            </p>
            <input
              name="serialNumber"
              value={form.serialNumber}
              readOnly
              className="w-full px-5 py-4 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Order Type */}
          <div className="space-y-2">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
              Order Type
            </p>
            <input
              name="orderType"
              value={form.orderType}
              readOnly
              className="w-full px-5 py-4 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Client */}
          <div className="space-y-2">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
              Client
            </p>
            <select
              name="clientId"
              value={form.clientId}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
            >
              <option value="">Select Client</option>
              {clients.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} ({c.email})
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
              Title
            </p>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
            Description
          </p>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 min-h-[120px] focus:ring-2 focus:ring-[#0e2c1c] outline-none"
          />
        </div>

        {/* TURNAROUND + STATUS */}
        <div className="grid md:grid-cols-2 gap-8">

          <div className="space-y-2">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
              Turnaround Time
            </p>
            <select
              name="turnaround"
              value={form.turnaround}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
            >
              <option>Rush 6 Hours</option>
              <option>12 Hours</option>
              <option>24 Hours</option>
            </select>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
              Status
            </p>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        {/* BUTTON */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full md:w-auto px-8 py-3 rounded-xl bg-[#0e2c1c] text-white font-semibold shadow-md hover:bg-[#123825] transition-all disabled:opacity-60"
          >
            {saving ? "Updating..." : "Update Order"}
          </button>
        </div>
      </form>
    </div>
  </div>
  </AdminGuard>
);
}