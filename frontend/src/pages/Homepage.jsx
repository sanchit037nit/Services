import React, { useEffect, useState } from "react";
import { useAuthstore } from "../store/useAuthstore.js";
import { useNavigate } from "react-router-dom";
import { useSolution } from "../store/useSolutionstore.js";
import { FaRegHeart, FaTrash, FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import Sidebar from "../../components/Sidebar.jsx";
import { motion } from "framer-motion"; // 🎬 animations

export const Homepage = () => {
  const { authUser } = useAuthstore();
  const { getsol, solutions, deletesol, inclikes, bookmark, handlecomment } =
    useSolution();
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [comm, setComment] = useState("");
  const [sort, setsort] = useState("");

  const id = authUser?._id;

  useEffect(() => {
    getsol();
  }, [id]);

  const handleLikePost = (e, passId) => {
    e.preventDefault();
    inclikes(passId);
  };

  const handleDelete = (e, passId) => {
    e.preventDefault();
    deletesol(passId);
  };

  const handlebook = (e, id) => {
    e.preventDefault();
    bookmark(id);
  };

  const handleupload = (e) => {
    e.preventDefault();
    navigate("/upload");
  };

  const handlePostComment = (e, id, data) => {
    e.preventDefault();
    handlecomment(id, data);
    setComment("");
  };

  return (
    <div className="flex bg-[#f9fafb] text-black min-h-screen w-full">
      
      {/* 📌 Feed Section */}
      <div className="flex-1 flex flex-col ">
        {/* 🔍 Search */}
        <div className="sticky top-0 z-10 bg-white shadow-sm p-3 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search solutions..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>

        {/* ⚡ Sorting */}
        <div className="p-4 flex items-center gap-2 bg-white border-b border-gray-200">
          <label htmlFor="p" className="text-sm font-semibold text-gray-700">
            Filter by Platform:
          </label>
          <select
            id="p"
            name="platform"
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sort || ""}
            onChange={(e) =>
              e.target.value === "" ? setsort(null) : setsort(e.target.value)
            }
          >
            <option value="">All</option>
            <option value="Codeforces">Codeforces</option>
            <option value="Leetcode">Leetcode</option>
            <option value="Atcoder">Atcoder</option>
          </select>
        </div>

        {/* 🚀 Feed */}
        {/* Posts Wrapper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {solutions
            ?.filter((post) =>
              post.doubt.toLowerCase().includes(search.toLowerCase())
            )
            .filter(
              (post) =>
                !sort || post.platform.toLowerCase() === sort.toLowerCase()
            )
            .map((post) => {
              const isLiked = post.likes.includes(authUser?._id);

              return (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
                >
                  {/* Avatar + Username */}
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={post.user?.profileImg || "/avatar-placeholder.png"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-semibold text-gray-800">
                        {post.user?.name}
                      </span>
                      <p className="text-gray-500 text-sm">@{post.platform}</p>
                    </div>
                  </div>

                  {/* Doubt */}
                  <p className="text-gray-900 text-sm flex-1">{post?.doubt}</p>

                  {/* Actions */}
                  <div className="flex justify-between mt-4 text-sm text-gray-500">
                    {/* 💬 Comments */}
                    <div
                      className="flex gap-1 items-center cursor-pointer group"
                      onClick={() =>
                        document
                          .getElementById("comments_modal" + post._id)
                          .showModal()
                      }
                    >
                      <FaRegComment className="w-4 h-4 group-hover:text-blue-500" />
                      <span className="group-hover:text-blue-500">
                        {post.comments?.length}
                      </span>
                    </div>

                    {/* ❤️ Likes */}
                    <div
                      className="flex gap-1 items-center cursor-pointer group"
                      onClick={(e) => handleLikePost(e, post._id)}
                    >
                      <FaRegHeart
                        className={`w-4 h-4 transition-colors ${
                          isLiked
                            ? "text-pink-600"
                            : "text-gray-500 group-hover:text-pink-600"
                        }`}
                      />
                      <span
                        className={`${
                          isLiked
                            ? "text-pink-600"
                            : "text-gray-500 group-hover:text-pink-600"
                        }`}
                      >
                        {post.likes.length}
                      </span>
                    </div>

                    {/* 🔖 Bookmark */}
                    <div
                      className="flex gap-1 items-center cursor-pointer group"
                      onClick={(e) => handlebook(e, post._id)}
                    >
                      <FaRegBookmark className="w-4 h-4 group-hover:text-blue-600" />
                    </div>

                    {/* 🗑 Delete */}
                    {post.user?._id === authUser?._id && (
                      <div
                        className="flex gap-1 items-center cursor-pointer group"
                        onClick={(e) => handleDelete(e, post._id)}
                      >
                        <FaTrash className="w-4 h-4 group-hover:text-red-600" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* 📌 Upload Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleupload}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          + Upload Solution
        </button>
      </div>
    </div>
  );
};
