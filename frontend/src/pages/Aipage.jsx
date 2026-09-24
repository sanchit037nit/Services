import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Editor from "@monaco-editor/react";
import { Send, Code2 } from "lucide-react";

import { useSolution } from "../store/useSolutionstore";
import { markdownComponents } from "../components/MarkdownComponents";

const Ask = () => {

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
    <div className="min-h-screen bg-[#07090D] text-white relative overflow-hidden">
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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
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
          <div className="w-64 shrink-0 bg-[#0B0E14] border border-white/10 rounded-md p-4">
            {/* New Chat */}
            <button
              onClick={createAIConversation}
              className="w-full px-4 py-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition"
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
                <p className="text-[#5C6370] text-xs px-2 py-3">
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
                                                    ? "bg-white/10 text-white"
                                                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
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
            <div className="bg-[#10141F] border border-white/10 rounded-lg shadow-2xl overflow-hidden">
              {/* ================= TOP BAR ================= */}
              <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-[#0D1017]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2DD4BF]" />

                  <span className="text-sm text-gray-300">Codezy AI</span>
                </div>

                <span className="text-xs text-[#5C6370]">RAG powered</span>
              </div>

              {/* ================= QUESTION ================= */}
              <div className="p-5 border-b border-white/10">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask something about Codezy..."
                  rows={4}
                  className="w-full resize-none bg-[#0B0E14] border border-white/10 rounded-md px-4 py-3 text-sm text-gray-200 placeholder:text-[#5C6370] outline-none focus:border-white/20 transition"
                />

                {/* Bottom Controls */}
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className={`
                                            flex items-center gap-2 px-3 py-2 rounded-md text-xs transition
                                            ${
                                              showCode
                                                ? "bg-white/10 text-white border border-white/20"
                                                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
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
                <div className="border-b border-white/10">
                  <div className="px-4 py-2 bg-[#0D1017] border-b border-white/5 flex items-center justify-between">
                    <span className="text-xs text-[#8B8FA3]">
                      Attached Code
                    </span>

                    <span className="text-xs text-[#5C6370]">C++</span>
                  </div>

                  <Editor
                    height="300px"
                    defaultLanguage="cpp"
                    theme="vs-dark"
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
      <span className="text-xs text-[#5C6370]">
        Generating...
      </span>
    )}

  </div>

  <div className="bg-[#0B0E14] rounded-md p-6 max-h-[500px] overflow-y-auto border border-white/10">

    {/* ================= CONVERSATION HISTORY ================= */}

    {aiHistory.length > 0 && (

      <div className="space-y-6">

        {aiHistory.map((message, index) => (

          <div key={index}>

            {/* USER MESSAGE */}

            {message.role === "user" && (

              <div className="mb-3">

                <p className="text-[#5C6370] text-xs uppercase tracking-widest mb-2">
                  You
                </p>

                <div className="bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-gray-200">
                  {message.content}
                </div>

              </div>

            )}

            {/* AI MESSAGE */}

            {message.role === "assistant" && (

              <div>

                <p className="text-[#5C6370] text-xs uppercase tracking-widest mb-2">
                  Codezy AI
                </p>

                <div className="text-sm text-gray-300 leading-relaxed">

                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {message.content}
                  </ReactMarkdown>

                </div>

              </div>

            )}

          </div>

        ))}

      </div>

    )}

    {/* ================= CURRENT AI RESPONSE ================= */}

    {loading && !airesp ? (

      <div className="flex items-center gap-2 text-[#5C6370] mt-6">

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

      <div className="mt-6">

        <p className="text-[#5C6370] text-xs uppercase tracking-widest mb-2">
          Codezy AI
        </p>

        {/* Markdown Answer */}

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {airesp}
        </ReactMarkdown>

        {/* Streaming Cursor */}

        {loading && (
          <span className="inline-block ml-1 text-[#8B93A7] animate-pulse">
            ▌
          </span>
        )}

        {/* Sources */}

        {!loading && airesources?.length > 0 && (

          <div className="mt-6 pt-4 border-t border-white/10">

            <p className="text-[#8B93A7] text-xs tracking-widest uppercase mb-3">
              Sources
            </p>

            <div className="flex flex-wrap gap-2">

              {airesources.map((source, index) => (

                <span
                  key={index}
                  className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400"
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

        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">

          <Code2
            size={20}
            className="text-[#5C6370]"
          />

        </div>

        <p className="text-[#5C6370] text-sm">
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
