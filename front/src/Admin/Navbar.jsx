import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

  const handleProfileClick = () => {
    // Navigate to profile page or open modal
    alert("Go to Profile");
  };

  const handleLogoutClick = () => {
    // Handle logout logic
  
                  localStorage.setItem("token", "");
                  navigate("/login");
 
    alert("Logging out...");
  };

  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <div className="text-lg font-semibold text-gray-700">Dashboard</div>
      <div className="space-x-4">
        <button
          onClick={handleProfileClick}
          className="text-sm text-gray-600 hover:text-blue-500"
          aria-label="Profile"
        >
          Profile
        </button>
        <button
          onClick={handleLogoutClick}
          className="text-sm text-gray-600 hover:text-blue-500"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
export default Navbar;