import React, { useEffect, useState } from "react";
import { useSolution } from "../store/useSolutionstore";
import { useAuthstore } from "../store/useAuthstore";
import { motion } from "framer-motion";
import { FaRegHeart, FaTrash, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineReport } from "react-icons/md";
import PostCard from "../../components/PostCard";
import ReportModal from "../../components/ReportModal";


const MyPosts = () => {
  const { getmysol, mysols, deletesol, inclikes, bookmark, handlecomment, selectedpost } = useSolution();
  const { authUser } = useAuthstore();
  const id = authUser._id;
  const [comm, setComment] = useState("");
  const navigate = useNavigate();
  const [openReport, setOpenReport] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  const handleDelete = (id) => {
    deletesol(id);
  };

  const handleLikePost = (id) => {
    inclikes(id);
  };

  const handlebook = (id) => {
    bookmark(id);
  };

  const handlepost = (e, post) => {
    e.preventDefault();
    selectedpost(post);
    navigate("./view");
  };

  const submitReport = async (reason) => {
    try {
      console.log("Selected Post:", selectedPost);
      console.log("Reason:", reason);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getmysol();
  }, [id]);

  return (
    <div className="relative min-h-screen w-full bg-[#0B0E14] text-[#E6E8EB] flex flex-col items-center p-6 font-mono overflow-hidden">

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
          <h2 className="text-xl font-bold tracking-tight">my_posts</h2>
          <span className="text-[#5C6370] text-sm ml-auto">
            {mysols?.length ?? 0} total
          </span>
        </div>

        {mysols?.length === 0 && (
          <p className="text-[#5C6370] text-center py-8">
            No posts yet — anything you publish will show up here.
          </p>
        )}

        <div className="flex flex-col items-center gap-4 w-full">

          {mysols?.map((post) =>
            post.isHidden ? (
              <div
                key={post._id}
                className="w-full p-4 rounded-md border border-red-500/20 bg-red-500/5 text-red-400 text-sm"
              >
                This post has been removed for violating community guidelines.
              </div>
            ) : (
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
            )
          )}

        </div>

        <ReportModal
          open={openReport}
          onClose={() => setOpenReport(false)}
          onSubmit={submitReport}
        />

      </div>
    </div>
  );
};
export default MyPosts;