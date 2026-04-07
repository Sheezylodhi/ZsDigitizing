"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";



export default function SubmitOrderPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false); // for button
const [showPopup, setShowPopup] = useState(false); // show success popup
const [submittedSerial, setSubmittedSerial] = useState(""); // order serial
  const [order, setOrder] = useState(null);
  const [note, setNote] = useState("");
   const [adminId, setAdminId] = useState(null);
  const [files, setFiles] = useState([]); // New files
  const [existingFiles, setExistingFiles] = useState([]); // Existing uploaded files
  const [msg, setMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Edit mode

  // FETCH ORDER
  useEffect(() => {
    if (!id) return;

    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setNote(data.note || "");
        setExistingFiles(data.files || []);
      });
  }, [id]);

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

  // HANDLE NEW FILE SELECT
  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
  };

  // DRAG DROP
  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...dropped]);
  };

  // REMOVE NEW FILE
  const removeNewFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // CLICK EDIT
  const handleEdit = () => {
    setIsEditing(true);
    setFiles([]);
    setExistingFiles([]);
  };

  // SUBMIT / UPDATE
  const handleSubmit = async () => {
  if (files.length === 0 && note.trim() === "" && existingFiles.length === 0) {
    setMsg("Upload at least one file or add a note");
    return;
  }

  setLoading(true);
  setMsg("");

  const formData = new FormData();
  files.forEach(file => formData.append("files", file));
  formData.append("note", note);

  try {
    const res = await fetch(`/api/orders/${id}/submit`, {
      method: "PATCH",
      body: formData,
    });

    if (res.ok) {
      const updated = await res.json();
      setMsg("Order Updated ✅");
      setFiles([]);
      setNote(updated.note || "");
      setExistingFiles(updated.files || []);
      setIsEditing(false);
      setSubmittedSerial(updated.serialNumber || order.serialNumber); // ✅ save serial
      setShowPopup(true); // ✅ show popup
    } else {
      setMsg("Update failed ❌");
    }
  } catch (err) {
    setMsg("Update failed ❌");
  } finally {
    setLoading(false);
  }
};

  if (!order) return <p className="p-10">Loading...</p>;

 return (
      <AdminGuard>
  
  <div className="min-h-screen bg-white py-14 px-6 flex justify-center">
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl space-y-6"
    >

      {/* HEADER (Same as Detail Page) */}
   <div className="bg-white pt-10 mt-10  border border-gray-200 shadow-lg rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between mb-8">
          <div>
              <h1 className="text-lg sm:text-3xl font-bold text-[#0e2c1c] ">Work Submission</h1>
            <p className="text-gray-500 text-xs sm:text-sm">
      Manage all client orders Work Submit
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

      {/* MESSAGE */}
      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl text-sm font-medium">
          {msg}
        </div>
      )}

      {/* ORDER INFO GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-5">
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
              Serial Number
            </p>
            <div className="mt-2 px-5 py-4 rounded-lg bg-gray-100 border border-gray-200 text-gray-500">
              {order.serialNumber}
            </div>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
              Order Type
            </p>
            <div className="mt-2 px-5 py-4 rounded-lg bg-gray-100 border border-gray-200 text-gray-500">
              {order.orderType}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-5">
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
              Title
            </p>
            <div className="mt-2 px-5 py-4 rounded-lg bg-gray-100 border border-gray-200 text-gray-500">
              {order.title}
            </div>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
              Client
            </p>
            <div className="mt-2 px-5 py-4 rounded-lg bg-gray-100 border border-gray-200 text-gray-500">
              {order.clientId?.name} ({order.clientId?.email})
            </div>
          </div>
        </div>
      </div>

      {/* NOTE SECTION */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <p className="text-sm font-semibold text-gray-700">
          Submission Note
        </p>

        <textarea
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0e2c1c]"
          placeholder="Write submission note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          readOnly={!isEditing && existingFiles.length > 0}
        />
      </div>

      {/* EXISTING FILES */}
      {!isEditing && existingFiles.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">
            Uploaded Files
          </h2>

          <div className="space-y-2">
            {existingFiles.map((f, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg"
              >
                <a
  href={f.fileUrl}
  target="_blank"
  download
  className="text-sm text-blue-600 underline truncate pr-4"
>
  {f.fileName}
</a>
              </div>
            ))}
          </div>

          <button
            className="text-blue-600 hover:underline text-sm"
            onClick={handleEdit}
          >
            Edit Submission
          </button>
        </div>
      )}

      {/* FILE UPLOAD SECTION */}
      {(isEditing || existingFiles.length === 0) && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-5">
          <h2 className="text-sm font-semibold text-gray-700">
            Upload Files
          </h2>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 p-10 rounded-xl text-center bg-gray-50"
          >
            <p className="text-gray-500">
              Drag & Drop files here or select below
            </p>

            <input
              type="file"
              multiple
              onChange={handleFiles}
              className="mt-4"
            />
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg"
                >
                  <span className="text-sm text-gray-600">
                    {f.name}
                  </span>
                  <button
                    className="text-red-600 text-sm"
                    onClick={() => removeNewFile(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

         <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  onClick={handleSubmit}
  disabled={loading}
  className={`cursor-pointer w-full md:w-auto px-6 py-3 rounded-xl font-semibold shadow-md transition-all flex justify-center items-center gap-2
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0e2c1c] hover:bg-[#123825] text-white"}`}
>
  {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
  {loading ? "Updating..." : "Update Submission"}
</motion.button>
        </div>
      )}
    </motion.div>
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
          Submission Successful 
        </h2>

        <p className="text-gray-500 mb-4 text-sm">
          Order Serial Number:
        </p>

        <div className="bg-gray-100 px-4 py-2 rounded-lg font-semibold text-[#0e2c1c] mb-6">
          {submittedSerial}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPopup(false)}
          className="cursor-pointer w-full bg-gradient-to-r from-green-700 to-green-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition"
        >
          OK
        </motion.button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  </div>
      </AdminGuard>
  
);
}
