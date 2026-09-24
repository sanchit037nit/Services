import React, { useEffect, useState } from "react";
import { useAuthstore } from "../store/useAuthstore.js";
import { useNavigate } from "react-router-dom";
import { useSolution } from "../store/useSolutionstore.js";
import { useThemeStore } from "../store/useThemeStore.js";
import { FaRegHeart, FaTrash, FaRegComment, FaMoon, FaSun } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
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
  
  const { theme, toggleTheme } = useThemeStore();

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
      className="relative min-h-screen bg-[#f8fafc] dark:bg-[#0B0E14] text-[#0f172a] dark:text-[#E6E8EB] w-full font-mono"
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
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/[0.02] border-b border-black/10 dark:border-white/10 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 max-w-6xl mx-auto">
          
          <div className="flex flex-1 items-center gap-3 w-full">
            <div className="flex-1 max-w-xl flex items-center bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl px-4 py-1 shadow-inner focus-within:border-[#2DD4BF]/50 focus-within:ring-1 focus-within:ring-[#2DD4BF]/30 transition-all">
              <span className="text-[#64748b] dark:text-[#5C6370] text-sm mr-2">$</span>
              <input
                type="text"
                placeholder="Search solutions..."
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-[#64748b] dark:text-[#5C6370] text-[#0f172a] dark:text-[#E6E8EB]"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>

            <select
              className="border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm bg-black/5 dark:bg-white/5 backdrop-blur-md text-[#0f172a] dark:text-[#E6E8EB] outline-none focus:border-[#2DD4BF]/50 focus:ring-1 focus:ring-[#2DD4BF]/30 transition-all cursor-pointer shadow-inner"
              value={sort || ""}
              onChange={(e) =>
                e.target.value === "" ? setsort(null) : setsort(e.target.value)
              }
            >
              <option value="" className="bg-[#f8fafc] dark:bg-[#0B0E14]">All platforms</option>
              <option value="Codeforces" className="bg-[#f8fafc] dark:bg-[#0B0E14]">Codeforces</option>
              <option value="Leetcode" className="bg-[#f8fafc] dark:bg-[#0B0E14]">Leetcode</option>
              <option value="Atcoder" className="bg-[#f8fafc] dark:bg-[#0B0E14]">Atcoder</option>
            </select>

            <select
              className="border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm bg-black/5 dark:bg-white/5 backdrop-blur-md text-[#0f172a] dark:text-[#E6E8EB] outline-none focus:border-[#2DD4BF]/50 focus:ring-1 focus:ring-[#2DD4BF]/30 transition-all cursor-pointer shadow-inner"
              value={lang || ""}
              onChange={(e) =>
                e.target.value === "" ? setlang(null) : setlang(e.target.value)
              }
            >
              <option value="" className="bg-[#f8fafc] dark:bg-[#0B0E14]">All languages</option>
              <option value="C" className="bg-[#f8fafc] dark:bg-[#0B0E14]">C</option>
              <option value="C++" className="bg-[#f8fafc] dark:bg-[#0B0E14]">C++</option>
              <option value="Python" className="bg-[#f8fafc] dark:bg-[#0B0E14]">Python</option>
              <option value="Java" className="bg-[#f8fafc] dark:bg-[#0B0E14]">Java</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md text-[#0f172a] dark:text-[#E6E8EB] hover:bg-[#fdf6e3] dark:bg-[#10141F] transition-colors shadow-lg"
          >
            {theme === "dark" ? <FaSun size={18} className="text-[#F5A623]" /> : <FaMoon size={18} className="text-[#8B7FD6]" />}
          </motion.button>
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
        <div className="fixed bottom-8 right-8 z-20">
          <div className="absolute inset-0 bg-[#2DD4BF] blur-xl opacity-30 rounded-full pointer-events-none scale-150" />
          <motion.button
            onClick={handleupload}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-2 bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] text-white px-6 py-3.5 rounded-full font-semibold shadow-[0_10px_20px_rgba(45,212,191,0.3)] hover:shadow-[0_15px_25px_rgba(45,212,191,0.4)] transition-all"
          >
            <span className="text-xl leading-none font-bold">+</span> Upload Doubt
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};