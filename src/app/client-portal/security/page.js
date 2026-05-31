"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, CheckCircle2, ShieldCheck, User } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";
import ClientGuard from "@/components/ClientGuard";

export default function ClientSecurityPage() {
  const [client, setClient] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const rules = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[!@#$%^&*]/.test(newPassword),
  };

  const passedRules = Object.values(rules).filter(Boolean).length;
  const strengthText = ["Empty", "Weak", "Weak", "Medium", "Strong", "Very Strong"];
  
  // Dynamic color for strength bar based on points
  const getStrengthColor = (score) => {
    if (score <= 2) return "bg-red-500";
    if (score === 3) return "bg-amber-500";
    return "bg-green-600";
  };

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

  async function changePassword(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("Server error");
    }
    setIsLoading(false);
  }

  function Rule({ label, valid }) {
    return (
      <div className={`flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors duration-300 ${valid ? "text-green-600" : "text-gray-400"}`}>
        <CheckCircle2 size={16} className={valid ? "text-green-600 fill-green-50" : "text-gray-300"} />
        <span>{label}</span>
      </div>
    );
  }

  return (
    <ClientGuard>
      <div className="min-h-screen bg-gray-50/50 py-15 sm:py-14 px-4 sm:px-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl space-y-6 sm:space-y-8"
        >
          
          {/* PREMIUM RESPONSIVE HEADER */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-[#0e2c1c] rounded-xl text-white hidden xs:flex shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div className="truncate">
                <h1 className="text-xl sm:text-2xl font-bold text-[#0e2c1c] truncate">
                  Account Security
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">
                  Change your password to keep your account secure
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

          {/* ALERT NOTIFICATION */}
          {message && (
            <div className={`p-4 rounded-xl text-center font-medium text-sm border ${
              message.toLowerCase().includes("success")
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-red-50 border-red-200 text-red-600"
            }`}>
              {message}
            </div>
          )}

          {/* FORM AREA */}
          <form
            onSubmit={changePassword}
            className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xl flex flex-col gap-5 sm:gap-6"
          >
            {/* OLD PASSWORD */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  className="w-full h-12 sm:h-[60px] px-4 pr-12 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 focus:border-[#0e2c1c] transition text-sm sm:text-base font-normal text-gray-800"
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your current password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                  onClick={() => setShowOld(!showOld)}
                >
                  {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* NEW PASSWORD */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  className="w-full h-12 sm:h-[60px] px-4 pr-12 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 focus:border-[#0e2c1c] transition text-sm sm:text-base font-normal text-gray-800"
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* STRENGTH INDICATOR BAR */}
              {newPassword && (
                <div className="space-y-1.5 mt-1">
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getStrengthColor(passedRules)}`}
                      style={{ width: `${(passedRules / 4) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs font-semibold text-gray-500">
                    Strength: <span className={passedRules === 4 ? "text-green-600" : passedRules === 3 ? "text-amber-500" : "text-red-500"}>{strengthText[passedRules]}</span>
                  </p>
                </div>
              )}

              {/* RULES LIST CHECKER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 bg-gray-50/50 p-3 sm:p-4 rounded-xl border border-gray-100">
                <Rule label="Minimum 8 characters" valid={rules.length} />
                <Rule label="One uppercase letter" valid={rules.uppercase} />
                <Rule label="One number" valid={rules.number} />
                <Rule label="One special character" valid={rules.special} />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  className="w-full h-12 sm:h-[60px] px-4 pr-12 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0e2c1c]/20 focus:border-[#0e2c1c] transition text-sm sm:text-base font-normal text-gray-800"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {confirmPassword && (
                <p className={`text-xs sm:text-sm font-semibold transition-opacity mt-0.5 ${newPassword === confirmPassword ? "text-green-600" : "text-red-500"}`}>
                  {newPassword === confirmPassword ? "Passwords match ✔" : "Passwords do not match"}
                </p>
              )}
            </div>

            {/* SUBMIT ACTION */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 sm:h-[60px] rounded-xl font-bold text-sm sm:text-base transition shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer
                ${isLoading 
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                  : "bg-[#0e2c1c] text-white hover:bg-[#123825] active:scale-[0.99] transition-all"
                }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating Security...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </form>

        </motion.div>
      </div>
    </ClientGuard>
  );
}