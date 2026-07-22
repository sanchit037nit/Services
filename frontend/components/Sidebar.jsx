import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { FaRobot, FaBookmark, FaQuestionCircle } from "react-icons/fa";
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
      ],
    },
    {
      title: "Tools",
      items: [
        { to: "/Aipage", icon: <FaRobot />, label: "AI Solver" },
        { to: "/compiler", icon: <FaRobot />, label: "Compiler" },
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
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="w-64 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white shadow-2xl flex flex-col"
    >
      {/* Logo */}
      <div className="px-6 py-5 text-xl font-bold border-b border-gray-800">
        Codezy
      </div>

      {/* NAV */}
      <div className="flex-1 px-4 mt-4 space-y-6 overflow-y-auto">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <p className="text-xs uppercase text-gray-500 px-3 mb-2">
              {group.title}
            </p>

            <ul className="flex flex-col gap-2">
              {group.items.map((item, index) => (
                <motion.li key={index} whileHover={{ scale: 1.03, x: 6 }}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 py-2.5 px-4 rounded-xl ${
                      isActive(item.to)
                        ? "bg-blue-600"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* USER SECTION */}
      {authUser && (
        <div className="border-t border-gray-800 bg-gray-900">
          
          {/* Profile */}
          <div
            onClick={() => navigate("/profile")}
            className="p-4 flex items-center cursor-pointer hover:bg-gray-800 transition"
            title="profile"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-white font-semibold">
              {authUser.name?.[0]}
            </div>

            <span className="ml-3 text-sm font-medium truncate">
              {authUser.name}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 p-4 pt-0">
            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-gray-800 transition"
              title="Logout"
            >
              <BiLogOut className="text-lg text-gray-300" />
            </button>

            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete your account?"
                );
                if (confirmDelete) deleteaccount();
              }}
              className="px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              title="Delete Account"
            >
              Delete
            </button>
          </div>

        </div>
      )}
    </motion.div>
  );
};

export default SidebarWithNavbar;