import React from 'react'
import { useSolution } from '../store/useSolutionstore.js';
import { useAuthstore } from '../store/useAuthstore.js'
import { useNavigate } from 'react-router-dom';

import { FaRegComment, FaRegHeart, FaRegBookmark, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import ReportModal from "../../components/ReportModal";

const Bookmarks = () => {
  const { authUser } = useAuthstore()
  const { bookmarks, getbookmark, inclikes, bookmark, deletesol, selectedpost } = useSolution()
  const navigate = useNavigate();
  const [openReport, setOpenReport] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const id = authUser._id

  useEffect(() => {
    getbookmark()
  }, [])

  const handleLikePost = (id) => {
    inclikes(id);
  };

  const handlebook = (id) => {
    bookmark(id);
  };

  const handleDelete = (id) => {
    deletesol(id);
  };

  const handlepost = (e, post) => {
    e.preventDefault();
    selectedpost(post);
    navigate("/Homepage/view");
  };

  const submitReport = async (reason) => {
    try {
      console.log("Selected Post:", selectedPost);
      console.log("Reason:", reason);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full p-6 gap-4 bg-[#0B0E14] text-[#E6E8EB] min-h-screen font-mono overflow-hidden">

      {/* subtle grid texture, consistent with the rest of the app */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#E6E8EB 1px, transparent 1px), linear-gradient(90deg, #E6E8EB 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">

        <div className="w-full flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
          <span className="text-[#F5A623]">&gt;</span>
          <h2 className="text-xl font-bold tracking-tight">bookmarks</h2>
          <span className="text-[#5C6370] text-sm ml-auto">
            {bookmarks?.length ?? 0} saved
          </span>
        </div>

        {bookmarks?.length === 0 && (
          <p className="text-[#5C6370] text-center py-8">
            No bookmarks yet — solutions you save will show up here.
          </p>
        )}

        <div className="flex flex-col items-center gap-4 w-full">
          {bookmarks?.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              authUser={authUser}
              onPostClick={handlepost}
              handleComment={(post) => {
                console.log(post);
              }}
              handleLike={handleLikePost}
              handleBookmark={handlebook}
              handleDelete={handleDelete}
              handleReport={(post) => {
                setSelectedPost(post);
                setOpenReport(true);
              }}
            />
          ))}
        </div>

        <ReportModal
          open={openReport}
          onClose={() => setOpenReport(false)}
          onSubmit={submitReport}
        />

      </div>
    </div>
  )
}

export default Bookmarks