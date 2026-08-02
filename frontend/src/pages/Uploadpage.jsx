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
  const { authUser, updateprofile, isupdatingprofile } = useAuthstore();
  const [selectedImg, setSelectedImg] = useState(null);



  const [formdata, setformdata] = useState({
    doubt: "",
    description: "",
    language: "",
    platform: "",
    code: "",
    link: "",
    photo: "",
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
      setformdata({ ...formdata, photo: base64Image })
    };
  };

  const handleclick = (e) => {
    e.preventDefault();
    if (!(formdata.doubt && formdata.description)) {
      return toast.error("All fields are required");
    }
    createsol(formdata);
    navigate("/Homepage");
    setformdata({ doubt: "", language: "", description: "", platform: "", code: "", link: "", photo: "" });
  };

  const handlecross = (e) => {
    e.preventDefault();
    navigate("/Homepage");
  };

  return (

    <div className="relative min-h-screen flex items-center justify-center px-4 w-full bg-[#0B0E14] text-[#E6E8EB] font-mono overflow-hidden">

      {/* subtle grid texture, consistent with the rest of the app */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#E6E8EB 1px, transparent 1px), linear-gradient(90deg, #E6E8EB 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full bg-[#10141F] border border-white/10 rounded-lg shadow-2xl overflow-hidden">

        {/* tab bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0D1017] border-b border-white/5">
          <span className="w-3 h-3 rounded-full bg-[#F5A623]/70" />
          <span className="w-3 h-3 rounded-full bg-[#8B7FD6]/70" />
          <span className="w-3 h-3 rounded-full bg-[#2DD4BF]/70" />
          <span className="ml-4 text-xs text-[#8B8FA3]">new_solution.js</span>
          <button
            onClick={handlecross}
            className="ml-auto text-[#5C6370] hover:text-[#E6E8EB] transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-lg font-semibold text-[#E6E8EB] mb-6">
            <span className="text-[#8B7FD6]">const</span>{" "}
            <span className="text-[#E6E8EB]">solution</span>{" "}
            <span className="text-[#5C6370]">=</span>{" "}
            <span className="text-[#5C6370]">{"{"}</span>
          </h2>

          <form className="space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

              {/* Left Section - Image Upload */}
              <div className="flex flex-col items-center gap-4 pl-2">
                <div className="relative">
                  <img
                    src={selectedImg || "/ph.jpg"}
                    alt="Preview"
                    className="w-80 h-80 rounded-lg object-cover border border-white/10 shadow-lg"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`absolute bottom-3 right-3
                      bg-[#F5A623] hover:bg-[#ffb43d]
                      p-2.5 rounded-full cursor-pointer
                      transition-colors duration-200 shadow-lg
                      ${isupdatingprofile ? "animate-pulse pointer-events-none" : ""}`}
                  >
                    <Camera className="w-5 h-5 text-[#0B0E14]" />
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
                <p className="text-sm text-[#5C6370] text-center">
                  {isupdatingprofile ? "Uploading..." : "Click the camera icon to add a photo"}
                </p>
              </div>

              {/* Right Section - Form Fields */}
              <div className="space-y-4 pl-4">
                <div>
                  <label className="text-xs text-[#8B8FA3] tracking-wide block mb-1.5">
                    doubt <span className="text-[#5C6370]">// contest / problem name</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-md bg-[#0B0E14] text-[#E6E8EB] text-sm border border-white/10 outline-none focus:border-[#F5A623]/50 transition-colors placeholder:text-[#5C6370]"
                    placeholder="e.g. Codeforces Round 950, Problem C"
                    value={formdata.doubt}
                    onChange={(e) =>
                      setformdata({ ...formdata, doubt: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs text-[#8B8FA3] tracking-wide block mb-1.5">
                    description
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-md bg-[#0B0E14] text-[#E6E8EB] text-sm border border-white/10 outline-none focus:border-[#F5A623]/50 transition-colors placeholder:text-[#5C6370]"
                    placeholder="Describe the problem"
                    value={formdata.description}
                    onChange={(e) =>
                      setformdata({ ...formdata, description: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#8B8FA3] tracking-wide block mb-1.5">
                      platform
                    </label>
                    <select
                      className="w-full px-4 py-2.5 rounded-md bg-[#0B0E14] text-[#E6E8EB] text-sm border border-white/10 outline-none focus:border-[#F5A623]/50 transition-colors"
                      value={formdata.platform}
                      onChange={(e) =>
                        setformdata({ ...formdata, platform: e.target.value })
                      }
                    >
                      <option value="">Select platform</option>
                      <option value="Leetcode">Leetcode</option>
                      <option value="Codeforces">Codeforces</option>
                      <option value="Atcoder">Atcoder</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-[#8B8FA3] tracking-wide block mb-1.5">
                      language
                    </label>
                    <select
                      className="w-full px-4 py-2.5 rounded-md bg-[#0B0E14] text-[#E6E8EB] text-sm border border-white/10 outline-none focus:border-[#F5A623]/50 transition-colors"
                      value={formdata.language}
                      onChange={(e) =>
                        setformdata({ ...formdata, language: e.target.value })
                      }
                    >
                      <option value="">Select language</option>
                      <option value="C">C</option>
                      <option value="C++">C++</option>
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#8B8FA3] tracking-wide block mb-1.5">
                    code
                  </label>
                  <textarea
                    className="w-full px-4 py-2.5 rounded-md bg-[#0B0E14] text-[#2DD4BF] text-sm border border-white/10 resize-none h-28 outline-none focus:border-[#F5A623]/50 transition-colors placeholder:text-[#5C6370]"
                    placeholder="Paste your solution code"
                    value={formdata.code}
                    onChange={(e) =>
                      setformdata({ ...formdata, code: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label htmlFor="website" className="text-xs text-[#8B8FA3] tracking-wide block mb-1.5">
                    link
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="w-full px-4 py-2.5 rounded-md bg-[#0B0E14] text-[#E6E8EB] text-sm border border-white/10 outline-none focus:border-[#F5A623]/50 transition-colors placeholder:text-[#5C6370]"
                    placeholder="https://example.com"
                    required
                    value={formdata.link}
                    onChange={(e) =>
                      setformdata({ ...formdata, link: e.target.value })
                    }
                  />
                </div>

                <div className="flex mt-6">
                  <button
                    type="submit"
                    onClick={handleclick}
                    className="flex-1 bg-[#F5A623] hover:bg-[#ffb43d] transition-colors text-[#0B0E14] font-semibold py-3 px-4 rounded-md"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </form>

          <p className="text-[#5C6370] mt-6">{"};"}</p>
        </div>
      </div>
    </div>
  );
}

export default Uploadpage