"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import NotificationIcon from "@/components/NotificationIcon";
import ClientGuard from "@/components/ClientGuard";

export default function ClientEditOrderPage() {
  const { id } = useParams();
  const router = useRouter();

  // ✅ OLD LOGIC STATE (same as your previous working one)
  const [client, setClient] = useState(null);
  const [form, setForm] = useState({
    serialNumber: "",
    title: "",
    description: "",
    orderType: "",
    turnaround: "24 Hours",
  });

  const [clientFiles, setClientFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------------- GET CLIENT ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/client/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?._id) setClient(data);
      });
  }, []);

  /* ---------------- FETCH ORDER (OLD LOGIC) ---------------- */
  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`/api/client-orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setForm(data);
        setClientFiles(data.clientFile || []);
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ---------------- DRAG DROP ---------------- */
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      setNewFiles(Array.from(e.dataTransfer.files));
    }
  };

  /* ---------------- SUBMIT (OLD LOGIC) ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("turnaround", form.turnaround);
    formData.append("orderType", form.orderType);

    formData.append("existingFiles", JSON.stringify(clientFiles));

  // 🔥 New files
  newFiles.forEach((file) =>
    formData.append("clientFile", file)
  );

    try {
      const res = await fetch(`/api/client-orders/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setForm(data);
      setClientFiles(data.clientFile || []);
      setNewFiles([]);

      setMessage("Order Updated Successfully ✅");

      setTimeout(() => {
        router.push("/client-portal/orders");
      }, 1200);
    } catch (err) {
      setMessage("Update failed ❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="p-10 text-gray-400">Loading...</div>;

  return (
    <ClientGuard>
      <div className="min-h-screen bg-[#f8fafc] py-14 px-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl space-y-16"
        >

          {/* ---------- HEADER SAME AS CREATE ---------- */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-[#0e2c1c]">
                Edit Order
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Update order details & upload files
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Serial:{" "}
                <span className="font-mono">
                  {form.serialNumber}
                </span>
              </p>
            </div>

            {client && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-5 py-3 border border-gray-200 bg-white rounded-xl shadow-sm">
                  <User size={18} className="text-gray-600" />
                  <span className="font-semibold text-gray-700">
                    {client.name}
                  </span>
                </div>
                <NotificationIcon userId={client._id} />
              </div>
            )}
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="text-center font-medium text-green-600">
              {message}
            </div>
          )}

          {/* ---------- FORM SAME AS CREATE ---------- */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg flex flex-col gap-6"
          >

            {/* Order Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Order Type
              </label>
              <select
                name="orderType"
                value={form.orderType}
                onChange={handleChange}
                className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
              >
                <option value="Digitizing PPO">Digitizing PPO</option>
                <option value="Vector PPV">Vector PPV</option>
                <option value="Patches PO">Patches PO</option>
              </select>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition resize-none"
              />
            </div>

            {/* Turnaround */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Turnaround
              </label>
              <select
                name="turnaround"
                value={form.turnaround}
                onChange={handleChange}
                className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
              >
                <option>Rush 6 Hours</option>
                <option>12 Hours</option>
                <option>24 Hours</option>
              </select>
            </div>

            {/* Existing Files */}
           {/* Existing Files */}
{clientFiles.length > 0 && (
  <div className="flex flex-col gap-3">
    <label className="text-sm font-semibold">Existing Files</label>

    {clientFiles.map((file, index) => (
      <div
        key={index}
        className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-xl"
      >
        <a
          href={file.fileUrl}
          target="_blank"
          className="text-sm text-blue-600 underline"
        >
          {file.fileName}
        </a>

        <button
          type="button"
          onClick={() =>
            setClientFiles(clientFiles.filter((_, i) => i !== index))
          }
          className="text-red-600 text-sm font-semibold"
        >
          Remove
        </button>
      </div>
    ))}
  </div>
)}

            {/* Drag & Drop */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Upload New Files
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition
                ${
                  dragActive
                    ? "border-green-700 bg-green-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <p className="text-gray-600">
                  Drag & Drop files here or click to select
                </p>

                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setNewFiles(Array.from(e.target.files))
                  }
                  className="mt-4"
                />

                {newFiles.length > 0 && (
                  <div className="mt-4 text-gray-700 text-sm">
                    {newFiles.map((f, i) => (
                      <div key={i}>{f.name}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#0e2c1c] text-white h-[70px] rounded-xl font-semibold text-lg hover:bg-[#123825] transition shadow-lg"
            >
              {saving ? "Updating..." : "Update Order"}
            </button>

          </form>
        </motion.div>
      </div>
    </ClientGuard>
  );
}