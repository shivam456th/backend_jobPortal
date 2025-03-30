import React, { useState } from "react";
import {
  Search,
  MapPin,
  MessageCircle,
  BarChart2,
  Newspaper,
  Home,
  PlusCircle,
  User,
  Filter,
  Settings,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

const Employee   = () => {
  const [activeFilter, setActiveFilter] = useState("Active Jobs");

  const filters = [
    "Active Jobs",
    "Draft Jobs",
    "Closed Jobs",
    "Archived",
  ];

  const jobs = [
    {
      position: "Database Programmer",
      salary: "$14,000 - $25,000",
      location: "London, England",
      color: "bg-blue-500",
      type: "REMOTE",
      applicants: 12,
      status: "Active",
      posted: "2 days ago",
    },
    {
      position: "Intern Programmer",
      salary: "$14,000 - $25,000",
      location: "London, England",
      color: "bg-orange-500",
      type: "REMOTE",
      applicants: 8,
      status: "Active",
      posted: "1 week ago",
    },
    {
      position: "Frontend Programmer",
      salary: "$15,000 - $25,000",
      location: "London, England",
      color: "bg-green-500",
      type: "REMOTE",
      applicants: 15,
      status: "Active",
      posted: "3 days ago",
    },
    {
      position: "Backend Programmer",
      salary: "$15,000 - $25,000",
      location: "London, England",
      color: "bg-cyan-500",
      type: "REMOTE",
      applicants: 6,
      status: "Draft",
      posted: "Not posted",
    },
    {
      position: "Full-Stack Programmer",
      salary: "$15,000 - $25,000",
      location: "London, England",
      color: "bg-purple-500",
      type: "REMOTE",
      applicants: 20,
      status: "Active",
      posted: "5 days ago",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed w-16 md:w-64 h-full bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="hidden md:block text-xl font-bold">EmployerHub</span>
          </div>
        </div>

        <nav className="p-4">
          <SidebarLink icon={<Home size={20} />} text="Dashboard" active />
          <SidebarLink icon={<BarChart2 size={20} />} text="Analytics" />
          <SidebarLink icon={<MessageCircle size={20} />} text="Messages" />
          <SidebarLink icon={<Search size={20} />} text="Candidates" />
          <Link to='/profile'>
            <SidebarLink icon={<User size={20} />} text="Company Profile" />
          </Link>
          <SidebarLink icon={<Settings size={20} />} text="Settings" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-16 md:ml-64 w-full">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <PlusCircle size={20} />
              <span>Post New Job</span>
            </button>
          </div>
        </header>

        <main className="p-6">
          {/* Job Categories */}
          <div className="flex flex-wrap gap-3 mb-6">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Active Jobs" value="12" change="+2 this week" />
            <StatCard title="Total Applicants" value="156" change="+45 this week" />
            <StatCard title="Interviews Scheduled" value="28" change="+12 this week" />
            <StatCard title="Average Response" value="2.4 days" change="-0.5 days" />
          </div>

          {/* Job Listings Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Position</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Applicants</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Posted</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((job, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="font-medium text-gray-900">{job.position}</h3>
                          <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            job.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900">{job.applicants} candidates</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-500">{job.posted}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Eye size={18} className="text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit size={18} className="text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Trash2 size={18} className="text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    <p className="mt-2 text-sm text-green-600">{change}</p>
  </div>
);

const SidebarLink = ({ icon, text, active }) => (
  <a
    href="#"
    className={`flex items-center gap-4 px-4 py-3 rounded-lg mb-1 ${
      active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    {icon}
    <span className="hidden md:block">{text}</span>
  </a>
);

export default Employee ;