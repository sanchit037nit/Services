import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthstore } from "../src/store/useAuthstore.js";
import { IoNotifications } from "react-icons/io5";
import { FaUser, FaRobot, FaBookmark, FaQuestionCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, logout, deleteaccount } = useAuthstore();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const handleAccountDelete = (e) => {
    e.preventDefault();
    deleteaccount();
  };

  const navItems = [
    { title: "Home", path: "/Homepage", icon: <FaUser />, user: true },
    { title: "Profile", path: "/profile", icon: <FaUser />, user: true },
    { title: "AI Solver", path: "/Aipage", icon: <FaRobot />, user: true },
    { title: "Bookmarks", path: "/Bookmarks", icon: <FaBookmark />, user: true },
    { title: "My Posts", path: "/Posts", icon: <FaQuestionCircle />, user: true },
    { title: "Login", path: "/login", user: false },
    { title: "Signup", path: "/signup", user: false },
    { title: "Logout", action: handleLogout, user: true },
    { title: "Delete Account", action: handleAccountDelete, user: true },
  ];

  return (
    <div className="flex flex-wrap justify-between items-center px-8 py-5 text-black shadow-md bg-white sticky top-0 z-50">
      {/* Logo & Title */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold tracking-wide text-amber-400">
          🔐
        </span>
        <h1 className="text-2xl font-bold">PASSGEN</h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 flex-wrap items-center">
        {navItems
          .filter((item) => (authUser ? item.user : !item.user))
          .map((item) => (
            <motion.button
              key={item.title}
              onClick={item.action ? item.action : () => navigate(item.path)}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-amber-400 hover:text-gray-900 transition-colors duration-300"
            >
              {item.icon && <span className="text-lg">{item.icon}</span>}
              {item.title}
            </motion.button>
          ))}

        {/* Notification Icon */}
        {authUser && (
          <motion.button
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            <IoNotifications className="w-6 h-6 text-gray-700" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
