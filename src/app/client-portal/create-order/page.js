"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, X } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import ClientGuard from "@/components/ClientGuard";

export default function ClientCreateOrderPage() {
  const [client, setClient] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [turnaround, setTurnaround] = useState("24 Hours");
  const [orderType, setOrderType] = useState("Digitizing PPO");
  const [status] = useState("Pending");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orderSerial, setOrderSerial] = useState("");

  /* ---------------- GET CLIENT ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/client/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data?._id) setClient(data);
      });
  }, []);

  /* ---------------- DRAG & DROP ---------------- */
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  /* ---------------- FILE SELECT ---------------- */
  const handleFileSelect = (e) => {
    if (e.target.files?.length) {
      setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  /* ---------------- REMOVE FILE ---------------- */
  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !orderType) {
      setMessage("Title & Order Type required");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("turnaround", turnaround);
    formData.append("orderType", orderType);
    formData.append("status", status);
    files.forEach(file => formData.append("files", file));

    try {
      const res = await fetch("/api/client/orders", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setOrderSerial(data.serialNumber);
        setShowPopup(true);
        setTitle("");
        setDescription("");
        setFiles([]);
      } else {
        setMessage(data.message || "Error creating order");
      }
    } catch (err) {
      setMessage("Server error");
    }

    setIsLoading(false);
  };

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
              <h1 className="text-lg sm:text-3xl font-bold text-[#0e2c1c]">
                Create Order
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm">
                Fill out order details & upload your files
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
          {message && <div className="text-green-600 font-medium text-center">{message}</div>}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg flex flex-col gap-6">

            {/* ORDER TYPE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Order Type</label>
              <select
                className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
              >
                <option value="Digitizing PPO">Digitizing PPO</option>
                <option value="Vector PPV">Vector PPV</option>
                <option value="Patches PO">Patches PO</option>
              </select>
            </div>

            {/* TITLE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Order Name</label>
              <input
                className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
                placeholder="Order Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Description</label>
              <textarea
                className="w-full px-5 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition resize-none"
                rows={5}
                placeholder="Describe your design instructions"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* TURNAROUND */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Turnaround</label>
              <select
                className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
                value={turnaround}
                onChange={(e) => setTurnaround(e.target.value)}
              >
                <option>Rush 4 Hours</option>
                <option>6 Hours</option>
                <option>12 Hours</option>
                <option>24 Hours</option>
              </select>
            </div>

            {/* FILE UPLOAD */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Upload Files</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition
                  ${dragActive ? "border-green-700 bg-green-50" : "border-gray-300 bg-white"}`}
              >
                <p className="text-gray-600">Drag & Drop files here or click to select</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="mt-4"
                />

                {/* FILE LIST */}
                {files.length > 0 && (
                  <div className="mt-4 text-gray-700 text-sm flex flex-col gap-1">
                    {files.map((f, i) => (
                      <div key={i} className="flex justify-between items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
                        <span>{f.name}</span>
                        <button type="button" onClick={() => removeFile(i)} className="text-red-500 hover:text-red-700">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className={`cursor-pointer w-full h-[70px] rounded-xl font-semibold text-lg transition shadow-lg flex items-center justify-center gap-2
                ${isLoading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-[#0e2c1c] text-white hover:bg-[#123825]"
                }`}
            >
              {isLoading && <div className=" w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {isLoading ? "Creating..." : "Create Order"}
            </button>
          </form>

          {/* POPUP */}
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
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-400/30 blur-3xl rounded-full"></div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, delay: 0.2 }}
                    className="relative w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
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
                  <h2 className="text-2xl font-bold text-[#0e2c1c] mb-2">Order Created Successfully</h2>
                  <p className="text-gray-500 mb-4 text-sm">
                    Your order has been submitted successfully. You can track it using your Order ID below.
                  </p>
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-5 py-3 rounded-xl font-semibold text-[#0e2c1c] mb-6 shadow-inner">
                    {orderSerial}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setShowPopup(false); window.location.href = "/client-portal/orders"; }}
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