import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { Typewriter } from "react-simple-typewriter";

export const Firstpage = () => {
  const navigate = useNavigate();

  return (
   <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white overflow-hidden">
      
      {/* PARTICLE BACKGROUND */}
      <Particles
        className="absolute inset-0"
        options={{
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            move: { speed: 1 },
            opacity: { value: 0.4 },
            links: {
              enable: true,
              color: "#3b82f6",
              distance: 150,
              opacity: 0.3
            }
          }
        }}
      />

      {/* NAVBAR */}
      <nav className="relative z-10 flex justify-between items-center px-12 py-6">
        <h1 className="text-2xl font-bold">
          Code<span className="text-blue-400">zy</span>
        </h1>


      </nav>

      {/* HERO SECTION */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-32 px-6">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-extrabold mb-6"
        >
          Welcome to{" "}
          <span className="text-blue-400">
            <Typewriter
              words={["Codezy"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={120}
              deleteSpeed={80}
              delaySpeed={2000}
            />
          </span>
        </motion.h1>

        <p className="text-gray-300 text-xl max-w-2xl mb-10">
          Explore coding solutions, bookmark algorithms,
          and collaborate with developers.
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => navigate("/signup")}
            className="px-10 py-4 bg-blue-500 rounded-xl text-lg font-semibold hover:bg-blue-600 transform hover:scale-105 transition shadow-lg"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-10 py-4 border border-gray-400 rounded-xl hover:bg-white hover:text-black transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="relative z-10 mt-40 grid md:grid-cols-3 gap-10 px-16 pb-20">

        <FeatureCard
          title="Explore Solutions"
          desc="Browse coding problems and discover multiple approaches."
        />

        <FeatureCard
          title="Bookmark Algorithms"
          desc="Save important solutions and revisit them anytime."
        />

        <FeatureCard
          title="Collaborate"
          desc="Discuss solutions and learn from other developers."
        />

      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc }) => {
  return (
    <motion.div
      whileHover={{ rotateX: 5, rotateY: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/10"
    >
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <p className="text-gray-300">{desc}</p>
    </motion.div>
  );
};