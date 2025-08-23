import React, { useEffect, useState } from "react";
import { useAuthstore } from "../store/useAuthstore.js";
import { useNavigate } from "react-router-dom";
import { useSolution } from "../store/useSolutionstore.js";
import { FaRegHeart, FaTrash, FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";

export const Homepage = () => {
  const { authUser } = useAuthstore();
  const { getsol, solutions, deletesol, inclikes, bookmark, handlecomment } = useSolution();
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [comm, setComment] = useState("");
  const [sort, setsort] = useState("");

  const id = authUser?._id;

  useEffect(() => {
    getsol();
  }, [id]);

  const handleLikePost = (e, passId) => {
    e.preventDefault();
    inclikes(passId);
  };

  const handleDelete = (e, passId) => {
    e.preventDefault();
    deletesol(passId);
  };

  const handlebook = (e, id) => {
    e.preventDefault();
    bookmark(id);
  };
  const handleview = (e) => {
    e.preventDefault()
    navigate("/bookmarks")
  };

  const handleupload = (e) => {
    e.preventDefault();
    navigate("/upload");
  };

  const handlePostComment = (e, id, data) => {
    e.preventDefault();
    handlecomment(id, data);
    setComment(""); // clear after posting
  };



  return (
    <div className="flex flex-col bg-[#f9fafb] text-black min-h-screen">
      {/* 🔍 Search bar */}
      <div className="flex justify-center items-center border-b border-gray-300 p-3 bg-white shadow-sm">
        <input
          type="text"
          placeholder="Search solutions..."
          className="w-full max-w-lg px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>

      {/* ⚡ Sorting */}
      <div className="p-4 flex items-center gap-2">
        <label htmlFor="p" className="text-sm font-semibold text-gray-700">
          Filter by Platform:
        </label>
        <select
          id="p"
          name="platform"
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sort || ""}
          onChange={(e) =>
            e.target.value === "" ? setsort(null) : setsort(e.target.value)
          }
        >
          <option value="">All</option>
          <option value="Codeforces">Codeforces</option>
          <option value="Leetcode">Leetcode</option>
          <option value="Atcoder">Atcoder</option>
        </select>
      </div>

      {/* 🚀 Feed */}
      <div className="flex flex-col">
        {solutions
          ?.filter((post) =>
            post.doubt.toLowerCase().includes(search.toLowerCase())
          )
          .filter((post) => !sort || post.platform.toLowerCase() === sort.toLowerCase())
          .map((post) => {
            const isLiked = post.likes.includes(authUser?._id);

            return (
              <div
                key={post._id}
                className="flex gap-3 items-start p-4 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={post.user?.profileImg || "/avatar-placeholder.png"} />
                  </div>
                </div>

                {/* Post Content */}
                <div className="flex flex-col flex-1">
                  {/* Username */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">{post.user?.name}</span>
                    <span className="text-gray-500 text-sm">@{post?.platform}</span>
                  </div>

                  {/* Doubt / Content */}
                  <p className="text-gray-900 text-sm">{post?.doubt}</p>

                  {/* Actions */}
                  <div className="flex justify-between mt-3 w-2/3">
                    {/* 💬 Comments */}
                    <div
                      className="flex gap-1 items-center cursor-pointer group"
                      onClick={() =>
                        document.getElementById("comments_modal" + post._id).showModal()
                      }
                    >
                      <FaRegComment className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
                      <span className="text-sm text-gray-500 group-hover:text-blue-500">
                        {post.comments?.length}
                      </span>
                    </div>

                    {/* ❤️ Likes */}
                    <div
                      className="flex gap-1 items-center cursor-pointer group"
                      onClick={(e) => handleLikePost(e, post._id)}
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
                          isLiked ? "text-pink-600" : "text-gray-500 group-hover:text-pink-600"
                        }`}
                      >
                        {post.likes.length}
                      </span>
                    </div>

                    {/* 🔖 Bookmark */}
                    <div
                      className="flex gap-1 items-center cursor-pointer group"
                      onClick={(e) => handlebook(e, post._id)}
                    >
                      <FaRegBookmark className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    </div>

                    {/* 🗑 Delete (only for post owner) */}
                    {post.user?._id === authUser?._id && (
                      <div
                        className="flex gap-1 items-center cursor-pointer group"
                        onClick={(e) => handleDelete(e, post._id)}
                      >
                        <FaTrash className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Comment Modal */}
                <dialog
                  id={`comments_modal${post._id}`}
                  className="modal border-none outline-none"
                >
                  <div className="modal-box rounded-md border border-gray-200 bg-white">
                    <h3 className="font-bold text-lg mb-4">Comments</h3>
                    <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                      {post.comments.length === 0 && (
                        <p className="text-sm text-gray-500">
                          No comments yet 🤔 Be the first one 😉
                        </p>
                      )}
                      {post.comments.map((comment) => (
                        <div key={comment._id} className="flex gap-2 items-start">
                          <div className="avatar">
                            <div className="w-8 rounded-full">
                              <img
                                src={comment.user.profileImg || "/avatar-placeholder.png"}
                              />
                            </div>
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
                            <p className="text-sm">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Post Comment */}
                    <form
                      className="flex gap-2 items-center mt-4 border-t border-gray-200 pt-2"
                      onSubmit={(e) => handlePostComment(e, post._id, comm)}
                    >
                      <textarea
                        className="textarea w-full p-2 rounded-md text-sm resize-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
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
                    <button className="outline-none">close</button>
                  </form>
                </dialog>
              </div>
            );
          })}
      </div>

      {/* Upload Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleupload}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          + Upload Solution
        </button>
        <button
          onClick={(e)=>handleview(e)}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          my book
        </button>
      </div>
    </div>
  );
};
