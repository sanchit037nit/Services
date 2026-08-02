import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSolution } from "../store/useSolutionstore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Editor from "@monaco-editor/react";
import { FaPaperclip, FaTimes } from "react-icons/fa";

const Aipage = () => {
  const { aires, airesp } = useSolution();

  const [question, setQuestion] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const sendMessage = async () => {
    if (!question.trim() && !code.trim()) return;

    setLoading(true);

    const prompt = `
Question:
${question}

${showCode && code.trim()
        ? `
Language:
${language}

Code:
\`\`\`${language}
${code}
\`\`\`
`
        : ""}
`;

    await aires(prompt);

    setLoading(false);
  };

  // Custom renderers so fenced code blocks in the AI response match
  // the app's editor-theme palette instead of default prose styling.
  const markdownComponents = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      if (inline) {
        return (
          <code
            className="bg-[#0B0E14] border border-white/10 text-[#2DD4BF] px-1.5 py-0.5 rounded text-[0.85em]"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <div className="my-4 rounded-md border border-white/10 overflow-hidden">
          {match && (
            <div className="px-4 py-2 bg-[#0D1017] border-b border-white/5 text-xs text-[#8B8FA3]">
              {match[1]}
            </div>
          )}
          <pre className="bg-[#0B0E14] p-4 overflow-x-auto m-0">
            <code className="text-[#2DD4BF] text-sm leading-relaxed" {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    },
    p({ children }) {
      return <p className="text-[#E6E8EB] leading-relaxed mb-3">{children}</p>;
    },
    h1({ children }) {
      return <h1 className="text-lg font-bold text-[#E6E8EB] mt-5 mb-2">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-base font-bold text-[#E6E8EB] mt-4 mb-2">{children}</h2>;
    },
    h3({ children }) {
      return <h3 className="text-sm font-bold text-[#8B8FA3] tracking-wide mt-4 mb-1.5">{children}</h3>;
    },
    ul({ children }) {
      return <ul className="list-disc list-inside text-[#E6E8EB] space-y-1 mb-3">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="list-decimal list-inside text-[#E6E8EB] space-y-1 mb-3">{children}</ol>;
    },
    strong({ children }) {
      return <strong className="text-[#F5A623] font-semibold">{children}</strong>;
    },
    a({ children, href }) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className="text-[#2DD4BF] hover:underline">
          {children}
        </a>
      );
    },
    blockquote({ children }) {
      return (
        <blockquote className="border-l-2 border-[#8B7FD6]/40 pl-4 text-[#8B8FA3] italic my-3">
          {children}
        </blockquote>
      );
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0E14] text-[#E6E8EB] overflow-y-auto font-mono">

      {/* subtle grid texture, consistent with the rest of the app */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#E6E8EB 1px, transparent 1px), linear-gradient(90deg, #E6E8EB 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-10"
      >

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <span className="text-[#F5A623]">&gt;</span> ai_assistant
          </h1>
          <p className="text-sm text-[#8B8FA3] mt-1">
            <span className="text-[#5C6370]">// </span>ask questions, attach code, get answers
          </p>
        </div>

        <div className="bg-[#10141F] border border-white/10 rounded-lg shadow-2xl overflow-hidden">

          {/* tab bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0D1017] border-b border-white/5">
            <span className="w-3 h-3 rounded-full bg-[#F5A623]/70" />
            <span className="w-3 h-3 rounded-full bg-[#8B7FD6]/70" />
            <span className="w-3 h-3 rounded-full bg-[#2DD4BF]/70" />
            <span className="ml-4 text-xs text-[#8B8FA3]">ask.js</span>
          </div>

          <div className="p-6">

            {/* Question */}
            <label className="block mb-2 text-xs text-[#8B8FA3] tracking-wide">
              your question
            </label>

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              placeholder="Example:&#10;• Explain this code&#10;• Why am I getting TLE?&#10;• Find the bug&#10;• Optimize my solution"
              className="w-full rounded-md bg-[#0B0E14] border border-white/10 p-4 text-sm text-[#E6E8EB] outline-none focus:border-[#F5A623]/50 transition-colors resize-none placeholder:text-[#5C6370]"
            />

            {/* Toggle */}
            <div className="mt-4 flex items-center justify-between">

              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 border border-white/10 hover:border-white/25 text-[#E6E8EB] px-4 py-2 rounded-md text-sm transition-colors"
              >
                {showCode ? <FaTimes className="w-3.5 h-3.5" /> : <FaPaperclip className="w-3.5 h-3.5" />}
                {showCode ? "Remove code" : "Attach code"}
              </button>

              {showCode && (
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-[#0B0E14] border border-white/10 rounded-md px-3 py-2 text-sm text-[#E6E8EB] outline-none focus:border-[#F5A623]/50 transition-colors"
                >
                  <option value="cpp">C++</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="javascript">JavaScript</option>
                  <option value="c">C</option>
                </select>
              )}

            </div>

            {/* Monaco Editor */}
            {showCode && (
              <div className="mt-4 border border-white/10 rounded-md overflow-hidden">
                <Editor
                  height="300px"
                  language={language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>
            )}

            {/* Ask */}
            <button
              onClick={sendMessage}
              disabled={loading}
              className="mt-6 w-full bg-[#F5A623] hover:bg-[#ffb43d] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B0E14] rounded-md py-3 font-semibold text-sm transition-colors"
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>

            {/* Response */}
            <div className="mt-8">

              <h2 className="text-xs text-[#8B8FA3] tracking-wide mb-3">
                ai response
              </h2>

              <div className="bg-[#0B0E14] rounded-md p-6 max-h-[500px] overflow-y-auto border border-white/10">

                {loading ? (
                  <div className="flex items-center gap-2 text-[#5C6370]">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                ) : airesp ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {airesp}
                  </ReactMarkdown>
                ) : (
                  <p className="text-[#5C6370] text-sm">Ask a question to begin.</p>
                )}

              </div>

            </div>

          </div>
        </div>

      </motion.div>

    </div>
  );
};

export default Aipage;