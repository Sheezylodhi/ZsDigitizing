"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminGuard from "@/components/AdminGuard";
import { User, FileText, Image as ImageIcon, FileArchive, File, Download, Mail } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import { jwtDecode } from "jwt-decode";

export default function QuoteDetail() {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [error, setError] = useState(null);

  const handleDownload = async (fileUrl, originalName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = originalName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      window.open(fileUrl.replace("/upload/", "/upload/fl_attachment/"), "_blank");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setAdminId(decoded.userId);
    } catch {}
    
    if (id) {
      fetch(`/api/admin/quotes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setQuote(data))
        .catch(err => setError(err.message));
    }
  }, [id]);

  const getFileIcon = (fileName) => {
    if (!fileName) return <File size={18} className="text-gray-500" />;
    const ext = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext)) return <ImageIcon size={18} className="text-blue-500" />;
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext)) return <FileText size={18} className="text-red-500" />;
    if (['zip', 'rar', '7z'].includes(ext)) return <FileArchive size={18} className="text-amber-500" />;
    return <File size={18} className="text-gray-500" />;
  };

  if (error) return <p className="p-10 text-red-600">Error: {error}</p>;
  if (!quote) return <p className="p-10 text-gray-500">Loading...</p>;

  const Field = ({ label, value, big = false }) => (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
      <div className={`w-full p-4 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 text-sm font-medium ${big ? "h-32" : "h-12 flex items-center"}`}>
        {value || "N/A"}
      </div>
    </div>
  );

  return (
    <AdminGuard>
      <div className="min-h-screen py-15 px-4 sm:px-8 flex justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl space-y-8">
          
          {/* HEADER MATCHING ADD PORTFOLIO */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
                <Mail size={20} />
              </div>
              <div className="truncate">
                <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">Quote Details</h1>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">View client request & files</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0 border-t sm:border-t-0 pt-3 sm:pt-0">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <User size={14} className="text-gray-600" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700 truncate">Admin</span>
              </div>
              <div className="shrink-0">{adminId && <NotificationIcon userId={adminId} />}</div>
            </div>
          </header>

          {/* CONTENT CARDS */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <Field label="Full Name" value={quote.name} />
              <Field label="Email" value={quote.email} />
              <Field label="Phone" value={quote.phone} />
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <Field label="Company" value={quote.company} />
              <Field label="Website" value={quote.website} />
              <Field label="Deadline" value={quote.deadline} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <Field label="Type of Work" value={quote.type} />
            <Field label="Requirements" value={quote.message} big />
          </div>

          {/* FILES SECTION */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700 uppercase mb-4">Uploaded Files</h2>
            {!quote.fileNameArray?.length ? (
              <p className="text-gray-400 text-sm italic">No files attached.</p>
            ) : (
              <div className="grid gap-3">
                {quote.fileNameArray.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.originalName)}
                      <span className="text-sm font-semibold text-gray-700">{file.originalName}</span>
                    </div>
                    <button onClick={() => handleDownload(file.cloudinaryUrl, file.originalName)} className="flex items-center gap-2 px-4 py-2 bg-[#0e2c1c] text-white text-xs font-bold rounded-lg hover:bg-[#123825] transition">
                      <Download size={14} /> Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AdminGuard>
  );
}