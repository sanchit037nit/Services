import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthstore } from "../store/useAuthstore";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export const Loginpage = () => {
  const { login } = useAuthstore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="relative flex justify-center items-center min-h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-600 opacity-30 rounded-full blur-3xl animate-pulse"></div>

      {/* Login Card */}
      <motion.form
        onSubmit={handleclick}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl p-10 w-full max-w-md space-y-6"
      >

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Login
          </h2>

          <button
            onClick={() => navigate("/")}
            className="text-lg hover:text-red-400 transition"
          >
            ✕
          </button>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-gray-300 font-medium">Email</label>

          <div className="flex items-center bg-black/40 border border-gray-600 rounded-lg px-3">
            <Mail className="text-gray-400 w-5" />

            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent w-full px-3 py-2 outline-none"
              value={formdata.email}
              onChange={(e) =>
                setformdata({ ...formdata, email: e.target.value })
              }
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-gray-300 font-medium">Password</label>

          <div className="flex items-center bg-black/40 border border-gray-600 rounded-lg px-3">

            <Lock className="text-gray-400 w-5" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="bg-transparent w-full px-3 py-2 outline-none"
              value={formdata.password}
              onChange={(e) =>
                setformdata({ ...formdata, password: e.target.value })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 text-gray-400" />
              ) : (
                <Eye className="w-5 text-gray-400" />
              )}
            </button>

          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end text-sm">
          <button
            onClick={() => navigate("/forgot")}
            className="text-blue-400 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-500 transition"
        >
          Login
        </motion.button>

        {/* Signup */}
        <p className="text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>

      </motion.form>
    </div>
  );
};