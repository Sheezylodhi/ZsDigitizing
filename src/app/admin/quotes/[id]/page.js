"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminGuard from "@/components/AdminGuard";
import { User, FileText, Image as ImageIcon, FileArchive, File, Download } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import { jwtDecode } from "jwt-decode";

export default function QuoteDetail() {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [error, setError] = useState(null);
    const [downloadingFile, setDownloadingFile] = useState(null);

  // 🔹 Is function ko pehle wale function se replace karein
const handleDownload = async (fileUrl, originalName) => {
  try {
    
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = originalName; // ✅ Yeh browser ko force karega asli naam aur extension rakhne par
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  } catch (err) {
    console.error("Download failed:", err);
    // Fallback agar fetch block ho jaye cross-origin ki wajah se
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
  }, []);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");
    
    // Yahan route check karein jo aapki backend dynamic ID file se match kare
    fetch(`/api/admin/quotes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to fetch quote details");
        }
        return res.json();
      })
      .then(data => setQuote(data))
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, [id]);

  // Extension ke mutabik Icon select karne ka function
  const getFileIcon = (fileName) => {
    if (!fileName) return <File size={18} className="text-gray-500" />;
    const ext = fileName.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) {
      return <ImageIcon size={18} className="text-blue-500" />;
    }
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext)) {
      return <FileText size={18} className="text-red-500" />;
    }
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
      return <FileArchive size={18} className="text-amber-500" />;
    }
    return <File size={18} className="text-gray-500" />;
  };

  // Safe helper link generation original filename ke liye
  const getDownloadLink = (file) => {
    if (!file.cloudinaryUrl) return "#";
    // fl_attachment ke sath original name force karne ke liye query param ya transformation use hota hai
    const baseCleanUrl = file.cloudinaryUrl.replace("/upload/", "/upload/fl_attachment/");
    return baseCleanUrl;
  };

  if (error) return <p className="p-10 text-red-600 font-semibold">Error: {error}</p>;
  if (!quote) return <p className="p-10 text-gray-500 animate-pulse">Loading quote details...</p>;

  const Field = ({ label, value, big = false }) => (
    <div className="space-y-2">
      <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">{label}</p>
      <div
        style={{ cursor: "not-allowed" }}
        className={`w-full flex items-start px-5 py-4 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-[15px] font-medium select-none opacity-70 ${big ? "min-h-[90px]" : "min-h-[60px]"}`}
      >
        {value || "-"}
      </div>
    </div>
  );

  return (
    <AdminGuard>
      <div className="min-h-screen bg-white py-14 px-6 flex justify-center">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl space-y-6">

          {/* HEADER */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-[#0e2c1c]">Quote Details</h1>
              <p className="text-gray-500 text-sm mt-2">View client quote request & download files</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-5 py-3 border border-gray-200 bg-white rounded-xl shadow-sm">
                <User size={18} className="text-gray-600" />
                <span className="font-semibold text-gray-700">Admin</span>
              </div>
              {adminId && <NotificationIcon userId={adminId} />}
            </div>
          </div>

          {/* CLIENT INFO */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-5">
              <Field label="Full Name" value={quote.name} />
              <Field label="Email" value={quote.email} />
              <Field label="Phone" value={quote.phone} />
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-5">
              <Field label="Company" value={quote.company || "N/A"} />
              <Field label="Website" value={quote.website || "N/A"} />
              <Field label="Deadline" value={quote.deadline || "N/A"} />
            </div>
          </div>

          {/* PROJECT DETAILS */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <Field label="Type of Work" value={quote.type} />
            <Field label="Message / Requirements" value={quote.message || "No description"} big />
          </div>

          {/* FILES */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Uploaded Files</h2>

            {!quote.fileNameArray || quote.fileNameArray.length === 0 ? (
              <p className="text-gray-400 text-sm">No files uploaded</p>
            ) : (
              <div className="flex flex-col gap-2">
                {quote.fileNameArray.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Dynamic Icon */}
                      <div className="shrink-0">
                        {getFileIcon(file.originalName)}
                      </div>
                      <span className="text-sm text-gray-700 font-medium truncate pr-4">
                        {file.originalName}
                      </span>
                    </div>

                    {/* Purane <a> tag ko is <button> se replace karein */}
<button
  onClick={() => handleDownload(file.cloudinaryUrl, file.originalName)}
  className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0e2c1c] text-white text-xs font-semibold shadow-md hover:bg-[#123825] transition-all cursor-pointer"
>
  <Download size={13} />
  Download
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