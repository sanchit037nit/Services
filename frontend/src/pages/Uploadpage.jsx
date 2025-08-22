import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSolution } from '../store/useSolutionstore';
import { useAuthstore } from '../store/useAuthstore';
import { useState } from 'react';
import { toast } from "react-hot-toast";


const Uploadpage = () => {
    const navigate = useNavigate();
  const { createsol } = useSolution();
  const { authUser } = useAuthstore();

  const [formdata, setformdata] = useState({
    doubt: "",
    description: "",
    language:"",
    platform:"",
    code:"",
    limk:"",
    createdby: authUser?._id,
  });

  const handleclick = (e) => {
    e.preventDefault();
    if (!(formdata.doubt && formdata.description)) {
      return toast.error("All fields are required");
    }
    createsol(formdata);
    navigate("/Homepage");
    setformdata({ doubt: "", languauge: "", description: "" , platform: "", code:"",link:""});
  };

  const handlecross = (e) => {
    e.preventDefault();
    navigate("/Homepage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">


      <div className=" rounded-2xl shadow-lg p-8 w-full max-w-md ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Manage Doubt
          </h2>

          <div className="flex items-center justify-center w-7 h-7 bg-gray-100 rounded-full transition-colors duration-200">
            <button
              onClick={handlecross}
              className="text-sm leading-none text-gray-600 hover:text-red-600 focus:outline-none"
            >
              ❌
            </button>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-gray-300 block mb-1">Doubt</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name of password"
              value={formdata.doubt}
              onChange={(e) =>
                setformdata({ ...formdata, doubt: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Description</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name of password"
              value={formdata.description}
              onChange={(e) =>
                setformdata({ ...formdata, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-1">Platform</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name of password"
              value={formdata.platform}
              onChange={(e) =>
                setformdata({ ...formdata, platform: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-1">Language</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={formdata.language}
              onChange={(e) =>
                setformdata({ ...formdata, language: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-1">COde</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter COde"
              value={formdata.code}
              onChange={(e) =>
                setformdata({ ...formdata, code: e.target.value })
              }
            />
          </div>

           <div>
             <label htmlFor="website">Related link</label>
             <input type="url" id="website" name="website" 
               placeholder="https://example.com" required></input>
           </div>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleclick}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Uploadpage
