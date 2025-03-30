import React, { useState, useEffect } from "react";
import { FiMapPin, FiX, FiCamera, FiUpload } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarProfile from "./NavbarProfile1";
import { MdOutlineEmail } from "react-icons/md";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const DEFAULT_PROFILE_IMAGE = "https://www.pngmart.com/files/23/Profile-PNG-Photo.png";

  const saveUserDataToLocalStorage = (data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(`userData_${userId}`, serializedData);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const getUserDataFromLocalStorage = () => {
    try {
      const storedData = localStorage.getItem(`userData_${userId}`);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!userId || !token) {
        setIsAuthenticated(false);
        setAuthChecking(false);
        navigate("/login");
        return;
      }

      setIsAuthenticated(true);
      setAuthChecking(false);
    };

    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const initializeUserData = async () => {
      if (!isAuthenticated || authChecking) {
        return;
      }

      const localData = getUserDataFromLocalStorage();
      if (localData) {
        setUserData(localData);
        setEditedUserData(localData);
        setProfileImage(localData.profileImage || DEFAULT_PROFILE_IMAGE);
      }

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data.user || response.data;
        if (!data) throw new Error("No user data found in response");

        const updatedData = {
          ...data,
          bio: data.bio || localData?.bio || "",
          email: data.email || localData?.email || "",
          address: data.address || localData?.address || "",
          resume: data.resume || localData?.resume || null,
        };

        setUserData(updatedData);
        setEditedUserData(updatedData);
        setProfileImage(updatedData.profileImage || DEFAULT_PROFILE_IMAGE);
        saveUserDataToLocalStorage(updatedData);
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message || "Failed to load profile";
        setError(errorMsg);

        if (localData) {
        } else {
          const mockData = {
            fname: "Test User",
            email: "test@example.com",
            phone: "1234567890",
            bio: "This is a default bio for the test user.",
            address: "123 Test Street, Test City",
            profileImage: DEFAULT_PROFILE_IMAGE,
            resume: null,
          };
          setUserData(mockData);
          setEditedUserData(mockData);
          setProfileImage(mockData.profileImage);
          saveUserDataToLocalStorage(mockData);
        }
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    initializeUserData();
  }, [userId, navigate, isAuthenticated, authChecking]);

  const handleEditModalImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, JPG)");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File is too large. Maximum size is 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProfileImage({ file, preview: reader.result });
      toast.success("Profile image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleResumeFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid resume file (PDF, DOC, DOCX)");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File is too large. Maximum size is 10MB");
      return;
    }

    setResumeFile(file);
    toast.info("Resume selected. Click Upload to save.");
  };

  const handleUploadResume = async () => {
    if (!resumeFile) {
      toast.error("Please select a resume file first");
      return;
    }

    try {
      setResumeUploading(true);

      const formData = new FormData();
      formData.append("resume", resumeFile);

      const response = await axios.put(`http://localhost:3000/api/uploadResume/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.user) {
        const updatedUserData = {
          ...userData,
          resume: response.data.user.resume,
        };
        setUserData(updatedUserData);
        saveUserDataToLocalStorage(updatedUserData);
      }

      setResumeFile(null);
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to upload resume";
      toast.error(errorMsg);
    } finally {
      setResumeUploading(false);
    }
  };

  const handleEditProfile = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("fname", editedUserData.fname || "");
      formData.append("email", editedUserData.email || "");
      formData.append("phone", editedUserData.phone || "");
      formData.append("bio", editedUserData.bio || "");
      formData.append("address", editedUserData.address || "");
      if (newProfileImage) {
        formData.append("profileImage", newProfileImage.file);
      }

      const response = await axios.put(`http://localhost:3000/api/profile/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const updatedUserData = {
        ...response.data.user,
        resume: userData.resume,
      };

      setUserData(updatedUserData);
      setEditedUserData(updatedUserData);
      setProfileImage(updatedUserData.profileImage || DEFAULT_PROFILE_IMAGE);
      saveUserDataToLocalStorage(updatedUserData);

      setIsEditModalOpen(false);
      setNewProfileImage(null);
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to update profile";
      toast.error(errorMsg);

      const updatedData = {
        ...editedUserData,
        profileImage: newProfileImage ? newProfileImage.preview : profileImage,
        resume: userData.resume,
      };
      setUserData(updatedData);
      setEditedUserData(updatedData);
      setProfileImage(updatedData.profileImage);
      saveUserDataToLocalStorage(updatedData);

      setIsEditModalOpen(false);
      setNewProfileImage(null);
      toast.info("Profile Updated Locally (Changes not saved to database)");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prev) => ({ ...prev, [name]: value }));
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center font-poppins">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col font-poppins">
      <div className="w-full fixed top-0 left-0 z-50">
        <NavbarProfile />
      </div>

      <div className="flex flex-1">
        <div className="fixed top-16 left-0 h-full">
          <SideBar />
        </div>

        <div className="flex-1 p-4 md:p-6 flex items-center justify-center">
          <div className="max-w-md w-full bg-gray-800/30 backdrop-blur-lg rounded-xl shadow-lg p-4 text-white border border-gray-700/50">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="text-white text-lg">Loading...</div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gradient-to-r from-[#00c4b4] to-[#00d4ff] shadow-md"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00c4b4] to-[#00d4ff] opacity-20"></div>
                </div>

                <div className="flex items-center justify-between w-full">
                  <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#00c4b4] to-[#00d4ff]">
                    {userData?.fname || "User"}
                  </h1>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="p-1 rounded-full bg-gray-700/50 hover:bg-gradient-to-r hover:from-[#00c4b4] hover:to-[#00d4ff] transition-all duration-300"
                  >
                    <CiEdit size={20} className="text-white" />
                  </button>
                </div>

                <div className="w-full space-y-2">
                  <p className="flex items-center gap-2 text-gray-300 text-sm">
                    <FiMapPin className="text-[#00c4b4]" size={16} />
                    <span>{userData?.address || "Dehradun, INDIA"}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300 text-sm">
                    <IoCallOutline className="text-[#00c4b4]" size={16} />
                    <span>{userData?.phone || "Not available"}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300 text-sm">
                    <MdOutlineEmail className="text-[#00c4b4]" size={16} />
                    <span>{userData?.email || "Not available"}</span>
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold text-[#00c4b4]">Bio:</span> {userData?.bio || "No bio available."}
                  </p>

                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <p className="flex items-center gap-2 text-gray-300 text-sm mb-2">
                      <FiUpload className="text-[#00c4b4]" size={16} />
                      <span className="font-semibold text-[#00c4b4]">Resume:</span>
                      {userData?.resume ? (
                        <a
                          href={userData.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline transition-colors"
                        >
                          View Resume
                        </a>
                      ) : (
                        <span>No resume uploaded</span>
                      )}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className="flex-1 flex items-center justify-center gap-1 cursor-pointer px-2 py-1 border border-[#00c4b4] rounded-md hover:bg-[#00c4b4]/10 transition-colors text-xs">
                        <input
                          type="file"
                          onChange={handleResumeFileChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                        <FiUpload size={14} />
                        <span>{resumeFile ? resumeFile.name.substring(0, 15) + "..." : "Select"}</span>
                      </label>

                      <button
                        onClick={handleUploadResume}
                        disabled={resumeUploading || !resumeFile}
                        className={`flex-1 px-2 py-1 rounded-md text-white font-medium bg-gradient-to-r from-[#00c4b4] to-[#00d4ff] hover:opacity-90 transition-opacity duration-300 text-xs ${
                          resumeUploading || !resumeFile ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {resumeUploading ? "Uploading..." : "Upload"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 animate-fade-in">
          <div className="bg-gray-900 rounded-xl w-full max-w-sm p-4 text-white border border-gray-700 shadow-2xl animate-slide-up max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setNewProfileImage(null);
              }}
              className="absolute top-2 right-2 p-1 bg-gray-800 rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              <FiX size={18} className="text-white" />
            </button>
            <h2 className="text-lg font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#00c4b4] to-[#00d4ff]">
              Edit Profile
            </h2>

            <div className="flex justify-center mb-3 relative">
              <img
                src={newProfileImage?.preview || profileImage}
                alt="Profile Preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
              />
              <label className="absolute bottom-0 right-0 bg-gradient-to-r from-[#00c4b4] to-[#00d4ff] text-white p-1 rounded-full cursor-pointer hover:opacity-90 transition-opacity">
                <FiCamera size={14} />
                <input
                  type="file"
                  onChange={handleEditModalImageUpload}
                  className="hidden"
                  accept="image/jpeg,image/png,image/jpg"
                />
              </label>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  value={editedUserData.fname || ""}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00c4b4] focus:border-[#00c4b4] transition duration-200 text-white placeholder-gray-500 text-sm"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editedUserData.email || ""}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00c4b4] focus:border-[#00c4b4] transition duration-200 text-white placeholder-gray-500 text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editedUserData.phone || ""}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00c4b4] focus:border-[#00c4b4] transition duration-200 text-white placeholder-gray-500 text-sm"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-300">
                  Address
                </label>
                <textarea
                  name="address"
                  value={editedUserData.address || ""}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00c4b4] focus:border-[#00c4b4] transition duration-200 text-white placeholder-gray-500 text-sm"
                  rows="2"
                  placeholder="Address"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-300">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={editedUserData.bio || ""}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00c4b4] focus:border-[#00c4b4] transition duration-200 text-white placeholder-gray-500 text-sm"
                  rows="3"
                  placeholder="Bio"
                />
              </div>
              <button
                onClick={handleEditProfile}
                disabled={loading}
                className={`w-full py-1 rounded-md text-white font-medium bg-gradient-to-r from-[#00c4b4] to-[#00d4ff] hover:opacity-90 transition-opacity duration-300 text-sm ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Profile;