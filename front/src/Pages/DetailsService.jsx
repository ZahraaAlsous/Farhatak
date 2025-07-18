// import React, { useState } from "react";
// import "../assets/styles/service.css";

// function DetailsService() {
//   const [showPopup, setShowPopup] = useState(false);

//   return (
//     <div className="bg-[#f6f1eb] text-[#a1866f] font-sans relative">
//       {/* صورة الغلاف */}
//       <div className="header">
//         <h1> Luxury Wedding Hall</h1>
//       </div>

//       {/* مستطيل بمعلومات */}
//       <div className="px-10 py-16 flex flex-col items-start gap-8 relative">
//         {/* المستطيل الأول */}
//         <div className="bg-[#ded4c6] rounded-xl shadow-lg px-6 py-5 max-w-xl mt-10 ml-20 z-10 relative">
//           <p className="text-lg mb-4">
//             <span>name: </span>
//             <br />
//             <span>description: </span>
//             <br />
//             <span>price: </span>
//             <br />
//             <span>Location: </span>
//             <br />
//           </p>
//           <button
//             className="bg-[#a1866f] hover:bg-[#8c715c] text-white px-6 py-2 rounded-md text-base float-right"
//             onClick={() => setShowPopup(true)}
//           >
//             Book
//           </button>
//         </div>

//         {/* المستطيل الثاني (زينة فقط - غير قابل للنقر الآن) */}
//         <div className="absolute bg-[#ded4c6] rounded-xl shadow-lg px-6 py-5 w-[576px] h-[140px] -mt-5 ml-10 z-0"></div>
//       </div>

//       {/* الصور أسفل الصفحة */}
//       <div className="bg-[#e8ded2] px-10 py-10 flex flex-wrap justify-center gap-6">
//         {[
//           {
//             url: "https://images.unsplash.com/photo-1549187774-b4e9b0445b06",
//             label: "Interior",
//           },
//           {
//             url: "https://images.unsplash.com/photo-1582719478171-2fb68c226d4e",
//             label: "Lights",
//           },
//           {
//             url: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
//             label: "Seating",
//           },
//         ].map((image, index) => (
//           <div
//             key={index}
//             className="w-[250px] h-[250px] rounded-xl overflow-hidden shadow-md"
//           >
//             <img
//               src={image.url}
//               alt={`Hall ${index + 1}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       {/* نافذة منبثقة (Popup Modal) */}
//       {showPopup && (
//         <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-[#a1866f] relative">
//             <h2 className="text-xl mb-4 font-bold">Book Now</h2>
//             {/* <p>This hall includes VIP services and customizable decorations.</p> */}
//             <span>
//               Date:
//               <input />
//             </span>
//             <br />
//             <span>
//               Note:
//               <input />
//             </span>
//             <br />
//             <button
//               onClick={() => setShowPopup(false)}
//               className="absolute top-2 right-4 text-gray-600 text-xl font-bold hover:text-red-600"
//             >
//               &times;
//             </button>
//             <button
//               className="bg-[#a1866f] hover:bg-[#8c715c] text-white px-6 py-2 rounded-md text-base float-right"
//             //   onClick={() => setShowPopup(true)}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DetailsService;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../assets/styles/service.css";
import axios from "axios";
import Navbar from "../Components/Navbar";

function DetailsService() {
  const [showPopup, setShowPopup] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [notes, setNotes] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const location = useLocation();
  const service = location.state?.hall;

  if (!service) {
    return <div className="p-10 text-center">No service data available.</div>;
  }

  const handleBooking = async () => {
    if (!eventDate) {
      setResponseMessage("Please select a date.");
      return;
    }

    const selectedDate = new Date(eventDate);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (selectedDate < tomorrow) {
      setResponseMessage("❌ You can only book starting from tomorrow.");
      return;
    }

try {
  const token = localStorage.getItem("token");
  if (!token) {
    setResponseMessage("Unauthorized: Not logged in.");
    return;
  }

  const response = await axios.post(
    `http://localhost:3000/api/checkDateAvailability/${service._id}`,
    {
      eventDate,
      notes,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = response.data;

  if (data.available === false) {
    setResponseMessage("❌ Sorry, this date is already booked.");
  } else if (data.available === true) {
    setResponseMessage("✅ Booking successful!");
    setTimeout(() => {
      setShowPopup(false);
      setResponseMessage("");
      setEventDate("");
      setNotes("");
    }, 2000);
  } else if (data.message === "Unauthorized: No token provided") {
    setResponseMessage("⚠️ Unauthorized: Not logged in.");
  } else {
    setResponseMessage("❗ Unexpected error occurred.");
  }
} catch (error) {
  console.error(error);
  if (error.response?.status === 401) {
    setResponseMessage("⚠️ Unauthorized: Invalid token.");
  } else {
    setResponseMessage("❗ Server error occurred.");
  }
}
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full h-[400px]">
        <img
          src="/10.jpeg"
          alt="Service Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {service.title}
          </h1>
        </div>
      </div>
      <div className="bg-[#f6f1eb] text-[#a1866f] font-sans relative">
        {/* Header */}
        {/* <div className="header">
          <h1>{service.title}</h1>
        </div> */}

        {/* Service Details */}
        {/* <div className="px-10 py-16 flex flex-col items-start gap-8 relative"> */}
                  <div className="px-10 py-16 flex justify-center items-start gap-8 relative">

          <div className="bg-[#ded4c6] rounded-xl shadow-lg px-6 py-5 w-500 max-w-xl mt-10 ml-20 z-10 relative">
            <strong className="mb-5">Service Information :</strong>

            <p className="text-lg mb-4 leading-8">
              <strong>Name:</strong> {service.title}
              <br />
              <strong>Description:</strong> {service.description}
              <br />
              <strong>Price:</strong> {service.price} EGP
              <br />
              <strong>Location:</strong> {service.location}
              <br />
            </p>
            <button
              className="bg-[#a1866f] hover:bg-[#8c715c] text-white px-6 py-2 rounded-md text-base float-right"
              onClick={() => setShowPopup(true)}
            >
              Book
            </button>
          </div>

          {/* <div className="absolute bg-[#ded4c6] rounded-xl shadow-lg px-6 py-5 w-[576px] h-[140px] -mt-5 ml-10 z-0"></div> */}
        </div>

        {/* Images */}
        <div className="bg-[#e8ded2] px-10 py-10 flex flex-wrap justify-center gap-6">
          {service.images?.length > 0 ? (
            service.images.map((url, index) => (
              <div
                key={index}
                className="w-[250px] h-[250px] rounded-xl overflow-hidden shadow-md"
              >
                <img
                  src={url}
                  alt={`Hall image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div>No images available.</div>
          )}
        </div>

        {/* Booking Popup */}
        {showPopup && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-[#a1866f] relative">
              <h2 className="text-xl mb-4 font-bold">Book Now</h2>

              <div className="mb-4">
                <label className="block mb-1">Date:</label>
                <input
                  type="date"
                  className="border rounded px-3 py-1 w-full"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Note:</label>
                <input
                  type="text"
                  className="border rounded px-3 py-1 w-full"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {responseMessage && (
                <p className="text-sm mt-3 text-red-600">{responseMessage}</p>
              )}

              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-4 text-gray-600 text-xl font-bold hover:text-red-600"
              >
                &times;
              </button>

              <button
                onClick={handleBooking}
                className="bg-[#a1866f] hover:bg-[#8c715c] text-white px-6 py-2 rounded-md text-base float-right"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailsService;
