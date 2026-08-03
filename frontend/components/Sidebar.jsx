import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { FaRobot, FaCode, FaBookmark, FaQuestionCircle } from "react-icons/fa";
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
      title: "main",
      items: [
        { to: "/Homepage", icon: <MdHomeFilled />, label: "Home" },
      ],
    },
    {
      title: "tools",
      items: [
        { to: "/Aipage", icon: <FaRobot />, label: "AI Solver" },
        { to: "/compiler", icon: <FaCode />, label: "Compiler" },
        { to: "/Bookmarks", icon: <FaBookmark />, label: "Bookmarks" },
      ],
    },
    {
      title: "content",
      items: [
        { to: "/Posts", icon: <FaQuestionCircle />, label: "My Doubts" },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="fixed top-0 left-0 h-screen w-64 bg-[#10141F] border-r border-white/10 text-[#E6E8EB] shadow-2xl flex flex-col z-50 font-mono"
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <span className="text-lg font-bold tracking-tight">
          <span className="text-[#F5A623]">&gt;</span> codezy
          <span className="animate-pulse text-[#F5A623]">_</span>
        </span>
      </div>

      {/* NAV */}
      <div className="flex-1 px-3 mt-4 space-y-6 overflow-y-auto">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <p className="text-[10px] uppercase tracking-widest text-[#5C6370] px-3 mb-2">
              // {group.title}
            </p>

            <ul className="flex flex-col gap-1">
              {group.items.map((item, index) => (
                <motion.li key={index} whileHover={{ x: 3 }}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-md text-sm transition-colors ${
                      isActive(item.to)
                        ? "bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/20"
                        : "text-[#8B8FA3] hover:bg-white/5 hover:text-[#E6E8EB] border border-transparent"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* USER SECTION */}
      {authUser && (
        <div className="border-t border-white/10">

          {/* Profile */}
          <div
            onClick={() => navigate("/profile")}
            className="p-4 flex items-center cursor-pointer hover:bg-white/5 transition-colors"
            title="Profile"
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#8B7FD6]/15 border border-[#8B7FD6]/30 text-[#8B7FD6] font-semibold text-sm shrink-0">
              {authUser.name?.[0]?.toUpperCase()}
            </div>

            <span className="ml-3 text-sm font-medium truncate">
              {authUser.name}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 px-4 pb-4">
            <button
              onClick={logout}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md border border-white/10 hover:border-white/25 text-[#8B8FA3] hover:text-[#E6E8EB] transition-colors text-xs"
              title="Logout"
            >
              <BiLogOut className="text-sm" />
              Logout
            </button>

            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete your account?"
                );
                if (confirmDelete) deleteaccount();
              }}
              className="px-3 py-2 text-xs font-semibold text-red-400 border border-red-500/20 rounded-md hover:bg-red-500/10 transition-colors"
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