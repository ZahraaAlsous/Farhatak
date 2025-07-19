import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaTrash } from "react-icons/fa";

function Services() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("ID");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:3000/api/getAllServices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(`Error Getting Data ${error}`);
      });
  }, []);

  const handleDeleteService = (serviceId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .delete(`http://localhost:3000/api/deleteServiceForAdmin/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setServices((prevServices) =>
          prevServices.filter((service) => service._id !== serviceId)
        );
      })
      .catch((error) => {
        console.log(`Error Deleting Service: ${error}`);
      });
  };

  const filteredServicesByTitle = services.filter((service) =>
    service?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredServicesByCategory = services.filter((service) =>
    service?.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredServicesByPrice = services.filter((service) =>
    String(service?.price).toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredServicesByID = services.filter((service) =>
    service?._id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredServicesByVendorID = services.filter((service) =>
    service?.vendor?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredServicesByLocation = services.filter((service) =>
    service?.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Choose filter based on searchType
  const filteredServices =
    searchType === "Title"
      ? filteredServicesByTitle
      : searchType === "ID"
      ? filteredServicesByID
      : searchType === "Category"
      ? filteredServicesByCategory
      : searchType === "Price"
      ? filteredServicesByPrice
      : searchType === "Location"
      ? filteredServicesByLocation
      : filteredServicesByVendorID;

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="p-4 overflow-auto">
            <div className="overflow-x-auto">
              <h2 className="text-2xl font-bold mb-4">Services</h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-3">
                <label htmlFor="SearchBar" className="whitespace-nowrap">
                  Search For A Service:
                </label>
                <input
                  id="SearchBar"
                  type="text"
                  placeholder={`Enter ${searchType}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-5 pr-4 py-1 border rounded cursor-pointer focus:ring-2 focus:border-transparent transition-all"
                />
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="border rounded px-3 py-2 cursor-pointer"
                >
                  <option value="ID">Service ID</option>
                  <option value="Vendor ID">Vendor ID</option>
                  <option value="Title">Title</option>
                  <option value="Category">Category</option>
                  <option value="Price">Price</option>
                  <option value="Location">Location</option>
                </select>
              </div>

              <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Service ID
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Title
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Vendor ID
                    </th>
                    {/* <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                      Description
                    </th> */}
                    {/* <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Images
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Videos
                    </th> */}
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Available Dates
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Remove Service
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service, index) => (
                    <tr
                      key={service._id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-3 px-4">{service._id}</td>
                      <td className="py-3 px-4">{service.title}</td>
                      <td className="py-3 px-4">{service.category}</td>
                      <td className="py-3 px-4">{`${service.price} $`}</td>
                      <td className="py-3 px-4">{service.vendor}</td>
                      {/* <td className="py-3 px-4 text-center">
                        {service.description}
                      </td> */}
                      {/* <td className="py-3 px-4">{service.images}</td>
                      <td className="py-3 px-4">{service.videos}</td> */}
                      <td className="py-3 px-4">
                        {service.availableDates &&
                        service.availableDates.length > 0 ? (
                          service.availableDates.map((dateStr, i) => (
                            <div key={i}>{dateStr}</div>
                          ))
                        ) : (
                          <div>No Dates</div>
                        )}
                      </td>
                      <td className="py-3 px-4">{service.location}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="text-red-600 hover:text-red-800 ml-10"
                          aria-label={`Delete user ${service.title}`}
                          title="Delete user"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Services;
