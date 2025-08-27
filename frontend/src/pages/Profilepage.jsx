
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
    <div className="h-screen pt-2 w-full  bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="max-w-2xl mx-auto  h-screen">
        {/* Profile Card */}
        <div className="bg-gray-600 rounded-2xl shadow-lg p-4 space-y-5 transition hover:shadow-xl">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="mt-2 text-gray-900">Your personal account details</p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilephoto || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-1 right-1 bg-gray-800 hover:bg-gray-700 
                  p-2 rounded-full cursor-pointer shadow-lg
                  transition-all duration-200 transform group-hover:scale-110
                  ${isupdatingprofile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
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
            <p className="text-sm text-gray-900">
              {isupdatingprofile ? "Uploading..." : "Click the camera to update your photo"}
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-3 bg-gray-300 rounded-lg border text-gray-900 font-medium">
                {authUser?.name}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-900 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-3 bg-gray-300 rounded-lg border text-gray-900 font-medium">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-6 bg-gray-300 rounded-xl p-6 border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-900">Member Since</span>
                <span className="font-medium text-gray-900">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-900">Account Status</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};
export default ProfilePage;
