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

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white shadow-2xl z-50 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-center">
          Admin Panel
        </h1>
      </div>

      {/* Admin Profile */}
      <div className="flex flex-col items-center py-6 border-b border-gray-700">

        <img
          src={authUser?.profilephoto || "/avatar-placeholder.png"}
          alt="Admin"
          className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-lg"
        />

        <h2 className="mt-3 text-lg font-semibold">
          {authUser?.name}
        </h2>

        <p className="text-sm text-gray-400">
          Administrator
        </p>

      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`
          }
        >
          <FaChartBar />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`
          }
        >
          <FaFlag />
          Reported Posts
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 transition ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            }`
          }
        >
          <FaUsers />
          Users
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="p-5 border-t border-gray-700">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-medium"
        >
          <FiLogOut />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;