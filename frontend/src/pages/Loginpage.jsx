import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthstore } from "../store/useAuthstore";
import { motion } from "framer-motion";

export const Loginpage = () => {
  const { login } = useAuthstore();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const handleclick = (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      return toast.error("All fields are required!");
    }
    login(formdata);
  };

  const navigate = useNavigate();
  const handlecross = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden w-full">
      
      {/* Animated background blobs (same as Firstpage) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-red-600 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>

      {/* Login Form Card */}
      <motion.form
        onSubmit={handleclick}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Login
          </h2>
          <button
            onClick={handlecross}
            className="flex items-center justify-center w-8 h-8 bg-gray-200/20 rounded-full hover:bg-red-500/30 transition-colors duration-200 text-lg"
          >
            ❌
          </button>
        </div>

        {/* Email Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-lg font-semibold text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-500 bg-black/40 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            placeholder="Enter your email"
            value={formdata.email}
            onChange={(e) =>
              setformdata({ ...formdata, email: e.target.value })
            }
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-lg font-semibold text-gray-200">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-500 bg-black/40 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            placeholder="Enter your password"
            value={formdata.password}
            onChange={(e) =>
              setformdata({ ...formdata, password: e.target.value })
            }
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition duration-300"
        >
          Submit
        </motion.button>
      </motion.form>
    </div>
  );
};
