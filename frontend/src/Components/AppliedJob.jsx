import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import NavbarProfile from "./NavbarProfile1";
import SideBar from "./SideBar";
import axios from "axios";

const AppliedJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId") || "test-user-123";

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    if (!userId) {
      setError("User ID not found. Please log in.");
      return;
    }
    try {
      const response = await axios.get(`https://backend-jobport.onrender.com/api/user/${userId}/applied-jobs`);
      console.log("Applied jobs response:", response.data);
      setAppliedJobs(response.data.appliedJobs || []);
    } catch (error) {
      setError("Failed to load applied jobs: " + (error.response?.data?.message || error.message));
    }
  };

  // const handleDeleteJob = async (jobId) => {
  //   console.log("Deleting applied job with ID:", jobId);
  //   try {
  //     const response = await axios.delete(`http://localhost:3000/api/applied-jobs/${jobId}`, {
  //       data: { userId }, // Sending userId in request body as expected by backend
  //     });
  
  //     if (response.status === 200) {
  //       setAppliedJobs((prev)=>(
  //         prev.filter((job) => job._id !== jobId)
  //       ));
  //       console.log("Job deleted successfully");
  //     }
  //   } catch (error) {
  //     console.error("Delete job error:", error.response?.data || error.message);
  //     setError("Failed to delete job: " + (error.response?.data?.message || error.message));
  //   }
  // };
  
  const handleDeleteJob = async (jobId) => {
    console.log("Deleting applied job with ID:", jobId, "for user:", userId);

    if (!jobId || !userId) {
        console.error("Missing jobId or userId");
        setError("Job ID or User ID is missing.");
        return;
    }

    try {
        const response = await axios.delete(`https://backend-jobport.onrender.com/api/applied-jobs/${jobId}`, {
            data: { userId }, // Ensure userId is correctly passed
        });

        if (response.status === 200) {
            setAppliedJobs((prev) => prev.filter((job) => job._id !== jobId));
            console.log("Job deleted successfully");
        }
    } catch (error) {
        console.error("❌ Delete job error:", error.response?.data || error.message);
        setError("Failed to delete job: " + (error.response?.data?.message || error.message));
    }
};

  return (
    <div className="flex md:pt-14 min-h-screen bg-[#000000] relative">
      <div className="absolute top-0 left-[-5rem]">
        <NavbarProfile />
      </div>
      <div className="md:ml-[-5rem]">
        <SideBar />
      </div>
      <div className="ml-16 md:ml-64 w-full p-6">
        <h1 className="text-white text-2xl mb-4">Applied Jobs</h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {appliedJobs.length === 0 && !error ? (
          <p className="text-gray-300">No applied jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {job.companyName || "Unknown Company"}
                  </h3>
                  <h4 className="text-xl font-bold text-gray-900">
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
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No skills listed</span>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Delete Application
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJob;