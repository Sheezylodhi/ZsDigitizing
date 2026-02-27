"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { User } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
import { jwtDecode } from "jwt-decode";

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params?.id;

  const [adminId, setAdminId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Decode admin for notification
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setAdminId(decoded.userId);
    } catch {}
  }, []);

  // Fetch Client
  useEffect(() => {
    if (!clientId) return;

    const fetchClient = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/admin/clients/${clientId}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch client");
        const data = await res.json();
        setForm(data);
      } catch (err) {
        setMsg("Error fetching client ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);
  setMsg("");

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/admin/clients/${clientId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) throw new Error("Update failed");

    setMsg("Client updated successfully ✅");

    setTimeout(() => {
      router.push("/admin/clients");
    }, 800);

  } catch (err) {
    setMsg("Update failed ❌");
  } finally {
    setSaving(false);
  }
};

  if (loading) return <p className="p-8">Loading client...</p>;

  return (
    <AdminGuard>
      <div className="min-h-screen bg-white py-14 px-6 flex justify-center">
        <div className="w-full max-w-4xl space-y-6">

          {/* HEADER */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-[#0e2c1c]">
                Edit Client
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Update client details & contact information
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
            <div
              className={`px-5 py-3 rounded-xl text-sm font-medium border ${
                msg.includes("success")
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {msg}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">

              {/* Name */}
              <div className="space-y-2">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
                  Client Name
                </p>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
                  Company
                </p>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
                  Phone Number
                </p>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
                  Email Address
                </p>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0e2c1c] outline-none"
                />
              </div>
            </div>

            {/* BUTTON */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={saving}
                className="w-full md:w-auto px-8 py-3 rounded-xl bg-[#0e2c1c] text-white font-semibold shadow-md hover:bg-[#123825] transition-all disabled:opacity-60"
              >
                {saving ? "Updating..." : "Update Client"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}