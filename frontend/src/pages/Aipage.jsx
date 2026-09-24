import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Editor from "@monaco-editor/react";
import { Send, Code2 } from "lucide-react";

import { useSolution } from "../store/useSolutionstore";
import { useThemeStore } from "../store/useThemeStore";
import { markdownComponents } from "../components/MarkdownComponents";

const Ask = () => {
  const { theme } = useThemeStore();

  const {
    aires,
    airesp,
    airesources,
    loading,
    aiHistory,
    aiConversations,
    currentConversationId,
    createAIConversation,
    switchAIConversation,
    getAIConversations,
  } = useSolution();

  useEffect(() => {
    getAIConversations();
  }, []);

  const [question, setQuestion] = useState("");
  const [showCode, setShowCode] = useState(false);

  const [code, setCode] = useState(
    `#include <iostream>

using namespace std;

int main() {
    cout << "Hello Codezy!";
    return 0;
}`,
  );

  const handleAsk = async () => {
    if (!question.trim() || loading) return;

    const currentQuestion = question.trim();

    setQuestion("");

    await aires(currentQuestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#07090D] text-[#0f172a] dark:text-[#E6E8EB] relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2 relative">
            <div className="absolute inset-0 bg-[#2DD4BF] opacity-20 blur-xl rounded-full scale-150 -z-10" />
            <div className="w-10 h-10 rounded-md bg-[#fdf6e3] dark:bg-[#10141F] backdrop-blur-md border border-black/20 dark:border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.2)]">
              <Code2 size={20} className="text-[#2DD4BF]" />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              AI Assistant
            </h1>
          </div>

          <p className="text-[#6F7787] text-sm">
            Ask questions about Codezy and get answers using its knowledge base.
          </p>
        </motion.div>

        {/* SIDEBAR + AI AREA */}
        <div className="flex gap-4 items-start">
          {/* ================= SIDEBAR ================= */}
          <div className="w-64 shrink-0 bg-[#f8fafc] dark:bg-[#0B0E14] border border-black/10 dark:border-white/10 rounded-md p-4">
            {/* New Chat */}
            <button
              onClick={createAIConversation}
              className="w-full px-4 py-2 rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-[#fdf6e3] dark:bg-[#10141F] text-sm text-[#0f172a] dark:text-gray-300 transition"
            >
              + New Chat
            </button>

            {/* Title */}
            <p className="text-[#8B93A7] text-xs tracking-widest uppercase mt-6 mb-3">
              Conversations
            </p>

            {/* Conversations */}
            <div className="space-y-1 max-h-[450px] overflow-y-auto">
              {aiConversations.length === 0 ? (
                <p className="text-[#64748b] dark:text-[#5C6370] text-xs px-2 py-3">
                  No conversations yet.
                </p>
              ) : (
                aiConversations.map((conversation) => (
                  <button
                    key={conversation._id}
                    onClick={() => switchAIConversation(conversation._id)}
                    className={`
                                                w-full text-left px-3 py-2 rounded-md
                                                text-sm truncate transition
                                                ${
                                                  currentConversationId ===
                                                  conversation._id
                                                    ? "bg-[#fdf6e3] dark:bg-[#10141F] text-[#0f172a] dark:text-[#E6E8EB]"
                                                    : "text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:bg-white/5 hover:text-[#0f172a] dark:text-gray-200"
                                                }
                                            `}
                    title={conversation.title}
                  >
                    {conversation.title}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ================= AI CARD ================= */}
          <div className="flex-1 min-w-0">
            <div className="bg-[#fdf6e3] dark:bg-[#10141F] border border-black/10 dark:border-white/10 rounded-lg shadow-2xl overflow-hidden">
              {/* ================= TOP BAR ================= */}
              <div className="px-5 py-3 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-black/5 dark:bg-white/5 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF]" />

                  <span className="text-sm text-[#0f172a] dark:text-gray-200 font-medium tracking-wide">Codezy AI</span>
                </div>

                <span className="text-[10px] uppercase tracking-widest text-[#2DD4BF] bg-[#2DD4BF]/10 px-2 py-1 rounded-full border border-[#2DD4BF]/20">RAG powered</span>
              </div>

              {/* ================= QUESTION ================= */}
              <div className="p-5 border-b border-black/10 dark:border-white/10 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2DD4BF] opacity-5 blur-[60px] rounded-full pointer-events-none" />
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask something about Codezy..."
                  rows={4}
                  className="w-full resize-none bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-sm text-[#0f172a] dark:text-gray-200 placeholder:text-[#64748b] dark:text-[#5C6370] outline-none focus:border-[#2DD4BF]/50 focus:ring-1 focus:ring-[#2DD4BF]/30 transition-all shadow-inner"
                />

                {/* Bottom Controls */}
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className={`
                                            flex items-center gap-2 px-3 py-2 rounded-md text-xs transition
                                            ${
                                              showCode
                                                ? "bg-[#fdf6e3] dark:bg-[#10141F] text-[#0f172a] dark:text-[#E6E8EB] border border-black/20 dark:border-white/20"
                                                : "bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-black/10 dark:border-white/10 hover:bg-[#fdf6e3] dark:bg-[#10141F]"
                                            }
                                        `}
                  >
                    <Code2 size={14} />

                    {showCode ? "Hide Code" : "Attach Code"}
                  </button>

                  <button
                    onClick={handleAsk}
                    disabled={loading || !question.trim()}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <Send size={14} />

                    {loading ? "Thinking..." : "Ask AI"}
                  </button>
                </div>
              </div>

              {/* ================= CODE EDITOR ================= */}
              {showCode && (
                <div className="border-b border-black/10 dark:border-white/10">
                  <div className="px-4 py-2 bg-[#f8fafc] dark:bg-[#0B0E14] border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                    <span className="text-xs text-[#8B8FA3]">
                      Attached Code
                    </span>

                    <span className="text-xs text-[#64748b] dark:text-[#5C6370]">C++</span>
                  </div>

                  <Editor
                    height="300px"
                    defaultLanguage="cpp"
                    theme={theme === "dark" ? "vs-dark" : "vs-light"}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      minimap: {
                        enabled: false,
                      },
                      fontSize: 14,
                      lineNumbers: "on",
                      padding: {
                        top: 12,
                      },
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>
              )}

              {/* ================= RESPONSE ================= */}

{/* ================= RESPONSE ================= */}
<div className="p-5">

  <div className="flex items-center justify-between mb-3">

    <p className="text-[#8B93A7] text-xs tracking-widest uppercase">
      AI Response
    </p>

    {loading && (
      <span className="text-xs text-[#64748b] dark:text-[#5C6370]">
        Generating...
      </span>
    )}

  </div>

  <div className="bg-[#f8fafc] dark:bg-[#0B0E14] rounded-md p-6 max-h-[500px] overflow-y-auto border border-black/10 dark:border-white/10">

    {/* ================= CONVERSATION HISTORY ================= */}

    {aiHistory.length > 0 && (

      <div className="space-y-6">

        {aiHistory.map((message, index) => (

          <div key={index}>

            {/* USER MESSAGE */}
            {message.role === "user" && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.98 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="mb-6 flex flex-col items-end"
              >
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-[#64748b] dark:text-[#5C6370] text-[10px] uppercase tracking-widest font-semibold">You</p>
                </div>
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl rounded-tr-sm px-5 py-3 text-sm text-[#0f172a] dark:text-gray-200 shadow-lg max-w-[85%]">
                  {message.content}
                </div>
              </motion.div>
            )}

            {/* AI MESSAGE */}
            {message.role === "assistant" && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="mb-6 flex flex-col items-start"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded bg-[#fdf6e3] dark:bg-[#10141F] border border-black/20 dark:border-white/20 flex items-center justify-center">
                    <Code2 size={12} className="text-[#2DD4BF]" />
                  </div>
                  <p className="text-[#2DD4BF] text-[10px] uppercase tracking-widest font-semibold">Codezy AI</p>
                </div>
                <div className="text-sm text-[#0f172a] dark:text-gray-300 leading-relaxed bg-[#f8fafc] dark:bg-[#0B0E14] border border-black/5 dark:border-white/5 rounded-2xl rounded-tl-sm px-5 py-4 w-full shadow-md">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </motion.div>
            )}

          </div>

        ))}

      </div>

    )}

    {/* ================= CURRENT AI RESPONSE ================= */}

    {loading && !airesp ? (

      <div className="flex items-center gap-2 text-[#64748b] dark:text-[#5C6370] mt-6">

        <span className="animate-pulse">
          Thinking...
        </span>

        <span className="animate-pulse">
          ●
        </span>

        <span
          className="animate-pulse"
          style={{
            animationDelay: "150ms",
          }}
        >
          ●
        </span>

        <span
          className="animate-pulse"
          style={{
            animationDelay: "300ms",
          }}
        >
          ●
        </span>

      </div>

    ) : airesp ? (

      <div className="mt-6 flex flex-col items-start relative">
        {/* Glow effect while generating */}
        {loading && <div className="absolute top-10 left-10 w-48 h-48 bg-[#2DD4BF] opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />}
        
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded bg-[#2DD4BF]/20 border border-[#2DD4BF]/40 flex items-center justify-center shadow-[0_0_10px_rgba(45,212,191,0.2)]">
            <Code2 size={12} className="text-[#2DD4BF]" />
          </div>
          <p className="text-[#2DD4BF] text-[10px] uppercase tracking-widest font-semibold">
            Codezy AI
          </p>
        </div>

        <div className="text-sm text-[#0f172a] dark:text-gray-300 leading-relaxed bg-[#f8fafc] dark:bg-[#0B0E14] border border-[#2DD4BF]/10 rounded-2xl rounded-tl-sm px-5 py-4 w-full shadow-md transition-all duration-300">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {airesp}
          </ReactMarkdown>
          
          {/* Streaming Cursor */}
          {loading && (
            <span className="inline-block ml-1 w-2 h-4 bg-[#2DD4BF] animate-pulse rounded-sm align-middle shadow-[0_0_8px_#2DD4BF]"></span>
          )}
        </div>

        {/* Sources */}

        {!loading && airesources?.length > 0 && (

          <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">

            <p className="text-[#8B93A7] text-xs tracking-widest uppercase mb-3">
              Sources
            </p>

            <div className="flex flex-wrap gap-2">

              {airesources.map((source, index) => (

                <span
                  key={index}
                  className="px-3 py-1.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-gray-600 dark:text-gray-400"
                >
                  {source}
                </span>

              ))}

            </div>

          </div>

        )}

      </div>

    ) : aiHistory.length === 0 ? (

      /* ================= EMPTY STATE ================= */

      <div className="flex flex-col items-center justify-center py-16">

        <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-4">

          <Code2
            size={20}
            className="text-[#64748b] dark:text-[#5C6370]"
          />

        </div>

        <p className="text-[#64748b] dark:text-[#5C6370] text-sm">
          Ask a question to begin.
        </p>

      </div>

    ) : null}

  </div>

</div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ask;
