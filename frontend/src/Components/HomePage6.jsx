import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

const jobListings = [
  {
    id: 1,
    company: "TechCorp",
    location: "San Francisco, CA",
    positions: "12 Positions",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop"
  },
  {
    id: 2,
    company: "DesignHub",
    location: "New York, USA",
    positions: "8 Positions",
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop"
  },
  {
    id: 3,
    company: "InnovateLabs",
    location: "London, UK",
    positions: "15 Positions",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop"
  },
  {
    id: 4,
    company: "DataFlow",
    location: "Berlin, Germany",
    positions: "6 Positions",
    logo: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=200&h=200&fit=crop"
  },
  {
    id: 5,
    company: "CloudNet",
    location: "Tokyo, Japan",
    positions: "10 Positions",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop"
  },
  {
    id: 6,
    company: "ArtisanAI",
    location: "Singapore",
    positions: "9 Positions",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=200&fit=crop"
  }
];

const JobCard = ({ company, location, positions, logo }) => (
  <div className="flex-none w-72 sm:w-60 bg-[#111827] rounded-xl shadow-lg p-6 mx-4 transform transition-transform hover:scale-105">
    <div className="flex items-center space-x-4">
      <img
        src={logo}
        alt={company}
        className="w-16 h-16 rounded-lg object-cover"
        onError={(e) => {
          const target = e.target;
          target.src = 'https://via.placeholder.com/64';
        }}
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-200">{company}</h3>
        <p className="text-sm text-gray-400">{location}</p>
        <p className="text-sm font-medium text-blue-500 mt-1">{positions}</p>
      </div>
    </div>
  </div>
);

function HomePage6() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const firstHalf = jobListings.slice(0, Math.ceil(jobListings.length / 2));
  const secondHalf = jobListings.slice(Math.ceil(jobListings.length / 2));

  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <Building2 className="w-8 h-8 text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Find your favorite job</h1>
          </div>
          <button className="px-4 sm:px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
            View all
          </button>
        </div>

        <div className="space-y-8 overflow-hidden">
          <div className="relative">
            <div
              className="flex whitespace-nowrap transition-transform duration-1000 ease-linear"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {[...firstHalf, ...firstHalf].map((job, index) => (
                <JobCard key={`${job.id}-${index}`} {...job} />
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="flex whitespace-nowrap transition-transform duration-1000 ease-linear"
              style={{ transform: `translateX(${scrollPosition}px)` }}
            >
              {[...secondHalf, ...secondHalf].map((job, index) => (
                <JobCard key={`${job.id}-${index}`} {...job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage6;
