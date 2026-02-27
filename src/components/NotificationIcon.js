"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Mail, MailOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotificationIcon({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  async function fetchNotifications() {
    if (!userId) return;

    try {
      const res = await fetch(`/api/notifications?userId=${userId}`, {
        cache: "no-store",
      });
      if (!res.ok) return;

      const data = await res.json();
      setNotifications(data || []);
    } catch (err) {
      console.error("Fetch notifications error:", err);
    }
  }

  async function openNotification(e, n) {
    e.preventDefault();
    if (!n._id) return;

    setNotifications(prev =>
      prev.map(x => x._id === n._id ? { ...x, read: true } : x)
    );

    try {
      await fetch(`/api/notifications/${n._id}/read`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
    } catch {}

    router.push(n.link || "#");
  }

  async function markAllAsRead() {
    const unreadIds = notifications.filter(n => !n.read).map(n => n._id);
    if (!unreadIds.length) return;

    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

    try {
      await Promise.all(
        unreadIds.map(id =>
          fetch(`/api/notifications/${id}/read`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
          })
        )
      );
    } catch {}
  }

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    const focusRefresh = () => fetchNotifications();
    window.addEventListener("focus", focusRefresh);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", focusRefresh);
    };
  }, [userId]);

  const unreadCount = notifications.filter(n => !n.read).length;

  function formatTime(date) {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="relative">

      {/* 🔔 ICON BUTTON */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative flex items-center justify-center w-11 h-11 
                   rounded-xl border border-gray-200 bg-white shadow-sm
                   hover:shadow-md hover:bg-gray-50 transition"
      >
        <Bell className="w-5 h-5 text-gray-700" />

        {/* 🔴 RED DOT */}
      {unreadCount > 0 && (
  <>
    {/* Number Badge */}
    <span className="absolute -top-2 -right-2 
                     bg-red-600 text-white text-[11px] font-semibold
                     px-1.5 py-0.5 rounded-full shadow">
      {unreadCount}
    </span>

    {/* Small pulse dot behind */}
    <span className="absolute top-1 right-1 w-2.5 h-2.5 
                     bg-red-600 rounded-full animate-ping opacity-70" />
  </>
)}
      </button>

      {/* 📦 DROPDOWN */}
   {showDropdown && (
  <div
    className="
      absolute right-0 mt-3
      w-[95vw] md:w-96           /* Mobile almost full width, desktop fixed */
      max-w-[380px]              /* Prevent super wide on mobile */
      bg-white border border-gray-200
      shadow-xl rounded-2xl z-50
      max-h-[420px] overflow-y-auto
      p-0
    "
  >

          {/* HEADER */}
          <div className="p-4 border-b flex justify-between items-center">
            <span className="font-semibold text-gray-800">
              Notifications
            </span>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* EMPTY */}
          {notifications.length === 0 ? (
            <p className="text-gray-400 text-center p-8">
              No notifications yet
            </p>
          ) : (
            notifications.map(n => (
              <Link
                key={n._id}
                href={n.link || "#"}
                onClick={e => openNotification(e, n)}
                className={`block p-4 border-b transition
                  hover:bg-gray-50
                  ${!n.read
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : "bg-white"
                  }`}
              >
                <div className="flex justify-between items-start">

                  {/* TEXT */}
                  <div className="flex-1 pr-3">
                    {n.title && (
                      <p className="font-semibold text-sm text-gray-900">
                        {n.title}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      {n.message}
                    </p>
                  </div>

                  {/* ICON + TIME */}
                  <div className="flex items-center gap-3">
                    {!n.read ? (
                      <Mail className="w-5 h-5 text-blue-600" />
                    ) : (
                      <MailOpen className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="text-xs text-gray-400">
                      {formatTime(n.createdAt)}
                    </span>
                  </div>

                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}