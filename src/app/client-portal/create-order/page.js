"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, PlusCircle, UploadCloud, File, CheckCircle2 } from "lucide-react";
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
        setMessage("");
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
      <div className="min-h-screen bg-gray-50/50 py-15 sm:py-14 px-4 sm:px-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl space-y-6 sm:space-y-8"
        >

          {/* UPGRADED RESPONSIVE HEADER */}
          <header className=" flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
                <PlusCircle size={20} />
              </div>
              <div className="truncate">
                <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">
                  Create Order
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">
                  Fill out order details & upload your files
                </p>
              </div>
            </div>

            {client && (
              <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 max-w-[180px]">
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <User size={14} className="text-green-700" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 truncate">
                    {client.name}
                  </span>
                </div>
                <div className="shrink-0">
                  <NotificationIcon userId={client._id} />
                </div>
              </div>
            )}
          </header>

          {/* ALERT MESSAGES */}
          {message && (
            <div className={`p-4 rounded-xl text-center font-medium text-sm border ${
              message.includes("Error") || message.includes("Server")
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-green-50 border-green-200 text-green-600"
            }`}>
              {message}
            </div>
          )}

          {/* HIGH-GRADE FORM */}
          <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xl flex flex-col gap-5 sm:gap-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {/* ORDER TYPE */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">Order Type</label>
                <select
                  className="w-full h-12 sm:h-[60px] px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 focus:border-[#0e2c1c] transition bg-white text-sm font-medium text-gray-800"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <option value="Digitizing PPO">Digitizing PPO</option>
                  <option value="Vector PPV">Vector PPV</option>
                  <option value="Patches PO">Patches PO</option>
                </select>
              </div>

              {/* TURNAROUND */}
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">Turnaround</label>
                <select
                  className="w-full h-12 sm:h-[60px] px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 focus:border-[#0e2c1c] transition bg-white text-sm font-medium text-gray-800"
                  value={turnaround}
                  onChange={(e) => setTurnaround(e.target.value)}
                >
                  <option>Rush 4 Hours</option>
                  <option>6 Hours</option>
                  <option>12 Hours</option>
                  <option>24 Hours</option>
                </select>
              </div>
            </div>

            {/* TITLE / ORDER NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">Order Name</label>
              <input
                type="text"
                placeholder="Enter design name or style code..."
                className="w-full h-12 sm:h-[60px] px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 focus:border-[#0e2c1c] transition text-sm font-normal text-gray-800"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">Description / Instructions</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 focus:border-[#0e2c1c] transition text-sm font-normal text-gray-800 resize-y"
                rows={4}
                placeholder="Describe your design instructions (e.g. dimensions, color count, fabric type...)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* FILE UPLOAD ZONE */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">Upload Artwork / Files</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-6 sm:p-10 text-center transition min-h-[180px] flex flex-col items-center justify-center gap-3
                  ${dragActive ? "border-green-600 bg-green-50/50" : "border-gray-200 bg-gray-50/30 hover:bg-gray-50 transition"}`}
              >
                <div className="p-3 bg-white border border-gray-100 rounded-full shadow-sm text-gray-400">
                  <UploadCloud size={28} />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-700 text-sm font-semibold">Drag & Drop files here</p>
                  <p className="text-gray-400 text-xs">or click to browse from device</p>
                </div>
                
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>

              {/* FILE LIST VIEW */}
              {files.length > 0 && (
                <div className="mt-3 flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {files.map((f, i) => (
                    <div key={i} className="flex justify-between items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 min-w-0">
                        <File size={16} className="text-[#0e2c1c] shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{f.name}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeFile(i)} 
                        className="text-gray-400 hover:text-red-500 transition shrink-0 p-1 rounded-md hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 sm:h-[60px] rounded-xl font-bold text-sm sm:text-base transition shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer
                ${isLoading 
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                  : "bg-[#0e2c1c] text-white hover:bg-[#123825] active:scale-[0.99] transition-all"
                }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Order...</span>
                </>
              ) : (
                <span>Create Order</span>
              )}
            </button>
          </form>

          {/* PERFECTLY CENTERED POPUP */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.9, y: 20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-md text-center shadow-2xl border border-gray-100 overflow-hidden"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center text-green-600 shadow-inner">
                    <CheckCircle2 size={36} className="sm:size-11" />
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] mb-2">Order Submitted!</h2>
                  <p className="text-gray-500 mb-5 text-xs sm:text-sm leading-relaxed">
                    Your order setup is complete. Use the tracking ID below inside your portal panel to monitor updates.
                  </p>
                  
                  <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl font-bold text-base sm:text-lg text-[#0e2c1c] tracking-wide mb-6 select-all">
                    {orderSerial}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setShowPopup(false); window.location.href = "/client-portal/orders"; }}
                    className="w-full bg-[#0e2c1c] text-white py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:bg-[#123825] transition cursor-pointer"
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