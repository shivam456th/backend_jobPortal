import React, { useState } from "react";
import {
  Search,
  MapPin,
  MessageCircle,
  BarChart2,
  Newspaper,
  Home,
  Bell,
  User,
  Filter,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const SideBarRecuter = () => {
  const [activeFilter, setActiveFilter] = useState("Your Job");

  const filters = [
    "Your Job",
    "Programmer",
    "Software Engineer",
    "Photographer",
    "Digital Marketing",
  ];

  const jobs = [
    {
      company: "Memrise Tech",
      position: "Database Programmer",
      salary: "$14,000 - $25,000",
      location: "London, England",
      color: "bg-blue-500",
      type: "REMOTE",
    },
    {
      company: "Code-Dev Systems",
      position: "Intern Programmer",
      salary: "$14,000 - $25,000",
      location: "London, England",
      color: "bg-orange-500",
      type: "REMOTE",
    },
    {
      company: "KineticX Ltd",
      position: "Frontend Programmer",
      salary: "$15,000 - $25,000",
      location: "London, England",
      color: "bg-green-500",
      type: "REMOTE",
    },
    {
      company: "MegaTech Studios",
      position: "Backend Programmer",
      salary: "$15,000 - $25,000",
      location: "London, England",
      color: "bg-cyan-500",
      type: "REMOTE",
    },
    {
      company: "AllStack Teams",
      position: "Full-Stack Programmer",
      salary: "$15,000 - $25,000",
      location: "London, England",
      color: "bg-purple-500",
      type: "REMOTE",
    },
  ];

  return (
    <>
    <div className="fixed w-16 md:w-64 h-full bg-[#111827] text-white">
        {/* <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-purple-700 font-bold text-xl">J</span>
            </div>
            <span className="hidden md:block text-xl font-bold">Jobie</span>
          </div>
        </div> */}

        <nav className="mt-8">
          <Link to='/dash'>
          <SidebarLink icon={<Home size={20} />} text="Dashboard" active />
          </Link>
          <SidebarLink icon={<Search size={20} />} text="Search Job" />
          <SidebarLink icon={<MessageCircle size={20} />} text="Messages" />
          <SidebarLink icon={<BarChart2 size={20} />} text="Statistics" />
          <SidebarLink icon={<Newspaper size={20} />} text="News" />
          <Link to='/profile'>
          <SidebarLink icon={<User size={20} />} text="Profile" />
          </Link>
        </nav>
      </div>
    </>
  );
};

const SidebarLink = ({ icon, text, active }) => (
  <a
    href="#"
    className={`flex items-center gap-4 px-4 py-3 ${
      active ? "bg-purple-600" : "hover:bg-purple-600"
    }`}
  >
    {icon}
    <span className="hidden md:block">{text}</span>
  </a>
);

export default SideBarRecuter;
