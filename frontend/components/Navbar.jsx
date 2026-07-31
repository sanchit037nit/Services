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
  const isAdmin = authUser?.role === "admin";

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const handleAccountDelete = (e) => {
    e.preventDefault();
    deleteaccount();
  };

const navItems = [
  // User Routes
  {
    title: "Home",
    path: "/Homepage",
    icon: <FaUser />,
    auth: true,
    role: "user",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <FaUser />,
    auth: true,
    role: "user",
  },
  {
    title: "AI Solver",
    path: "/Aipage",
    icon: <FaRobot />,
    auth: true,
    role: "user",
  },
  {
    title: "Bookmarks",
    path: "/Bookmarks",
    icon: <FaBookmark />,
    auth: true,
    role: "user",
  },
  {
    title: "My Posts",
    path: "/Posts",
    icon: <FaQuestionCircle />,
    auth: true,
    role: "user",
  },

  // Admin Routes
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <FaUser />,
    auth: true,
    role: "admin",
  },
  {
    title: "Reported Posts",
    path: "/admin/reports",
    icon: <FaQuestionCircle />,
    auth: true,
    role: "admin",
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <FaUser />,
    auth: true,
    role: "admin",
  },

  // Guest Routes
  {
    title: "Login",
    path: "/login",
    auth: false,
  },
  {
    title: "Signup",
    path: "/signup",
    auth: false,
  },

  // Common Authenticated Routes
  {
    title: "Logout",
    action: handleLogout,
    auth: true,
    role: "all",
  },
  {
    title: "Delete Account",
    action: handleAccountDelete,
    auth: true,
    role: "all",
  },
];

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
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
          .filter((item) => {

  // Guest
  if (!authUser) {
    return !item.auth;
  }

  // Logged-in users
  if (item.role === "all") {
    return true;
  }

  return item.role === authUser.role;
})
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
