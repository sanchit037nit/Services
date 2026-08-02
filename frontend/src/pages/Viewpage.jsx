import React, { useEffect, useState } from 'react'
import { useSolution } from '../store/useSolutionstore'
import { motion } from "framer-motion";
import { FaRegHeart, FaTrash, FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { useAuthstore } from "../store/useAuthstore.js";
import { useParams } from "react-router-dom";



const Viewpage = () => {
  const { selpost, handlecomment } = useSolution()
  const { authUser } = useAuthstore();
  const [comm, setComment] = useState("");
  const { id } = useParams();


  const isLiked = selpost?.likes?.includes(authUser?._id);
  const isbookmarked = selpost?.bookmarkedby?.includes(authUser?._id);

  const handlePostComment = (e, id, data) => {
    e.preventDefault();
    handlecomment(id, data);
    setComment("");
  };

  const handleDelete = (e, postId) => {
    e.preventDefault();
    // wire up to your delete action, e.g. deletesol(postId)
  };


  return (

    <div className="flex flex-col items-center px-4 py-6 gap-4 relative min-h-screen bg-[#0B0E14] text-[#E6E8EB] overflow-hidden w-full font-mono">

      {/* subtle grid texture, consistent with the rest of the app */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#E6E8EB 1px, transparent 1px), linear-gradient(90deg, #E6E8EB 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-3xl bg-[#10141F] border border-white/10 rounded-lg shadow-2xl overflow-hidden"
      >
        {/* tab bar — matches the editor-window motif used elsewhere */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0D1017] border-b border-white/5">
          <span className="w-3 h-3 rounded-full bg-[#F5A623]/70" />
          <span className="w-3 h-3 rounded-full bg-[#8B7FD6]/70" />
          <span className="w-3 h-3 rounded-full bg-[#2DD4BF]/70" />
          <span className="ml-4 text-xs text-[#8B8FA3]">
            {selpost?.platform?.toLowerCase() || "solution"}.
            {selpost?.language?.toLowerCase() || "txt"}
          </span>
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2 justify-between flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                <img
                  src={selpost?.createdby?.profilephoto || "/avatar-placeholder.png"}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-sm text-[#E6E8EB]">
                  {selpost?.createdby?.name}
                </div>
                <div className="text-xs text-[#5C6370]">@{selpost?.platform}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 bg-[#8B7FD6]/10 text-[#8B7FD6] border border-[#8B7FD6]/20 rounded-md text-xs font-semibold">
                {selpost?.language}
              </span>
              <span className="px-3 py-1.5 bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20 rounded-md text-xs font-semibold">
                {selpost?.platform}
              </span>
            </div>
          </div>

          {/* Doubt */}
          <h2 className="text-sm font-semibold text-[#8B8FA3] tracking-wide mt-6 mb-1">
            // about contest
          </h2>
          <p className="text-[#E6E8EB] text-sm leading-relaxed">{selpost?.doubt}</p>

          <h2 className="text-sm font-semibold text-[#8B8FA3] tracking-wide mt-5 mb-1">
            // problem description
          </h2>
          <p className="text-[#E6E8EB] text-sm leading-relaxed">{selpost?.description}</p>

          <h2 className="text-sm font-semibold text-[#8B8FA3] tracking-wide mt-5 mb-2">
            // your code
          </h2>
          <pre className="bg-[#0B0E14] border border-white/10 text-[#2DD4BF] text-sm p-4 rounded-md overflow-x-auto">
            {selpost?.code}
          </pre>

          {selpost?.photo && (
            <div className="w-full flex justify-center rounded-md overflow-hidden bg-[#0B0E14] border border-white/10 mt-5">
              <img
                src={selpost.photo}
                alt="attachment"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-6 mt-5 pt-4 border-t border-white/5 text-[#5C6370] justify-between">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#2DD4BF] transition-colors">
              <FaRegComment className="w-4 h-4" />
              <span className="text-sm">{selpost?.comments?.length}</span>
            </div>

            <div
              className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                isLiked ? "text-[#F5A623]" : "hover:text-[#F5A623]"
              }`}
            >
              <FaRegHeart className="w-4 h-4" />
              <span className="text-sm">{selpost?.likes?.length}</span>
            </div>

            <div
              className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                isbookmarked ? "text-[#8B7FD6]" : "hover:text-[#8B7FD6]"
              }`}
            >
              <FaRegBookmark className="w-4 h-4" />
            </div>

            {selpost?.user?._id === authUser?._id && (
              <div
                className="flex items-center gap-1.5 cursor-pointer hover:text-red-400 transition-colors"
                onClick={(e) => handleDelete(e, selpost._id)}
              >
                <FaTrash className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="w-full rounded-md bg-[#0B0E14] border border-white/10 p-5 mt-6">

            <h3 className="font-semibold text-sm text-[#E6E8EB] border-b border-white/5 pb-3 mb-4">
              Comments
            </h3>

            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2">

              {selpost?.comments?.length === 0 && (
                <p className="text-sm text-[#5C6370] text-center py-4">
                  No comments yet — be the first one.
                </p>
              )}

              {selpost?.comments?.map((comment) => (
                <div
                  key={comment._id}
                  className="flex gap-3 items-start bg-[#10141F] rounded-md p-3 border border-white/5"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                    <img
                      src={selpost?.createdby?.profilephoto || "/avatar-placeholder.png"}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#E6E8EB]">
                        {selpost?.createdby?.name}
                      </span>
                      <span className="text-[#5C6370] text-xs">
                        @{selpost?.platform}
                      </span>
                    </div>

                    <p className="text-sm text-[#8B8FA3]">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}

            </div>

            {/* Comment Input */}
            <form
              className="flex gap-3 items-end mt-4 border-t border-white/5 pt-4"
              onSubmit={(e) => handlePostComment(e, selpost._id, comm)}
            >
              <textarea
                className="w-full bg-[#10141F] text-[#E6E8EB] p-3 rounded-md text-sm resize-none border border-white/10 outline-none focus:border-[#F5A623]/50 transition-colors placeholder:text-[#5C6370]"
                placeholder="Write a comment..."
                value={comm}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
              />

              <button
                type="submit"
                className="px-4 py-2.5 rounded-md bg-[#F5A623] text-[#0B0E14] text-sm font-semibold hover:bg-[#ffb43d] transition-colors shrink-0"
              >
                Post
              </button>
            </form>

          </div>
        </div>
      </motion.div>

    </div>
  )
}

export default Viewpage