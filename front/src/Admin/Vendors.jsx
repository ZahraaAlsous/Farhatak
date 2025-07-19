import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import { FaTrash } from "react-icons/fa";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("ID");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:3000/api/getAllVendors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log("Fetched vendors:", response.data);
        setVendors(response.data);
      })
      .catch((error) => {
        console.error("Error Getting Data:", error);
      });
  }, [token]);

  const handleDeleteVendor = (vendorId) => {
    axios
      .delete(`http://localhost:3000/api/deleteVendor/${vendorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setVendors((prev) => prev.filter((v) => v._id !== vendorId));
      })
      .catch((error) => {
        console.error("Error Deleting Vendor:", error);
      });
  };

  const toggleApproved = (vendor) => {
    const updatedApproved = !vendor.approved;
    // console.log("Toggling approved for vendor ID:", vendor._id);

    axios
      .patch(
        `http://localhost:3000/api/editVendorState/${vendor._id}`,
        { approved: updatedApproved },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const updatedVendor = res.data;
        if (!updatedVendor._id) {
          // fallback if backend response missing _id
          updatedVendor._id = vendor._id;
        }
        // console.log("Updated vendor from server:", updatedVendor);

        setVendors((prev) =>
          prev.map((v) => (v._id === vendor._id ? updatedVendor : v))
        );
      })
      .catch((err) => console.error("Error toggling approval:", err));
  };

  const toggleActive = (vendor) => {
    const updatedActive = !vendor.isActive;
    // console.log("Toggling active for vendor ID:", vendor._id);

    axios
      .patch(
        `http://localhost:3000/api/editVendorState/${vendor._id}`,
        { isActive: updatedActive },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const updatedVendor = res.data;
        if (!updatedVendor._id) {
          updatedVendor._id = vendor._id;
        }
        // console.log("Updated vendor active from server:", updatedVendor);

        setVendors((prev) =>
          prev.map((v) => (v._id === vendor._id ? updatedVendor : v))
        );
      })
      .catch((err) => console.error("Error toggling active:", err));
  };
  const filteredVendorsBybusinessName = vendors.filter((vendor) =>
    vendor?.businessName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredVendorsByID = vendors.filter((vendor) =>
    vendor?._id?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredVendorsBybusinessType = vendors.filter((vendor) =>
    vendor?.businessType?.toLowerCase().includes(searchQuery.toLowerCase())
  );
const filteredVendorsByIsActive = vendors.filter((vendor) =>
  String(vendor?.isActive).toLowerCase().includes(searchQuery.toLowerCase())
);
  const filteredVendorsByLocation = vendors.filter((vendor) =>
    vendor?.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );
const filteredVendorsByApproved = vendors.filter((vendor) =>
  String(vendor?.approved).toLowerCase().includes(searchQuery.toLowerCase())
);
  const filteredVendorsByName = vendors.filter((vendor) =>
    vendor?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
    // Choose filter based on searchType
  const filteredVendors =
    searchType === "ID"
      ? filteredVendorsByID
      : searchType === "Business Name"
      ? filteredVendorsBybusinessName
      : searchType === "Business Type"
      ? filteredVendorsBybusinessType
      : searchType === "Is Active"
      ? filteredVendorsByIsActive
      : searchType === "Location"
      ? filteredVendorsByLocation
      : searchType === "Is Approved"
      ? filteredVendorsByApproved
      : searchType === "Name"
      ? filteredVendorsByName
      : filteredVendorsBybusinessName;
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4 overflow-auto">
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Vendors</h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-3">
              <label htmlFor="SearchBar" className="whitespace-nowrap">
                Search For A Vendor:
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
                <option value="ID">Vendor ID</option>
                <option value="Business Name">Business Name</option>
                <option value="Business Type">Business Type</option>
                <option value="Location">Location</option>
                <option value="Name">User Name</option>
                <option value="Is Approved">Approved</option>
                <option value="Is Active">Active</option>
              </select>
            </div>
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Vendor ID
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Business Name
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Business Type
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Location
                  </th>
                  <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
                    Approved
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    User Name
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Active
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Remove Vendor
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor, index) => (
                  <tr
                    key={vendor._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-3 px-4">{vendor._id}</td>
                    <td className="py-3 px-4">{vendor.businessName}</td>
                    <td className="py-3 px-4">{vendor.businessType}</td>
                    <td className="py-3 px-4">{vendor.location}</td>
                    <td
                      className="py-3 px-4 text-center cursor-pointer select-none"
                      onClick={() => toggleApproved(vendor)}
                      title="Click to toggle approval"
                    >
                      {vendor.approved ? "✔️" : "❌"}
                    </td>
                    <td className="py-3 px-4">
                      {vendor.user?.name || "No user linked"}
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold cursor-pointer select-none ${
                        vendor.isActive ? "text-green-600" : "text-red-600"
                      }`}
                      onClick={() => toggleActive(vendor)}
                      title="Click to toggle active status"
                    >
                      {vendor.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteVendor(vendor._id)}
                        className="text-red-600 hover:text-red-800 ml-10"
                        aria-label={`Delete vendor ${vendor.businessName}`}
                        title="Delete vendor"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {vendors.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-4 text-gray-500 italic"
                    >
                      No vendors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Vendors;
