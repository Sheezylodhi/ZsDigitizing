"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Toast({ message, type = "success", show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed top-20 right-5 z-50 flex items-center space-x-3 max-w-sm w-full bg-white shadow-lg rounded-xl px-4 py-3 border-l-4"
          style={{
            borderColor: type === "success" ? "#22c55e" : "#ef4444",
          }}
        >
          {type === "success" ? (
            <FaCheckCircle className="text-green-500 w-6 h-6 animate-bounce" />
          ) : (
            <FaTimesCircle className="text-red-500 w-6 h-6 animate-shake" />
          )}
          <p className={`text-sm font-medium ${type === "success" ? "text-green-700" : "text-red-700"}`}>
            {message}
          </p>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
