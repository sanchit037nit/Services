
import React, { useEffect, useState } from "react";
import { useAuthstore } from "../store/useAuthstore.js";
import { useNavigate } from "react-router-dom";
import { useSolution } from "../store/useSolutionstore.js";
import { FaRegHeart, FaTrash, FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { motion } from "framer-motion";


export const Homepage = () => {
  const { authUser } = useAuthstore();
  const { getsol, solutions, deletesol, inclikes, bookmark, handlecomment ,selectedpost} = useSolution();
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [comm, setComment] = useState("");
  const [sort, setsort] = useState("");
  const [lang, setlang] = useState("");

  const id = authUser?._id;

  useEffect(() => {
    getsol();
  }, [id,getsol,setComment]);

  const handleLikePost = (e, passId) => {
    e.preventDefault();
    e.stopPropagation()
    inclikes(passId);
  };

  const handleDelete = (e, passId) => {
    e.preventDefault();
    e.stopPropagation()
    deletesol(passId);
  };

  const handlebook = (e, id) => {
    e.preventDefault();
    e.stopPropagation()
    bookmark(id);
  };

  const handleupload = (e) => {
    e.preventDefault();
    e.stopPropagation()
    navigate("/upload");
  };

  const handlePostComment = (e, id, data) => {
    e.preventDefault();
    e.stopPropagation()
    handlecomment(id, data);
    setComment("");
  };

  const handlepost=(e,post)=>{
        e.preventDefault()
        selectedpost(post)
        navigate('./view')
  }

  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden w-full"
        >

      {/* Blobs for background aesthetic */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-600 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>

      {/* 🔍 Search bar + Filter */}
      <div className="sticky top-0 z-20 backdrop-blur-lg bg-black/30 border-b border-gray-700 shadow-md">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 p-4 max-w-5xl mx-auto">
          <input
            type="text"
            placeholder="Search solutions..."
            className="flex-1 max-w-xl px-4 py-2 rounded-full border border-gray-500 bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />

          <select
            id="platform"
            name="platform"
            className="border border-gray-500 rounded-full px-4 py-2 text-sm bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={sort || ""}
            onChange={(e) =>
              e.target.value === "" ? setsort(null) : setsort(e.target.value)
            }
          >
            <option value="">All Platforms</option>
            <option value="Codeforces">Codeforces</option>
            <option value="Leetcode">Leetcode</option>
            <option value="Atcoder">Atcoder</option>
          </select>

          <select
            id="language"
            name="language"
            className="border border-gray-500 rounded-full px-4 py-2 text-sm bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={lang || ""}
            onChange={(e) =>
              e.target.value === "" ? setlang(null) : setlang(e.target.value)
            }
          >
            <option value="">All Languages</option>
            <option value="Codeforces">C</option>
            <option value="Leetcode">c++</option>
            <option value="Atcoder">Python</option>
            <option value="Atcoder">Java</option>
          </select>
        </div>
      </div>

      {/* 🚀 Feed */}
      <div className="flex flex-col items-center px-4 py-6 gap-4">
        {solutions
          ?.filter((post) =>
            post.doubt?.toLowerCase().includes(search?.toLowerCase())
          )
          .filter(
            (post) =>
              !sort || post.platform?.toLowerCase() === sort?.toLowerCase()
          )
          .filter(
            (post) =>
              !lang || post.platform?.toLowerCase() === lang?.toLowerCase()
          )
          .map((post) => {
            const isLiked = post.likes?.includes(authUser?._id);
            const isbookmarked = post.bookmarkedby?.includes(authUser?._id);
           
            return (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-gray-600 rounded-2xl p-5 shadow-lg hover:scale-105 transition-all"
                onClick={(e)=> handlepost(e,post)}
              >
                {/* Header */}
                  <div className="flex items-center gap-3 mb-2 justify-between">
                  <div className='flex items-center gap-3 mb-2'>
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={post.createdby?.profilephoto || "/avatar-placeholder.png"}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {post.user?.name}
                    </div>
                    <div className="text-xs text-gray-300">@{post?.platform}</div>
                  </div>
                  </div>
                  <div className='flex gap-3'>
                  <span className='px-8 py-3 bg-gray-500  rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300'>{post?.language}</span>
                  <span className='px-8 py-3 bg-gray-500  rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300'>{post?.platform}</span>
                  </div>
                </div>

                {/* Doubt */}
                <p className="text-gray-100 text-sm">{post?.doubt}</p>

                {/* Actions */}
                <div className="flex gap-6 mt-4 text-gray-400 justify-between">
                  {/* 💬 Comments */}
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:text-blue-400"
                    onClick={(e) =>
                      {
                        e.stopPropagation()
                    
                      }
                    }
                  >
                    <FaRegComment className="w-4 h-4" />
                    <span className="text-sm">{post.comments?.length}</span>
                  </div>

                  {/* ❤️ Likes */}
                  <div
                    className={`flex items-center gap-1 cursor-pointer ${
                      isLiked ? "text-pink-500" : "hover:text-pink-500"
                    }`}
                    onClick={(e) => handleLikePost(e, post._id)}
                  >
                    <FaRegHeart className="w-4 h-4" />
                    <span className="text-sm">{post.likes.length}</span>
                  </div>

                  {/* 🔖 Bookmark */}
                  <div
                    className={`flex items-center gap-1 cursor-pointer ${
                      isbookmarked ? "text-blue-500" : "hover:text-blue-500"
                    }`}
                    onClick={(e) => handlebook(e, post._id)}
                  >
                    <FaRegBookmark className="w-4 h-4" />
                  </div>

                  {/* 🗑 Delete */}
                  {post.user?._id === authUser?._id && (
                    <div
                      className="flex items-center gap-1 cursor-pointer hover:text-red-500"
                      onClick={(e) => handleDelete(e, post._id)}
                    >
                      <FaTrash className="w-4 h-4" />
                    </div>
                  )}
                </div>
              
              </motion.div>
            );
          })}
      </div>

      {/* Floating Upload Button */}
      <motion.button
        onClick={handleupload}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition"
      >
        + Upload Solution
      </motion.button>

    </motion.div>
  );
};