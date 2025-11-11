
import React, { useEffect,useState } from "react";
import { useSolution } from "../store/useSolutionstore";
import { useAuthstore } from "../store/useAuthstore";
import { motion } from "framer-motion";
import { FaRegHeart, FaTrash, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const { getmysol, mysols, deletesol,handlecomment ,selectedpost } = useSolution();
  const { authUser } = useAuthstore();
  const id = authUser._id;
  const [comm, setComment] = useState("");
 const  navigate =useNavigate()

  const handleDelete = (e, id) => {
    e.preventDefault();
    deletesol(id);
  };


  const handlepost=(e,post)=>{
    e.preventDefault()
    // console.log(post)
        selectedpost(post)
        navigate('./view')
  }

  useEffect(() => {
    getmysol();
  }, [id]);

  return (
    <div className="w-full   p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white justify-center">
      <h2 className="text-2xl font-bold  border-b pb-3 mb-4 w-full">
        My Posts
      </h2>

      {mysols?.length === 0 && (
        <p className="text-white text-center">No posts yet.</p>
      )}
       
       <div className="flex flex-col items-center px-4 py-6 gap-4">
      {mysols?.map((post) => {
        const isLiked = post.likes?.includes(authUser?._id);
        const isbookmarked = post.bookmarkedby?.includes(authUser?._id);
        


          return (
                      <motion.div
                        key={post._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-gray-600 rounded-2xl p-5 shadow-lg hover:scale-105 transition-all "
                        onClick={(e)=> handlepost(e,post)}
            >
              
                        {/* Header */}
                          <div className="flex items-center gap-3 mb-2 justify-between">
                          <div className='flex items-center gap-3 mb-2'>
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={post.createdby?.profilephoto || "/avatar-placeholder.png"}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              {post.user?.name}
                            </div>
                            <div className="text-xs text-gray-300">@{post?.platform}</div>
                          </div>
                          </div>
                          <div className='flex gap-3'>
                          <span className='px-8 py-3 bg-gray-500  rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300'>{post?.language}</span>
                          <span className='px-8 py-3 bg-gray-500  rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300'>{post?.platform}</span>
                          </div>
                        </div>
        
                        {/* Doubt */}
                        <p className="text-gray-100 text-sm">{post?.doubt}</p>
        
                        {/* Actions */}
                        <div className="flex gap-6 mt-4 text-gray-400 justify-between">
                          {/* 💬 Comments */}
                          <div
                            className="flex items-center gap-1 cursor-pointer hover:text-blue-400"
                            onClick={(e) =>
                              {
                                e.stopPropagation()
                            
                              }
                            }
                          >
                            <FaRegComment className="w-4 h-4" />
                            <span className="text-sm">{post.comments?.length}</span>
                          </div>
        
                          {/* ❤️ Likes */}
                          <div
                            className={`flex items-center gap-1 cursor-pointer ${
                              isLiked ? "text-pink-500" : "hover:text-pink-500"
                            }`}
                            // onClick={(e) => handleLikePost(e, post._id)}
                          >
                            <FaRegHeart className="w-4 h-4" />
                            <span className="text-sm">{post.likes.length}</span>
                          </div>
        
                          {/* 🔖 Bookmark */}
                          <div
                            className={`flex items-center gap-1 cursor-pointer ${
                              isbookmarked ? "text-blue-500" : "hover:text-blue-500"
                            }`}
                            // onClick={(e) => handlebook(e, post._id)}
                          >
                            <FaRegBookmark className="w-4 h-4" />
                          </div>
        
                          {/* 🗑 Delete */}
                          {post.user?._id === authUser?._id && (
                            <div
                              className="flex items-center gap-1 cursor-pointer hover:text-red-500"
                              onClick={(e) => handleDelete(e, post._id)}
                            >
                              <FaTrash className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      
                      </motion.div>
                    );
      })}
        </div>
    </div>
  );
};

export default MyPosts;
