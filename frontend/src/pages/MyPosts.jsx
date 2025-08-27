
import React, { useEffect,useState } from "react";
import { useSolution } from "../store/useSolutionstore";
import { useAuthstore } from "../store/useAuthstore";
import { motion } from "framer-motion";
import { FaRegHeart, FaTrash, FaRegComment, FaRegBookmark } from "react-icons/fa";

const MyPosts = () => {
  const { getmysol, mysols, deletesol,handlecomment } = useSolution();
  const { authUser } = useAuthstore();
  const id = authUser._id;
    const [comm, setComment] = useState("");

  const handleDelete = (e, id) => {
    e.preventDefault();
    deletesol(id);
  };

    const handlePostComment = (e, id, data) => {
    e.preventDefault();
    handlecomment(id, data);
    setComment("");
  };

  useEffect(() => {
    getmysol();
  }, [id]);

  return (
    <div className="w-full   p-6 space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <h2 className="text-2xl font-bold  border-b pb-3 mb-4 w-full">
        My Solutions
      </h2>

      {mysols?.length === 0 && (
        <p className="text-white text-center">No posts yet.</p>
      )}

      {mysols?.map((pass) => {
        const isLiked = pass.likes?.includes(authUser?._id);
   const isbookmarked = pass.bookmarkedby?.includes(authUser?._id);

        return (
          <motion.div
            key={pass._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white/10 backdrop-blur-lg  text-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 flex flex-col border border-gray-200" >
            {/* Post Content */}
            <div className="space-y-3 text-left flex justify-between ">
              <p className=" text-lg font-semibold">
                Doubt:{" "}
                <span className=" font-normal">{pass.doubt}</span>
              </p>

              <p className=" text-lg font-semibold flex items-center gap-2">
                Description:{" "}
                <span className=" font-normal">
                  {pass.description}
                </span>
              </p>
              <p className=" text-lg font-semibold flex items-center gap-2">
                Language:{" "}
                <span className=" font-normal">
                  {pass.language}
                </span>
              </p>
              <p className=" text-lg font-semibold flex items-center gap-2">
                Platform:{" "}
                <span className=" font-normal">
                  {pass.platform}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
              {/* 💬 Comments */}
              <div
                className="flex gap-1 items-center cursor-pointer group"
                onClick={() =>
                  document
                    .getElementById("comments_modal" + pass._id)
                    .showModal()
                }
              >
                <FaRegComment className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
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
                  className={`w-5 h-5 transition-colors ${
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
                <FaRegBookmark className={`flex items-center gap-1 cursor-pointer ${
                      isbookmarked ? "text-blue-500" : "hover:text-blue-500"
                    }`}/>
              </div>

              {/* 🗑 Delete */}
              {pass.createdby === authUser?._id && (
                <div
                  className="flex gap-1 items-center cursor-pointer group"
                  onClick={(e) => handleDelete(e, pass._id)}
                >
                  <FaTrash className="w-5 h-5 text-gray-500 group-hover:text-red-600" />
                </div>
              )}
                <dialog
                  id={`comments_modal${pass._id}`}
                  className="modal border-none outline-none bg-gradient-to-br from-gray-900 via-black to-gray-800 "
                >
                  <div className="modal-box  rounded-xl max-w-lg bg-gradient-to-br from-gray-900 via-black to-gray-800">
                    <h3 className="font-bold text-lg mb-4 text-white">Comments</h3>

                    <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                      {pass.comments.length === 0 && (
                        <p className="text-sm text-gray-500">
                          No comments yet 🤔 Be the first one 😉
                        </p>
                      )}

                      {pass.comments.map((comment) => (
                        <div key={comment._id} className="flex gap-2 items-start">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                              src={comment.user.profileImg || "/avatar-placeholder.png"}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <span className="font-semibold text-sm">
                                {comment.user.name}
                              </span>
                              <span className="text-gray-500 text-xs">
                                @{comment.user.name}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Post Comment */}
                    <form
                      className="flex gap-2 items-center mt-4 border-t border-gray-300 pt-2"
                      onSubmit={(e) => handlePostComment(e, post._id, comm)}
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
                  <form method="dialog" className="modal-backdrop">
                    <button className="outline-none text-white">close</button>
                  </form>
                </dialog>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MyPosts;
