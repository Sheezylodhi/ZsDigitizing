"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminGuard from "@/components/AdminGuard";
import { User } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import {jwtDecode} from "jwt-decode";

export default function QuoteDetail() {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [adminId, setAdminId] = useState(null);

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
    fetch(`/api/quote/${id}`)
      .then(res => res.json())
      .then(data => setQuote(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!quote) return <p className="p-10">Loading quote...</p>;

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
            {!quote.fileName ? (
              <p className="text-gray-400 text-sm">No files uploaded</p>
            ) : (
              <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg">
                <span className="text-sm text-gray-600 truncate pr-4">{quote.fileName}</span>
                <a
                  href={quote.fileUrl || `/uploads/${quote.fileName}`} // ✅ fallback
                  download
                  target="_blank"
                  className="shrink-0 px-5 py-2.5 rounded-lg bg-[#0e2c1c] text-white text-xs font-semibold shadow-md hover:bg-[#123825] transition-all"
                >
                  Download
                </a>
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AdminGuard>
  );
}