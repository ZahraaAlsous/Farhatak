
import React from "react";
import { IoPersonOutline } from "react-icons/io5"
// import Footer from "./footer";
// const Navbar = () => (
// <nav className="w-full sticky top-0 z-20 bg-white backdrop-blur border-b-4 border-[#7b5d4d]">
//   <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-sm text-[#6C4C3F] font-medium">

//     {/* Left: Logo */}
//     <div className="flex items-center space-x-4">
//       <img src="logo.png" alt="Logo" className="h-40 w-60 object-contain -ml-10 -mb-14 -mt-10" />
      
//     </div>

//     {/* Center: Navigation Links */}
//  <div className="hidden md:flex space-x-8 text-sm text-[#6C4C3F]">
//   <a href="#about" className="hover:text-[#8c5e4f] transition">About</a>
//   <a href="#services" className="hover:text-[#8c5e4f] transition">Services</a>
//   <a href="#bookings" className="hover:text-[#8c5e4f] transition">My Bookings</a>
//   <a href="#support" className="hover:text-[#8c5e4f] transition">Support</a>
// </div>


//     {/* Right: Profile Icon (Mobile + Desktop) */}
//     <div className="flex items-center space-x-4">




// <div
//   className="w-7 h-7 flex items-center justify-center
//              rounded-full border border-[#6C4C3F]
//              bg-[#f5f7fa]/90 text-[#6C4C3F]"
// >
//   <IoPersonOutline size={16} />
// </div>


// </div>

//   </div>
// </nav>

// );


import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { FaCar, FaCameraRetro } from "react-icons/fa";
import { GiFlowerPot } from "react-icons/gi";
import { MdEventSeat } from "react-icons/md";
import { FaGlassCheers } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";




const Hero = () => (
  <section id="home" className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
    <img
      src="4.jpeg"
      alt="Couple walking in field"
      className="absolute inset-0 w-full h-full object-cover -z-10 min-w-full"
    />
    <div className="px-4 max-w-4xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight drop-shadow-md mb-8">
        Celebrate smarter. Book everything in <br className="hidden sm:block" /> one place.
        <br /> Your event. Your way
      </h1>
   
    </div>
  </section>
);

const InfoSection = () => (
  <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-white/30 -z-10"></div>
    <img
      src="6.jpeg"
      alt="Event vendors"
      className="absolute inset-0 w-full h-full object-cover -z-20"
    />
    <div className="absolute top-4 left-4 max-w-xs p-8 rounded">
      <h2 className="font-semibold text-3xl mb-2 text-[#4b342a]">Browse Services</h2>
      <p className="text-xl text-[#3d2d26]">Explore vendors for every event need — from DJs and florists to venues and cars.</p>
    </div>
    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 max-w-xs p-4 rounded text-right">
      <h2 className="font-semibold mb-2 text-[#4d362d] text-3xl">Book Instantly</h2>
      <p className="text-xl text-[#422d25]">Pick your date, check availability, and reserve in just a few clicks.</p>
    </div>
    <div className="absolute bottom-4 left-4 max-w-xl p-4 rounded">
      <h2 className="font-semibold mb-2 text-[#372822] text-3xl">Celebrate with Confidence</h2>
      <p className="text-xl text-[#2e201a]">Connect with trusted vendors and enjoy stress-free events.</p>
    </div>
  </section>
);

// const ServicesOverview = () => (

  
//   <section className="relative w-full py-16 bg-[#F5F0ED]">
//     <div className="container mx-auto text-center px-4">
//       <h2 className="text-3xl md:text-4xl font-bold text-[#6C4C3F] mb-6">
//         Browse Trusted Event Services in One Place
//       </h2>
//       <div className="h-8"></div>
//       <p className="text-lg text-[#6C4C3F] max-w-2xl mx-auto mb-12">
//         From catering and venues to photographers and decorators — we connect
//         you with top-rated professionals.
//       </p>

//       <div className="flex flex-wrap justify-center gap-8 md:gap-16">
//         {/* Cars */}
//         <div
//           className="flex flex-col items-center cursor-pointer"
//           onClick={() => handleCategoryClick("car")}
//         >
//           <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
//             {/* ... SVG السيارة ... */}
//           </div>
//           <span className="text-[#6C4C3F]">Cars</span>
//         </div>

//         {/* Flowers */}
//         <div
//           className="flex flex-col items-center cursor-pointer"
//           onClick={() => handleCategoryClick("flower")}
//         >
//           <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
//             {/* ... SVG الورود ... */}
//           </div>
//           <span className="text-[#6C4C3F]">Flowers</span>
//         </div>

//         {/* Photography */}
//         <div
//           className="flex flex-col items-center cursor-pointer"
//           onClick={() => handleCategoryClick("photography")}
//         >
//           <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
//             {/* ... SVG التصوير ... */}
//           </div>
//           <span className="text-[#6C4C3F]">Photography</span>
//         </div>

//         {/* Halls */}
//         <div
//           className="flex flex-col items-center cursor-pointer"
//           onClick={() => handleCategoryClick("hall")}
//         >
//           <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
//             {/* ... SVG القاعة ... */}
//           </div>
//           <span className="text-[#6C4C3F]">Halls</span>
//         </div>
//       </div>
//     </div>
//   </section>
// );

const ServicesOverview = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    localStorage.setItem("Category", category);
    navigate("/service");
  };

  return (
    <section className="relative w-full py-16 bg-[#F5F0ED]">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6C4C3F] mb-6">
          Browse Trusted Event Services in One Place
        </h2>
        <div className="h-8"></div>
        <p className="text-lg text-[#6C4C3F] max-w-2xl mx-auto mb-12">
          From catering and venues to photographers and decorators — we connect
          you with top-rated professionals.
        </p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {/* Cars */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleCategoryClick("Cars")}
          >
            <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
              <FaCar className="text-3xl text-[#6C4C3F]" />
            </div>
            <span className="text-[#6C4C3F]">Cars</span>
          </div>

          {/* Flowers */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleCategoryClick("Decoration")}
          >
            <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
              <GiFlowerPot className="text-3xl text-[#6C4C3F]" />
            </div>
            <span className="text-[#6C4C3F]">Decoration</span>
          </div>

          {/* Photography */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleCategoryClick("Photography")}
          >
            <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
              <FaCameraRetro className="text-3xl text-[#6C4C3F]" />
            </div>
            <span className="text-[#6C4C3F]">Photography</span>
          </div>

          {/* Halls */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleCategoryClick("Hall")}
          >
            <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
              <FaBirthdayCake className="text-3xl text-[#6C4C3F]" />
            </div>
            <span className="text-[#6C4C3F]">Halls</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// const ServicesOverview = () => {
//   const navigate = useNavigate();

//   const handleCategoryClick = (category) => {
//     localStorage.setItem("Category", category); // ✅ تخزين التصنيف
//     navigate("/service"); // الانتقال للصفحة
//   };  };

//   return (
//     // <section className="relative w-full py-16 bg-[#F5F0ED]">
//     //   <div className="container mx-auto text-center px-4">
//     //     <h2 className="text-3xl md:text-4xl font-bold text-[#6C4C3F] mb-6">
//     //       Browse Trusted Event Services in One Place
//     //     </h2>
//     //     <div className="h-8"></div>
//     //     <p className="text-lg text-[#6C4C3F] max-w-2xl mx-auto mb-12">
//     //       From catering and venues to photographers and decorators — we connect
//     //       you with top-rated professionals.
//     //     </p>

//     //     <div className="flex flex-wrap justify-center gap-8 md:gap-16">
//     //       {/* Cars */}
//     //       <div
//     //         className="flex flex-col items-center cursor-pointer"
//     //         onClick={() => handleCategoryClick("car")}
//     //       >
//     //         <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
//     //           {/* ... SVG السيارة ... */}
//     //         </div>
//     //         <span className="text-[#6C4C3F]">Cars</span>
//     //       </div>

//     //       {/* Flowers */}
//     //       <div
//     //         className="flex flex-col items-center cursor-pointer"
//     //         onClick={() => handleCategoryClick("flower")}
//     //       >
//     //         <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
//     //           {/* ... SVG الورود ... */}
//     //         </div>
//     //         <span className="text-[#6C4C3F]">Flowers</span>
//     //       </div>

//     //       {/* Photography */}
//     //       <div
//     //         className="flex flex-col items-center cursor-pointer"
//     //         onClick={() => handleCategoryClick("photography")}
//     //       >
//     //         <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
//     //           {/* ... SVG التصوير ... */}
//     //         </div>
//     //         <span className="text-[#6C4C3F]">Photography</span>
//     //       </div>

//     //       {/* Halls */}
//     //       <div
//     //         className="flex flex-col items-center cursor-pointer"
//     //         onClick={() => handleCategoryClick("hall")}
//     //       >
//     //         <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2">
//     //           {/* ... SVG القاعة ... */}
//     //         </div>
//     //         <span className="text-[#6C4C3F]">Halls</span>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </section>
//     <section className="relative w-full py-16 bg-[#F5F0ED]">
//       <div className="container mx-auto text-center px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#6C4C3F] mb-6">
//           Browse Trusted Event Services in One Place
//         </h2>
//         <div className="h-8"></div>
//         <p className="text-lg text-[#6C4C3F] max-w-2xl mx-auto mb-12">
//           From catering and venues to photographers and decorators — we connect
//           you with top-rated professionals.
//         </p>

//         <div className="flex flex-wrap justify-center gap-8 md:gap-16">
//           {/* Cars */}
//           <div
//             className="flex flex-col items-center cursor-pointer"
//             onClick={() => handleCategoryClick("car")}
//           >
//             <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2"></div>
//             <span className="text-[#6C4C3F]">Cars</span>
//           </div>

//           {/* Flowers */}
//           <div
//             className="flex flex-col items-center cursor-pointer"
//             onClick={() => handleCategoryClick("flower")}
//           >
//             <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2"></div>
//             <span className="text-[#6C4C3F]">Flowers</span>
//           </div>

//           {/* Photography */}
//           <div
//             className="flex flex-col items-center cursor-pointer"
//             onClick={() => handleCategoryClick("photography")}
//           >
//             <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2"></div>
//             <span className="text-[#6C4C3F]">Photography</span>
//           </div>

//           {/* Halls */}
//           <div
//             className="flex flex-col items-center cursor-pointer"
//             onClick={() => handleCategoryClick("hall")}
//           >
//             <div className="w-20 h-20 rounded-full border-2 border-[#6C4C3F] flex items-center justify-center mb-2"></div>
//             <span className="text-[#6C4C3F]">Halls</span>
//           </div>
//         </div>
//       </div>
//     </section>

//   );
// };
const PackagesSection = () => (
  <section className="w-full bg-white py-20 px-4">
    {/* العنوان والوصف */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-[#6C4C3F] mb-4">Our Packages</h2>
      <p className="text-lg text-[#6C4C3F] max-w-2xl mx-auto">
        We've bundled the most requested services to make your event planning even easier — and more affordable.
      </p>
    </div>

    {/* المستطيلات */}
    <div className="relative flex justify-end items-center">
      {/* المستطيل الطولي */}
      <div className="relative w-64 h-96 bg-[#E8DED9] rounded-lg shadow-lg z-20 mr-8">
        <img
          src="7.jpeg"
          alt="Vertical package"
          className="absolute top-6 left-6 w-50 h-85 object-cover rounded-md border-2 border-[#6C4C3F]"
        />
      </div>

      {/* المستطيل العرضي */}
      <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 w-[500px] bg-[#D6C3BA] rounded-lg shadow-md z-10 p-6 -ml-[105px]">
        <p className="text-[#4C3B33] text-md leading-relaxed">
          I was amazed by how seamless the entire process was. The platform is beautifully designed, easy to navigate,
          and packed with quality service providers. I found a photographer, caterer, and DJ for my event within an hour — 
          all with clear pricing and reviews. It saved me so much time and stress!
        </p>
      </div>
    </div>
  </section>
);

const HeroLanding = () => (
  <main className="font-[Inter] overflow-hidden">
    <Navbar />
    <Hero />
    <InfoSection />
    <ServicesOverview />
    <PackagesSection />
  </main>
);

export default HeroLanding;

{/* <Footer/> */}