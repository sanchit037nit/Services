import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSolution } from '../store/useSolutionstore';
import { useAuthstore } from '../store/useAuthstore';
import { useState } from 'react';
import { toast } from "react-hot-toast";
import { Camera, Mail, User } from "lucide-react";

const Uploadpage = () => {

  const navigate = useNavigate();
  const { createsol } = useSolution();
  const { authUser, updateprofile,isupdatingprofile } = useAuthstore();
  const [selectedImg, setSelectedImg] = useState(null);



  const [formdata, setformdata] = useState({
    doubt: "",
    description: "",
    language:"",
    platform:"",
    code:"",
    link:"",
    photo:"",
    createdby: authUser?._id,
  });

   const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setformdata({...formdata,photo:base64Image})
    };
  };

  const handleclick = (e) => {
    e.preventDefault();
    if (!(formdata.doubt && formdata.description)) {
      return toast.error("All fields are required");
    }
    createsol(formdata);
    navigate("/Homepage");
    setformdata({ doubt: "", language: "", description: "" , platform: "", code:"",link:"",photo:""});
  };

  const handlecross = (e) => {
    e.preventDefault();
    navigate("/Homepage");
  };

  return (

    <div className="min-h-screen flex items-center justify-center  px-4 w-full bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-lg border border-gray-600 rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Manage Doubt
          </h2>

          <div className="flex items-center justify-center w-7 h-7 bg-gray-900 rounded-full transition-colors duration-200">
            <button
              onClick={(e)=>handlecross(e)}
              className="text-sm leading-none text-gray-600 hover:text-red-600 focus:outline-none"
            >
              ❌
            </button>
          </div>
        </div>

        
        <form className="space-y-6 w-full">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
    {/* Left Section - Image Upload */}
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <img
          src={selectedImg || "/ph.jpg"}
          alt="Profile"
          className="w-80 h-80 rounded-xl object-cover border-4 border-gray-600 shadow-lg"
        />
        <label
          htmlFor="avatar-upload"
          className={`absolute bottom-0 right-0 
            bg-base-content hover:scale-105
            p-2 rounded-full cursor-pointer 
            transition-all duration-200
            ${isupdatingprofile ? "animate-pulse pointer-events-none" : ""}`}
        >
          <Camera className="w-5 h-5 text-base-200 bg-gray-500" />
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isupdatingprofile}
          />
        </label>
      </div>
      <p className="text-sm text-zinc-400 text-center">
        {isupdatingprofile ? "Uploading..." : "Click the camera icon to update your photo"}
      </p>
    </div>

    {/* Right Section - Form Fields */}
    <div className="space-y-4">
      <div>
        <label className="text-gray-300 block mb-1">About Contest</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contest Name // Problem name/number"
          value={formdata.doubt}
          onChange={(e) =>
            setformdata({ ...formdata, doubt: e.target.value })
          }
        />
      </div>

      <div>
        <label className="text-gray-300 block mb-1">Description about Problem: </label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your Problem"
          value={formdata.description}
          onChange={(e) =>
            setformdata({ ...formdata, description: e.target.value })
          }
        />
      </div>

      <div>
<select
  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
  value={formdata.platform}
  onChange={(e) =>
    setformdata({ ...formdata, platform: e.target.value })
  }
>
  <option value="">Select Platform</option>
  <option value="Leetcode">Leetcode</option>
  <option value="Codeforces">Codeforces</option>
  <option value="Atcoder">Atcoder</option>
</select>
      </div>

      <div>
<select
  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
  value={formdata.language}
  onChange={(e) =>
    setformdata({ ...formdata, language: e.target.value })
  }
>
  <option value="">Select Language</option>
  <option value="C">C</option>
  <option value="C++">C++</option>
  <option value="Python">Python</option>
  <option value="Java">Java</option>
</select>
      </div>

      <div>
        <label className="text-gray-300 block mb-1">Your Code</label>
        <textarea
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Code"
          value={formdata.code}
          onChange={(e) =>
            setformdata({ ...formdata, code: e.target.value })
          }
        />
      </div>

      <div>
        <label htmlFor="website" className="text-gray-300 block mb-1">Solution Link</label>
        <input
          type="url"
          id="website"
          name="website"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com"
          required
          value={formdata.link}
          onChange={(e) =>
            setformdata({ ...formdata, link: e.target.value })
          }
        />
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={(e) => handleclick(e)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-105 transition text-white font-semibold py-2 px-4 rounded-lg"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</form>

      </div>
    </div>
  );
}

export default Uploadpage
