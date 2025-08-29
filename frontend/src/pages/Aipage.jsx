import React from 'react'
import {motion}  from "framer-motion"
import { useSolution } from '../store/useSolutionstore.js';
const Aipage = () => {
      
   const {aires,airesp}=useSolution()
      const sendMessage =()=>{
        			const input = document.getElementById('userInput').value;
				const responseDiv = document.getElementById('response');
				if (!input) {
					responseDiv.innerHTML = 'Please enter a message.';
					return;
				}
				responseDiv.innerHTML = 'Loading...';
     
        aires(input)
        responseDiv.innerHTML=airesp
      }

     
	
return (
  <div className="w-full flex flex-col items-center py-12  bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">
    {/* Title */}
    <h2 className="text-4xl font-bold  mb-8 tracking-tight">
      🤖 Free ChatBot
    </h2>

    {/* Chat Form Card */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-gray-600 shadow-xl rounded-2xl p-6 border border-gray-100"
    >
      {/* Input */}
      <div className="mb-4">
        <input
          type="text"
          id="userInput"
          placeholder="💬 Ask me anything..."
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Button */}
      <button
        onClick={() => sendMessage()}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
      >
        🚀 Ask!
      </button>

      {/* Response Section */}
      <div
        id="response"
        className="mt-6 bg-gray-50 rounded-xl p-4 min-h-[100px] text-gray-700 border border-gray-200"
      >
        <span className="text-gray-400 italic">ChatBot response will appear here...</span>
      </div>
    </motion.div>
  </div>
);

}

export default Aipage
