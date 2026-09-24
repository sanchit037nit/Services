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

  const handleclick = async (e) => {
    e.preventDefault();

    if (!formdata.email || !formdata.password) {
      return toast.error("All fields are required!");
    }

    await login(formdata);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen w-screen bg-[#f8fafc] dark:bg-[#0B0E14] text-[#0f172a] dark:text-[#E6E8EB] overflow-hidden font-mono">

      {/* subtle grid texture, consistent with landing page */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#E6E8EB 1px, transparent 1px), linear-gradient(90deg, #E6E8EB 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2DD4BF] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Login Card — styled as an editor window, not a glowing glass card */}
      <motion.form
        onSubmit={handleclick}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* tab bar, matches hero editor window */}
        <div className="flex items-center gap-2 px-4 py-3 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 backdrop-blur-md">
          <span className="w-3 h-3 rounded-full bg-[#F5A623]/70" />
          <span className="w-3 h-3 rounded-full bg-[#8B7FD6]/70" />
          <span className="w-3 h-3 rounded-full bg-[#2DD4BF]/70" />
          <span className="ml-4 text-xs text-[#8B8FA3]">login.js</span>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="ml-auto text-[#64748b] dark:text-[#5C6370] hover:text-[#0f172a] dark:text-[#E6E8EB] transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-sm">
            <span className="text-[#8B7FD6]">function</span>{" "}
            <span className="text-[#2DD4BF]">login</span>
            <span className="text-[#64748b] dark:text-[#5C6370]">() {"{"}</span>
          </p>

          {/* Email */}
          <div className="space-y-2 pl-4">
            <label className="text-xs text-[#8B8FA3] tracking-wide">
              email
            </label>
            <div className="flex items-center bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl px-3 focus-within:border-[#F5A623]/50 focus-within:ring-1 focus-within:ring-[#F5A623]/30 transition-all shadow-inner">
              <Mail className="text-[#64748b] dark:text-[#5C6370] w-4 h-4 shrink-0" />
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent w-full px-3 py-3 text-sm outline-none placeholder:text-[#64748b] dark:text-[#5C6370]"
                value={formdata.email}
                onChange={(e) =>
                  setformdata({ ...formdata, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2 pl-4">
            <label className="text-xs text-[#8B8FA3] tracking-wide">
              password
            </label>
            <div className="flex items-center bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl px-3 focus-within:border-[#F5A623]/50 focus-within:ring-1 focus-within:ring-[#F5A623]/30 transition-all shadow-inner">
              <Lock className="text-[#64748b] dark:text-[#5C6370] w-4 h-4 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-transparent w-full px-3 py-3 text-sm outline-none placeholder:text-[#64748b] dark:text-[#5C6370]"
                value={formdata.password}
                onChange={(e) =>
                  setformdata({ ...formdata, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-[#64748b] dark:text-[#5C6370]" />
                ) : (
                  <Eye className="w-4 h-4 text-[#64748b] dark:text-[#5C6370]" />
                )}
              </button>
            </div>
          </div>

          <p className="text-sm text-[#64748b] dark:text-[#5C6370]">{"}"}</p>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#F5A623] to-[#ffb43d] text-[#0B0E14] py-3.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all duration-300 mt-2"
          >
            Login
          </motion.button>

          {/* Signup */}
          <p className="text-center text-[#8B8FA3] text-sm">
            <span className="text-[#64748b] dark:text-[#5C6370]">// </span>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#2DD4BF] cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </motion.form>
    </div>
  );
};