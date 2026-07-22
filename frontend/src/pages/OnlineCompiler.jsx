import { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  FaPlay,
  FaCopy,
  FaTrash,
  FaDownload,
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
  javascript: `console.log("Hello Codezy");`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Codezy!");
    }
}`,
};

export default function Compiler() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(defaultCode.cpp);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLanguage = (lang) => {
    setLanguage(lang);
    setCode(defaultCode[lang]);
    setOutput("");
  };

  const runCode = async () => {
    setLoading(true);

    try {
      // Backend integration will be added in Step 3

      setTimeout(() => {
        setOutput("Backend not connected yet.");
        setLoading(false);
      }, 1000);
    } catch (err) {
      setOutput("Something went wrong.");
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Copied!");
  };

  const clearOutput = () => {
    setOutput("");
  };

  const resetCode = () => {
    setCode(defaultCode[language]);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = `code.${language}`;

    a.click();
  };

  return (
    <div className="compiler-page">

      <div className="compiler-topbar">

        <h2 className="compiler-title">💻 Codezy Compiler</h2>

              <select
          className="compiler-language"
          value={language}
          onChange={(e) => handleLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
        </select>

      </div>

      <div className="compiler-toolbar">

        <button onClick={runCode}>
          <FaPlay />
          Run
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
          Clear Output
        </button>

      </div>

      <Editor
        height="500px"
        language={language === "cpp" ? "cpp" : language}
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          automaticLayout: true,
        }}
      />

      <div className="compiler-input">

        <h3>Custom Input</h3>

        <textarea
          rows={5}
          value={input}
          placeholder="Enter stdin..."
          onChange={(e) => setInput(e.target.value)}
        />

      </div>

      <div className="compiler-output">

        <div className="output-header">

          <h3>Output</h3>

          {loading && <span>Running...</span>}

        </div>

        <pre>{output}</pre>

      </div>

    </div>
  );
}