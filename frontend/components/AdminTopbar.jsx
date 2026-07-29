import React from "react";
import { useAuthstore } from "../src/store/useAuthstore";
import { FiLogOut } from "react-icons/fi";

const AdminTopbar = () => {

    const { authUser, logout } = useAuthstore();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="h-16 bg-black border-b border-gray-700 flex items-center justify-between px-6">

            <h1 className="text-xl font-semibold text-white">
                Admin Dashboard
            </h1>

            <div className="flex items-center gap-5">

                <div className="flex items-center gap-3">

                    <img
                        src={authUser?.profilephoto || "/avatar-placeholder.png"}
                        alt="Admin"
                        className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    />

                    <div className="flex flex-col">
                        <span className="text-white font-medium">
                            {authUser?.name}
                        </span>
                        <span className="text-xs text-gray-400">
                            Administrator
                        </span>
                    </div>

                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
                >
                    <FiLogOut className="text-lg" />
                    Logout
                </button>

            </div>

        </div>
    );
};

export default AdminTopbar;