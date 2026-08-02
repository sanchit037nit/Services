// components/admin/AdminLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";


// AdminLayout.jsx
const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#0B0E14]">
      <AdminSidebar />
      <main className="flex-1 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;