"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { PlusCircle, UploadCloud, CheckCircle2, User } from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import NotificationIcon from "@/components/NotificationIcon";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AddPortfolioPage() {
  const [form, setForm] = useState({ title: "", category: "Embriodery Digitizing", desc: "", file: null });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Token Decode for Header
    const token = localStorage.getItem("token");
    if (token) {
      try { const decoded = jwtDecode(token); setAdminId(decoded.userId); } catch {}
    }
  }, []);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setForm({ ...form, file });
    setPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': [] }, 
    multiple: false 
  });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("desc", form.desc);

    try {
      await fetch("/api/admin/portfolio", { method: "POST", body: formData });
      setShowPopup(true);
    } catch (err) {
      alert("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen  py-15 px-4 sm:px-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl space-y-8"
        >
          {/* HEADER SECTION */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
  {/* Left Side: Title & Description */}
  <div className="flex items-center gap-3 min-w-0">
    <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
      <PlusCircle size={20} />
    </div>
    <div className="truncate">
      <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">Add Portfolio</h1>
      <p className="text-gray-500 text-xs sm:text-sm font-medium">Create a new work item</p>
    </div>
  </div>

  {/* Right Side: Admin Profile & Notifications */}
  <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0 border-t sm:border-t-0 pt-3 sm:pt-0">
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
        <User size={14} className="text-gray-600" />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-gray-700 truncate">Admin</span>
    </div>
    
    <div className="shrink-0">
      {adminId && <NotificationIcon userId={adminId} />}
    </div>
  </div>
</header>

          {/* FORM */}
          <form onSubmit={submit} className="bg-white p-5 sm:p-8 rounded-3xl border border-gray-100 shadow-xl flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 uppercase">Portfolio Image</label>
              <div 
                {...getRootProps()} 
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3 
                ${isDragActive ? "border-green-600 bg-green-50/50" : "border-gray-200 bg-gray-50/30 hover:bg-gray-50"}`}
              >
                <input {...getInputProps()} />
                {preview ? (
                  <img src={preview} className="h-32 w-32 object-cover rounded-xl" alt="Preview" />
                ) : (
                  <>
                    <UploadCloud size={32} className="text-gray-400" />
                    <p className="text-sm text-gray-500">Drag & drop or click to upload image</p>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-bold text-gray-700 uppercase">Title</label>
                <input required placeholder="Enter title..." className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20" onChange={(e) => setForm({...form, title: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-bold text-gray-700 uppercase">Category</label>
                <select className="w-full h-12 px-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 bg-white" onChange={(e) => setForm({...form, category: e.target.value})}>
                  <option>Embriodery Digitizing</option>
                  <option>Vector</option>
                  <option>Patches</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 uppercase">Description</label>
              <textarea required placeholder="Write a short description..." className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 h-32" onChange={(e) => setForm({...form, desc: e.target.value})} />
            </div>

            <button disabled={loading} className="w-full h-14 bg-[#0e2c1c] text-white rounded-xl font-bold hover:bg-[#123825] transition shadow-lg active:scale-[0.99]">
              {loading ? "Saving..." : "Save Portfolio"}
            </button>
          </form>
        </motion.div>

        {/* SUCCESS POPUP */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <CheckCircle2 size={36} />
                </div>
                <h2 className="text-xl font-bold text-[#0e2c1c] mb-2">Portfolio Added!</h2>
                <p className="text-gray-500 mb-6 text-sm">Your work item has been successfully added to the system.</p>
                <button 
                  onClick={() => router.push("/admin/manage-portfolio")}
                  className="w-full bg-[#0e2c1c] text-white py-3 rounded-xl font-bold hover:bg-[#123825] transition"
                >
                  Manage Portfolio
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminGuard>
  );
}