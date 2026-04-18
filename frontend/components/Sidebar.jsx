import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { FaRobot, FaUser, FaBookmark, FaQuestionCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useAuthstore } from "../src/store/useAuthstore.js";
import { motion } from "framer-motion";

const SidebarWithNavbar = () => {
  const { authUser, logout, deleteaccount } = useAuthstore();
  const location = useLocation();

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
      items: [{ to: "/Posts", icon: <FaQuestionCircle />, label: "My Posts" }],
    },
  ];

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="w-64  overflow-y-auto bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white shadow-2xl flex flex-col"
    >
      {/* Logo */}
      <div className="px-6 py-5 text-xl font-bold border-b border-gray-800">
        Codezy
      </div>

      {/* NAV */}
      <div className="flex-1  px-4 mt-4 space-y-6">
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

      {/* USER */}
      {authUser && (
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <span className="text-sm">{authUser.name}</span>

          <div className="flex gap-2">
            <button onClick={logout}>
              <BiLogOut />
            </button>
            <button onClick={deleteaccount} className="text-red-500">
              X
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SidebarWithNavbar;