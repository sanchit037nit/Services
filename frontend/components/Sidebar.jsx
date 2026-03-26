import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaRobot, FaUser, FaBookmark, FaQuestionCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthstore } from "../src/store/useAuthstore.js";
import { motion } from "framer-motion";

const SidebarWithNavbar = () => {
  const { authUser, logout, deleteaccount } = useAuthstore();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const navGroups = [
    {
      title: "Main",
      items: [
        { to: "/Homepage", icon: <MdHomeFilled />, label: "Home" },
        { to: "/profile", icon: <FaUser />, label: "Profile" },
      ],
    },
    {
      title: "Tools",
      items: [
        { to: "/Aipage", icon: <FaRobot />, label: "AI Solver" },
        { to: "/Bookmarks", icon: <FaBookmark />, label: "Bookmarks" },
      ],
    },
    {
      title: "Content",
      items: [
        { to: "/Posts", icon: <FaQuestionCircle />, label: "My Posts" },
      ],
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70 }}
        className="w-64 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white shadow-2xl flex flex-col"
      >
        <div className="px-6 py-5 text-xl font-bold tracking-wide border-b border-gray-800">
          Codezy
        </div>

        <div className="flex-1 overflow-y-auto px-4 mt-4 space-y-6">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <p className="text-xs uppercase text-gray-500 px-3 mb-2">
                {group.title}
              </p>
              <ul className="flex flex-col gap-2">
                {group.items.map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.03, x: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={item.to}
                      className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all duration-300 group ${
                        isActive(item.to)
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                          : "hover:bg-gray-800"
                      }`}
                    >
                      <span className={`text-lg ${isActive(item.to) ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                        {item.icon}
                      </span>
                      <span className={`hidden md:block text-sm font-medium ${isActive(item.to) ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* User Section */}
        {authUser && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="m-4 p-4 rounded-2xl bg-gray-900/70 backdrop-blur border border-gray-800 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                src={authUser?.profilephoto || "/avatar-placeholder.png"}
                className="w-12 h-12 rounded-full ring-2 ring-blue-500"
                alt="avatar"
              />
              <div className="flex-1 hidden md:block">
                <p className="text-sm font-semibold truncate">{authUser?.name}</p>
                <p className="text-xs text-gray-400 truncate">@{authUser?.name}</p>
              </div>
              <div className="flex gap-2">
                <motion.button whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }} onClick={logout} className="p-2 rounded-full hover:bg-red-600/80">
                  <BiLogOut className="w-5 h-5 text-gray-300 hover:text-white" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }} onClick={deleteaccount} className="p-2 rounded-full hover:bg-red-800/80">
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>


    </div>
  );
};

export default SidebarWithNavbar;