import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaRobot, FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaBookmark } from 'react-icons/fa';
import { Link, useLocation } from "react-router-dom";
import { useAuthstore } from "../src/store/useAuthstore.js";
import {FaQuestionCircle} from "react-icons/fa"
import { motion } from "framer-motion";

const Sidebar = () => {
  const { logout, authUser } = useAuthstore();
  const location = useLocation();

  // Helper to check active route
  const isActive = (path) => location.pathname === path;

 
  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="md:flex-[2_2_0]  bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white shadow-2xl"
    >
      <div className="h-screen flex flex-col border-r border-gray-800  sticky top-0 ">
        
        {/* Navigation */}
        <ul className="flex flex-col gap-3 mt-6 px-2">
          {[
            { to: "/Homepage", icon: <MdHomeFilled />, label: "Home" },
            { to: "/notifications", icon: <IoNotifications />, label: "Notifications" },
            { to: `/profile/${authUser?._id || authUser?.name}`, icon: <FaUser />, label: "Profile" },
            { to: "/Aipage", icon: <FaRobot />, label: "Ai-solver" },
            { to: "/Bookmarks", icon: <FaBookmark />, label: "My-Bookmarks" },
            { to: "/Posts", icon: <FaQuestionCircle />, label: "My-Doubts" },
          ].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={item.to}
                className={`flex gap-3 items-center py-2 pl-3 pr-5 rounded-xl transition-all duration-300 group ${
                  isActive(item.to)
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg scale-[1.02]"
                    : "hover:bg-gray-800"
                }`}
              >
                <span
                  className={`w-6 h-6 transition-transform duration-300 group-hover:scale-100 ${
                    isActive(item.to) ? "text-white" : "text-gray-300"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`hidden md:block text-base font-medium ${
                    isActive(item.to)
                      ? "text-white"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* User Section */}
        {authUser && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-auto mb-6 flex gap-2 items-center bg-gray-900/60 rounded-xl mx-3 p-2 hover:bg-gray-800/80 transition-all duration-300 shadow-md"
          >
            <div className="avatar hidden md:inline-flex">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-500 shadow-md"
              >
                <img
                  src={authUser?.profileImg || "/avatar-placeholder.png"}
                  alt="User Avatar"
                />
              </motion.div>
            </div>

            <div className="flex justify-between flex-1 items-center">
              <div className="hidden md:block">
                <p className="font-semibold text-sm truncate max-w-[100px]">
                  {authUser?.name}
                </p>
                <p className="text-gray-400 text-xs truncate">@{authUser?.name}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={logout}
                className="p-2 rounded-full hover:bg-red-600/80 transition-colors duration-300"
              >
                <BiLogOut className="w-5 h-5 text-gray-300 hover:text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;

