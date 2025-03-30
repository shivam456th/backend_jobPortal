// import React, { useState } from "react";
// import {
//   Search,
//   MapPin,
//   MessageCircle,
//   BarChart2,
//   Newspaper,
//   Home,
//   Bell,
//   User,
//   Filter,
//   Settings,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const SideBar2 = () => {
//   const [activeFilter, setActiveFilter] = useState("Your Job");

//   const filters = [
//     "Your Job",
//     "Programmer",
//     "Software Engineer",
//     "Photographer",
//     "Digital Marketing",
//   ];

//   const jobs = [
//     {
//       company: "Memrise Tech",
//       position: "Database Programmer",
//       salary: "$14,000 - $25,000",
//       location: "London, England",
//       color: "bg-blue-500",
//       type: "REMOTE",
//     },
//     {
//       company: "Code-Dev Systems",
//       position: "Intern Programmer",
//       salary: "$14,000 - $25,000",
//       location: "London, England",
//       color: "bg-orange-500",
//       type: "REMOTE",
//     },
//     {
//       company: "KineticX Ltd",
//       position: "Frontend Programmer",
//       salary: "$15,000 - $25,000",
//       location: "London, England",
//       color: "bg-green-500",
//       type: "REMOTE",
//     },
//     {
//       company: "MegaTech Studios",
//       position: "Backend Programmer",
//       salary: "$15,000 - $25,000",
//       location: "London, England",
//       color: "bg-cyan-500",
//       type: "REMOTE",
//     },
//     {
//       company: "AllStack Teams",
//       position: "Full-Stack Programmer",
//       salary: "$15,000 - $25,000",
//       location: "London, England",
//       color: "bg-purple-500",
//       type: "REMOTE",
//     },
//   ];

//   return (
//     <>
//     <div className="fixed w-16 md:w-64 h-full bg-[#111827] text-white">

//         <nav className="mt-8">
//           <Link to='/RecuterDashboard/CreateJob'>
//           <SidebarLink icon={<Home size={20} />} text="Created Jobs" active />
//           </Link>
//           <Link to='/RecuterDashboard/profile'>
//           <SidebarLink icon={<User size={20} />} text="Profile" />
//           </Link>
//           <Link to='/createJob'>
//           <SidebarLink icon={<Newspaper size={20} />} text="Create Job" />
//           </Link>
//         </nav>
//       </div>
//     </>
//   );
// };

// const SidebarLink = ({ icon, text, active }) => (
//   <a
//     href="#"
//     className={`flex items-center gap-4 px-4 py-3 ${
//       active ? "bg-purple-600" : "hover:bg-purple-600"
//     }`}
//   >
//     {icon}
//     <span className="hidden md:block">{text}</span>
//   </a>
// );

// export default SideBar2;
import React, { useState } from "react";
import { Home, Newspaper, User } from "lucide-react";

const SideBar2 = () => {
  const [activeLink, setActiveLink] = useState("/dash");
  
  const handleNavigation = (path) => {
    window.location.href = path;
    setActiveLink(path);
  };
  
  return (
    <div className="fixed left-0 top-0 h-full w-16 md:w-64 bg-gradient-to-b from-[#1e293b] to-[#111827] shadow-xl transition-all duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Logo or Brand Area */}
        <div className="flex items-center justify-center py-6 border-b border-gray-700">
          <span className="hidden md:block text-xl font-bold text-white">JobTracker</span>
          <span className="md:hidden text-white font-bold">JT</span>
        </div>
        
        <nav className="flex-grow mt-4 px-2">
          <div className="space-y-2">
            <SidebarLink
              icon={<Home size={20} />}
              text="Created Jobs"
              path="/RecuterDashboard/CreateJob"
              active={activeLink === "/RecuterDashboard/CreateJob"}
              onLinkClick={handleNavigation}
            />
            <SidebarLink
              icon={<Newspaper size={20} />}
              text="Profile"
              path="/RecuterDashboard/profile"
              active={activeLink === "/RecuterDashboard/profile"}
              onLinkClick={handleNavigation}
            />
            <SidebarLink
              icon={<User size={20} />}
              text="Create Job"
              path="/createJob"
              active={activeLink === "/createJob"}
              onLinkClick={handleNavigation}
            />
          </div>
        </nav>
        
        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-700">
          
          <div className="md:hidden flex justify-center">
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors duration-300"
              onClick={() => handleNavigation("/new-job")}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, text, path, active, onLinkClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onLinkClick(path);
  };
  
  return (
    <div 
      onClick={handleClick}
      className={`
        flex items-center gap-4 px-4 py-3
        transition-all duration-300 ease-in-out cursor-pointer
        text-gray-300 hover:bg-purple-600/20 hover:text-white rounded-lg
        ${active ? "text-white" : ""}
      `}
    >
      {icon}
      <span className="hidden md:block text-sm font-medium">{text}</span>
    </div>
  );
};

export default SideBar2;