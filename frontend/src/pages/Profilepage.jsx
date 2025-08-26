// import React from 'react'
// import { useAuthstore } from '../store/useAuthstore';
// import { useState,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';



// const Profilepage = () => {
//  const {authUser,updateprofile} = useAuthstore();
//   console.log(authUser)
//   const [formdata, setformdata] = useState({
//     name: authUser?.fullName,
//     email: authUser?.email,
//     password: authUser?.password,
//   });

//   const validateformdata = () => {
//     if (!formdata.name || !formdata.email || !formdata.password) {
//       return toast.error("all fields required");
//     }
//     if (formdata.pass.length < 6) {
//       return toast.error("password length should be atleast 6");
//     }
//     if (!/\S+@\S+\.\S+/.test(formdata.email)) {
//       return toast.error("invalid email");
//     }
//   };

//   const navigate = useNavigate();
//   const handlecross = (e) => {
//     e.preventDefault();
//     navigate("/");
//   };

//   const handleclick = async (e) => {
//     e.preventDefault();
//     await updateprofile(formdata);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen p-4">
//       <spline-viewer
//         url="https://prod.spline.design/cwq814qIdbhTkjqB/scene.splinecode"
//         background="transparent"
//         class="absolute top-0 left-0 w-full h-full z-[-1]"
//       ></spline-viewer>

//       <form
//         onSubmit={handleclick}
//         className="w-full max-w-md mx-auto  p-8 rounded-lg shadow-lg text-black space-y-6"
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-center text-2xl font-bold mb-4">Signup Form</h2>
//           <div className="flex items-center justify-center w-7 h-7 bg-gray-100 rounded-full hover:bg-red-50 transition-colors duration-200">
//             <button
//               onClick={handlecross}
//               className="text-sm leading-none text-gray-600 hover:text-red-600 focus:outline-none"
//             >
//               ❌
//             </button>
//           </div>
//         </div>

//         {/* Name Input */}
//         <div className=" text-amber-50 flex flex-col space-y-2">
//           <label htmlFor="name" className="text-lg">
//             Enter Your Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             className="border border-gray-400 rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your name"
//             value={formdata.name}
//             onChange={(e) => setformdata({ ...formdata, name: e.target.value })}
//             required
//           />
//         </div>

//         {/* Email Input */}
//         <div className="flex flex-col space-y-2">
//           <label htmlFor="email" className="text-lg">
//             Enter Your Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="border border-gray-400 rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your email"
//             value={formdata.email}
//             onChange={(e) =>
//               setformdata({ ...formdata, email: e.target.value })
//             }
//             required
//           />
//         </div>

//         {/* Password Input */}
//         <div className="flex flex-col space-y-2">
//           <label htmlFor="password" className="text-lg">
//             Enter Your Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="border border-gray-400 rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your password"
//             value={formdata.password}
//             onChange={(e) =>
//               setformdata({ ...formdata, password: e.target.value })
//             }
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded-md transition duration-300"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };


// export default Profilepage

import { useState } from "react";
import { useAuthstore } from "../store/useAuthstore.js";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, updateprofile,isupdatingprofile } = useAuthstore();
  const [selectedImg, setSelectedImg] = useState(null);

   console.log(authUser)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateprofile({ profilephoto: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 w-full">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilephoto || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isupdatingprofile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
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
            <p className="text-sm text-zinc-400">
              {isupdatingprofile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.name}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
               
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
