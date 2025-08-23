import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useAuthstore } from "../src/store/useAuthstore.js";

const Sidebar = () => {
  const { logout, authUser } = useAuthstore();
  const location = useLocation();

  // Helper to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52 bg-[#0f0f0f] text-white shadow-xl">
      <div className="h-screen flex flex-col border-r border-gray-800 w-20 md:w-full sticky top-0">
        {/* Navigation */}
        <ul className="flex flex-col gap-3 mt-6 px-2">
          {/* Home */}
          <li>
            <Link
              to="/"
              className={`flex gap-3 items-center py-2 pl-3 pr-5 rounded-xl transition-all duration-300 group ${
                isActive("/") ? "bg-blue-600 shadow-md" : "hover:bg-gray-800"
              }`}
            >
              <MdHomeFilled
                className={`w-7 h-7 transition-transform duration-300 group-hover:scale-110 ${
                  isActive("/") ? "text-white" : "text-gray-300"
                }`}
              />
              <span
                className={`hidden md:block text-base font-medium ${
                  isActive("/") ? "text-white" : "text-gray-300 group-hover:text-white"
                }`}
              >
                Home
              </span>
            </Link>
          </li>

          {/* Notifications */}
          <li>
            <Link
              to="/notifications"
              className={`flex gap-3 items-center py-2 pl-3 pr-5 rounded-xl transition-all duration-300 group ${
                isActive("/notifications") ? "bg-blue-600 shadow-md" : "hover:bg-gray-800"
              }`}
            >
              <IoNotifications
                className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${
                  isActive("/notifications") ? "text-white" : "text-gray-300"
                }`}
              />
              <span
                className={`hidden md:block text-base font-medium ${
                  isActive("/notifications")
                    ? "text-white"
                    : "text-gray-300 group-hover:text-white"
                }`}
              >
                Notifications
              </span>
            </Link>
          </li>

          {/* Profile */}
          <li>
            <Link
              to={`/profile/${authUser?._id || authUser?.name}`}
              className={`flex gap-3 items-center py-2 pl-3 pr-5 rounded-xl transition-all duration-300 group ${
                isActive(`/profile/${authUser?._id || authUser?.name}`)
                  ? "bg-blue-600 shadow-md"
                  : "hover:bg-gray-800"
              }`}
            >
              <FaUser
                className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${
                  isActive(`/profile/${authUser?._id || authUser?.name}`)
                    ? "text-white"
                    : "text-gray-300"
                }`}
              />
              <span
                className={`hidden md:block text-base font-medium ${
                  isActive(`/profile/${authUser?._id || authUser?.name}`)
                    ? "text-white"
                    : "text-gray-300 group-hover:text-white"
                }`}
              >
                Profile
              </span>
            </Link>
          </li>
        </ul>

        {/* User Section */}
        {authUser && (
          <div className="mt-auto mb-6 flex gap-2 items-center bg-gray-900/60 rounded-xl mx-3 p-2 hover:bg-gray-800 transition-all duration-300">
            <div className="avatar hidden md:inline-flex">
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-700">
                <img
                  src={authUser?.profileImg || "/avatar-placeholder.png"}
                  alt="User Avatar"
                />
              </div>
            </div>

            <div className="flex justify-between flex-1 items-center">
              <div className="hidden md:block">
                <p className="font-semibold text-sm truncate max-w-[100px]">
                  {authUser?.name}
                </p>
                <p className="text-gray-400 text-xs truncate">@{authUser?.name}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-full hover:bg-red-600/80 transition-colors duration-300"
              >
                <BiLogOut className="w-5 h-5 text-gray-300 hover:text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

