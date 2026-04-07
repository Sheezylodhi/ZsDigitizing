"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mic, Trash2, Send, FileText, X } from "lucide-react"; // X aur FileText add kiya
import NotificationIcon from "@/components/NotificationIcon";
import { jwtDecode } from "jwt-decode";

export default function AdminInbox() {
  const [isCancelled, setIsCancelled] = useState(false);
const [startX, setStartX] = useState(null);
const isMobile =
  typeof window !== "undefined" &&
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [inbox, setInbox] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]); // Previews ke liye naya state
  const chatRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const [search, setSearch] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Voice Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const timerRef = useRef(null);

  // File Preview Handler
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) => ({
      name: file.name,
      type: file.type,
      url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    if (isRecording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let audioChunks = [];

      recorder.ondataavailable = (e) => audioChunks.push(e.data);

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const audioFile = new File([audioBlob], "voice.webm");

        const formData = new FormData();
        formData.append("clientId", selectedClient.clientId);
        formData.append("file", audioFile);

        await fetch("/api/chat/sendAdminMessage", {
          method: "POST",
          body: formData,
        });

        fetchMessages();
        fetchInbox();
      };
   

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingDuration(0);
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Mic error", err);
    }
  };
     const handleTouchStart = (e) => {
  setStartX(e.touches[0].clientX);
  setIsCancelled(false);
  startRecording();
};

const handleTouchMove = (e) => {
  if (!startX) return;

  const currentX = e.touches[0].clientX;
  const diff = startX - currentX;

  if (diff > 80) {
    setIsCancelled(true);
  }
};

const handleTouchEnd = () => {
  if (isCancelled) {
    cancelRecording();
  } else {
    stopRecording();
  }
  setStartX(null);
};

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      clearInterval(timerRef.current);
      setIsRecording(false);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.onstop = null;
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
    clearInterval(timerRef.current);
    setIsRecording(false);
    setRecordingDuration(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setAdminId(decoded.userId);
    } catch {}
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const markAsSeen = async (clientId) => {
    try {
      await fetch(`/api/chat/markAsSeen?clientId=${clientId}`, {
        method: "POST",
      });
    } catch (err) {
      console.error("Mark as seen error", err);
    }
  };

  const prevMsgLength = useRef(0);
  useEffect(() => {
    if (!selectedClient || messages.length === 0) return;
    const hasUnread = messages.some(
      (msg) => msg.from === "client" && !msg.seenByAdmin
    );
    if (hasUnread) markAsSeen(selectedClient.clientId);
  }, [messages]);

  useEffect(() => {
    fetchInbox();
    const interval = setInterval(fetchInbox, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchInbox = async () => {
    try {
      const res = await fetch("/api/chat/getInbox");
      const data = await res.json();
      const updatedData = data.map((client) => {
        const allMessages = client.messages || [];
        const unreadMessages = allMessages.filter((msg) => !msg.seenByAdmin);
        return {
          ...client,
          unreadCount: unreadMessages.length,
          lastMessage: client.lastMessage || "Start a conversation",
        };
      });
      setInbox(updatedData);
    } catch (err) {
      console.error("Inbox fetch error", err);
    }
  };

  useEffect(() => {
    if (!selectedClient) return;
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [selectedClient]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `/api/chat/getMessages?clientId=${selectedClient.clientId}`
      );
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Message fetch error", err);
    }
  };

  useEffect(() => {
    if (messages.length > prevMsgLength.current) {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    prevMsgLength.current = messages.length;
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() && files.length === 0) return;
    if (!selectedClient) return;
    const formData = new FormData();
    formData.append("clientId", selectedClient.clientId);
    formData.append("message", newMessage);
    files.forEach((f) => formData.append("file", f));
    try {
      const res = await fetch("/api/chat/sendAdminMessage", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Send failed");
      setNewMessage("");
      setFiles([]);
      setPreviewUrls([]); // Clear previews after send
      fetchMessages();
      fetchInbox();
    } catch (err) {
      console.error("Send message error", err);
    }
  };

  return (
    <div>
      {/* HEADER SECTION */}
      <div className="bg-white pt-10 mt-10 border border-gray-200 shadow-lg rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between mb-8">
        <div>
          <h1 className="text-lg sm:text-3xl font-bold text-[#0e2c1c]">
            Message with client
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Manage all client queries
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-5 py-3 border border-gray-200 bg-white rounded-xl shadow-sm">
            <User size={18} className="text-gray-600" />
            <span className="font-semibold text-gray-700">Admin</span>
          </div>
          {adminId && <NotificationIcon userId={adminId} />}
        </div>
      </div>

      <div className="flex h-[85vh] bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        {/* LEFT SIDE - CLIENT LIST */}
        <div
          className={`border-r border-gray-200 flex flex-col bg-[#f0f2f5] ${
            isMobileView ? (selectedClient ? "hidden" : "w-full") : "w-1/3"
          }`}
        >
          <div className="p-4 bg-[#f0f2f5] border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
          </div>
          <div className="px-3 py-2 bg-[#f0f2f5] border-b border-gray-200">
            <input
              type="text"
              placeholder="Search or start new chat"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 text-sm rounded-full bg-white outline-none border border-gray-200 focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {inbox
              .filter((client) =>
                client.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((client) => (
                <div
                  key={client.clientId}
                  onClick={() => setSelectedClient(client)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 ${
                    selectedClient?.clientId === client.clientId
                      ? "bg-[#e7fce7]"
                      : "hover:bg-[#f5f5f5]"
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-700">
                      {client.name[0].toUpperCase()}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {client.name}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <p className="text-sm text-gray-500 truncate">
                        {client.lastMessage}
                      </p>
                      {client.unreadCount > 0 && (
                        <span className="ml-2 bg-green-600 text-white text-[11px] font-semibold px-2 py-[2px] rounded-full">
                          {client.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT SIDE - CHAT AREA */}
        <div
          className={`flex flex-col bg-[#f0f2f5] ${
            isMobileView ? (selectedClient ? "w-full" : "hidden") : "flex-1"
          }`}
        >
          {selectedClient ? (
            <>
              <div className="p-4 bg-white border-b flex items-center gap-3 shadow-sm z-10">
                {isMobileView && (
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="mr-2"
                  >
                    ←
                  </button>
                )}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                  {selectedClient.name[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 leading-none">
                    {selectedClient.name}
                  </h3>
                  <span className="text-xs text-green-600 font-medium">
                    {isRecording
                      ? "Recording..."
                      : isTyping
                      ? "Typing..."
                      : "Online"}
                  </span>
                </div>
              </div>

              <div
                ref={chatRef}
                className="flex-1 overflow-y-auto p-6 space-y-4"
                style={{
                  backgroundImage:
                    "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
                  backgroundOpacity: 0.05,
                }}
              >
                <AnimatePresence>
                  {messages.map((msg, idx) => {
                    const isAdmin = msg.from === "admin";
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`flex ${
                          isAdmin ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] px-2 py-2 rounded-2xl shadow-sm relative text-[15px] leading-relaxed ${
                            isAdmin
                              ? "bg-green-600 text-white rounded-tr-none"
                              : "bg-[#1f2937] text-white rounded-tl-none"
                          }`}
                        >
                          {/* WhatsApp Style Media Rendering */}
                         {/* WhatsApp Style Media Rendering */}
{msg.attachments?.length > 0 && (
  <div className="mb-2 grid grid-cols-1 gap-1">
    {msg.attachments.map((att, i) => {
      const isAudio = att.endsWith(".webm") || att.toLowerCase().includes("voice");
      const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(att);
      const fileName = att.split("/").pop();

      // 1️⃣ Audio / Voice Notes
      if (isAudio) {
        return (
          <div key={i} className="px-2 pt-1">
           <audio controls className="w-48 h-10">
  <source src={att} type="audio/webm" />
</audio>
          </div>
        );
      }

      // 2️⃣ Images
     if (isImage) {
  return (
    <img
      key={i}
      src={att}
      alt="attachment"
      className="rounded-lg max-h-60 w-full object-cover cursor-pointer"
      onClick={async () => {
        try {
          const response = await fetch(att);
          const blob = await response.blob();

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = fileName; // original filename

          document.body.appendChild(link);
          link.click();
          link.remove();

          window.URL.revokeObjectURL(url);
        } catch (err) {
          console.error("Download error:", err);
        }
      }}
    />
  );
}

      // 3️⃣ Documents / Other Files
      return (
        <a
  key={i}
  href={att}
  download={fileName} // ⭐ important
  className={`flex items-center gap-3 p-3 rounded-lg ${
    isAdmin ? "bg-green-700" : "bg-gray-700"
  } transition-colors`}
>
          <FileText size={24} className="text-white" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{fileName}</p>
            <p className="text-[10px] opacity-70 uppercase">
              {fileName.split(".").pop()}
            </p>
          </div>
        </a>
      );
    })}
  </div>
)}

                          {msg.message && (
                            <div className="px-2 pb-1 break-words">
                              {msg.message}
                            </div>
                          )}

                          <div className="flex items-center justify-end gap-1 px-2 mt-1 opacity-80">
                            <span className="text-[10px]">
                              {new Date().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {isAdmin && (
                              <svg
                                className={`w-3.5 h-3.5 ${
                                  msg.seenByClient
                                    ? "text-blue-400"
                                    : "text-gray-300"
                                }`}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2 12L7 17L12 12M12 17L22 7M7 17L17 7"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* INPUT SECTION */}
              <div className="bg-white border-t p-2">
                {/* FILE PREVIEW STRIP (Selected Files) */}
                {previewUrls.length > 0 && (
                  <div className="flex gap-3 p-3 overflow-x-auto bg-gray-50 rounded-t-xl border-b">
                    {previewUrls.map((p, idx) => (
                      <div key={idx} className="relative flex-shrink-0">
                        {p.url ? (
                          <img
                            src={p.url}
                            className="w-16 h-16 rounded-lg object-cover border"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-200 flex flex-col items-center justify-center p-1">
                            <FileText size={20} className="text-gray-500" />
                            <span className="text-[8px] truncate w-full text-center">
                              {p.name}
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => removeFile(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-2 flex items-center gap-3">
                  {isRecording ? (
                    <div className="flex-1 flex items-center justify-between bg-gray-100 rounded-full px-4 py-2">
                      <div className="flex items-center gap-3">
  <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
  <span className="text-sm font-medium text-gray-600">
    {formatTime(recordingDuration)}
  </span>

  {/* ✅ Only Mobile */}
  {isMobile && (
    !isCancelled ? (
      <span className="text-xs text-gray-500 ml-3">
        ⬅️ slide to cancel
      </span>
    ) : (
      <span className="text-xs text-red-500 ml-3 font-semibold">
        Release to cancel ❌
      </span>
    )
  )}
</div>
                     
                       
                        
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={cancelRecording}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 size={20} />
                        </button>
                        <button
                          onClick={stopRecording}
                          className="bg-green-600 text-white p-2 rounded-full"
                        >
                          <Send size={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="text-gray-500 hover:text-green-600 cursor-pointer p-2"
                      >
                        <PaperclipIcon />
                      </label>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Write a message..."
                          value={newMessage}
                          onChange={(e) => {
                            setNewMessage(e.target.value);
                            setIsTyping(true);
                            clearTimeout(window.typingTimer);
                            window.typingTimer = setTimeout(
                              () => setIsTyping(false),
                              1000
                            );
                          }}
                          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                          className="w-full bg-gray-100 border-none rounded-full px-5 py-3 outline-none text-sm"
                        />
                      </div>
                      <button
  // 💻 Desktop (same as before)
  onMouseDown={() => {
    if (!isMobile) startRecording();
  }}
  onMouseUp={() => {
    if (!isMobile) stopRecording();
  }}
  onMouseLeave={() => {
    if (!isMobile) stopRecording();
  }}

  // 📱 Mobile (hold + slide)
  onTouchStart={(e) => {
    e.preventDefault();
    if (isMobile) handleTouchStart(e);
  }}
  onTouchMove={(e) => {
    if (isMobile) handleTouchMove(e);
  }}
  onTouchEnd={(e) => {
    e.preventDefault();
    if (isMobile) handleTouchEnd();
  }}

  className="bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 transition-all active:scale-125"
>
  <Mic size={20} />
</button>
                      <button
                        onClick={sendMessage}
                        className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 shadow-md"
                      >
                        <SendIcon />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <EmptyChatIcon />
              </div>
              <p className="text-lg font-medium">
                Select a client to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Icons (Same as before)
const PaperclipIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.538L8.56 18.47a1.5 1.5 0 01-2.122-2.122L15.374 8.75"
    />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

const EmptyChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.023c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
    />
  </svg>
);