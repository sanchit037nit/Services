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
      whileHover={{ y: -2 }}
      className="w-full max-w-3xl bg-[#10141F] border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-white/20 transition-colors font-mono"
      onClick={(e) => onPostClick(e, post)}
    >

      {/* tab bar — filename mirrors the post's platform/language, same motif as viewpage/compiler */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0D1017] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#8B7FD6]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF]/70" />
        <span className="ml-3 text-xs text-[#8B8FA3]">
          {post.platform?.toLowerCase()}.{post.language?.toLowerCase()}
        </span>
      </div>

      <div className="p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
              <img
                src={post.createdby?.profilephoto || "/avatar-placeholder.png"}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="font-semibold text-sm text-[#E6E8EB]">
                {post.createdby?.name}
              </h3>
              <p className="text-xs text-[#5C6370]">@{post.platform}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#8B7FD6]/10 text-[#8B7FD6] border border-[#8B7FD6]/20 text-xs font-semibold">
              {post.language}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20 text-xs font-semibold">
              {post.platform}
            </span>
          </div>

        </div>

        {/* Post Description */}
        <p className="text-[#E6E8EB] text-sm leading-relaxed mb-4">
          {post.doubt}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[#5C6370]">

          <div
            className="flex items-center gap-2 cursor-pointer hover:text-[#2DD4BF] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleComment(post);
            }}
          >
            <FaRegComment className="w-4 h-4" />
            <span className="text-sm">{post.comments?.length}</span>
          </div>

          <div
            className={`flex items-center gap-2 cursor-pointer transition-colors ${
              isLiked ? "text-[#F5A623]" : "hover:text-[#F5A623]"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleLike(post._id);
            }}
          >
            <FaRegHeart className="w-4 h-4" />
            <span className="text-sm">{post.likes?.length}</span>
          </div>

          {!isOwner && (
            <div
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                isBookmarked ? "text-[#8B7FD6]" : "hover:text-[#8B7FD6]"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleBookmark(post._id);
              }}
            >
              <FaRegBookmark className="w-4 h-4" />
            </div>
          )}

          {isOwner && (
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-red-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(post._id);
              }}
            >
              <FaTrash className="w-4 h-4" />
            </div>
          )}

          {authUser?.role !== "admin" &&
            post.createdby?._id !== authUser?._id && (
              <button
                className="flex items-center gap-1.5 text-xs hover:text-red-400 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReport?.(post);
                }}
              >
                <MdOutlineReport className="w-4 h-4" />
                Report
              </button>
            )}

        </div>
      </div>

    </motion.div>

  );
};

export default PostCard;