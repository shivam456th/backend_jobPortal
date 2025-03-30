import React, { useState } from 'react';
import { Camera } from 'lucide-react';

// Create icon components using Camera from lucide-react
const IconWrapper = ({ children }) => (
  <div className="flex items-center justify-center">
    <Camera className="h-full w-full" />
  </div>
);

function JobCard({ title, company, isNew }) {
  return (
    <div className="bg-gray-900 p-4 md:p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 w-8 md:h-10 md:w-10 bg-blue-500 rounded-full flex items-center justify-center">
          <IconWrapper />
        </div>
        {isNew && (
          <span className="bg-blue-500 text-xs font-semibold px-2.5 py-0.5 rounded text-white">
            New
          </span>
        )}
      </div>
      <h3 className="text-base md:text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm md:text-base text-gray-400">{company}</p>
      <button className="mt-4 text-sm text-blue-500 hover:text-blue-400 font-medium">
        View job
      </button>
    </div>
  );
}

function CategoryButton({ label }) {
  return (
    <button className="flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-800 hover:border-blue-500 text-gray-300 hover:text-white transition-all text-sm md:text-base">
      <IconWrapper />
      <span>{label}</span>
    </button>
  );
}

function HomePage2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      

      {/* Hero Section */}
      <div className="max-w-7xl  mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Use your <span className="text-blue-500">skill</span> to
            <br className="hidden md:block" />
            get a <span className="text-blue-500">Job</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8">
            Find your next career opportunity with our extensive job listings. Connect with top
            companies and take the next step in your professional journey.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row">
            <div className="relative flex-1 mb-4 sm:mb-0">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5">
                <IconWrapper />
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded sm:rounded-l focus:outline-none focus:border-blue-500 text-white"
              />
            </div>
            <button className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded sm:rounded-l-none hover:bg-blue-600 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 md:mt-12">
          <div className="flex flex-wrap gap-2 md:gap-4">
            <CategoryButton label="Accounting" />
            <CategoryButton label="Business" />
            <CategoryButton label="HR" />
            <CategoryButton label="Development" />
            <CategoryButton label="Finance" />
            <CategoryButton label="Project" />
            <CategoryButton label="Support" />
          </div>
        </div>

        {/* Popular Jobs */}
        <div className="mt-12 md:mt-20">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">Popular Job Vacancies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <JobCard title="Digital Marketing Manager" company="Dropbox" isNew={true} />
            <JobCard title="Frontend Dev-Ops Engineer" company="Spotify" />
            <JobCard title="Technology Analyst Data Science" company="Twitter" isNew={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage2;