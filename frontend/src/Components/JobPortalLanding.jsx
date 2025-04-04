import React, { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";
import SideBar from "./SideBar";
import NavbarProfile from "./NavbarProfile1";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [userName, setUserName] = useState("User"); // Default to "User"

  useEffect(() => {
    fetchJobs();
    if (userId) {
      fetchAppliedJobs();
      fetchUserName(userId); // Fetch user's name
    }
  }, [userId]);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm]);

  const showToast = (message, type = "error") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://backend-jobport.onrender.com/api/jobs");
      setJobs(response.data.jobs || []);
    } catch (error) {
      showToast("Failed to load jobs. Please ensure the server is running.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    if (!userId) {
      showToast("User ID not found. Please log in.");
      return;
    }
    try {
      const response = await axios.get(`https://backend-jobport.onrender.com/api/user/${userId}/applied-jobs`);
      setAppliedJobs(response.data.appliedJobs || []);
    } catch (error) {
      showToast("Could not load your applied jobs. Please try again later.");
      console.error(error);
    }
  };

  const applyForJob = async (job) => {
    if (!userId) {
      showToast("Please log in to apply for jobs.");
      return;
    }

    if (appliedJobs.some((appliedJob) => String(appliedJob.jobId) === String(job._id))) {
      showToast("You've already applied for this job!", "info");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://backend-jobport.onrender.com/api/apply", {
        jobId: job._id,
        userId: userId,
      });
      setAppliedJobs([...appliedJobs, { jobId: job._id }]);
      showToast("Successfully applied for the job!", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to apply for job.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterJobs = () => {
    const filtered = jobs.filter(
      (job) =>
        job.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills?.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredJobs(filtered);
  };

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`https://backend-jobport.onrender.com/api/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you have a token
        },
      });
      const data = response.data.user || response.data;
      if (data && data.fname) {
        setUserName(data.fname);
      }
    } catch (error) {
      console.error("Failed to fetch user name:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10">
        <NavbarProfile />
      </div>

      <div className="fixed w-16 md:w-60 h-full text-white">
        <SideBar />
      </div>

      <div className="ml-16 md:ml-60 pt-24 px-4 md:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              Hello, {userName}!
            </h1>
            <p className="text-gray-400">Find your next opportunity.</p>
          </div>

          <div className="flex-1 max-w-xl mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Jobs"
                className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-8">Available Jobs</h2>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : error ? (
            <p className="text-red-400 mb-4">{error}</p>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-600 text-lg">No jobs available matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className=" bg-white text-black rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-950">
                      {job.companyName || "Unknown Company"}
                    </h3>
                    <h4 className="text-xl font-bold text-gray-800">
                      {job.position || "Unknown Position"}
                    </h4>
                    <p className="text-gray-400">
                      ₹{job.salary ? job.salary.toLocaleString() : "N/A"}
                    </p>
                    <p className="text-gray-500 flex items-center gap-1">
                      <MapPin size={16} /> {job.location || "Unknown Location"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills?.length > 0 ? (
                      job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No skills listed</span>
                    )}
                  </div>
                  <button
                    onClick={() => applyForJob(job)}
                    className={`w-full py-2 rounded-lg transition-colors ${
                      appliedJobs.some((j) => String(j.jobId) === String(job._id))
                        ? "bg-gray-600 text-white hover:bg-gray-700"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {appliedJobs.some((j) => String(j.jobId) === String(job._id))
                      ? "Job Already Applied"
                      : "Apply Now"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobBoard;