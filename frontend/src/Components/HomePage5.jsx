import React, { useState } from 'react';
import { Camera } from 'lucide-react';

function SidebarItem({ label, isActive = false }) {
  return (
    <button 
      className={`flex items-center space-x-3 w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg transition-colors ${
        isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
      }`}
    >
      <Camera className="w-4 h-4 md:w-5 md:h-5" />
      <span className="text-xs md:text-sm font-medium">{label}</span>
    </button>
  );
}

function JobCard({ title, company, location, type, logo }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-500 transition-all gap-4 sm:gap-0">
      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm md:text-base font-medium">{logo}</span>
        </div>
        <div>
          <h3 className="text-xs md:text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-400">{company} • {location}</p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end space-x-3 md:space-x-4">
        <span className="text-xs text-gray-400 bg-gray-800 px-2 md:px-3 py-1 rounded-full whitespace-nowrap">
          {type}
        </span>
        <button className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-3 md:px-4 py-1 rounded-lg transition-colors whitespace-nowrap">
          View job
        </button>
      </div>
    </div>
  );
}

function HomePage5() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = [
    { label: 'Accounting' },
    { label: 'Business & consulting' },
    { label: 'Human research' },
    { label: 'Design & development' },
    { label: 'Finance management' },
    { label: 'Project management' },
    { label: 'Customer services' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Digital Marketing Manager',
      company: 'Skype',
      location: 'Japan',
      type: 'Internship',
      logo: 'S'
    },
    {
      id: 2,
      title: 'Fresher Dev-Ops Engineer',
      company: 'Remote',
      location: 'Remote',
      type: 'Part-Time',
      logo: 'R'
    },
    {
      id: 3,
      title: 'Technology Analyst Data Science',
      company: 'Mozilla',
      location: 'India',
      type: 'Full-Time',
      logo: 'M'
    },
    {
      id: 4,
      title: 'Senior Frontend Engineer',
      company: 'Reddit',
      location: 'Remote',
      type: 'Freelance',
      logo: 'R'
    },
    {
      id: 5,
      title: 'Android developer',
      company: 'London',
      location: 'UK',
      type: 'Freelance',
      logo: 'L'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Find your favorite job</h1>
          <button 
            className="md:hidden bg-gray-800 p-2 rounded-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <div className="space-y-1">
              <div className="w-4 h-0.5 bg-white"></div>
              <div className="w-4 h-0.5 bg-white"></div>
              <div className="w-4 h-0.5 bg-white"></div>
            </div>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
          {/* Sidebar */}
          <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 space-y-2 mb-4 md:mb-0`}>
            {categories.map((category, index) => (
              <SidebarItem 
                key={index} 
                {...category} 
                isActive={index === 3} 
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-3 md:space-y-4">
            {jobs.map(job => (
              <JobCard key={job.id} {...job} />
            ))}
            
            <button className="mt-4 md:mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 md:py-2.5 rounded-lg transition-colors text-sm md:text-base">
              Browse all jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage5;