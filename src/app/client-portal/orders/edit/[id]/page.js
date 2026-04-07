"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import NotificationIcon from "@/components/NotificationIcon";
import ClientGuard from "@/components/ClientGuard";

export default function ClientEditOrderPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
const [orderSerial, setOrderSerial] = useState("");
  const [client, setClient] = useState(null);
  const [form, setForm] = useState({
    serialNumber: "",
    title: "",
    description: "",
    orderType: "",
    turnaround: "24 Hours",
  });

  const [clientFiles, setClientFiles] = useState([]); // Existing files
  const [newFiles, setNewFiles] = useState([]);       // New files to upload
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ---------------- GET CLIENT ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/client/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => data?._id && setClient(data));
  }, []);

  /* ---------------- FETCH ORDER ---------------- */
  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`/api/client-orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        let data;

try {
  const text = await res.text();
  data = text ? JSON.parse(text) : [];
} catch {
  data = [];
}
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

  /* ---------------- DRAG & DROP ---------------- */
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      setNewFiles(Array.from(e.dataTransfer.files));
    }
  };

  /* ---------------- SUBMIT ---------------- */
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

    // Add new files
    newFiles.forEach((file) => formData.append("clientFile", file));

    try {
      const res = await fetch(`/api/client-orders/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

     let data;

try {
  const text = await res.text();
  data = text ? JSON.parse(text) : [];
} catch {
  data = [];
}
      if (!res.ok) throw new Error(data.message);

setForm(data);
setClientFiles(data.clientFile || []);
setNewFiles([]);

// ✅ Popup trigger
setOrderSerial(data.serialNumber);
setShowPopup(true);
    } catch (err) {
      setMessage("Update failed ❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-gray-400">Loading...</div>;

  return (
    <ClientGuard>
      <div className="min-h-screen bg-white py-14 px-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl space-y-16"
        >
          {/* HEADER */}
          <div className="bg-white pt-10 mt-10 border border-gray-200 shadow-lg rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between mb-8">
            <div>
              <h1 className="text-lg sm:text-3xl font-bold text-[#0e2c1c] ">
                Edit Order
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm">
                Update order details & upload files
              </p>
            </div>
            {client && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-2 py-1.5 border border-gray-200 bg-gray-50 rounded-lg">
                  <User size={14} className="text-gray-500" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
                <NotificationIcon userId={client._id} />
              </div>
            )}
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="text-center font-medium text-green-600">{message}</div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg flex flex-col gap-6"
          >
            {/* Order Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Order Type</label>
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
              <label className="text-sm font-semibold">Description</label>
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
              <label className="text-sm font-semibold">Turnaround</label>
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
              <label className="text-sm font-semibold">Upload New Files</label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition
                  ${dragActive ? "border-green-700 bg-green-50" : "border-gray-300 bg-white"}`}
              >
                <p className="text-gray-600">Drag & Drop files here or click to select</p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setNewFiles(Array.from(e.target.files))}
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
  className={`cursor-pointer w-full h-[70px] rounded-xl font-semibold text-lg transition shadow-lg flex items-center justify-center gap-2
    ${saving 
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-[#0e2c1c] text-white hover:bg-[#123825]"
    }`}
>
  {saving && (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  )}
  {saving ? "Updating..." : "Update Order"}
</button>
          </form>
          <AnimatePresence>
  {showPopup && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    >
      <motion.div
        initial={{ scale: 0.6, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.6, y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md text-center shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-white/20"
      >

        {/* Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-400/30 blur-3xl rounded-full"></div>

        {/* Tick */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
        >
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <motion.path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </svg>
        </motion.div>

        <h2 className="text-2xl font-bold text-[#0e2c1c] mb-2">
          Order Updated Successfully 🎉
        </h2>

        <p className="text-gray-500 mb-4 text-sm">
          Your order has been updated successfully.
        </p>

        <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-5 py-3 rounded-xl font-semibold text-[#0e2c1c] mb-6 shadow-inner">
          {orderSerial}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowPopup(false);
            router.push("/client-portal/orders");
          }}
          className="cursor-pointer w-full bg-gradient-to-r from-[#0e2c1c] to-[#123825] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition"
        >
          Go to Orders
        </motion.button>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
        </motion.div>
      </div>
    </ClientGuard>
  );
}