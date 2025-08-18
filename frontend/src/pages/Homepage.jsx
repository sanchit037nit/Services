import React, { useEffect } from "react";
import { useAuthstore } from "../store/useAuthstore.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSolution } from "../store/useSolutionstore.js";

export const Homepage = () => {
  const { authUser} = useAuthstore();
 const {getsol,solutions}=useSolution()
  const navigate = useNavigate();
  const [visibleIds, setVisibleIds] = useState([]);
  const [solid, setsolid] = useState("");
  const [sort, setsort] = useState(false);
  const orderedpasses = [...solutions];
  const  isliked=false
  // if (sort) {
  //   // orderedpasses.push(passes)
  //   console.log(orderedpasses);
  //   orderedpasses.sort((a, b) => a.doubt.localeCompare(b.doubt));
  //   console.log(orderedpasses);
  // }

  const toggleView = (id) => {
    setVisibleIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };
  const id = authUser._id;

  // console.log(solutions)

  useEffect(() => {
    getsol();
  },[]);

  const handleView = (e, passId) => {
    e.preventDefault();
    // usePasStore.getState().viewpass(passId, navigate);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // deletepass(passId);
    // navigate('/upload')
    // isliked ? in
  };

  const handleCopy = (e, id) => {
    e.preventDefault();
  
  };

  const handleSort = () => {
    setsort(!sort);
  };
  const handleai = (e) => {
    e.preventDefault()
    navigate('/aipage')
  };

  return (
    <div className="flex flex-col  gap-5   text-white font-sans tracking-wide">
      <div className="w-full m-0 mb-2">
        <Navbar />
      </div>

      <spline-viewer
        url="https://prod.spline.design/cwq814qIdbhTkjqB/scene.splinecode"
        background="transparent"
        class="absolute top-0 left-0 w-full h-full z-[-1]"
      ></spline-viewer>

      <div className="flex justify-center items-center text-3xl font-extrabold underline tracking-tight">
        MY Doubts
      </div>

      <div className="flex justify-between items-center mb-4  m-10">
        <input
          type="text"
          value={spass}
          onChange={(e) => setspass(e.target.value)}
          placeholder="Search passwords..."
          className="p-2 rounded-md bg-gray-800 border border-gray-700"
        />
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleDelete}
          >
            {sort ? "Unsort" : "Sort"}
          </button>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleai}
          >
            Ask AI
          </button>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        {solutions
          ?.map((pass) =>{ 
            
            setsolid(pass._id)
            return (
            <motion.div
              key={pass._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/60 backdrop-blur-md p-4 rounded-xl shadow-lg hover:scale-[1.023] hover:shadow-[0_0_10px_rgba(124,58,237,0.6)] transition-all duration-200 flex justify-between items-start border border-gray-700"
            >
              <div className="space-y-1 text-left">
                <p className="text-white text-lg font-medium">
                  Name:{" "}
                  <span className="text-gray-300 font-normal">{pass.doubt}</span>
                </p>
                <p className="text-white text-lg font-medium">
                  Likes:{" "}
                  <span className="text-gray-300 font-normal">{pass.likes}</span>
                </p>
                <p className="text-white text-lg font-medium flex items-center gap-2">
                  Password:{" "}
                  <span className="text-gray-300 font-normal">
                    {visibleIds.includes(pass._id) ? pass.description : "••••••••"}
                  </span>
                  <button
                    onClick={() => toggleView(pass._id)}
                    className="text-xl hover:scale-110 transition-transform"
                  >
                    {visibleIds.includes(pass._id) ? "🙈" : "👁️"}
                  </button>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded-md transition duration-150 shadow"
                  onClick={(e) => handleDelete(e)}
                >
                  Like
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md transition duration-150 shadow"
                  onClick={(e) => handleView(e, pass._id)}
                >
                  View/Update
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-md transition duration-150 shadow"
                  onClick={(e) => handleCopy(e, pass._id)}
                >
                  Copy
                </button>
              </div>
            </motion.div>
          )})}
      </div>
    </div>
  );
};
