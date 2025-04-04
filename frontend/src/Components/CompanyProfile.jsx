import React, { useState, useEffect } from "react";
import { FiMapPin, FiX, FiCamera } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import SideBar2 from "./SideBar2";
import NavbarProfile from "./NavbarProfile1";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [newProfileImage, setNewProfileImage] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const DEFAULT_PROFILE_IMAGE = "https://www.pngmart.com/files/23/Profile-PNG-Photo.png";
  const DEFAULT_ADDRESS = "Not available";
  const DEFAULT_PHONE = "Not available";
  const DEFAULT_EMAIL = "Not available";
  const DEFAULT_INDUSTRY = "Not available";
  const DEFAULT_SIZE = "Not available";
  const DEFAULT_DESCRIPTION = "No description available.";

  // LocalStorage helper functions
  const saveUserDataToLocalStorage = (data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(`companyData_${userId}`, serializedData);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const getUserDataFromLocalStorage = () => {
    try {
      const storedData = localStorage.getItem(`companyData_${userId}`);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    const initializeUserData = async () => {
      if (!userId) {
        navigate("/login");
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
        const response = await axios.get(`https://backend-jobport.onrender.com/api/profile/${userId}`);
        const data = response.data.user || response.data;

        if (!data) throw new Error("No company data found in response");

        const updatedData = {
          ...data,
          email: data.email || localData?.email || "",
          companyName: data.companyName || localData?.companyName || "",
          companyPhone: data.companyPhone || localData?.companyPhone || "",
          companyAddress: data.companyAddress || localData?.companyAddress || "",
          industry: data.industry || localData?.industry || "",
          companySize: data.companySize || localData?.companySize || "",
          companyDescription: data.companyDescription || localData?.companyDescription || "",
        };

        setUserData(updatedData);
        setEditedUserData(updatedData);
        setProfileImage(updatedData.profileImage || DEFAULT_PROFILE_IMAGE);
        saveUserDataToLocalStorage(updatedData);
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message || "Failed to load profile";
        setError(errorMsg);
        toast.error(errorMsg);

        if (!localData) {
          const mockData = {
            companyName: "Test Company",
            email: "test@company.com",
            companyPhone: "1234567890",
            companyAddress: "123 Test Street, Test City",
            industry: "Technology",
            companySize: "51-200",
            companyDescription: "This is a default description for the test company.",
            profileImage: DEFAULT_PROFILE_IMAGE,
          };
          setUserData(mockData);
          setEditedUserData(mockData);
          setProfileImage(mockData.profileImage);
          saveUserDataToLocalStorage(mockData);
        }
      } finally {
        setLoading(false);
      }
    };
    initializeUserData();
  }, [userId, navigate]);

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
      setNewProfileImage({
        file,
        preview: reader.result,
      });
      toast.success("Profile image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (editedUserData.companyName) formData.append("companyName", editedUserData.companyName);
      if (editedUserData.email) formData.append("email", editedUserData.email);
      if (editedUserData.companyPhone) formData.append("companyPhone", editedUserData.companyPhone);
      if (editedUserData.companyAddress) formData.append("companyAddress", editedUserData.companyAddress);
      if (editedUserData.industry) formData.append("industry", editedUserData.industry);
      if (editedUserData.companySize) formData.append("companySize", editedUserData.companySize);
      if (editedUserData.companyDescription) formData.append("companyDescription", editedUserData.companyDescription);

      if (newProfileImage) {
        formData.append("profileImage", newProfileImage.file);
      }

      const response = await axios.put(
        `http://localhost:3000/api/profile/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const updatedUserData = response.data.user || response.data;
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
    setEditedUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col font-poppins">
      <div className="w-full fixed top-0 left-0 z-50">
        <NavbarProfile />
      </div>

      <div className="flex flex-1">
        <div className="fixed top-16 left-0 h-full">
          <SideBar2 />
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
                    alt="Company Profile"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gradient-to-r from-[#00c4b4] to-[#00d4ff] shadow-md"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00c4b4] to-[#00d4ff] opacity-20"></div>
                </div>

                <div className="flex items-center justify-between w-full">
                  <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#00c4b4] to-[#00d4ff]">
                    {userData?.companyName || "Company"}
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
                    <span>{userData?.companyAddress || DEFAULT_ADDRESS}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300 text-sm">
                    <IoCallOutline className="text-[#00c4b4]" size={16} />
                    <span>{userData?.companyPhone || DEFAULT_PHONE}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300 text-sm">
                    <MdOutlineEmail className="text-[#00c4b4]" size={16} />
                    <span>{userData?.email || DEFAULT_EMAIL}</span>
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold text-[#00c4b4]">Industry:</span> {userData?.industry || DEFAULT_INDUSTRY}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold text-[#00c4b4]">Size:</span> {userData?.companySize || DEFAULT_SIZE}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold text-[#00c4b4]">Description:</span> {userData?.companyDescription || DEFAULT_DESCRIPTION}
                  </p>
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
              Edit Company Profile
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
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={editedUserData.companyName || ""}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00c4b4] focus:border-[#00c4b4] transition duration-200 text-white placeholder-gray-500 text-sm"
                  placeholder="Company Name"
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
                  name="companyPhone"
                  value={editedUserData.companyPhone || ""}
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
                  name="companyAddress"
                  value={editedUserData.companyAddress || ""}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00c4b4] focus:border-[#00c4b4] transition duration-200 text-white placeholder-gray-500 text-sm"
                  rows="2"
                  placeholder="Address"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-300">
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={editedUserData.industry || ""}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00c4b4] focus:border-[#00c4b4] transition duration-200 text-white placeholder-gray-500 text-sm"
                  placeholder="Industry"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-300">
                  Company Size
                </label>
                <select
                  name="companySize"
                  value={editedUserData.companySize || ""}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00c4b4] focus:border-[#00c4b4] transition duration-200 text-white placeholder-gray-500 text-sm"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501+">501+</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  name="companyDescription"
                  value={editedUserData.companyDescription || ""}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#00c4b4] focus:border-[#00c4b4] transition duration-200 text-white placeholder-gray-500 text-sm"
                  rows="3"
                  placeholder="Description"
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

export default CompanyProfile;