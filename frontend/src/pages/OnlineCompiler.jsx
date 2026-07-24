import { useState } from "react";
import { axiosinstance } from "../lib/axios";
import Editor from "@monaco-editor/react";
import '../assets/Compiler.css'

import {
  FaPlay,
  FaCopy,
  FaDownload,
  FaTrash,
  FaUndo,
} from "react-icons/fa";

import "../assets/Compiler.css";

const defaultCode = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello Codezy!";
    return 0;
}`,

  c: `#include <stdio.h>

int main() {
    printf("Hello Codezy!");
    return 0;
}`,

  python: `print("Hello Codezy!")`,

  javascript: `console.log("Hello Codezy!");`,

  java: `public class Main {

    public static void main(String[] args) {

        System.out.println("Hello Codezy!");

    }

}`,
};

const extensions = {
  cpp: "cpp",
  c: "c",
  java: "java",
  python: "py",
  javascript: "js",
};

export default function Compiler() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(defaultCode.cpp);

  const [input, setInput] = useState("");

  const [output, setOutput] = useState("");

  const [error, setError] = useState("");

  const [status, setStatus] = useState("");

  const [executionTime, setExecutionTime] = useState("");

  const [memory, setMemory] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLanguage = (lang) => {
    setLanguage(lang);
    setCode(defaultCode[lang]);

    setOutput("");
    setError("");
    setStatus("");
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    alert("Code Copied!");
  };

  const clearOutput = () => {
    setOutput("");
    setError("");
    setStatus("");
    setExecutionTime("");
    setMemory("");
  };

  const resetCode = () => {
    setCode(defaultCode[language]);
  };

  const downloadCode = () => {
    const blob = new Blob([code], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `code.${extensions[language]}`;

    a.click();

    URL.revokeObjectURL(url);
  };

  const runCode = async () => {
    try {
      setLoading(true);

      setOutput("");

      setError("");

      setStatus("Submitting...");

      const { data } = await axiosinstance.post(
        "/sol/run",
        {
          language,
          code,
          input,
        }
      );

      pollResult(data.token);
    } catch (err) {
      setLoading(false);

      setStatus("");

      setError(
        err.response?.data?.error ||
          err.message ||
          "Something went wrong."
      );
    }
  };

  const pollResult = (token) => {
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const { data } = await axiosinstance.get(
          `/sol/status/${token}`
        );

        setStatus(data.status.description);

        if (data.status.id <= 2) {
          if (attempts >= 20) {
            clearInterval(interval);

            setLoading(false);

            setError("Execution timeout.");
          }

          return;
        }

        clearInterval(interval);

        setLoading(false);

        setOutput(data.stdout || "");

        setError(
          data.compile_output ||
            data.stderr ||
            ""
        );

        setExecutionTime(data.time);

        setMemory(data.memory);
      } catch (err) {
        clearInterval(interval);

        setLoading(false);

        setError("Unable to fetch result.");
      }
    }, 1000);
  };

  return (
    <div className="compiler-page">

      {/* ================= TOP BAR ================= */}

      <div className="compiler-topbar">

        <h2 className="compiler-title">
          💻 Codezy Online Compiler
        </h2>

        <select
          value={language}
          onChange={(e) => handleLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

      </div>

      {/* ================= TOOLBAR ================= */}

      <div className="compiler-toolbar">

        <button
          onClick={runCode}
          disabled={loading}
        >
          <FaPlay />

          {loading ? "Running..." : "Run"}
        </button>

        <button onClick={copyCode}>
          <FaCopy />
          Copy
        </button>

        <button onClick={downloadCode}>
          <FaDownload />
          Download
        </button>

        <button onClick={resetCode}>
          <FaUndo />
          Reset
        </button>

        <button onClick={clearOutput}>
          <FaTrash />
          Clear
        </button>

      </div>

      {/* ================= IDE ================= */}

      <div className="compiler-main">

        {/* LEFT */}

        <div className="editor-section">

          <Editor
            height="100%"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(value) =>
              setCode(value || "")
            }
            options={{
              fontSize: 16,
              minimap: {
                enabled: false,
              },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              tabSize: 4,
              roundedSelection: true,
            }}
          />

        </div>

        {/* RIGHT */}

        <div className="right-panel">

          {/* INPUT */}

          <div className="panel-card">

            <h3>Input</h3>

            <textarea
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              placeholder="Enter custom input..."
            />

          </div>

          {/* STATUS */}

          <div className="panel-card stats-card">

            <div>

              <span>Status</span>

              <h4>{status || "--"}</h4>

            </div>

            <div>

              <span>Time</span>

              <h4>

                {executionTime
                  ? `${executionTime}s`
                  : "--"}

              </h4>

            </div>

            <div>

              <span>Memory</span>

              <h4>

                {memory
                  ? `${memory} KB`
                  : "--"}

              </h4>

            </div>

          </div>

          {/* OUTPUT */}

          <div className="panel-card output-card">

            <h3>Output</h3>

            <pre>

              {output ||
                "Run your program to see output..."}

            </pre>

          </div>

          {/* ERROR */}

          <div className="panel-card error-card">

            <h3>Error</h3>

            <pre>

              {error || "No Errors"}

            </pre>

          </div>

        </div>

      </div>

    </div>
  );
}