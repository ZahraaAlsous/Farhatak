import React from "react";
const Footer = () => {
  return (
    <footer className="bg-[#F6F1EB] text-[#4C3B33] py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Left: Project Name & Tagline */}
        <div>
<h2 className="text-2xl font-bold font-italiana">Farhatak</h2>
          <p className="mt-2 text-sm">
                      Your go-to platform for
                      <br />booking trusted event services.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-col gap-2">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Browse Services</a>
          <a href="#" className="hover:underline">Packages</a>
          <a href="#" className="hover:underline">How It Works</a>
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>

        {/* Right: Legal Links */}
        <div className="flex flex-col gap-2">
          <a href="#" className="text-[#A1866F] hover:underline">Terms of Service</a>
          <a href="#" className="text-[#A1866F] hover:underline">Privacy Policy</a>
          <a href="#" className="text-[#A1866F] hover:underline">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
