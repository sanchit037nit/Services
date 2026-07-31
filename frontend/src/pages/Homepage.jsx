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
  }, [id, getsol,solutions]);

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
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden w-full"
    >
      {/* Background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-600 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>

      {/* 🔍 Search bar (FIXED) */}
      <div className="sticky top-0 z-20 backdrop-blur-lg bg-black/30">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 p-4 max-w-5xl mx-auto">
          <input
            type="text"
            placeholder="Search solutions..."
            className="flex-1 max-w-xl px-4 py-2 rounded-full border border-gray-500 bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />

          <select
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
            className="border border-gray-500 rounded-full px-4 py-2 text-sm bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={lang || ""}
            onChange={(e) =>
              e.target.value === "" ? setlang(null) : setlang(e.target.value)
            }
          >
            <option value="">All Languages</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>
        </div>
      </div>

      {/* 🚀 Feed */}
      <div className="flex flex-col items-center px-4 pt-2 pb-6 gap-4">
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
          .filter((post) => post.isHidden == false
        )
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
      
      {/* ➕ Upload Button */}
{authUser?.role !== "admin" && (

<motion.button
    onClick={handleupload}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition"
>
    + Upload Post
</motion.button>

)}
    </motion.div>
  );
};