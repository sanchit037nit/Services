import React from "react";
import { motion } from "framer-motion";
import {
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaTrash,
} from "react-icons/fa";

import { MdOutlineReport } from "react-icons/md";

const PostCard = ({
  post,
  authUser,
  onPostClick,
  handleLike,
  handleBookmark,
  handleDelete,
  handleComment,
  handleReport,
}) => {

    const isLiked = post.likes?.includes(authUser?._id);

    const isBookmarked = post.bookmarkedby?.includes(authUser?._id);

    const isOwner = post.createdby?._id === authUser?._id;
  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-gray-600 rounded-2xl p-5 shadow-lg hover:scale-105 transition-all"
      onClick={(e) => onPostClick(e, post)}
    >

      {/* Header */}

      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full overflow-hidden">

            <img
              src={post.createdby?.profilephoto || "/avatar-placeholder.png"}
              alt="avatar"
              className="w-full h-full object-cover"
            />

          </div>

          <div>

            <h3 className="font-semibold text-white">

              {post.createdby?.name}

            </h3>

<p className="text-xs text-gray-400">
    {post.platform}
</p>

          </div>

        </div>

        <div className="flex gap-3">

          <span className="px-4 py-2 rounded-lg bg-gray-700 text-sm">

            {post.language}

          </span>

          <span className="px-4 py-2 rounded-lg bg-gray-700 text-sm">

            {post.platform}

          </span>

        </div>

      </div>

      {/* Post Description */}

      <p className="text-gray-200 mb-4">

        {post.doubt}

      </p>

{/* Actions */}

<div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">

    {/* Comment */}

    <div
        className="flex items-center gap-2 cursor-pointer hover:text-blue-400"
        onClick={(e) => {
            e.stopPropagation();
            handleComment(post);
        }}
    >
        <FaRegComment className="w-4 h-4" />
        <span className="text-sm">
            {post.comments?.length}
        </span>
    </div>

    {/* Like */}

    <div
        className={`flex items-center gap-2 cursor-pointer ${
            isLiked
                ? "text-pink-500"
                : "hover:text-pink-500"
        }`}
        onClick={(e) => {
            e.stopPropagation();
            handleLike(post._id);
        }}
    >
        <FaRegHeart className="w-4 h-4" />

        <span className="text-sm">
            {post.likes?.length}
        </span>

    </div>

    {/* Bookmark */}

    {!isOwner && (

        <div
            className={`flex items-center gap-2 cursor-pointer ${
                isBookmarked
                    ? "text-blue-500"
                    : "hover:text-blue-500"
            }`}
            onClick={(e) => {
                e.stopPropagation();
                handleBookmark(post._id);
            }}
        >
            <FaRegBookmark className="w-4 h-4" />
        </div>

    )}

    {/* Delete */}

    {isOwner && (

        <div
            className="flex items-center gap-2 cursor-pointer hover:text-red-500"
            onClick={(e) => {
                e.stopPropagation();
                handleDelete(post._id);
            }}
        >
            <FaTrash className="w-4 h-4" />
        </div>

    )}

    {/* Report */}

{authUser?.role !== "admin" &&
 post.createdby?._id !== authUser?._id && (

<button
    onClick={(e)=>{
        e.stopPropagation();
        handleReport?.(post);
    }}
>
    Report
</button>

)}

</div>


    </motion.div>

  );
};

export default PostCard;
