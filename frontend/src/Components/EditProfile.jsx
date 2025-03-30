import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/profile/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/profile/${userId}`, userData);
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="text-2xl mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg w-80">
        <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 mb-3 rounded"/>
        <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 mb-3 rounded"/>
        <input type="text" name="phone" value={userData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 mb-3 rounded"/>
        <textarea name="bio" value={userData.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 mb-3 rounded"/>
        <button type="submit" className="bg-blue-500 w-full py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
