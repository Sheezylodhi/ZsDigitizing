"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, FileText, DownloadCloud, FileCheck2, Loader2 } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import ClientGuard from "@/components/ClientGuard";

export default function ClientOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [downloadingFile, setDownloadingFile] = useState(null);

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
              fileUrl: f.fileUrl,
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

  // ---------------- FORCE DOWNLOAD LOGIC ----------------
  const handleDownload = async (fileUrl, fileName) => {
    try {
      setDownloadingFile(fileName);
      
      let secureUrl = fileUrl;
      if (secureUrl && secureUrl.includes("cloudinary.com")) {
        secureUrl = secureUrl.replace("http://", "https://");
        if (!secureUrl.includes("fl_attachment")) {
          secureUrl = secureUrl.replace("/upload/", "/upload/fl_attachment/");
        }
      }

      const response = await fetch(secureUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download fallback triggered", error);
      window.open(fileUrl, "_blank");
    } finally {
      setDownloadingFile(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#0e2c1c] animate-spin" />
        <p className="text-sm font-semibold text-gray-500 tracking-wide">Loading order files...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm text-center max-w-sm w-full">
          <p className="text-red-500 font-bold text-lg mb-1">Order Not Found</p>
          <p className="text-gray-500 text-xs sm:text-sm">The item details specified could not be fetched or do not exist.</p>
        </div>
      </div>
    );
  }

  // ---------- READONLY PREMIUM CARD DESIGN FIELD ----------
  const Field = ({ label, value, big = false }) => (
    <div className="flex flex-col gap-1.5 w-full">
      <p className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-widest font-bold">
        {label}
      </p>
      <div
        style={{ cursor: "not-allowed", whiteSpace: "pre-line" }}
        className={`w-full flex items-start px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl bg-gray-50 border border-gray-200/70 text-gray-600 text-sm sm:text-[15px] font-medium select-none break-words transition-all hover:bg-gray-50/80 ${
          big ? "min-h-[110px]" : "min-h-[56px]"
        }`}
      >
        {value || "-"}
      </div>
    </div>
  );

  // ---------- PREMIUM STATUS STYLE ----------
  const statusStyle = (status) => {
    if (status === "Completed")
      return "bg-green-50 text-green-700 border-green-200 fill-green-600";
    if (status === "In Progress")
      return "bg-blue-50 text-blue-600 border-blue-200 fill-blue-500";
    return "bg-amber-50 text-amber-700 border-amber-200 fill-amber-500";
  };

  return (
    <ClientGuard>
      <div className="min-h-screen bg-gray-50/50 py-15 sm:py-14 px-4 sm:px-6 lg:px-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl space-y-6 sm:space-y-8"
        >
          
          {/* ---------- PREMIUM RESPONSIVE HEADER ---------- */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
                <FileText size={20} />
              </div>
              <div className="truncate">
                <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">
                  Detail Page
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">
                  Here are the details of your order
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

          {/* ---------- INFO GRID ---------- */}
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
              <Field label="Serial Number" value={order.serialNumber} />
              <Field label="Order Type" value={order.orderType} />
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-widest font-bold">Status</p>
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-full border ${statusStyle(order.status)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {order.status}
                </div>
              </div>
              <Field label="Order Name" value={order.title} />
            </div>
          </div>

          {/* ---------- DESCRIPTION ---------- */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
            <Field label="Description" value={order.description || "No description"} big />
          </div>

          {/* ---------- NOTE ---------- */}
          {order.note && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
              <Field label="Submission Note" value={order.note} big />
            </div>
          )}

          {/* ---------- PREMIUM FILES RECOVERY LAYOUT ---------- */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-gray-50">
              <FileCheck2 size={18} className="text-[#0e2c1c]" />
              <h2 className="text-sm sm:text-base font-bold text-gray-800">Submitted Files By Admin</h2>
            </div>

            {order.files && order.files.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {order.files.map((file, i) => {
                  const isCurrentDownloading = downloadingFile === file.fileName;
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl gap-4 hover:border-[#0e2c1c]/20 hover:bg-gray-50/80 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-[#0e2c1c] transition-colors shrink-0">
                          <FileText size={16} />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 font-semibold truncate pr-2">
                          {file.fileName}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDownload(file.fileUrl, file.fileName)}
                        disabled={isCurrentDownloading}
                        className={`shrink-0 h-9 px-4 sm:px-5 rounded-lg font-bold text-xs shadow-sm flex items-center gap-2 border transition-all cursor-pointer active:scale-[0.98]
                          ${isCurrentDownloading
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-[#0e2c1c] text-white border-[#0e2c1c] hover:bg-[#133c27]"
                          }`}
                      >
                        {isCurrentDownloading ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <DownloadCloud size={14} />
                            <span className="hidden xs:inline">Download</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl bg-gray-50/30">
                <p className="text-gray-400 text-xs sm:text-sm font-medium italic">No assets or production files submitted yet.</p>
              </div>
            )}
          </div>
          
        </motion.div>
      </div>
    </ClientGuard>
  );
}