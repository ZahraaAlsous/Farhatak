// import React, { useState } from 'react';
// import { FaBars, FaTimes } from 'react-icons/fa';

// const NavBar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-[#D9D9D9] text-[#6C4C3F] shadow-md w-full fixed top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <span className="text-xl font-bold text-[#6C4C3F]">DreamDay</span>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-8">
//             <a href="#about" className="text-[#6C4C3F] hover:text-[#8c5e4f] transition duration-300">
//               About
//             </a>
//             <a href="#services" className="text-[#6C4C3F] hover:text-[#8c5e4f] transition duration-300">
//               Services
//             </a>
//             <a href="#dreamday" className="text-[#6C4C3F] hover:text-[#8c5e4f] transition duration-300">
//               DreamDay
//             </a>
//             <a href="#booking" className="text-[#6C4C3F] hover:text-[#8c5e4f] transition duration-300">
//               My Booking
//             </a>
//             <a href="#support" className="text-[#6C4C3F] hover:text-[#8c5e4f] transition duration-300">
//               Support
//             </a>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="outline-none text-[#6C4C3F]"
//               aria-label="Toggle menu"
//             >
//               {isOpen ? (
//                 <FaTimes className="w-6 h-6" />
//               ) : (
//                 <FaBars className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#D9D9D9]">
//           <a
//             href="#about"
//             className="block px-3 py-2 rounded-md text-base font-medium text-[#6C4C3F] hover:bg-[#c9c9c9]"
//             onClick={() => setIsOpen(false)}
//           >
//             About
//           </a>
//           <a
//             href="#services"
//             className="block px-3 py-2 rounded-md text-base font-medium text-[#6C4C3F] hover:bg-[#c9c9c9]"
//             onClick={() => setIsOpen(false)}
//           >
//             Services
//           </a>
//           <a
//             href="#dreamday"
//             className="block px-3 py-2 rounded-md text-base font-medium text-[#6C4C3F] hover:bg-[#c9c9c9]"
//             onClick={() => setIsOpen(false)}
//           >
//             DreamDay
//           </a>
//           <a
//             href="#booking"
//             className="block px-3 py-2 rounded-md text-base font-medium text-[#6C4C3F] hover:bg-[#c9c9c9]"
//             onClick={() => setIsOpen(false)}
//           >
//             My Booking
//           </a>
//           <a
//             href="#support"
//             className="block px-3 py-2 rounded-md text-base font-medium text-[#6C4C3F] hover:bg-[#c9c9c9]"
//             onClick={() => setIsOpen(false)}
//           >
//             Support
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

// import React from "react";
// import { IoPersonOutline } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => (
//   <nav className="w-full sticky top-0 z-20 bg-white backdrop-blur border-b-4 border-[#7b5d4d]">
//     <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-sm text-[#6C4C3F] font-medium">
//       {/* Left: Logo */}
//       <div className="flex items-center">
//         <img src="/logo.jpeg" alt="Logo" className="h-20 w-40 " />
//       </div>

//       {/* Center: Navigation Links */}
//       <div className="hidden md:flex space-x-8 text-sm text-[#6C4C3F]">
//         <a href="#about" className="hover:text-[#8c5e4f] transition">
//           About
//         </a>
//         <a href="#services" className="hover:text-[#8c5e4f] transition">
//           Services
//         </a>
//         <Link to="/UserBookings" className="hover:text-[#8c5e4f] transition">
//           My Bookings
//         </Link>
//         <a className="hover:text-[#8c5e4f] transition">Support</a>
//       </div>

//       {/* Right: Profile Icon (Mobile + Desktop) */}
//       <div
//         className="flex items-center space-x-4"
//         onClick={() => navigate("/UserProfile")}
//       >
//         <div
//           className="w-7 h-7 flex items-center justify-center
//              rounded-full border border-[#6C4C3F]
//              bg-[#f5f7fa]/90 text-[#6C4C3F]"
//         >
//           <IoPersonOutline size={16} />
//         </div>
//       </div>
//     </div>
//   </nav>
// );

// export default Navbar;

// import React from "react";
// import { IoPersonOutline } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate(); // ✅ داخل مكون React

//   return (
//     <nav className="w-full sticky top-0 z-20 bg-white backdrop-blur border-b-4 border-[#7b5d4d]">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-sm text-[#6C4C3F] font-medium">
//         {/* Left: Logo */}
//         <div className="flex items-center">
//           <img src="/logo.jpeg" alt="Logo" className="h-20 w-40 " />
//         </div>

//         {/* Center: Navigation Links */}
//         <div className="hidden md:flex space-x-8 text-sm text-[#6C4C3F]">
//           <a href="#about" className="hover:text-[#8c5e4f] transition">
//             About
//           </a>
//           <a href="#services" className="hover:text-[#8c5e4f] transition">
//             Services
//           </a>
//           <Link to="/UserBookings" className="hover:text-[#8c5e4f] transition">
//             My Bookings
//           </Link>
//           <a className="hover:text-[#8c5e4f] transition">Support</a>
//         </div>

//         {/* Right: Profile Icon (Mobile + Desktop) */}
//         <div
//           className="flex items-center space-x-4"
//           onClick={() => navigate("/UserProfile")}
//         >
//           <div
//             className="w-7 h-7 flex items-center justify-center
//              rounded-full border border-[#6C4C3F]
//              bg-[#f5f7fa]/90 text-[#6C4C3F]"
//           >
//             <IoPersonOutline size={16} />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // const handleCategorySelect = (e) => {
  //   const category = e.target.value;
  //   if (category) {
  //     navigate(`/services/${category}`);
  //   }
  // };

  const handleCategorySelect = (e) => {
    const category = e.target.value;
    if (category) {
      localStorage.setItem("Category", category);
      navigate("/service");
    }
  };

  return (
    <nav className="w-full sticky top-0 z-20 bg-white backdrop-blur border-b-4 border-[#7b5d4d]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 py-1 text-[#6C4C3F] font-medium">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-25 w-50" />
        </div>
        <div className="hidden md:flex flex-1 justify-center gap-x-16 text-lg text-[#6C4C3F]">
          {/* <a href="#about" className="hover:text-[#8c5e4f] transition">
            About
          </a> */}
          <Link to="/AboutUs" className="hover:text-[#8c5e4f] transition">
            AboutUs
          </Link>

          <select
            defaultValue=""
            onChange={handleCategorySelect}
            className="bg-transparent border-b border-[#6C4C3F] px-3 py-1 rounded text-[#6C4C3F] hover:text-[#8c5e4f] transition"
          >
            <option value="" disabled>
              Services
            </option>
            <option value="Cars">Cars</option>
            <option value="Decoration">Decoration</option>
            <option value="Photography">Photography</option>
            <option value="Hall">Halls</option>
          </select>

          <Link to="/Packages" className="hover:text-[#8c5e4f] transition">
            Packages
          </Link>
          <Link to="/UserBookings" className="hover:text-[#8c5e4f] transition">
            My Bookings
          </Link>
          <a className="hover:text-[#8c5e4f] transition">Support</a>
        </div>
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => navigate("/UserProfile")}
        >
          <div
            className="w-8 h-8 flex items-center justify-center
             rounded-full border border-[#6C4C3F]
             bg-[#f5f7fa]/90 text-[#6C4C3F]"
          >
            <IoPersonOutline size={18} />
          </div>
        </div>

        {/* <div>
          {
            localStorage.getItem("token", "") ?
             (<button onClick={() => navigate("/login")}>
                Login
                </button>)
            :
             (<button onClick={() =>localStorage.setItem("token", "")}>
                Logout
                </button>)
            
          }
        </div> */}
        <div className="ml-1">
          {localStorage.getItem("token") ? (
            <button
              onClick={() => {
                localStorage.setItem("token", "");
                navigate("/login"); // يمكنك إعادة توجيه المستخدم إلى صفحة تسجيل الدخول بعد تسجيل الخروج
              }}
            >
              Logout
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
