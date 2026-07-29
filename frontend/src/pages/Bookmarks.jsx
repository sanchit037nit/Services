import React from 'react'
import { useSolution } from '../store/useSolutionstore.js';
import { useAuthstore} from '../store/useAuthstore.js'

import { FaRegComment, FaRegHeart, FaRegBookmark, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import ReportModal from "../../components/ReportModal";

const Bookmarks = () => {
  const { authUser} = useAuthstore()
  const { bookmarks, getbookmark } = useSolution()
  const [openReport, setOpenReport] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
    const id=authUser._id

    useEffect(()=>{
      getbookmark()
    }, [])
const submitReport = async (reason) => {

    try {

        console.log("Selected Post:", selectedPost);

        console.log("Reason:", reason);

    } catch (err) {

        console.log(err);

    }

};

return (
<div className="flex flex-col items-center w-full p-6 gap-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">
        <h2 className="text-2xl font-bold  border-b pb-3 mb-4 w-full">
        My Bookmarks
    </h2>
    
          {bookmarks?.length === 0 && (
        <p className="text-white text-center">No bookmarks yet.</p>
    )}
    
{bookmarks?.map((post) => (

    <PostCard
        key={post._id}

        post={post}

        authUser={authUser}

        onPostClick={(e, post) => {
            console.log(post);
        }}

        handleComment={(post) => {
            console.log(post);
        }}

        handleLike={(id) => {
            handleLikePost(id);
        }}

        handleBookmark={(id) => {
            handlebook(id);
        }}

        handleDelete={(id) => {
            handleDelete(id);
        }}

        handleReport={(post) => {

            setSelectedPost(post);

            setOpenReport(true);

        }}

    />

))}
    <ReportModal
    open={openReport}
    onClose={() => setOpenReport(false)}
onSubmit={submitReport}
/>
</div>

)
}



export default Bookmarks
