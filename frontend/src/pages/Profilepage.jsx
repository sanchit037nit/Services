import { useState } from "react";
import { useAuthstore } from "../store/useAuthstore.js";
import { Camera, Mail, User, Lock, Edit2 } from "lucide-react";

const ProfilePage = () => {
  const { authUser, updateprofile, isupdatingprofile } = useAuthstore();

  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Password section states
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Avatar upload
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

  // Profile info update
  const handleProfileUpdate = async () => {
    const updates = {};
    if (name.trim() && name.trim() !== authUser?.name) updates.name = name.trim();
    if (email.trim() && email.trim() !== authUser?.email) updates.email = email.trim();

    if (Object.keys(updates).length === 0) {
      alert("No profile changes provided.");
      return;
    }

    try {
      await updateprofile(updates);
      alert("Profile updated successfully!");
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile!");
    }
  };

  // Password update
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Fill all password fields to update password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match!");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updateprofile({ currentPassword, newPassword });
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordFields(false);
    } catch (err) {
      console.error(err);
      alert("Password update failed!");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="min-h-screen pt-4 w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-lg border border-gray-600 rounded-2xl shadow-lg p-6 space-y-6 transition hover:shadow-xl">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-500">Profile</h1>
            <p className="mt-2 text-gray-500">Your personal account details</p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilephoto || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-400 shadow-lg"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-1 right-1 bg-gray-800 hover:bg-gray-700 p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200 transform group-hover:scale-110 ${isupdatingprofile ? "animate-pulse pointer-events-none" : ""}`}
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
            <p className="text-sm text-gray-500">
              {isupdatingprofile ? "Uploading..." : "Click the camera to update your photo"}
            </p>
          </div>

          {/* Editable Profile Info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 w-full bg-gray-300 rounded-lg border text-gray-900 font-medium"
                placeholder={authUser?.name || "Your Name (optional)"}
              />
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 w-full bg-gray-300 rounded-lg border text-gray-900 font-medium"
                placeholder={authUser?.email || "Your Email (optional)"}
              />
            </div>

            <button
              onClick={handleProfileUpdate}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
            >
              Save Profile Changes
            </button>
          </div>

          {/* Password Section */}
          <div className="mt-6 bg-gray-300 rounded-xl p-6 border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500">
                <Lock className="w-4 h-4" />
                Password
              </div>
              {!showPasswordFields && (
                <button
                  onClick={() => setShowPasswordFields(true)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Change Password
                </button>
              )}
            </div>

            {/* Show password inputs only when user clicks "Change Password" */}
            {showPasswordFields && (
              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="px-4 py-3 w-full rounded-lg border text-gray-900"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="px-4 py-3 w-full rounded-lg border text-gray-900"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="px-4 py-3 w-full rounded-lg border text-gray-900"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleChangePassword}
                    disabled={isUpdatingPassword}
                    className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                  >
                    {isUpdatingPassword ? "Updating..." : "Save Password"}
                  </button>
                  <button
                    onClick={() => setShowPasswordFields(false)}
                    className="mt-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
