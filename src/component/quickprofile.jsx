import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router"; // Use react-router-dom for NavLink
import { FaUserCircle, FaCog, FaPlusSquare, FaUsers, FaSignOutAlt } from "react-icons/fa"; // Added more icons
import axiosClient from "../axios"; // Assuming this is still needed elsewhere, though not directly in the render here

const UserProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-700 hover:bg-purple-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label="User Profile"
      >
        <FaUserCircle className="h-6 w-6 text-white" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white text-gray-800 shadow-xl rounded-lg border border-gray-200 z-50 transform origin-top-right animate-fade-in-down">
          <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <div className="flex items-center space-x-3">
              <FaUserCircle className="h-8 w-8 text-purple-600" />
              <div>
                <p className="font-semibold text-lg text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
            </div>
          </div>

          <nav className="py-2">
            {user.role === "admin" ? (
              <>
                <NavLink
                  to="/admin/category"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <FaPlusSquare className="mr-3 h-4 w-4" /> Create Category
                </NavLink>
                <NavLink
                  to="/admin/product"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <FaPlusSquare className="mr-3 h-4 w-4" /> Create Product
                </NavLink>
                <NavLink
                  to="/admin/allUsers"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUsers className="mr-3 h-4 w-4" /> All Users
                </NavLink>
                <div className="border-t border-gray-200 my-2"></div>
              </>
            ) : (
              // You can add user-specific links here if needed
              // For example:
              // <NavLink
              //   to="/user/profile"
              //   className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
              //   onClick={() => setIsOpen(false)}
              // >
              //   <FaCog className="mr-3 h-4 w-4" /> My Profile
              // </NavLink>
              null // Or an empty fragment if no specific user links
            )}
            
            {/* Sign Out Button */}
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
            >
              <FaSignOutAlt className="mr-3 h-4 w-4" /> Sign Out
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;