import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContestStore } from "../store/useContestStore";
import { motion, AnimatePresence } from "framer-motion";

export default function ContestChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentGroup, joinContestGroup, sendMessage, isLoading } = useContestStore();
  
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (id) {
      joinContestGroup(id);
    }
  }, [id, joinContestGroup]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentGroup?.messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    await sendMessage(id, messageText);
    setMessageText("");
  };

  if (isLoading || !currentGroup) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] bg-[#fdf6e3] dark:bg-[#10141F]">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#F5A623]/20 border-t-[#F5A623] animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">🏆</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 dark:bg-[#0a0d14] font-mono relative overflow-hidden transition-colors duration-500">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#F5A623]/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#8B7FD6]/5 blur-[100px] pointer-events-none"></div>

      {/* Premium Glass Header */}
      <div className="bg-white/70 dark:bg-[#10141F]/80 backdrop-blur-2xl border-b border-[#e2e8f0] dark:border-white/10 p-4 md:px-8 py-5 flex items-center justify-between z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-[#F5A623] hover:text-white transition-all transform active:scale-95"
            title="Back to Arenas"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-[#0f172a] dark:text-white flex items-center gap-2">
              {currentGroup.name}
            </h2>
            <div className="flex items-center gap-2 mt-1.5">
              {currentGroup.status === "ACTIVE" ? (
                <>
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </div>
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live Arena</p>
                </>
              ) : (
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8B8FA3]"></div>
                  <p className="text-[10px] font-bold text-[#8B8FA3] uppercase tracking-widest">Archived Mode</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-8 md:pt-12 space-y-8 scroll-smooth z-10 custom-scrollbar">
        {currentGroup.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-[#F5A623]/20 to-[#FF7B00]/20 flex items-center justify-center border border-[#F5A623]/30 shadow-[0_0_30px_rgba(245,166,35,0.15)]"
            >
              <span className="text-4xl">⚔️</span>
            </motion.div>
            <h3 className="text-2xl font-black text-[#0f172a] dark:text-white mb-3">The arena is empty.</h3>
            <p className="text-[#64748b] dark:text-[#8B8FA3] max-w-md text-sm leading-relaxed">
              No solutions have been dropped yet. Be the first to break the silence and share your approach with the global community!
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {currentGroup.messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="flex gap-4 max-w-3xl"
              >
                {/* Avatar */}
                <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#10141F] to-[#1A1F2C] dark:from-[#2A2F3D] dark:to-[#1A1F2C] border border-black/10 dark:border-white/10 text-white flex items-center justify-center font-black shadow-lg">
                  {msg.sender?.username?.charAt(0).toUpperCase() || "?"}
                </div>
                
                {/* Message Content */}
                <div className="flex flex-col gap-1 w-full pt-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-[#0f172a] dark:text-[#E6E8EB] text-base leading-none">
                      {msg.sender?.name || msg.sender?.username || "Unknown Hacker"}
                    </span>
                    <time className="text-[10px] font-semibold text-[#8B8FA3] uppercase tracking-wider leading-none">
                      {msg.timestamp || msg.createdAt ? new Date(msg.timestamp || msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                    </time>
                  </div>
                  
                  <div className="px-5 py-3.5 rounded-2xl rounded-tl-none bg-white dark:bg-[#1A1F2C] border border-[#e2e8f0] dark:border-white/5 shadow-sm text-sm text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
                    {msg.content}
                    
                    {msg.solutionId && (
                      <div className="mt-4 p-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 flex items-center justify-between group cursor-pointer hover:bg-[#F5A623]/10 dark:hover:bg-[#F5A623]/10 hover:border-[#F5A623]/30 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623]">
                            📄
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0f172a] dark:text-white">Attached Solution</p>
                            <p className="text-[10px] text-[#64748b] dark:text-[#8B8FA3] truncate max-w-[200px]">
                              {msg.solutionId.title || "View details"}
                            </p>
                          </div>
                        </div>
                        <span className="text-[#F5A623] group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Modern Glass Input Area */}
      <div className="p-4 md:px-8 pb-6 bg-white/30 dark:bg-[#10141F]/50 backdrop-blur-xl border-t border-[#e2e8f0] dark:border-white/10 z-20">
        {currentGroup.status === "ARCHIVED" ? (
          <div className="py-4 px-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center text-sm font-semibold text-[#8B8FA3]">
            <span className="mr-2">🔒</span> The contest has concluded. This arena is now a read-only archive.
          </div>
        ) : (
          <form 
            onSubmit={handleSend} 
            className="flex items-center gap-3 p-1.5 rounded-2xl bg-white dark:bg-[#1A1F2C] border border-[#e2e8f0] dark:border-white/10 shadow-lg focus-within:ring-2 focus-within:ring-[#F5A623]/40 focus-within:border-[#F5A623]/40 transition-all"
          >
            <input 
              type="text" 
              placeholder="Drop your thoughts or algorithms here..." 
              className="flex-1 bg-transparent px-4 py-3.5 text-sm text-[#0f172a] dark:text-white focus:outline-none placeholder:text-[#8B8FA3] font-medium"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              autoFocus
            />
            <button 
              type="submit" 
              disabled={!messageText.trim()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#10141F] to-[#1A1F2C] dark:from-white dark:to-[#E6E8EB] text-white dark:text-[#10141F] font-black text-sm uppercase tracking-wider hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 flex items-center gap-2"
            >
              <span>Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
