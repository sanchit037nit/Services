import React, { useEffect } from "react";
import { useAuthstore } from "../store/useAuthstore.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSolution } from "../store/useSolutionstore.js";
import { FaRegHeart,FaTrash,FaRegComment} from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import { bookmark, commentonsolution } from "../../../backend/controllers/solution.controller.js";
import Uploadpage from "./Uploadpage.jsx";


export const Homepage = () => {
  const { authUser } = useAuthstore();
  const { getsol, solutions, deletesol,inclikes,bookmark,handlecomment} = useSolution();
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [comm, setComment] = useState("");
  const [sort, setsort] = useState("");

  const id = authUser._id;

  useEffect(() => {
    getsol();
  }, [id]);

  const handleLikePost = (e, passId) => {
    e.preventDefault();
    inclikes(passId)
    
  };

  const handleDelete = (e, passId) => {
    e.preventDefault();
    deletesol(passId);
  };

  const handleCopy = (e, id) => {
    e.preventDefault();
    bookmark(id)

  };

  const handleSort = () => {
    setsort(!sort);
  };
  // const handlebookmarks = (e,id) => {
  //   e.preventDefault()
  //   bookmark(id)
  // };
  const handleupload = (e) => {
    e.preventDefault()
    navigate('/upload')
  };

  const handlePostComment=(e,id,data)=>{
	  e.preventDefault()
    handlecomment(id,data)
  }


  return (
  <div className="flex flex-col bg-white text-black min-h-screen ">
    <div className="flex justify-center items-center border-b-black">
		<input 
		type="text" 
		id="1" 
		placeholder="Search..."
		value={search}
		onChange={(e)=>setsearch(e.target.value)}
		/>
	</div>
  <div>
    <label htmlFor="p">Choose platform:</label>
<select 
id="p" 
name="platform"
value={sort}
onChange={(e) => e.target.value=="" ? setsort(null):setsort(e.target.value)}
defaultValue={""}
>
  <option value="Codeforces">Codeforces</option>
  <option value="Leetcode">Leetcode</option>
  <option value="Atcoder">Atcoder</option>
  <option value="">Default</option>
</select>

  </div>
    {solutions?.filter((post) =>
            post.doubt.toLowerCase().includes(search.toLowerCase())
          ).filter((post)=>
             !sort || post.platform.toLowerCase()==sort.toLowerCase()  
          ).map((post) => {
      const isLiked = post.likes.includes(authUser._id);

      return (
        <div
          key={post._id}
          className="flex gap-2 items-start p-4 border-b border-gray-300"
        >
          <div className="flex flex-col flex-1">
            <div className="flex flex-col gap-3 overflow-hidden">
              <span className="text-gray-900">{post.doubt}</span>
            </div>

            <div className="flex justify-between mt-3">
              <div className="flex gap-4 items-center w-2/3 justify-between">
                {/* comments */}
              
                							<div
								className='flex gap-1 items-center cursor-pointer group'
								onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
							>
								<FaRegComment className='w-4 h-4  text-slate-500 group-hover:text-sky-400' />
								<span className='text-sm text-slate-500 group-hover:text-sky-400'>
									{post.comments.length}
								</span>
							</div>

                <dialog id={`comments_modal${post._id}`} className='modal border-none outline-none'>
								<div className='modal-box rounded border border-gray-600'>
									<h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
									<div className='flex flex-col gap-3 max-h-60 overflow-auto'>
										{post.comments.length === 0 && (
											<p className='text-sm text-slate-500'>
												No comments yet 🤔 Be the first one 😉
											</p>
										)}
										{post.comments.map((comment) => (
											<div key={comment._id} className='flex gap-2 items-start'>
												<div className='avatar'>
													<div className='w-8 rounded-full'>
														<img
															src={comment.user.profileImg || "/avatar-placeholder.png"}
														/>
													</div>
												</div>
												<div className='flex flex-col'>
													<div className='flex items-center gap-1'>
														<span className='font-bold'>{comment.user.fullName}</span>
														<span className='text-gray-700 text-sm'>
															@{comment.user.username}
														</span>
													</div>
													<div className='text-sm'>{comment.text}</div>
												</div>
											</div>
										))}
									</div>
									<form
										className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
										onSubmit={(e)=>handlePostComment(e,post._id,comm)}
									>
										<textarea
											className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800'
											placeholder='Add a comment...'
											value={comm}
											onChange={(e) => setComment(e.target.value)}
										/>
                    <button type="submit" className='btn btn-primary rounded-full btn-sm text-black px-4'>
											Post
										</button>
										
									</form>
								</div>
								<form method='dialog' className='modal-backdrop'>
									<button className='outline-none'>close</button>
								</form>
							</dialog>

                {/* likes */}
                <div
                  className="flex gap-1 items-center group cursor-pointer"
                  onClick={(e) => handleLikePost(e, post._id)}
                >
                  {!isLiked && (
                    <FaRegHeart className="w-4 h-4 cursor-pointer text-gray-500 group-hover:text-pink-600" />
                  )}
                  {isLiked && (
                    <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-600" />
                  )}

                  <span
                    className={`text-sm group-hover:text-pink-600 ${
                      isLiked ? "text-pink-600" : "text-gray-600"
                    }`}
                  >
                    {post.likes.length}
                  </span>
                </div>

                {/* bookmark */}
                <div className="flex gap-1 items-center group cursor-pointer">
                  <FaRegBookmark className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                </div>
              </div>
            </div>
          </div>
         
        </div>

        
      );
    })}
	 <button onClick={(e)=>handleupload(e)}>Upload</button>
  </div>
);

};