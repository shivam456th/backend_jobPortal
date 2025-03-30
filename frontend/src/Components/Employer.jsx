import React, { useEffect, useState } from "react";
import { MapPin, Trash2, Edit2, X, Search } from "lucide-react";
import SideBar2 from "./SideBar2";
import NavbarProfile from "./NavbarProfile1";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employer = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editedJobData, setEditedJobData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/jobs");
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      toast.error("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      if (!jobId || typeof jobId !== "string" || !jobId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error("Invalid job ID format");
      }

      const response = await fetch(`http://localhost:3000/api/createdjobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        switch (response.status) {
          case 400:
            throw new Error("Invalid job ID format");
          case 403:
            throw new Error("Not authorized to delete this job");
          case 404:
            throw new Error("Job not found");
          default:
            throw new Error(result.message || "Failed to delete job");
        }
      }

      if (result.success) {
        setJobs(jobs.filter((job) => job._id !== jobId));
        toast.success("Job deleted successfully!");
      } else {
        throw new Error(result.message || "Failed to delete job");
      }
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error(`Failed to delete job: ${err.message}`);
    }
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setEditedJobData({ ...job });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setEditedJobData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      if (!selectedJob?._id) {
        throw new Error("No job selected for editing");
      }

      const response = await fetch(`http://localhost:3000/api/update/jobs/${selectedJob._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedJobData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update job");
      }

      setJobs(
        jobs.map((job) => (job._id === selectedJob._id ? { ...job, ...editedJobData } : job))
      );
      setIsEditModalOpen(false);
      setSelectedJob(null);
      toast.success("Job updated successfully!");
    } catch (err) {
      console.error("Error updating job:", err);
      toast.error(`Failed to update job: ${err.message}`);
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

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <div className="fixed top-0 left-0 right-0 z-10">
        <NavbarProfile />
      </div>

      <div className="fixed w-16 md:w-60 h-full text-white">
        <SideBar2 />
      </div>

      <div className="ml-16 md:ml-52 pt-24 px-4 md:px-8 pb-8">
        <div className="max-w-6xl mx-auto">

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

          <h2 className="text-3xl font-bold text-white mb-8">Your Job Listings</h2>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                        {job.position || "Untitled Position"}
                      </h3>
                      <p className="text-gray-600 mt-1">{job.companyName || "Unknown Company"}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(job)}
                        className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                        title="Edit job"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                        title="Delete job"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin size={16} className="mr-2 text-indigo-500" />
                      <span>{job.location || "Not specified"}</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Salary: ₹{job.salary ? job.salary.toLocaleString() : "N/A"}
                    </p>
                    <div className="text-gray-600 text-sm">
                      <span className="font-medium">Skills: </span>
                      {job.skills && job.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {job.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "Not specified"
                      )}
                    </div>
                  </div>

                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium">
                    View Applicants
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-lg shadow-sm">
              <p className="text-gray-600 text-lg">No jobs available yet...</p>
            </div>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Edit Job Listing</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  name="position"
                  value={editedJobData.position || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={editedJobData.companyName || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={editedJobData.location || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={editedJobData.salary || ""}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={editedJobData.skills?.join(", ") || ""}
                  onChange={handleSkillsChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., JavaScript, React, Node.js"
                />
              </div>
              <button
                onClick={handleEditSubmit}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employer;