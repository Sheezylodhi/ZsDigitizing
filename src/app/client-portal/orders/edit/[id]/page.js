"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, FileEdit, UploadCloud, Paperclip, X, Loader2, AlertCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import NotificationIcon from "@/components/NotificationIcon";
import ClientGuard from "@/components/ClientGuard";

export default function ClientEditOrderPage() {
  const { id } = useParams();
  const router = useRouter();
  const fileInputRef = useRef(null);
  
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

  const [clientFiles, setClientFiles] = useState([]); 
  const [newFiles, setNewFiles] = useState([]);       
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

  /* ---------------- DRAG & DROP HANDLERS ---------------- */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      setNewFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files?.length) {
      setNewFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const removeNewFile = (indexToRemove) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setMessage("");

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("turnaround", form.turnaround);
    formData.append("orderType", form.orderType);
    formData.append("existingFiles", JSON.stringify(clientFiles));

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

      setOrderSerial(data.serialNumber);
      setShowPopup(true);
    } catch (err) {
      setMessage("Update failed ❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#0e2c1c] animate-spin" />
        <p className="text-sm font-semibold text-gray-500 tracking-wide">Loading order form...</p>
      </div>
    );
  }

  return (
    <ClientGuard>
      <div className="min-h-screen bg-gray-50/50 py-15 sm:py-14 px-4 sm:px-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl space-y-6 sm:space-y-8"
        >
          {/* PREMIUM RESPONSIVE HEADER */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
                <FileEdit size={20} />
              </div>
              <div className="truncate">
                <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">
                  Edit Order
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">
                  Update order details & upload files
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

          {/* SYSTEM ALERTS MESSAGE */}
          {message && (
            <div className={`p-4 rounded-xl text-center font-medium text-sm border flex items-center justify-center gap-2 ${
              message.toLowerCase().includes("success")
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-red-50 border-red-200 text-red-600"
            }`}>
              <AlertCircle size={16} />
              <span>{message}</span>
            </div>
          )}

          {/* MAIN CONFIGURATION FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xl flex flex-col gap-5 sm:gap-6"
          >
            {/* Order Type Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">Order Type</label>
              <div className="relative">
                <select
                  name="orderType"
                  value={form.orderType}
                  onChange={handleChange}
                  className="w-full h-12 sm:h-[56px] px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 focus:border-[#0e2c1c] transition text-gray-700 font-medium text-sm sm:text-base appearance-none bg-white"
                >
                  <option value="Digitizing PPO">Digitizing PPO</option>
                  <option value="Vector PPV">Vector PPV</option>
                  <option value="Patches PO">Patches PO</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Order Name Textarea Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">Order Name</label>
              <textarea
                name="title"
                value={form.title}
                onChange={handleChange}
                rows={form.title?.includes("\n") ? 2 : 1}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 focus:border-[#0e2c1c] transition text-gray-700 font-medium text-sm sm:text-base resize-y min-h-[54px] leading-relaxed"
                style={{ whiteSpace: "pre-wrap" }}
                required
              />
            </div>

            {/* Description Textarea Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">Description</label>
              <textarea
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 focus:border-[#0e2c1c] transition text-gray-700 font-medium text-sm sm:text-base leading-relaxed"
                placeholder="Describe your design specifics..."
              />
            </div>

            {/* Turnaround Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">Turnaround</label>
              <div className="relative">
                <select
                  name="turnaround"
                  value={form.turnaround}
                  onChange={handleChange}
                  className="w-full h-12 sm:h-[56px] px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 focus:border-[#0e2c1c] transition text-gray-700 font-medium text-sm sm:text-base appearance-none bg-white"
                >
                  <option value="Rush 6 Hours">Rush 6 Hours</option>
                  <option value="12 Hours">12 Hours</option>
                  <option value="24 Hours">24 Hours</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Existing Uploaded Files Array Section */}
            {clientFiles.length > 0 && (
              <div className="flex flex-col gap-2 pt-2">
                <label className="text-xs sm:text-sm font-bold text-gray-400 tracking-wider uppercase">Existing Production Files</label>
                <div className="grid grid-cols-1 gap-2 bg-gray-50/50 p-3 sm:p-4 rounded-xl border border-gray-100">
                  {clientFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white px-3 py-2.5 rounded-lg border border-gray-100 shadow-2xs group hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Paperclip size={14} className="text-gray-400 shrink-0" />
                        <a
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm text-blue-600 font-medium hover:underline truncate pr-4"
                        >
                          {file.fileName}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setClientFiles(clientFiles.filter((_, i) => i !== index))
                        }
                        className="text-xs font-bold text-red-500 hover:text-red-700 transition px-2 py-1 rounded hover:bg-red-50 shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advanced Responsive Drag & Drop Interactive Field */}
            <div className="flex flex-col gap-1.5 pt-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">Upload New Files</label>
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-10 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2
                  ${dragActive 
                    ? "border-green-600 bg-green-50/60 scale-[1.01]" 
                    : "border-gray-200 bg-gray-50/30 hover:bg-gray-50/80 hover:border-[#0e2c1c]/40"}`}
              >
                <div className={`p-3 rounded-full text-gray-400 mb-1 transition-colors ${dragActive ? "text-green-600 bg-green-50" : "bg-white border border-gray-100 shadow-2xs group-hover:text-gray-600"}`}>
                  <UploadCloud size={24} />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  <span className="text-[#0e2c1c] font-bold">Click to upload</span> or drag and drop production files
                </p>
                <p className="text-[10px] text-gray-400">Any high-res images or vectors allowed</p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Newly Selected Pending Upload Rows */}
                {newFiles.length > 0 && (
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="mt-4 w-full max-w-md text-left bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs space-y-2"
                  >
                    <p className="font-bold text-[10px] uppercase tracking-wider text-gray-400">Newly Selected Files:</p>
                    <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1">
                      {newFiles.map((f, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50/80 px-2.5 py-1.5 rounded-md border border-gray-100">
                          <span className="text-xs text-gray-600 font-medium truncate max-w-[80%]">• {f.name}</span>
                          <button
                            type="button"
                            onClick={() => removeNewFile(i)}
                            className="text-gray-400 hover:text-red-500 transition shrink-0 p-0.5 rounded-full hover:bg-gray-200"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Trigger Button Submit */}
            <button
              type="submit"
              disabled={saving}
              className={`w-full h-12 sm:h-[60px] rounded-xl font-bold text-sm sm:text-base transition shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer active:scale-[0.99]
                ${saving 
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                  : "bg-[#0e2c1c] text-white hover:bg-[#123825] transition-all"
                }`}
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Updating Order...</span>
                </>
              ) : (
                <span>Update Order</span>
              )}
            </button>
          </form>

          {/* HIGH-FIDELITY MODERN GLOW POPUP */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
              >
                <motion.div
                  initial={{ scale: 0.85, y: 30, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.85, y: 30, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-md text-center shadow-2xl border border-gray-50 overflow-hidden"
                >
                  {/* Neon Soft Background Glow */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-36 h-36 bg-green-500/10 blur-3xl rounded-full pointer-events-none"></div>

                  {/* Animated Tick Icon Container Layout */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, delay: 0.15 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100 shadow-sm"
                  >
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <motion.path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </svg>
                  </motion.div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] mb-2 px-1">
                    Order Updated Successfully 🎉
                  </h2>

                  <p className="text-gray-500 mb-5 text-xs sm:text-sm font-medium leading-relaxed">
                    Your updates have been processed. Reference credentials match the tag tracking serial below:
                  </p>

                  <div className="bg-gray-50 border border-gray-100 px-5 py-3 rounded-xl font-bold text-sm sm:text-base text-[#0e2c1c] mb-6 shadow-inner tracking-wider">
                    {orderSerial}
                  </div>

                  <button
                    onClick={() => {
                      setShowPopup(false);
                      router.push("/client-portal/orders");
                    }}
                    className="cursor-pointer w-full bg-[#0e2c1c] text-white py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-md hover:bg-[#133c27] transition-all duration-200"
                  >
                    Go to Orders
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </ClientGuard>
  );
}