import React, { useEffect } from "react";
import { useAuthstore } from "../store/useAuthstore.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSolution } from "../store/useSolutionstore.js";
import { bookmark } from "../../../backend/controllers/solution.controller.js";


export const Homepage = () => {
  const { authUser } = useAuthstore();
  const { getsol, solutions, deletesol,inclikes,bookmark } = useSolution();
  const navigate = useNavigate();
  const [likes, setlikes] = useState(0);
  const [spass, setspass] = useState("");
  const [sort, setsort] = useState(false);

  const id = authUser._id;

  useEffect(() => {
    getsol();
  }, [id]);

  const handleView = (e, passId) => {
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
  const handlebookmarks = (id) => {
    bookmark(id)
  };
  const handleupload = () => {
    navigate('/upload')
  };

  return (
    <div className="flex flex-col  gap-5   text-black font-sans tracking-wide">

      <div className="flex gap-20 justify-center items-center text-3xl font-extrabold underline tracking-tight">
        <p>MY Doubts</p>
        <button onClick={handlebookmarks}> my bookmarks</button>
        <button onClick={handleupload}> upload</button>
      </div>
      

      <div className="space-y-5 p-6">
        {solutions.map((pass) => (
            <motion.div
              key={pass._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/60 backdrop-blur-md p-4 rounded-xl shadow-lg hover:scale-[1.023] hover:shadow-[0_0_10px_rgba(124,58,237,0.6)] transition-all duration-200 flex justify-between items-start border border-gray-700"
            >
              <div className="space-y-1 text-left">
                <p className="text-black text-lg font-medium">
                  Name:{" "}
                  <span className="text-gray-300 font-normal">{pass.doubt}</span>
                </p>
                <p className="text-white text-lg font-medium flex items-center gap-2">
                  Password:{" "}
                  
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  className="bg-violet-500 hover:bg-violet-700 text-black px-4 py-2 rounded-md transition duration-150 shadow"
                  onClick={(e) => handleDelete(e, pass._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md transition duration-150 shadow"
                  onClick={(e) => handleView(e, pass._id)}
                >
                  Likes: {pass.likes.length}
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-md transition duration-150 shadow"
                  onClick={handlebookmarks(pass._id)}
                >
                  bookmark
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};
