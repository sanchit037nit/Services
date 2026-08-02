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
    <div className="relative min-h-screen pt-4 w-full bg-[#0B0E14] text-[#E6E8EB] font-mono overflow-hidden">

      {/* subtle grid texture, consistent with the rest of the app */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#E6E8EB 1px, transparent 1px), linear-gradient(90deg, #E6E8EB 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6">
        <div className="bg-[#10141F] border border-white/10 rounded-lg shadow-2xl overflow-hidden">

          {/* tab bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0D1017] border-b border-white/5">
            <span className="w-3 h-3 rounded-full bg-[#F5A623]/70" />
            <span className="w-3 h-3 rounded-full bg-[#8B7FD6]/70" />
            <span className="w-3 h-3 rounded-full bg-[#2DD4BF]/70" />
            <span className="ml-4 text-xs text-[#8B8FA3]">profile.js</span>
          </div>

          <div className="p-6 space-y-6">

            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#E6E8EB]">Profile</h1>
              <p className="mt-1 text-sm text-[#8B8FA3]">
                <span className="text-[#5C6370]">// </span>your personal account details
              </p>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <img
                  src={selectedImg || authUser?.profilephoto || "/avatar.png"}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border border-white/10 shadow-lg"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-[#F5A623] hover:bg-[#ffb43d] p-2 rounded-full cursor-pointer shadow-lg transition-colors duration-200 ${isupdatingprofile ? "animate-pulse pointer-events-none" : ""}`}
                >
                  <Camera className="w-4 h-4 text-[#0B0E14]" />
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
              <p className="text-sm text-[#5C6370]">
                {isupdatingprofile ? "Uploading..." : "Click the camera to update your photo"}
              </p>
            </div>

            {/* Editable Profile Info */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <div className="text-xs text-[#8B8FA3] tracking-wide flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> full name
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-2.5 w-full bg-[#0B0E14] rounded-md border border-white/10 text-[#E6E8EB] text-sm outline-none focus:border-[#F5A623]/50 transition-colors placeholder:text-[#5C6370]"
                  placeholder={authUser?.name || "Your name (optional)"}
                />
              </div>

              <div className="space-y-1.5">
                <div className="text-xs text-[#8B8FA3] tracking-wide flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> email address
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2.5 w-full bg-[#0B0E14] rounded-md border border-white/10 text-[#E6E8EB] text-sm outline-none focus:border-[#F5A623]/50 transition-colors placeholder:text-[#5C6370]"
                  placeholder={authUser?.email || "Your email (optional)"}
                />
              </div>

              <button
                onClick={handleProfileUpdate}
                className="mt-2 px-6 py-2.5 bg-[#2DD4BF] text-[#0B0E14] rounded-md font-semibold hover:bg-[#4ee0cd] transition-colors text-sm"
              >
                Save Profile Changes
              </button>
            </div>

            {/* Password Section */}
            <div className="bg-[#0B0E14] rounded-md p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#8B8FA3] text-sm">
                  <Lock className="w-4 h-4" />
                  Password
                </div>
                {!showPasswordFields && (
                  <button
                    onClick={() => setShowPasswordFields(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-[#F5A623]/40 text-[#F5A623] rounded-md hover:bg-[#F5A623]/10 transition-colors text-xs font-semibold"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Change password
                  </button>
                )}
              </div>

              {/* Show password inputs only when user clicks "Change Password" */}
              {showPasswordFields && (
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="px-4 py-2.5 w-full rounded-md border border-white/10 bg-[#10141F] text-[#E6E8EB] text-sm outline-none focus:border-[#F5A623]/50 transition-colors placeholder:text-[#5C6370]"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="px-4 py-2.5 w-full rounded-md border border-white/10 bg-[#10141F] text-[#E6E8EB] text-sm outline-none focus:border-[#F5A623]/50 transition-colors placeholder:text-[#5C6370]"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="px-4 py-2.5 w-full rounded-md border border-white/10 bg-[#10141F] text-[#E6E8EB] text-sm outline-none focus:border-[#F5A623]/50 transition-colors placeholder:text-[#5C6370]"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleChangePassword}
                      disabled={isUpdatingPassword}
                      className="mt-1 px-6 py-2.5 bg-[#F5A623] text-[#0B0E14] rounded-md font-semibold hover:bg-[#ffb43d] transition-colors text-sm disabled:opacity-50"
                    >
                      {isUpdatingPassword ? "Updating..." : "Save password"}
                    </button>
                    <button
                      onClick={() => setShowPasswordFields(false)}
                      className="mt-1 px-6 py-2.5 border border-white/15 text-[#E6E8EB] rounded-md hover:border-white/40 transition-colors text-sm"
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
    </div>
  );
};

export default ProfilePage;