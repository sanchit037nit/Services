import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSolution } from "../store/useSolutionstore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Editor from "@monaco-editor/react";

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

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-y-auto">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >

        <h1 className="text-4xl font-bold text-center mb-8">
           AI Coding Assistant
        </h1>

        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6">

          {/* Question */}

          <label className="block mb-2 text-lg font-semibold">
            Ask your question
          </label>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            placeholder="Example:
• Explain this code
• Why am I getting TLE?
• Find the bug
• Optimize my solution"
            className="w-full rounded-xl bg-gray-900 border border-gray-700 p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />

          {/* Toggle */}

          <div className="mt-5 flex items-center justify-between">

            <button
              onClick={() => setShowCode(!showCode)}
              className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg"
            >
              {showCode ? "Hide Code Editor" : "📎 Attach Code"}
            </button>

            {showCode && (
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2"
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

            <div className="mt-5 border border-gray-700 rounded-xl overflow-hidden">

              <Editor
                height="350px"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: {
                    enabled: false,
                  },
                  fontSize: 15,
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
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-xl py-3 font-bold text-lg transition"
          >
            {loading ? "Thinking..." : "🚀 Ask AI"}
          </button>

          {/* Response */}

          <div className="mt-8">

            <h2 className="text-xl font-semibold mb-3">
              AI Response
            </h2>

            <div className="bg-gray-900 rounded-xl p-6 max-h-[500px] overflow-y-auto border border-gray-700">

              {loading ? (

                <div className="animate-pulse text-gray-400">
                  Thinking...
                </div>

              ) : (

                <div className="prose prose-invert max-w-none">

                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {airesp || "Ask a question to begin."}
                  </ReactMarkdown>

                </div>

              )}

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default Aipage;