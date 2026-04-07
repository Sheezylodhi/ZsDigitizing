"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import ClientGuard from "@/components/ClientGuard";

export default function LoginHistoryPage() {

  const [client, setClient] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch("/api/client/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data?._id) setClient(data);
      });

    fetch("/api/client/login-history", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setHistory(data));

  }, []);

  return (

    <ClientGuard>

      <div className="min-h-screen bg-white py-14 px-6 flex justify-center">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl space-y-10"
        >

          {/* HEADER */}

          <div className="bg-white pt-10 mt-10 border border-gray-200 shadow-lg rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between mb-8">

            <div>

              <h1 className="text-lg sm:text-3xl font-bold text-[#0e2c1c]">
                Login History
              </h1>

              <p className="text-gray-500 text-xs sm:text-sm">
                Monitor recent login activity on your account
              </p>

            </div>

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

          {/* TABLE */}

          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden">

            <table className="w-full text-sm">

              <thead className="bg-[#0e2c1c]">

                <tr className="text-left">

                  <th className="p-4 font-semibold text-white">Date</th>
                  <th className="p-4 font-semibold text-white">IP Address</th>
                  <th className="p-4 font-semibold text-white">Device</th>

                </tr>

              </thead>

              <tbody>

                {history.map((item, i) => (

                  <tr key={i} className="border-t">

                    <td className="p-4">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>

                    <td className="p-4">
                      {item.ip}
                    </td>

                    <td className="p-4 truncate max-w-xs">
                      {item.device}
                    </td>

                  </tr>

                ))}

                {history.length === 0 && (

                  <tr>

                    <td colSpan="3" className="text-center p-6 text-gray-500">
                      No login activity found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </motion.div>

      </div>

    </ClientGuard>

  );

}