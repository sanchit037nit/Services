import React from 'react'
import { useEffect } from 'react'
import { useSolution } from '../store/useSolutionstore'
import { useAuthstore } from '../store/useAuthstore'
import {motion} from "framer-motion"
import { FaRegHeart, FaTrash, FaRegComment,FaRegBookmark } from "react-icons/fa";

const MyPosts = () => {

    const {getmysol,mysols,deletesol}=useSolution()
    const {authUser}=useAuthstore()
    const id=authUser._id
     const handleDelete=(e,id)=>{
      e.preventDefault()
      deletesol(id)
     }
    useEffect(()=>{
        getmysol()
    },[id])

  return (
     <div className="flex flex-col w-full mx-auto p-6 space-y-5">
       {mysols?.map((pass) => {
    const isLiked = pass.likes?.includes(authUser?._id);
   
         return (
           <motion.div
             key={pass._id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3 }}
             whileHover={{ scale: 1.02 }}
             className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
           >
             {/* Bookmark Content */}
             <div className="space-y-2 text-left flex-1">
               {/* Doubt */}
               <p className="text-gray-900 text-lg font-semibold">
                 Name:{" "}
                 <span className="text-gray-600 font-normal">{pass.doubt}</span>
               </p>
   
               {/* Password */}
               <p className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                 Password:{" "}
                 <span className="text-gray-600 font-normal">
                   {pass.password || "••••••"}
                 </span>
               </p>
             </div>
   
             {/* Actions */}
             <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
               {/* 💬 Comments */}
               <div
                 className="flex gap-1 items-center cursor-pointer group"
                 onClick={() =>
                   document
                     .getElementById("comments_modal" + pass._id)
                     .showModal()
                 }
               >
                 <FaRegComment className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                 <span className="text-sm text-gray-500 group-hover:text-blue-500">
                   {pass.comments?.length || 0}
                 </span>
               </div>
   
               {/* ❤️ Likes */}
               <div
                 className="flex gap-1 items-center cursor-pointer group"
                 onClick={(e) => handleLikePost(e, pass._id)}
               >
                 <FaRegHeart
                   className={`w-4 h-4 transition-colors ${
                     isLiked
                       ? "text-pink-600"
                       : "text-gray-500 group-hover:text-pink-600"
                   }`}
                 />
                 <span
                   className={`text-sm ${
                     isLiked
                       ? "text-pink-600"
                       : "text-gray-500 group-hover:text-pink-600"
                   }`}
                 >
                   {pass.likes?.length || 0}
                 </span>
               </div>
   
               {/* 🔖 Bookmark */}
               <div
                 className="flex gap-1 items-center cursor-pointer group"
                 onClick={(e) => handlebook(e, pass._id)}
               >
                 <FaRegBookmark className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
               </div>
   
               {/* 🗑 Delete */}
               {pass.createdby === authUser?._id && (
                 <div
                   className="flex gap-1 items-center cursor-pointer group"
                   onClick={(e) => handleDelete(e, pass._id)}
                 >
                   <FaTrash className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                 </div>
               )}
             </div>
           </motion.div>
         );
       })}
     </div>
  )
}

export default MyPosts
