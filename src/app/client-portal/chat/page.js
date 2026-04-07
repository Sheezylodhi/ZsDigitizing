"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mic, Trash2, Send, FileText, Image as ImageIcon, Download, X, Paperclip, File as FileIcon } from "lucide-react";
import NotificationIcon from "@/components/NotificationIcon";

export default function ClientChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [clientId, setClientId] = useState(null);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false); // New for Drag & Drop
  const [isCancelled, setIsCancelled] = useState(false);
  const [startX, setStartX] = useState(null);
  const chatRef = useRef(null);
  const prevMsgLength = useRef(0);
  const [client, setClient] = useState(null);
  const [adminStatus, setAdminStatus] = useState({ isTyping: false, isRecording: false });
  const isMobile = typeof window !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsCancelled(false);
    startRecording();
  };

  const handleTouchMove = (e) => {
    if (!startX) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    // 👇 swipe left threshold (adjust kar sakte ho)
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

  // Voice Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const timerRef = useRef(null);

  // --- Helper to check file types ---
  const getFileType = (url) => {
    const ext = url.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext)) return 'document';
    if (['mp3', 'wav', 'ogg'].includes(ext)) return 'audio';
    if (['webm'].includes(ext) || url.includes('voice')) return 'voice';
    return 'file';
  };

  // --- New Handlers for Files ---
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => { setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const markAsSeenByClient = async () => {
    if (!clientId) return;
    try {
      await fetch(`/api/chat/markAsSeenByClient?clientId=${clientId}`, { method: "POST" });
    } catch (err) { console.error("Client mark seen error", err); }
  };

  useEffect(() => {
    if (messages.length > 0) markAsSeenByClient();
  }, [messages]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setClientId(storedUserId);

    fetch("/api/client/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { if (data?._id) setClient(data); });
  }, []);

  const fetchMessages = async () => {
    if (!clientId) return;
    try {
      const res = await fetch(`/api/chat/getMessages?clientId=${clientId}`);
      const data = await res.json();
      setMessages(data.messages || data);
      if (data.adminStatus) setAdminStatus(data.adminStatus);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [clientId]);

  useEffect(() => {
    if (messages.length > prevMsgLength.current) {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
    prevMsgLength.current = messages.length;
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() && files.length === 0) return;
    if (!clientId) return;
    const formData = new FormData();
    formData.append("clientId", clientId);
    formData.append("message", newMessage);
    files.forEach(f => formData.append("file", f));

    try {
      const res = await fetch("/api/chat/sendMessage", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Send failed");
      setNewMessage("");
      setFiles([]);
      fetchMessages();
    } catch (err) { console.error("Send message error:", err); }
  };

  // Recording Logic
  const startRecording = async () => {
    if (isRecording) return; // 👈 duplicate start prevent

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const file = new File([blob], "voice.webm");

        const formData = new FormData();
        formData.append("clientId", clientId);
        formData.append("file", file);

        await fetch("/api/chat/sendMessage", { method: "POST", body: formData });
        fetchMessages();
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((p) => p + 1);
      }, 1000);

    } catch (err) {
      console.error("Mic error", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      clearInterval(timerRef.current);
      setIsRecording(false);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.onstop = null;
      mediaRecorder.stop();
    }
    clearInterval(timerRef.current);
    setIsRecording(false);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div
      className="p-4 sm:p-8"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag & Drop Overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-green-600/10 backdrop-blur-sm border-4 border-dashed border-green-600 flex items-center justify-center pointer-events-none rounded-3xl">
            <div className="bg-white p-6 rounded-2xl shadow-2xl text-center">
              <Paperclip className="w-12 h-12 text-green-600 mx-auto mb-2 animate-bounce" />
              <p className="text-xl font-bold text-gray-800">Drop files here</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl px-6 py-5 flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-[#0e2c1c]">Chat With Support</h1>
          <p className="text-gray-500 text-sm">Ask any query from our team</p>
        </div>
        {client && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg">
              <User size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{client.name}</span>
            </div>
            <NotificationIcon userId={client._id} />
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto h-[75vh] flex flex-col bg-[#f0f2f5] shadow-2xl rounded-2xl overflow-hidden border border-gray-200 relative">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">S</div>
          <div>
            <h3 className="font-bold text-gray-800 leading-none">Support Team</h3>
            <span className="text-xs text-green-600 font-medium italic">
              {adminStatus.isRecording ? "recording audio..." : adminStatus.isTyping ? "typing..." : "Online"}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundOpacity: 0.05 }}>
          <AnimatePresence>
            {messages.map((msg, i) => {
              const isClient = msg.from === "client";
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl shadow-sm relative overflow-hidden ${isClient ? "bg-green-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border border-gray-200"}`}>

                    {/* Media Display Logic */}
                    {msg.attachments?.map((att, idx) => {
                      const fileType = getFileType(att);
                      const fileUrl = att;

                      if (fileType === 'image') {
                        return (
                          <div key={idx} className="p-1">
                            <img
                              src={fileUrl}
                              alt="attachment"
                              className="max-w-full rounded-lg h-auto max-h-60 object-cover cursor-pointer hover:opacity-90 transition"
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = fileUrl;
                                link.download = att.split("/").pop(); // original filename
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                            />
                          </div>
                        );
                      }

                      if (fileType === 'document') {
                        return (
                          <a
                            key={idx}
                            href={fileUrl}
                            download={att.split('/').pop()}  // File ka original name use hoga
                            className={`flex items-center gap-3 p-3 m-2 rounded-lg border ${isClient ? "bg-green-700 border-green-500" : "bg-gray-50 border-gray-200"}`}
                          >
                            <FileText size={24} className={isClient ? "text-green-200" : "text-blue-500"} />
                            <div className="flex-1 overflow-hidden">
                              <p className="text-xs font-medium truncate">{att.split('/').pop()}</p>
                              <p className="text-[10px] opacity-70 uppercase">{att.split('.').pop()}</p>
                            </div>
                            <Download size={16} className="opacity-60" />
                          </a>
                        );
                      }

                      if (fileType === 'voice') {
                        return (
                          <div key={idx} className="p-3">
                            <audio controls className={`w-48 h-10 filter ${isClient ? "invert brightness-200" : ""} ${msg.playedByAdmin ? "border-l-4 border-blue-400" : ""}`}>
                              <source src={fileUrl} type="audio/webm" />
                            </audio>
                          </div>
                        );
                      }

                      return null;
                    })}

                    {/* Message Text */}
                    {msg.message && <div className="px-4 py-2 break-words leading-relaxed">{msg.message}</div>}

                    {/* Timestamp & Seen Status */}
                    <div className={`px-3 pb-1 flex items-center justify-end gap-1 text-[10px] opacity-70 ${isClient ? "text-white" : "text-gray-500"}`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isClient && (
                        <svg className={`w-3.5 h-3.5 ${msg.seenByAdmin ? "text-blue-300" : "text-gray-200"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 12L7 17L12 12M12 17L22 7M7 17L17 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* WhatsApp Style File Preview (New Addition) */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="absolute bottom-20 inset-x-4 z-20 bg-white border border-gray-200 shadow-2xl rounded-2xl p-4 flex gap-3 overflow-x-auto items-center">
              {files.map((file, idx) => (
                <div key={idx} className="relative min-w-[80px] h-20 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center justify-center p-2 text-center">
                  <button onClick={() => removeFile(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:scale-110 transition z-30"><X size={14} /></button>
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover rounded" alt="preview" />
                  ) : (
                    <>
                      <FileIcon size={20} className="text-blue-500 mb-1" />
                      <span className="text-[10px] truncate w-full px-1 font-medium text-gray-700">{file.name}</span>
                    </>
                  )}
                </div>
              ))}
              <label htmlFor="file-upload" className="min-w-[40px] h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-500 cursor-pointer transition">
                <span className="text-xl">+</span>
              </label>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="p-4 bg-white border-t flex items-center gap-2">
          {isRecording ? (


            <div className="flex-1 flex items-center justify-between bg-gray-100 rounded-full px-4 py-2">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-mono">{formatTime(recordingDuration)}</span>

                {/* ✅ ONLY MOBILE */}
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
                <button onClick={cancelRecording} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"><Trash2 size={20} /></button>
                <button onClick={stopRecording} className="bg-green-600 text-white p-2 rounded-full shadow-lg"><Send size={18} /></button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <input type="file" multiple onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files)])} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="text-gray-500 hover:text-green-600 cursor-pointer p-2 rounded-full hover:bg-gray-100">
                  <Paperclip size={22} />
                </label>
              </div>

              <div className="flex-1 relative">
                <input
                  type="text" placeholder={files.length > 0 ? "Add a caption..." : "Type a message..."}
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  className="w-full bg-gray-100 rounded-full px-5 py-3 outline-none text-sm focus:ring-1 focus:ring-green-500 transition-all"
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                />
              </div>


              <button
                // 💻 Desktop behavior (simple)
                onMouseDown={() => {
                  if (!isMobile) startRecording();
                }}
                onMouseUp={() => {
                  if (!isMobile) stopRecording();
                }}
                onMouseLeave={() => {
                  if (!isMobile) stopRecording();
                }}

                // 📱 Mobile behavior (hold + slide)
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

                className="text-gray-500 p-2 hover:bg-gray-100 rounded-full transition"
              >
                <Mic size={22} />
              </button>
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim() && files.length === 0}
                className={`p-3 rounded-full shadow-md transition-all active:scale-95 ${(!newMessage.trim() && files.length === 0) ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}
              >
                <Send size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}