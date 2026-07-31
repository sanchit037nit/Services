
import React, { useEffect,useState } from "react";
import { useSolution } from "../store/useSolutionstore";
import { useAuthstore } from "../store/useAuthstore";
import { motion } from "framer-motion";
import { FaRegHeart, FaTrash, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineReport } from "react-icons/md";
import PostCard from "../../components/PostCard";
import ReportModal from "../../components/ReportModal";


const MyPosts = () => {
  const { getmysol, mysols, deletesol,handlecomment ,selectedpost } = useSolution();
  const { authUser } = useAuthstore();
  const id = authUser._id;
  const [comm, setComment] = useState("");
  const navigate = useNavigate()
  const [openReport,setOpenReport]=useState(false);
  const [reason, setReason] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  const handleDelete = (e, id) => {
    e.preventDefault();
    deletesol(id);
  };


  const handlepost = (e, post) => {
    e.preventDefault()
    selectedpost(post)
    navigate('./view')
  }

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
  <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center p-6">

    <h2 className="text-2xl font-bold border-b pb-3 mb-4 w-full">
      My Posts
    </h2>

    {mysols?.length === 0 && (
      <p className="text-white text-center">
        No posts yet.
      </p>
    )}

    <div className="flex flex-col items-center px-4 py-6 gap-4 w-full">

    {mysols?.map((post) =>
      post.isHidden ? (
    <div
      key={post._id}
      className="p-4 mb-4 rounded-lg border border-red-300 bg-red-50 text-red-700"
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
      handleLike={(post) => {
        handleLikePost(post);
      }}
      handleBookmark={(post) => {
        handlebook(post);
      }}
      handleDelete={(id) => {
        handleDelete(id);
      }}
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
);
};
export default MyPosts;
