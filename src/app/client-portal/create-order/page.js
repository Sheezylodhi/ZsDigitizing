"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
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

  /* ---------------- GET CLIENT ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/client/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data?._id) setClient(data);
      });
  }, []);

  /* ---------------- DRAG DROP ---------------- */
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      setFiles(e.dataTransfer.files);
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !orderType) {
      setMessage("Title & Order Type required");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("turnaround", turnaround);
    formData.append("orderType", orderType);
    formData.append("status", status);
    for (let file of files) formData.append("files", file);

    const res = await fetch("/api/client/orders", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`Order Created  Serial: ${data.serialNumber}`);
      setTitle("");
      setDescription("");
      setFiles([]);
    } else {
      setMessage(data.message || "Error creating order");
    }
  };

  return (
    <ClientGuard>
    <div className="min-h-screen bg-[#f8fafc] py-14 px-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl space-y-16"
      >

        {/* ---------- HEADER CARD ---------- */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0e2c1c]">Create New Order</h1>
            <p className="text-gray-500 text-sm mt-2">Fill out order details & upload your files</p>
          </div>

          {client && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-5 py-3 border border-gray-200 bg-white rounded-xl shadow-sm">
                <User size={18} className="text-gray-600" />
                <span className="font-semibold text-gray-700">{client.name}</span>
              </div>
              <NotificationIcon userId={client._id} />
            </div>
          )}
        </div>

        {/* ---------- MESSAGE ---------- */}
        {message && (
          <div className="text-green-600 font-medium text-center">{message}</div>
        )}

        {/* ---------- FORM CARD ---------- */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg flex flex-col gap-6"
        >

          {/* Order Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Order Type</label>
            <select
              className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
            >
              <option value="Digitizing PPO">Digitizing PPO</option>
              <option value="Vector PPV">Vector PPV</option>
              <option value="Patches PO">Patches PO</option>
            </select>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Title</label>
            <input
              className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
              placeholder="Order Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Description</label>
            <textarea
              className="w-full px-5 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition resize-none"
              rows={5}
              placeholder="Describe your design instructions"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Turnaround */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Turnaround</label>
            <select
              className="w-full h-[70px] px-5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 transition"
              value={turnaround}
              onChange={(e) => setTurnaround(e.target.value)}
            >
              <option>Rush 6 Hours</option>
              <option>12 Hours</option>
              <option>24 Hours</option>
            </select>
          </div>

          {/* FILE DRAG & DROP */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Upload Files</label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition
                ${dragActive ? "border-green-700 bg-green-50" : "border-gray-300 bg-white"}`}
            >
              <p className="text-gray-600">Drag & Drop files here or click to select</p>
              <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="mt-4"
              />

              {files.length > 0 && (
                <div className="mt-4 text-gray-700 text-sm flex flex-col gap-1">
                  {Array.from(files).map((f, i) => (
                    <div key={i}>{f.name}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#0e2c1c] text-white h-[70px] rounded-xl font-semibold text-lg hover:bg-[#123825] transition shadow-lg"
          >
            Create Order
          </button>
        </form>
      </motion.div>
    </div>
      </ClientGuard>

  );
}