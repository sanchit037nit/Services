import React from 'react'
import { useSolution } from '../store/useSolutionstore.js';
import { useAuthstore} from '../store/useAuthstore.js'
import { useEffect } from 'react';

import { FaRegComment, FaRegHeart, FaRegBookmark, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const Bookmarks = () => {
    const { authUser} = useAuthstore()
    const {bookmarks,getbookmark } = useSolution()

    const id=authUser._id

    useEffect(()=>{
      getbookmark()
    },[])


return (

<div className="flex flex-col w-full  mx-auto p-6 space-y-6  bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
  {bookmarks?.map((pass) => {
    const isLiked = pass.likes?.includes(authUser?._id);
            const isbookmarked = pass.bookmarkedby?.includes(authUser?._id);


    return (
      <motion.div
        key={pass._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className="bg-gray-600 rounded-2xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col border border-gray-100"
      >
        {/* Bookmark Content */}
        <div className="space-y-3 text-left flex-1">
          {/* Doubt */}
          <p className="text-gray-900 text-lg font-semibold">
            Name:{" "}
            <span className="text-white font-normal">{pass.doubt}</span>
          </p>

          <p className="text-gray-900 text-lg font-semibold flex items-center gap-2">
           Description:{" "}
            <span className="text-white font-normal">
              {pass.description}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-200">
          {/* 💬 Comments */}
          <div
            className="flex gap-2 items-center cursor-pointer group"
            onClick={() =>
              document.getElementById("comments_modal" + pass._id).showModal()
            }
          >
            <FaRegComment className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
            <span className="text-sm text-gray-500 group-hover:text-blue-500">
              {pass.comments?.length || 0}
            </span>
          </div>

          {/* ❤️ Likes */}
          <div
            className="flex gap-2 items-center cursor-pointer group"
            onClick={(e) => handleLikePost(e, pass._id)}
          >
            <FaRegHeart
              className={`w-5 h-5 transition-colors ${
                isLiked
                  ? "text-pink-600"
                  : "text-gray-500 group-hover:text-pink-600"
              }`}
            />
            <span
              className={`text-sm transition-colors ${
                isLiked
                  ? "text-pink-600"
                  : "text-gray-500 group-hover:text-pink-600"
              }`}
            >
              {pass.likes?.length || 0}
            </span>
          </div>

          {/* 🔖 Bookmark */}
          <div
            className="flex gap-2 items-center cursor-pointer group"
            onClick={(e) => handlebook(e, pass._id)}
          >
            <FaRegBookmark className={`flex items-center gap-1 cursor-pointer ${
                      isbookmarked ? "text-blue-500" : "hover:text-blue-500"
                    }`}/>
          </div>

          {/* 🗑 Delete */}
          {pass.user?._id === authUser?._id && (
            <div
              className="flex gap-2 items-center cursor-pointer group"
              onClick={(e) => handleDelete(e, pass._id)}
            >
              <FaTrash className="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" />
            </div>
          )}
        </div>
      </motion.div>
    );
  })}
</div>

)
}

export default Bookmarks
