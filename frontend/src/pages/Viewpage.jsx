import React,{useEffect, useState} from 'react'
import { useSolution } from '../store/useSolutionstore'
import { motion } from "framer-motion";
import { FaRegHeart, FaTrash, FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { useAuthstore } from "../store/useAuthstore.js";

const Viewpage = () => {
    const {selpost,handlecomment,selectedpost} =useSolution()
    const { authUser } = useAuthstore();
  const [comm, setComment] = useState("");


    const isLiked = selpost?.likes?.includes(authUser?._id);
    const isbookmarked = selpost?.bookmarkedby?.includes(authUser?._id);

    const handlePostComment = (e, id, data) => {
    e.preventDefault();
    handlecomment(id, data);
    setComment("");
  };



  return (
    
    <div className="flex flex-col items-center px-4 py-6 gap-4  relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden w-full">
              <motion.div
             
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-gray-600 rounded-2xl p-5 shadow-lg  transition-all"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-2 justify-between">
                  <div className='flex items-center gap-3 mb-2'>
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={selpost.createdby?.profilephoto || "/avatar-placeholder.png"}
                      alt="avatar"
                      className="w-full max-h-96 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {selpost.user?.name}
                    </div>
                    <div className="text-xs text-gray-300">@{selpost?.platform}</div>
                  </div>
                  </div>
                  <div className='flex gap-3'>
                  <span className='px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300'>{selpost?.language}</span>
                  <span className='px-8 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300'>{selpost?.platform}</span>
                  </div>
                </div>

                {/* Doubt */}
                <h2 className="text-lg font-semibold text-white mt-4">Doubt</h2>
                <p className="text-gray-100 text-sm">{selpost?.doubt}</p>

                <h2 className="text-lg font-semibold text-white mt-4">Description:</h2>
                <p className="text-gray-100 text-sm">{selpost?.description}</p>

              <h2 className="text-lg font-semibold text-white mt-4">Code:</h2>
<pre className="bg-black text-green-400 text-sm p-4 rounded-lg overflow-x-auto font-mono">
  {selpost?.code}
</pre>
<br />

                 <div className="w-full max-h-96 object-cover rounded-lg">
                    <img
                      src={selpost?.photo || "/avatar-placeholder.png"}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                {/* Actions */}
                <div className="flex gap-6 mt-4 text-gray-400 justify-between">
                  {/* 💬 Comments */}
                  <div
                    className="flex items-center gap-1 cursor-pointer hover:text-blue-400"
                    // onClick={() =>
                    //   document.getElementById("comments_modal" + selpost._id).showModal()
                    // }
                  >
                    <FaRegComment className="w-4 h-4" />
                    <span className="text-sm">{selpost.comments?.length}</span>
                  </div>

                  {/* ❤️ Likes */}
                  <div
                    className={`flex items-center gap-1 cursor-pointer ${
                      isLiked ? "text-pink-500" : "hover:text-pink-500"
                    }`}
                  >
                    <FaRegHeart className="w-4 h-4" />
                    <span className="text-sm">{selpost.likes.length}</span>
                  </div>

                  {/* 🔖 Bookmark */}
                  <div
                    className={`flex items-center gap-1 cursor-pointer ${
                      isbookmarked ? "text-blue-500" : "hover:text-blue-500"
                    }`}
                  >
                    <FaRegBookmark className="w-4 h-4" />
                  </div>

                  {/* 🗑 Delete */}
                  {selpost.user?._id === authUser?._id && (
                    <div
                      className="flex items-center gap-1 cursor-pointer hover:text-red-500"
                      onClick={(e) => handleDelete(e, post._id)}
                    >
                      <FaTrash className="w-4 h-4" />
                    </div>
                  )}
                </div>

<br />
<br />
                {/* Comment Modal */}
          <div className="w-full rounded-2xl bg-white/10 backdrop-blur-lg border border-gray-700 p-5">

  <h3 className="font-semibold text-lg mb-4 text-white border-b border-gray-700 pb-2">
    Comments
  </h3>

  <div className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2">

    {selpost?.comments?.length === 0 && (
      <p className="text-sm text-gray-400 text-center">
        No comments yet 🤔 Be the first one 😉
      </p>
    )}

    {selpost?.comments?.map((comment) => (
      <div
        key={comment._id}
        className="flex gap-3 items-start bg-black/30 rounded-lg p-3 border border-gray-700"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={comment.user?.profilephoto || "/avatar-placeholder.png"}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-white">
              {comment.user?.name}
            </span>

            <span className="text-gray-400 text-xs">
              @{comment.user?.name}
            </span>
          </div>

          <p className="text-sm text-gray-300">
            {comment.text}
          </p>
        </div>
      </div>
    ))}

  </div>

  {/* Comment Input */}
  <form
    className="flex gap-3 items-center mt-5 border-t border-gray-700 pt-3"
    onSubmit={(e) => handlePostComment(e, selpost._id, comm)}
  >
    <textarea
      className="w-full bg-gray-900 text-white p-2 rounded-lg text-sm resize-none border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Write a comment..."
      value={comm}
      onChange={(e) => setComment(e.target.value)}
      rows={2}
    />

    <button
      type="submit"
      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
    >
      Post
    </button>
  </form>

</div>
              </motion.div>
                
      </div>
  )
}

export default Viewpage
