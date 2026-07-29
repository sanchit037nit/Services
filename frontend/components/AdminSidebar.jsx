import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaChartBar,
    FaFlag,
    FaUsers,
} from "react-icons/fa";

const AdminSidebar = () => {

    return (

        <aside className="w-64 bg-black border-r border-gray-700">

            <div className="text-2xl font-bold p-6 border-b border-gray-700">

                🛡 Admin Panel

            </div>

            <nav className="mt-5 flex flex-col">

                <NavLink
                    to="/admin/dashboard"
                    className="px-6 py-4 hover:bg-gray-800 flex items-center gap-3"
                >

                    <FaChartBar />

                    Dashboard

                </NavLink>

                <NavLink
                    to="/admin/reports"
                    className="px-6 py-4 hover:bg-gray-800 flex items-center gap-3"
                >

                    <FaFlag />

                    Reported Posts

                </NavLink>

                <NavLink
                    to="/admin/users"
                    className="px-6 py-4 hover:bg-gray-800 flex items-center gap-3"
                >

                    <FaUsers />

                    Users

                </NavLink>

            </nav>

        </aside>

    );

};

export default AdminSidebar;