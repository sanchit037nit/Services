import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Firstpage = () => {
  const navigate = useNavigate();

  const handlelogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handlesignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      
      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-red-600 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      
      {/* Glassmorphism card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl p-10 max-w-2xl w-full text-center"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-6xl font-extrabold mb-6"
        >
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-lg">
            Codezy
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-lg text-gray-300 mb-10 max-w-xl mx-auto"
        >
          A simple platform where you can explore solutions, bookmark them, and
          collaborate with others.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-6"
        >
          <button
            onClick={handlelogin}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300"
          >
            Login
          </button>
          <button
            onClick={handlesignup}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300"
          >
            Signup
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};




