import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { Typewriter } from "react-simple-typewriter";

export const Firstpage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0B0E14] text-[#E6E8EB] overflow-hidden font-mono">

      {/* subtle grid texture instead of glowing particles */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#E6E8EB 1px, transparent 1px), linear-gradient(90deg, #E6E8EB 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Particles
        className="absolute inset-0 pointer-events-none"
        options={{
          particles: {
            number: { value: 25 },
            size: { value: 1.5 },
            move: { speed: 0.3 },
            opacity: { value: 0.25, color: "#8B7FD6" },
            links: { enable: false },
            color: { value: "#8B7FD6" },
          },
        }}
      />

      {/* NAVBAR */}
      <nav className="relative z-10 flex justify-between items-center px-8 md:px-12 py-6 border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-[#F5A623]">&gt;</span> codezy
          <span className="animate-pulse text-[#F5A623]">_</span>
        </h1>
        <div className="flex gap-6 text-sm text-[#8B8FA3]">
          <button
            onClick={() => navigate("/login")}
            className="hover:text-[#E6E8EB] transition-colors"
          >
            login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-1.5 rounded border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623]/10 transition-colors"
          >
            sign_up()
          </button>
        </div>
      </nav>

      {/* HERO — mock editor window */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-24 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl rounded-lg border border-white/10 bg-[#10141F] shadow-2xl overflow-hidden text-left"
        >
          {/* tab bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0D1017] border-b border-white/5">
            <span className="w-3 h-3 rounded-full bg-[#F5A623]/70" />
            <span className="w-3 h-3 rounded-full bg-[#8B7FD6]/70" />
            <span className="w-3 h-3 rounded-full bg-[#2DD4BF]/70" />
            <span className="ml-4 text-xs text-[#8B8FA3]">welcome.js</span>
          </div>

          {/* code body */}
          <div className="px-6 py-8 text-lg leading-relaxed">
            <p className="text-[#5C6370]">// a home for developers</p>
            <p className="mt-1">
              <span className="text-[#8B7FD6]">const</span>{" "}
              <span className="text-[#E6E8EB]">welcome</span>{" "}
              <span className="text-[#5C6370]">=</span>{" "}
              <span className="text-[#2DD4BF]">
                "
                <Typewriter
                  words={["Welcome to Codezy"]}
                  loop={false}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={0}
                  delaySpeed={100000}
                />
                "
              </span>
              <span className="text-[#5C6370]">;</span>
            </p>
          </div>
        </motion.div>

        <p className="text-[#8B8FA3] text-base max-w-xl mt-10 mb-10">
          Explore coding solutions, bookmark algorithms, and collaborate with
          developers — all in one place.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3.5 bg-[#F5A623] text-[#0B0E14] rounded-md font-semibold hover:bg-[#ffb43d] transition-colors"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3.5 border border-white/15 rounded-md hover:border-white/40 transition-colors"
          >
            Login
          </button>
        </div>
      </div>

      {/* FEATURES — file-tree style panels */}
      <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6 pb-24">
        <FeatureCard
          icon="01"
          title="Explore Solutions"
          desc="Browse coding problems and discover multiple approaches."
        />
        <FeatureCard
          icon="02"
          title="Bookmark Algorithms"
          desc="Save important solutions and revisit them anytime."
        />
        <FeatureCard
          icon="03"
          title="Collaborate"
          desc="Discuss solutions and learn from other developers."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: "rgba(245,166,35,0.35)" }}
      transition={{ type: "spring", stiffness: 250 }}
      className="bg-[#10141F] p-6 rounded-lg border border-white/10"
    >
      <span className="text-xs text-[#5C6370]">{icon}</span>
      <h2 className="text-base font-semibold mt-2 mb-2 text-[#E6E8EB]">
        {title}
      </h2>
      <p className="text-sm text-[#8B8FA3] leading-relaxed">{desc}</p>
    </motion.div>
  );
};