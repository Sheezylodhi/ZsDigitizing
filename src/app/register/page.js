"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: ""
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/create-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setMsg("Account created & email sent ✅");
        setForm({ name: "", company: "", phone: "", email: "" });
        setShowPopup(true); // show popup
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handlePopupOk = () => {
    setShowPopup(false);
    router.push("/login"); // redirect
  };

  return (
    <>
      <TopAnnouncementBar />
      <Navbar />

      <div
        className="min-h-screen font-serif flex items-center justify-center bg-gradient-to-b from-green-50 to-white font-sans px-4"
        style={{ paddingTop: "140px", paddingBottom: "120px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full p-10 bg-white rounded-3xl shadow-2xl z-20 relative"
        >
          <h2 className="text-3xl font-extrabold text-center text-[#0e2c1c] mb-8">
            Create Your Account
          </h2>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          {msg && <p className="text-green-600 text-sm mb-4 text-center">{msg}</p>}

          <form className="space-y-6" onSubmit={handleRegister}>
            {["name", "company", "phone", "email"].map((field) => (
              <motion.div whileFocus={{ scale: 1.02 }} className="relative" key={field}>
                <label className="block text-gray-600 mb-2 font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field === "email" ? "you@example.com" : `Enter your ${field}`}
                  required
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e2c1c] transition"
                />
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full py-4 rounded-xl bg-[#0e2c1c] text-white font-bold shadow-lg hover:shadow-2xl transition-all"
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>

          <p className="text-gray-600 mt-6 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0e2c1c] hover:text-green-900 font-semibold transition">
              Login
            </Link>
          </p>
        </motion.div>
      </div>

      <Footer />

      {/* ✅ POPUP with tick animation */}
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
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl text-center border border-gray-200"
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

              <h2 className="text-2xl font-bold text-green-600 mb-4">Account Created!</h2>
              <p className="text-gray-500 mb-6">Your account has been successfully created.</p>
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
    </>
  );
}