"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NotificationIcon from "@/components/NotificationIcon";
import AdminGuard from "@/components/AdminGuard";
import { User } from "lucide-react";
import { jwtDecode } from "jwt-decode";


export default function OrderDetail() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
   const [adminId, setAdminId] = useState(null);

   // 🔹 ORDERS FETCH
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
  useEffect(() => {
    if (!id) return;

    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setStatus(data.status);
      });
  }, [id]);

  const updateStatus = async () => {
    setMsg("Updating...");

    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      const updated = await res.json();
      setOrder(updated);
      setMsg("Status Updated ✅");
    } else {
      setMsg("Update failed ❌");
    }
  };

    const Field = ({ label, value, big = false }) => (
    <div className="space-y-2">
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

  if (!order) return <p className="p-10">Loading order...</p>;

 return (
      <AdminGuard>
  
  <div className="min-h-screen bg-white py-14 px-6 flex justify-center">
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl space-y-6"
    >
      {/* HEADER */}
       <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0e2c1c]">
              Orders List
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Manage all client orders & track progress
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 border border-gray-200 bg-white rounded-xl shadow-sm">
              <User size={18} className="text-gray-600" />
              <span className="font-semibold text-gray-700">
                Admin
              </span>
            </div>
            {adminId && <NotificationIcon userId={adminId} />}
          </div>
        </div>

      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl text-sm font-medium">
          {msg}
        </div>
      )}

      {/* INFO GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-5">
          <Field label="Serial Number" value={order.serialNumber} />
          <Field label="Order Type" value={order.orderType} />
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-5">
          <Field label="Title" value={order.title} />
          <Field
            label="Client"
            value={`${order.clientId?.name} (${order.clientId?.email})`}
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <Field
          label="Description"
          value={order.description || "No description"}
          big
        />
      </div>

      {/* CLIENT FILES */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700">
          Client Files
        </h2>

        {order.clientFile?.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No client files uploaded
          </p>
        ) : (
          <div className="space-y-2">
            {order.clientFile?.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg"
              >
                <span className="text-sm text-gray-600 truncate pr-4">
                  {file.fileName}
                </span>

                <a
                  href={file.fileUrl}
                  download
                  target="_blank"
                  className="shrink-0 px-5 py-2.5 rounded-lg bg-[#0e2c1c] text-white text-xs font-semibold shadow-md hover:bg-[#123825] transition-all"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STATUS UPDATE */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-5">
        <h2 className="text-sm font-semibold text-gray-700">
          Update Status
        </h2>

        <select
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0e2c1c]"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={updateStatus}
          className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#0e2c1c] text-white font-semibold shadow-md hover:bg-[#123825] transition-all"
        >
          Update Status
        </motion.button>
      </div>
    </motion.div>
  </div>
      </AdminGuard>
  
);
}
