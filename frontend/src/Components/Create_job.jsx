import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar2 from './SideBar2';
import NavbarProfile from './NavbarProfile1';
import { 
  FaBuilding, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaMoneyBill, 
  FaCode 
} from 'react-icons/fa';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    location: '',
    salary: '',
    skills: ''
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const skillsArray = formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : [];
      const jobData = { ...formData, skills: skillsArray };
      const response = await axios.post('http://localhost:3000/api/createJob', jobData);
      
      setMessage(response.data.message);
      setFormData({
        companyName: '',
        position: '',
        location: '',
        salary: '',
        skills: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-lg">
        <NavbarProfile />
      </div>

      {/* Main Container */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div className="fixed top-16 left-0 w-16 md:w-64 h-[calc(100vh-4rem)] bg-gray-900 shadow-xl z-40">
          <SideBar2 />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-16 md:ml-64 p-6 flex items-center justify-center">
          <div className="w-full max-w-lg bg-gray-900/90 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-800/50 animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              New Job Listing
            </h2>

            {message && (
              <div className="mb-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <p className="text-green-300 text-sm text-center">{message}</p>
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <FaBuilding className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Company Name"
                />
              </div>

              <div className="relative">
                <FaBriefcase className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Job Position"
                />
              </div>

              <div className="relative">
                <FaMapMarkerAlt className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Location"
                />
              </div>

              <div className="relative">
                <FaMoneyBill className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Salary (e.g., ₹8LPA)"
                />
              </div>

              <div className="relative">
                <FaCode className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Skills (e.g., JS, React)"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Create Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;