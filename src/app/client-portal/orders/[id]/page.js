"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NotificationIcon from "@/components/NotificationIcon";
import { User } from "lucide-react";
import ClientGuard from "@/components/ClientGuard";

export default function ClientOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);

  // ---------------- GET USER ----------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/client/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data?._id) setClient(data);
        else console.error("Client fetch failed:", data);
      });
  }, []);

  // ---------------- FETCH ORDER ----------------
  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        const data = await res.json();

        if (!data || data.message) setOrder(null);
        else {
          setOrder({
  ...data,
  files: data.files?.map((f) => ({
    fileName: f.fileName,
    fileUrl: f.fileUrl, // 👈 Cloudinary URL
  })) || [],
});
             
         
        }
      } catch {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading)
    return <div className="p-10 text-gray-400">Loading...</div>;

  if (!order)
    return <div className="p-10 text-red-500">Order not found</div>;

  // ---------- READONLY FIELD ----------
  const Field = ({ label, value, big = false }) => (
    <div className="space-y-2 w-full">
      <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
        {label}
      </p>

      <div
        style={{ cursor: "not-allowed" }}
        className={`w-full flex items-start px-5 py-4 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 text-[15px] font-medium select-none opacity-70 ${
          big ? "min-h-[90px]" : "min-h-[60px]"
        }`}
      >
        {value || "-"}
      </div>
    </div>
  );

  // ---------- STATUS STYLE ----------
  const statusStyle = (status) => {
    if (status === "Completed")
      return "bg-[#0e2c1c] text-white border border-[#0e2c1c]";
    if (status === "In Progress")
      return "bg-blue-50 text-blue-600 border border-blue-200";
    return "bg-gray-100 text-gray-700 border border-gray-200";
  };

  return (
    <ClientGuard>
      <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl space-y-8"
        >
          {/* ---------- HEADER ---------- */}
         <div className="bg-white pt-10 mt-10  border border-gray-200 shadow-lg rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between mb-8">
         
           {/* LEFT — HEADING */}
           <div>
             <h1 className="text-lg sm:text-3xl font-bold text-[#0e2c1c] ">
               Detail Page
             </h1>
             <p className="text-gray-500 text-xs sm:text-sm">
               Here are the details of your order
             </p>
           </div>
         
           {/* RIGHT — USER + NOTIFICATION */}
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

          {/* ---------- INFO GRID ---------- */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 space-y-4">
              <Field label="Serial Number" value={order.serialNumber} />
              <Field label="Order Type" value={order.orderType} />
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 space-y-4">
              <div className="space-y-2">
                <p className="text-[11px] text-gray-400 uppercase tracking-wider">Status</p>
                <span
                  className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-semibold rounded-md ${statusStyle(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
              <Field label="Title" value={order.title} />
            </div>
          </div>

          {/* ---------- DESCRIPTION ---------- */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200">
            <Field label="Description" value={order.description || "No description"} big />
          </div>

          {/* ---------- NOTE ---------- */}
          {order.note && (
            <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200">
              <Field label="Submission Note" value={order.note} big />
            </div>
          )}

          {/* ---------- FILES ---------- */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 space-y-3">
            <h2 className="text-sm font-semibold text-gray-700">Submitted Files By Admin</h2>

            {order.files.length > 0 ? (
              <div className="space-y-2">
                {order.files.map((file, i) => (
                  <div
                    key={i}
                    style={{ cursor: "not-allowed" }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg gap-2 sm:gap-0 opacity-80"
                  >
                    <span className="text-sm text-gray-500 truncate sm:truncate pr-0 sm:pr-4 select-none">{file.fileName}</span>
            <a
  href={file.fileUrl ? file.fileUrl.replace("/upload/", "/upload/fl_attachment/") : "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="shrink-0 px-5 py-2.5 rounded-lg bg-[#0e2c1c] text-white text-xs font-semibold shadow-md hover:bg-[#123825] transition-all"
>
  Download
</a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No files uploaded yet</p>
            )}
          </div>
        </motion.div>
      </div>
    </ClientGuard>
  );
}