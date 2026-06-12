'use client';
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageSquareText, Zap } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/aichat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'ai', content: data.reply }]);
    } catch (error) { console.error("Chat Error:", error); } 
    finally { setLoading(false); }
  };

  return (
    <>
      {/* TRIGGER BUTTON - Moved higher (bottom-28) to avoid overlap with existing email button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-28 right-8 w-14 h-14 rounded-full bg-[#0a2540] text-white shadow-2xl hover:bg-[#1a3a5a] transition-all flex items-center justify-center z-[999] border-2 border-white/20 hover:scale-105 active:scale-95"
        >
          <Bot size={28} />
        </button>
      )}

      {/* CHAT WINDOW */}
      <div
        className={`fixed z-[9999] transition-all duration-300 ease-out origin-bottom-right
          ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
          bottom-0 right-0 w-full h-[100dvh] md:bottom-8 md:right-8 md:w-[380px] md:h-[600px] 
          bg-white border border-zinc-200 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden`}
      >
        {/* HEADER */}
        <div className="p-5 flex items-center justify-between bg-[#0a2540] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Bot size={20} />
            </div>
            <div>
              <h2 className="font-bold text-sm">ZSD Support Team</h2>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-blue-200">Online</span>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="hover:bg-white/10 p-1 rounded-md transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-zinc-50">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 text-center px-6">
              <Bot size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium text-zinc-600">Need help with Digitizing?</p>
              <p className="text-xs mt-1">Ask our AI assistant anything.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-2.5 text-[14px] shadow-sm ${m.role === 'user' ? 'bg-[#0a2540] text-white rounded-xl rounded-br-none' : 'bg-white border border-zinc-200 text-zinc-700 rounded-xl rounded-tl-none'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-xs text-zinc-400 px-2 italic">Agent is typing...</div>}
          <div ref={bottomRef} />
        </div>

        {/* INPUT AREA */}
        <div className="p-4 bg-white border-t border-zinc-100">
          <form onSubmit={sendMessage} className="relative flex items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about digitizing..."
              className="w-full bg-zinc-100 border-none text-sm py-3.5 pl-4 pr-12 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:ring-2 focus:ring-[#0a2540]/20 transition-all outline-none"
            />
            <button type="submit" className="absolute right-2 p-1.5 bg-[#0a2540] hover:bg-[#1a3a5a] rounded-md text-white transition-colors">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}