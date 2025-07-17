import React, { useState } from "react";
import { IoImageOutline, IoVideocamOutline, IoSaveOutline, IoPersonOutline } from "react-icons/io5";

// Navbar Component
const Navbar = () => {
  const [showBookings, setShowBookings] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#f0e6df] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-20 w-50 " 
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
                  {/* My Bookings Button */}
                  <div>
                      <span className="mr-2 text-4xl text-[#5e4135]">+</span>
                  </div>
          <div className="relative">
            
            <button
              onClick={() => setShowBookings(!showBookings)}
              className="px-4 py-2 bg-[#6C4C3F] text-white rounded-lg hover:bg-[#5e4135] transition-colors"
            >
              My Bookings
            </button>

            {/* Empty Bookings Dropdown */}
            {showBookings && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50  border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-[#6C4C3F]">My Bookings</h3>
                </div>
                
                <div className="p-4 text-center text-gray-500">
                  <p>No bookings available</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile Icon */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#6C4C3F] bg-white text-[#6C4C3F]">
            <IoPersonOutline size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main Component
const AddListingPage = () => {
  const [form, setForm] = useState({
    category: "Hall",
    title: "",
    description: "",
    location: "",
    image: null,
    video: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving…", form);
  };

  return (
    <div className="min-h-screen bg-[#F6F1EB] pt-20">
      <Navbar />
      
      {/* Image Preview Section */}
      <div className="w-full h-[50vh] flex items-center justify-center bg-[#DED4C6] relative group overflow-hidden">
        {form.image ? (
          <img
            src={URL.createObjectURL(form.image)}
            alt="preview"
            className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
          />
        ) : (
          <img
            src="/8.jpeg"
            alt="default preview"
            className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
          />
        )}
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-[#755e547a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
          <div className="text-center text-white backdrop-blur-sm bg-white/10 p-6 rounded-full">
            <div className="text-4xl font-bold mb-5">+</div>
            <div className="text-lg font-medium">Add Services</div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-[#fff6e9] rounded-lg shadow-xl overflow-hidden border border-[#6C4C3F]/30"
        >
          <div className="p-8 space-y-6 text-[#6C4C3F]">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Category */}
              <label htmlFor="category" className="font-semibold">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="md:col-span-2 border border-[#6C4C3F] rounded-md bg-transparent p-2 focus:outline-none focus:ring-1 focus:ring-[#6C4C3F]"
              >
                <option>Hall</option>
                <option>Cars</option>
                <option>Decoration</option>
                <option>Photography</option>
              </select>

              {/* Title */}
              <label htmlFor="title" className="font-semibold">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                className="md:col-span-2 border border-[#6C4C3F] rounded-md bg-transparent p-2 focus:outline-none focus:ring-1 focus:ring-[#6C4C3F]"
                placeholder="Enter title…"
                required
              />

              {/* Description */}
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
                className="md:col-span-2 border border-[#6C4C3F] rounded-md bg-transparent p-2 focus:outline-none focus:ring-1 focus:ring-[#6C4C3F]"
                placeholder="Write a brief description…"
              />

              {/* Location */}
              <label htmlFor="location" className="font-semibold">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                className="md:col-span-2 border border-[#6C4C3F] rounded-md bg-transparent p-2 focus:outline-none focus:ring-1 focus:ring-[#6C4C3F]"
                placeholder="City / Address…"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Add Image */}
              <label className="inline-flex items-center gap-2 px-4 py-2 border border-[#6C4C3F] rounded-md cursor-pointer hover:bg-[#6C4C3F] hover:text-[#DED4C6] transition">
                <IoImageOutline /> Add Image
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>

              {/* Add Video */}
              <label className="inline-flex items-center gap-2 px-4 py-2 border border-[#6C4C3F] rounded-md cursor-pointer hover:bg-[#6C4C3F] hover:text-[#DED4C6] transition">
                <IoVideocamOutline /> Add Video
                <input
                  type="file"
                  accept="video/*"
                  name="video"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="mt-4 w-full md:w-auto px-6 py-2 flex items-center justify-center gap-2 border border-[#6C4C3F] bg-[#6C4C3F] text-[#DED4C6] rounded-md hover:opacity-90 transition"
            >
              <IoSaveOutline /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingPage;