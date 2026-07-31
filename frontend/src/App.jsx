import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";

import { useAuthstore } from "./store/useAuthstore.js";

// Public Pages
import { Firstpage } from "./pages/Firstpage";
import { Signuppage } from "./pages/Signuppage";
import { Loginpage } from "./pages/Loginpage";

// User Pages
import { Homepage } from "./pages/Homepage";
import Uploadpage from "./pages/Uploadpage";
import Bookmarks from "./pages/Bookmarks";
import Profilepage from "./pages/Profilepage";
import MyPosts from "./pages/MyPosts";
import Viewpage from "./pages/Viewpage";
import Aipage from "./pages/Aipage";
import OnlineCompiler from "./pages/OnlineCompiler";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import ReportedPosts from "./pages/Admin/ReportedPosts";
import Users from "./pages/Admin/Users";

// Components
import Sidebar from "../components/Sidebar";

const App = () => {

  const { authUser, checkauth, loading } = useAuthstore();
  console.log(authUser)
  useEffect(() => {
    checkauth();
  }, [checkauth]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex ">
    
      {/* Sidebar only for Users */}
      {authUser && authUser.role === "user" && <Sidebar />}

<main
  className={`flex-1 ${
    authUser
      ? authUser.role === "user"
        ? "ml-64"
        : authUser.role === "admin"
        ? "ml-64"
        : ""
      : ""
  }`}
>
        
  
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Firstpage />} />

        <Route
          path="/signup"
          element={
            !authUser ? (
              <Signuppage />
            ) : (
              <Navigate
                to={
                  authUser.role === "admin"
                    ? "/admin/dashboard"
                    : "/Homepage"
                }
              />
            )
          }
        />

        <Route
          path="/login"
          element={
            !authUser ? (
              <Loginpage />
            ) : (
              <Navigate
                to={
                  authUser.role === "admin"
                    ? "/admin/dashboard"
                    : "/Homepage"
                }
              />
            )
          }
        />

        {/* ================= USER ROUTES ================= */}

        <Route
          path="/Homepage"
          element={
            authUser ? (
              authUser.role === "user" ? (
                <Homepage />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/upload"
          element={
            authUser ? (
              authUser.role === "user" ? (
                <Uploadpage />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/bookmarks"
          element={
            authUser ? (
              authUser.role === "user" ? (
                <Bookmarks />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            authUser ? (
              authUser.role === "user" ? (
                <Profilepage />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/Aipage"
          element={
            authUser ? (
              authUser.role === "user" ? (
                <Aipage />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/Posts"
          element={
            authUser ? (
              authUser.role === "user" ? (
                <MyPosts />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/Homepage/view"
          element={
            authUser ? (
              
                <Viewpage />
            

              
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/Posts/view"
          element={
            authUser ? (
              authUser.role === "user" ? (
                <Viewpage />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/compiler"
          element={
            authUser ? (
              authUser.role === "user" ? (
                <OnlineCompiler />
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin"
          element={
            authUser ? (
              authUser.role === "admin" ? (
                <AdminLayout />
              ) : (
                <Navigate to="/Homepage" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="reports" element={<ReportedPosts />} />

          <Route path="users" element={<Users />} />
        </Route>

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                authUser
                  ? authUser.role === "admin"
                    ? "/admin/dashboard"
                    : "/Homepage"
                  : "/"
              }
            />
          }
        />

      </Routes>
    </main>
      <Toaster />

    </div>
  );
};

export default App;