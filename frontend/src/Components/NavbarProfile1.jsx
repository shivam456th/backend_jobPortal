import React, { useState } from 'react';
import { Search, Bell, User, Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NavbarProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
    navigate("/signin"); // Redirect to login page
    setIsSidebarOpen(false); // Close sidebar if open
  };

  return (
    <div>
      {/* NavbarProfile */}
      <header className="px-6 py-4 bg-gray-900 shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-indigo-500">JobConnect</h1>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Menu
              className="text-gray-300 cursor-pointer hover:text-indigo-400 transition-colors"
              size={24}
              onClick={toggleSidebar}
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            

            {/* Links and Actions */}
            
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2"
            >
              <LogOut size={20} /> Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-indigo-400">Menu</h2>
          <X
            className="text-gray-300 cursor-pointer hover:text-indigo-400 transition-colors"
            size={24}
            onClick={toggleSidebar}
          />
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-indigo-400 transition-colors block"
                onClick={toggleSidebar}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-300 hover:text-indigo-400 transition-colors block"
                onClick={toggleSidebar}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-indigo-400 transition-colors block"
                onClick={toggleSidebar}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-gray-300 hover:text-indigo-400 transition-colors block"
                onClick={toggleSidebar}
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="text-gray-300 hover:text-indigo-400 transition-colors block"
                onClick={toggleSidebar}
              >
                Login
              </Link>
            </li>
           
            <li>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2 w-full text-left"
              >
                <LogOut size={20} /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default NavbarProfile;