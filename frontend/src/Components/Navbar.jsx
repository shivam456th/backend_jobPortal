import React, { useState } from 'react';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <header className="px-6 py-4 bg-black shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600">JobConnect</h1>
          
          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Menu 
              className="text-gray-600 cursor-pointer" 
              size={24} 
              onClick={toggleSidebar} 
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Jobs"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Links and Actions */}
            <div className="flex items-center space-x-4 lg:space-x-6">
            <Link
                to="/"
                className="text-gray-300 hover:text-white block"
              >
                Home
              </Link>
              <Link to='/about'>
              <button className="text-gray-300 hover:text-blue-600 hidden lg:inline">
                About
              </button>
              </Link>
              <button className="text-gray-300 hover:text-blue-600 hidden lg:inline">
                Contact
              </button>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
              >
                Login
              </Link>
              <div className="flex items-center gap-4">
                <Bell className="text-gray-300" size={20} />
                {/* <Link
                to="/profile"><User className="text-gray-300" size={20} /></Link> */}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold">Menu</h2>
          <X 
            className="text-gray-400 cursor-pointer" 
            size={24} 
            onClick={toggleSidebar} 
          />
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-white block"
                onClick={toggleSidebar}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white block"
                onClick={toggleSidebar}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white block"
                onClick={toggleSidebar}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-gray-300 hover:text-white block"
                onClick={toggleSidebar}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="text-gray-300 hover:text-white block"
                onClick={toggleSidebar}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white block"
                onClick={toggleSidebar}
              >
                Profile
              </Link>
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

export default Navbar;
