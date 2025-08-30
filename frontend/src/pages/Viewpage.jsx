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

    const isLiked = selpost.likes?.includes(authUser?._id);
    const isbookmarked = selpost.bookmarkedby?.includes(authUser?._id);

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
                      className="w-full h-full object-cover"
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
                <h2>Doubt:</h2>
                <p className="text-gray-100 text-sm">{selpost?.doubt}</p>

                <h2>Description:</h2>
                <p className="text-gray-100 text-sm">{selpost?.description}</p>

              <h2>Code:</h2>
<pre className="bg-gray-900 text-gray-100 text-sm p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
  {selpost?.code}
</pre>
<br />

                 <div className="w-full h-100 overflow-hidden">
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
                  <div className="modal-box  rounded-xl  bg-gradient-to-br from-gray-900 via-black to-gray-800 w-full">
                    <h3 className="font-bold text-lg mb-4 text-white">Comments</h3>

                    <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                      {selpost.comments.length === 0 && (
                        <p className="text-sm text-gray-500">
                          No comments yet 🤔 Be the first one 😉
                        </p>
                      )}

                      {selpost.comments.map((comment) => (
                        <div key={comment._id} className="flex gap-2 items-start">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                              src={comment.user?.profilephoto || "/avatar-placeholder.png"}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-sm">
                                {comment.user?.name}
                              </span>
                              <span className="text-white text-xs">
                                @{comment.user?.name}
                              </span>
                            </div>
                            <p className="text-sm text-white">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Post Comment */}
                    <form
                      className="flex gap-2 items-center mt-4 border-t border-gray-300 pt-2"
                      onSubmit={(e) => handlePostComment(e, selpost._id, comm)}
                    >
                      <textarea
                        className="textarea w-full p-2 rounded-md text-sm resize-none border border-gray-400 focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a comment..."
                        value={comm}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="px-4 py-1 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
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
