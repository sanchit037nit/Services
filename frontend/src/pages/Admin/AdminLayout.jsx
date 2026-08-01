// components/admin/AdminLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";


const AdminLayout = () => {

    return (

        <div className="flex min-h-screen w-full text-amber-50">

            <AdminSidebar />

            <div className="flex-1 flex flex-col">


                <main className="p-6">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default AdminLayout;