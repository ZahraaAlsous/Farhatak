import React, { useEffect, useState } from "react";
import axios from "axios";
// import Navbar from "../Components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { VendorNavbar } from "../Components/VendorNavbar";

const VServic = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchservices = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/vendor/services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching user services:", err);
    }
  };

  useEffect(() => {
    fetchservices();

    // ✅ إذا جئنا من تعديل خدمة، حدث البيانات وأزل الحالة
    if (location.state?.updated) {
      fetchservices();
      navigate(location.pathname, { replace: true }); // remove state
    }
  }, [location]);

  const handleCardClick = (service) => {
    navigate("/vdservice", { state: { service } });
  };

  const handleDelete = async (serviceId, e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:3000/api/deleteService/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices(services.filter((service) => service._id !== serviceId));
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  return (
    <>
      <VendorNavbar />
      {/* <img
        src="/8.jpeg"
        // alt={booking.title}
        // className="w-full h-48 object-cover rounded mb-4"
      /> */}
      <div className="relative w-full h-[500px]">
        <img
          src="/10.jpeg"
          alt="Service Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 mt-15">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            My Services
          </h1>
        </div>
      </div>

      <div className="p-15 text-[#6C4C3F]">
        {/* <h1 className="text-2xl font-bold mb-6">My services</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-xl shadow p-4 bg-white cursor-pointer hover:shadow-lg transition relative"
              onClick={() => handleCardClick(booking)}
            >
              <button
                onClick={(e) => handleDelete(booking._id, e)}
                className="absolute top-2 right-2 bg-[#a1866f] hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition"
                aria-label="Delete service"
              >
                &times;
              </button>

              <img
                src={
                  booking.images?.[0] || "https://via.placeholder.com/300x200"
                }
                alt={booking.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{booking.title}</h2>
              <p className="text-sm text-gray-600 mt-2">
                {booking.description}
              </p>
              <p className="mt-2">
                <strong>Location:</strong> {booking.location}
              </p>
              <p>
                <strong>Price:</strong> ${booking.price}
              </p>
              {/* <p>
                <strong>Available Dates:</strong>
              </p>
              <ul className="list-disc pl-5 text-sm">
                {booking.availableDates?.length > 0 ? (
                  booking.availableDates.map((date, i) => (
                    <li key={i}>
                      {new Date(date).toLocaleDateString("en-US")}
                    </li>
                  ))
                ) : (
                  <li>No available dates</li>
                )}
              </ul> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VServic;
