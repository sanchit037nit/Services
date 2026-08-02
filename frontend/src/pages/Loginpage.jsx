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
    <div className="relative flex justify-center items-center min-h-screen w-screen bg-[#0B0E14] text-[#E6E8EB] overflow-hidden font-mono">

      {/* subtle grid texture, consistent with landing page */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#E6E8EB 1px, transparent 1px), linear-gradient(90deg, #E6E8EB 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Login Card — styled as an editor window, not a glowing glass card */}
      <motion.form
        onSubmit={handleclick}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md rounded-lg border border-white/10 bg-[#10141F] shadow-2xl overflow-hidden"
      >
        {/* tab bar, matches hero editor window */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0D1017] border-b border-white/5">
          <span className="w-3 h-3 rounded-full bg-[#F5A623]/70" />
          <span className="w-3 h-3 rounded-full bg-[#8B7FD6]/70" />
          <span className="w-3 h-3 rounded-full bg-[#2DD4BF]/70" />
          <span className="ml-4 text-xs text-[#8B8FA3]">login.js</span>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="ml-auto text-[#5C6370] hover:text-[#E6E8EB] transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-sm">
            <span className="text-[#8B7FD6]">function</span>{" "}
            <span className="text-[#2DD4BF]">login</span>
            <span className="text-[#5C6370]">() {"{"}</span>
          </p>

          {/* Email */}
          <div className="space-y-2 pl-4">
            <label className="text-xs text-[#8B8FA3] tracking-wide">
              email
            </label>
            <div className="flex items-center bg-[#0B0E14] border border-white/10 rounded-md px-3 focus-within:border-[#F5A623]/50 transition-colors">
              <Mail className="text-[#5C6370] w-4 h-4 shrink-0" />
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent w-full px-3 py-2.5 text-sm outline-none placeholder:text-[#5C6370]"
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
            <div className="flex items-center bg-[#0B0E14] border border-white/10 rounded-md px-3 focus-within:border-[#F5A623]/50 transition-colors">
              <Lock className="text-[#5C6370] w-4 h-4 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-transparent w-full px-3 py-2.5 text-sm outline-none placeholder:text-[#5C6370]"
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
                  <EyeOff className="w-4 h-4 text-[#5C6370]" />
                ) : (
                  <Eye className="w-4 h-4 text-[#5C6370]" />
                )}
              </button>
            </div>
          </div>

          <p className="text-sm text-[#5C6370]">{"}"}</p>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#F5A623] text-[#0B0E14] py-3 rounded-md font-semibold hover:bg-[#ffb43d] transition-colors"
          >
            Login
          </motion.button>

          {/* Signup */}
          <p className="text-center text-[#8B8FA3] text-sm">
            <span className="text-[#5C6370]">// </span>
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