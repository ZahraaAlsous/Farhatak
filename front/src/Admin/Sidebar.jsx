import React from "react";
import { FaHome, FaUsers, FaBoxes, FaTools } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = "flex items-center p-2 rounded";
  const activeClass = "bg-blue-100 text-blue-600";

  return (
    <div className="w-64 bg-white shadow-lg hidden md:block">
      <div className="p-6 text-2xl font-bold text-blue-600">Admin Panel</div>
      <nav className="flex flex-col p-4 space-y-2">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${linkClass} text-gray-700 hover:bg-blue-100 ${
              isActive ? activeClass : ""
            }`
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          <FaHome className="mr-2" /> Dashboard
        </NavLink>
        <NavLink
          to="/admin-usersData"
          className={({ isActive }) =>
            `${linkClass} text-gray-700 hover:bg-blue-100 ${
              isActive ? activeClass : ""
            }`
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          <FaUsers className="mr-2" /> Users
        </NavLink>
       
        <NavLink
          to="/admin-vendorsData"
          className={({ isActive }) =>
            `${linkClass} text-gray-700 hover:bg-blue-100 ${
              isActive ? activeClass : ""
            }`
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          <FaBoxes className="mr-2" /> Vendors
        </NavLink>
        <NavLink
          to="/admin-servicesData"
          className={({ isActive }) =>
            `${linkClass} text-gray-700 hover:bg-blue-100 ${
              isActive ? activeClass : ""
            }`
          }
          aria-current={({ isActive }) => (isActive ? "page" : undefined)}
        >
          <FaTools className="mr-2" /> Services
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
