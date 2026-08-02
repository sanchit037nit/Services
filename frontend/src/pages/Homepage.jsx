import React, { useEffect, useState } from "react";
import { useAuthstore } from "../store/useAuthstore.js";
import { useNavigate } from "react-router-dom";
import { useSolution } from "../store/useSolutionstore.js";
import { FaRegHeart, FaTrash, FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import PostCard from "../../components/PostCard";
import ReportModal from "../../components/ReportModal";
import { useReportStore } from "../store/useReportStore";

export const Homepage = () => {

  const { authUser } = useAuthstore();
  const { reportPost } = useReportStore();
  const { getsol, solutions, deletesol, inclikes, bookmark, handlecomment, selectedpost } = useSolution();
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [comm, setComment] = useState("");
  const [sort, setsort] = useState("");
  const [lang, setlang] = useState("");
  const id = authUser?._id;
  const [openReport, setOpenReport] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    getsol();
  }, [id, getsol, solutions]);

  useEffect(() => {

    if (authUser?.role === "admin") {

      navigate("/admin/dashboard");

    }

  }, [authUser, navigate]);

  const handleLikePost = (id) => {
    inclikes(id);
  };

  const handlebook = (id) => {
    bookmark(id);
  };

  const handleDelete = (id) => {
    deletesol(id);
  };

  const handleupload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/upload");
  };

  const submitReport = async (reason) => {

    if (!selectedPost) return;

    const success = await reportPost(selectedPost._id, reason);

    if (success) {

      setOpenReport(false);

      setSelectedPost(null);

    }

  };

  const handlePostComment = (e, id, data) => {
    e.preventDefault();
    e.stopPropagation();
    handlecomment(id, data);
    setComment("");
  };

  const handlepost = (e, post) => {
    e.preventDefault();
    selectedpost(post);
    navigate("./view");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen bg-[#0B0E14] text-[#E6E8EB] w-full font-mono"
    >
      {/* subtle grid texture, consistent with the rest of the app */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#E6E8EB 1px, transparent 1px), linear-gradient(90deg, #E6E8EB 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Search bar — styled as a filter toolbar / command bar */}
      <div className="sticky top-0 z-20 backdrop-blur-lg bg-[#0B0E14]/80 border-b border-white/5">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 p-4 max-w-5xl mx-auto">
          <div className="flex-1 max-w-xl w-full flex items-center bg-[#10141F] border border-white/10 rounded-md px-4 focus-within:border-[#F5A623]/50 transition-colors">
            <span className="text-[#5C6370] text-sm mr-2">$</span>
            <input
              type="text"
              placeholder="search solutions..."
              className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-[#5C6370]"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>

          <select
            className="border border-white/10 rounded-md px-4 py-2.5 text-sm bg-[#10141F] text-[#E6E8EB] outline-none focus:border-[#F5A623]/50 transition-colors"
            value={sort || ""}
            onChange={(e) =>
              e.target.value === "" ? setsort(null) : setsort(e.target.value)
            }
          >
            <option value="">All platforms</option>
            <option value="Codeforces">Codeforces</option>
            <option value="Leetcode">Leetcode</option>
            <option value="Atcoder">Atcoder</option>
          </select>

          <select
            className="border border-white/10 rounded-md px-4 py-2.5 text-sm bg-[#10141F] text-[#E6E8EB] outline-none focus:border-[#F5A623]/50 transition-colors"
            value={lang || ""}
            onChange={(e) =>
              e.target.value === "" ? setlang(null) : setlang(e.target.value)
            }
          >
            <option value="">All languages</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>
        </div>
      </div>

      {/* Feed */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-6 pb-6 gap-4">
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
              !lang || post.language?.toLowerCase() === lang?.toLowerCase()
          )
          .filter((post) => post.isHidden == false)
          .map((post) => (
            <PostCard
              key={post._id}
              post={post}
              authUser={authUser}
              onPostClick={handlepost}
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

      {/* Upload button */}
      {authUser?.role !== "admin" && (
        <motion.button
          onClick={handleupload}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="fixed bottom-6 right-6 z-20 bg-[#F5A623] text-[#0B0E14] px-6 py-3 rounded-md font-semibold shadow-xl hover:bg-[#ffb43d] transition-colors flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span> Upload Post
        </motion.button>
      )}
    </motion.div>
  );
};