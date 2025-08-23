import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

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
    <div className="min-h-screen w-full bg-gray-900 text-white items-center justify-center px-4">
      <div>
        <Navbar/>
      </div>
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to <span className="text-blue-400">MyApp</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
          A simple platform where you can explore solutions, bookmark them, and
          collaborate with others.
        </p>

        <div className="space-x-4">
          <button
            onClick={handlelogin}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg transition"
          >
            Login
          </button>
          <button
            onClick={handlesignup}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-lg transition"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};



