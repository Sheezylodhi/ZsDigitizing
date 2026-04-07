"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  if (!token) {
    return <p className="text-center mt-10">Invalid reset link</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowPopup(true); // show success popup
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      setError("Server error, try again later");
    }
  };

  const handlePopupOk = () => {
    setShowPopup(false);
    router.push("/login"); // redirect to login
  };

  return (
    <>
      {/* ✅ POPUP with animated tick */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl text-center border border-gray-200"
            >
              {/* Animated green tick */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-green-100 mb-6"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                  className="w-12 h-12 text-green-600 stroke-2 stroke-current"
                >
                  <motion.path
                    fill="none"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 27l7 7 17-17"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </motion.svg>
              </motion.div>

              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Password Changed!
              </h2>
              <p className="text-gray-500 mb-6">
                Your password has been successfully updated.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePopupOk}
                className="cursor-pointer px-6 py-3 rounded-xl bg-[#0e2c1c] text-white font-semibold hover:bg-green-700 transition"
              >
                OK
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Password Form */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                required
                className="w-full p-3 pr-12 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="cursor-pointer w-full bg-[#0e2c1c] text-white py-3 rounded-lg">
              Reset Password
            </button>
          </form>

          {error && (
            <p className="text-center mt-4 text-sm text-red-600">{error}</p>
          )}
        </div>
      </div>
    </>
  );
}