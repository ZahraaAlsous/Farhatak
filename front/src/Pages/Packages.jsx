import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";


const categoriesList = ["Hall", "Cars", "Photography", "Decoration"];

const Packages = () => {
  const [budget, setBudget] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const handleCardClick = (service) => {
    navigate("/dservice", { state: { hall: service } });
  };

  const handleFetchPackages = async () => {
    try {
      const categoryQuery = selectedCategories.join(",");
      const res = await axios.get(
        `http://localhost:3000/api/packages?budget=${budget}&categories=${categoryQuery}`
      );
      setPackages(res.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full h-[500px]">
        <img
          src="/10.jpeg"
          alt="Service Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          {/* <h1 className="text-4xl md:text-5xl font-bold text-white">
            My bookings
          </h1> */}
          {/* <h1 className="text-3xl font-bold mb-6 text-center text-coral-600">
            Search Packages by Budget and Categories
          </h1> */}

          <div className="bg-white p-6 shadow-md rounded-xl mb-8">
            <div className="mb-4">
              <label className="block mb-2 text-lg font-medium">Budget:</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter your budget"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-lg font-medium">
                Categories:
              </label>
              <div className="flex flex-wrap gap-3">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedCategories.includes(cat)
                        ? "bg-coral-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleFetchPackages}
              className="mt-4 bg-[#a5725d] hover:bg-coral-700 text-white px-6 py-2 rounded-full"
            >
              Show Packages
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 max-w-5xl mx-auto">
        {/* <h1 className="text-3xl font-bold mb-6 text-center text-coral-600">
          Search Packages by Budget and Categories
        </h1>

        <div className="bg-white p-6 shadow-md rounded-xl mb-8">
          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium">Budget:</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Enter your budget"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium">
              Categories:
            </label>
            <div className="flex flex-wrap gap-3">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategories.includes(cat)
                      ? "bg-coral-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleFetchPackages}
            className="mt-4 bg-[#a5725d] hover:bg-coral-700 text-white px-6 py-2 rounded-full"
          >
            Show Packages
          </button>
        </div> */}

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 border border-coral-100"
            >
              <h2 className="text-xl font-bold text-coral-600 mb-3">
                Package #{index + 1} - Total Price: {pkg.totalPrice} $
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pkg.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg overflow-hidden shadow-sm"
                    onClick={() => handleCardClick(service)}
                  >
                    <img
                      src={
                        service.images?.[0] ||
                        "https://via.placeholder.com/300x200"
                      }
                      alt={service.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold">{service.title}</h3>
                      <p className="text-sm text-gray-600">
                        {service.category} - {service.location}
                      </p>
                      <p className="text-sm">Price: {service.price} $</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Packages;
