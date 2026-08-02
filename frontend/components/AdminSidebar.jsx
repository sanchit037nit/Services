import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthstore } from "../src/store/useAuthstore";
import {
  FaChartBar,
  FaFlag,
  FaUsers,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const AdminSidebar = () => {
  const { authUser, logout } = useAuthstore();

  const navItems = [
    { to: "/admin/dashboard", icon: <FaChartBar />, label: "Dashboard" },
    { to: "/admin/reports", icon: <FaFlag />, label: "Reported Posts" },
    { to: "/admin/users", icon: <FaUsers />, label: "Users" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#10141F] border-r border-white/10 text-[#E6E8EB] shadow-2xl z-50 flex flex-col font-mono">

      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <span className="text-lg font-bold tracking-tight block text-center">
          <span className="text-[#8B7FD6]">&gt;</span> admin
          <span className="animate-pulse text-[#8B7FD6]">_</span>
        </span>
      </div>

      {/* Admin Profile */}
      <div className="flex flex-col items-center py-6 border-b border-white/10">

        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#8B7FD6]/15 border border-[#8B7FD6]/30 text-[#8B7FD6] font-semibold">
          {authUser?.name?.[0]?.toUpperCase()}
        </div>

        <h2 className="mt-3 text-sm font-semibold text-[#E6E8EB]">
          {authUser?.name}
        </h2>

        <p className="text-xs text-[#5C6370] mt-0.5">
          <span className="text-[#8B7FD6]">●</span> administrator
        </p>

      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 px-3 space-y-1">

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-[#8B7FD6]/10 text-[#8B7FD6] border border-[#8B7FD6]/20"
                  : "text-[#8B8FA3] hover:bg-white/5 hover:text-[#E6E8EB] border border-transparent"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 border border-white/10 hover:border-red-500/40 hover:text-red-400 text-[#8B8FA3] transition-colors py-2.5 rounded-md text-sm"
        >
          <FiLogOut />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;