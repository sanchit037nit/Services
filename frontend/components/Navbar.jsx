import React, { act } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthstore } from "../src/store/useAuthstore.js";

const Navbar = () => {
  const navigate = useNavigate();
  //    const authUser=useAuthStore((state)=>state.authUser)
  const { authUser, logout, deleteaccount } = useAuthstore();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const handleAccountDelete = (e) => {
    e.preventDefault();
    deleteaccount();
  };

  const navitems = [

    {
      title: "Login",
      path: "/login",
      user: false,
      home:false,
    },
    {
      title: "Signup",
      path: "/signup",
      user: false,
      home:false,
    },
    {
      title: "Logout",
      action: handleLogout,
      user: true,
      home:true,
    },
    {
      title: "Delete Account",
      action: handleAccountDelete,
      user: true,
      home:true,
    },
  ];
  return (
    <div className="flex flex-wrap justify-between items-center  px-8 py-5 text-black shadow-md">
      {/* Logo & Title */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold tracking-wide text-amber-400">
          🔐
        </span>
        <h1 className="text-2xl font-bold">PASSGEN</h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 flex-wrap">
        {authUser
          ? navitems
              .filter((item) => item.user)
              .map((item) => (
                <button
                  key={item.title}
                  onClick={item.action}
                  className="px-4 py-2 rounded hover:bg-amber-400 hover:text-gray-900 transition-colors duration-300"
                >
                  {item.title}
                </button>
              ))
          : navitems
              .filter((item) => !item.user)
              .map((item) => (
                <button
                  key={item.title}
                  onClick={() => navigate(item.path)}
                  className="px-4 py-2 rounded hover:bg-amber-400 hover:text-gray-900 transition-colors duration-300"
                >
                  {item.title}
                </button>
              ))}
      </div>
    </div>
  );
};

export default Navbar;
