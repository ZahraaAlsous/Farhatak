// import { useState, useEffect, useCallback } from "react";
// import api from "./api"; // ⬅️ نفس instance المُستخدَم في AddListingPage (يتعامل مع التوكِن + baseURL)

// // Helper لتحويل حالة الباك‑إند إلى لون / تسمية بالفرونت
// const statusLabel = {
//   pending: { text: "Pending", bg: "bg-yellow-600" },
//   confirmed: { text: "Accepted", bg: "bg-green-600" },
//   declined: { text: "Rejected", bg: "bg-red-600" },
//   completed: { text: "Finished", bg: "bg-gray-500" },
// };

// export default function BookingsPage() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /* جلب البيانات من /api/getAllUserBookings */
//   const loadBookings = useCallback(async () => {
//     try {
//       const { data } = await api.get("/getAllUserBookings");
//       setBookings(data);
//     } catch (err) {
//       setError(err.response?.data?.message || "error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadBookings();
//   }, [loadBookings]);

//   /* إرسال تحديث الحالة للباك ثم تعديلها محلياً عند النجاح */
//   const sendStatus = async (id, apiPath, newStatus) => {
//     try {
//       await api.put(apiPath);
//       setBookings((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
//       );
//     } catch (err) {
//       alert(err.response?.data?.message || "cannot update status");
//     }
//   };

//   const handleAccept = (id) =>
//     sendStatus(id, `/booking/${id}/confirm`, "confirmed");
//   const handleReject = (id) =>
//     sendStatus(id, `/booking/${id}/decline`, "declined");
//   const handleFinish = (id) =>
//     sendStatus(id, `/booking/${id}/complete`, "completed");

//   /* ألوان الخلفية */
//   const pageBg = { backgroundColor: "#DED4C6" };
//   const cardBg = { backgroundColor: "#E8DED2" };

//   /* عرض المحتوى */
//   if (loading) return <div className="p-6" style={pageBg}>loading…</div>;
//   if (error) return <div className="p-6" style={pageBg}>error: {error}</div>;

//   return (
//     <div className="min-h-screen p-6 space-y-4" style={pageBg}>
//       <h1 className="text-2xl font-semibold mb-4">My bookings</h1>

//       {bookings.length === 0 && <p>No booking yet</p>}

//       {bookings.map((b) => (
//         <div
//           key={b._id}
//           className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 rounded-lg"
//           style={cardBg}
//         >
//           {/* معلومات الحجز */}
//           <div className="space-y-1 rtl:text-right">
//             <p>
//               <span className="font-medium">Service :</span> {b.service.title}
//             </p>
//             <p>
//               <span className="font-medium">Vendor :</span> {b.vendor.name}
//             </p>
//             <p>
//               <span className="font-medium">Date :</span>{" "}
//               {new Date(b.eventDate).toLocaleDateString("ar-EG", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//             {b.notes && (
//               <p>
//                 <span className="font-medium">Notes :</span> {b.notes}
//               </p>
//             )}
//           </div>

//           {/* أزرار أو وسم حالة */}
//           <div className="flex flex-wrap gap-2 rtl:space-x-reverse">
//             {b.status === "pending" && (
//               <>
//                 <button
//                   onClick={() => handleAccept(b._id)}
//                   className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleReject(b._id)}
//                   className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//                 >
//                   Reject
//                 </button>
//               </>
//             )}

//             {b.status === "confirmed" && (
//               <button
//                 onClick={() => handleFinish(b._id)}
//                 className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
//               >
//                 Finish
//               </button>
//             )}

//             {b.status !== "pending" && b.status !== "confirmed" && (
//               <span
//                 className={`px-3 py-1 text-white rounded ${
//                   statusLabel[b.status]?.bg || "bg-gray-500"
//                 }`}
//               >
//                 {statusLabel[b.status]?.text || b.status}
//               </span>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }




import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { VendorNavbar } from "../Components/VendorNavbar";

//  const Navbar = () => {
//       const [showBookings, setShowBookings] = useState(false);
    
//       return (
//         <nav className="w-full fixed top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#f0e6df] shadow-sm">
//           <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img src="/logo.jpeg" alt="Logo" className="h-20 w-40 " />
//             </div>

//             {/* Right Side */}
//             <div className="flex items-center space-x-4">
//               {/* My Bookings Button */}
//               <div>
//                 <span className="mr-2 text-4xl text-[#5e4135]">+</span>
//               </div>
//               <div className="relative">
//                 <button
//                   onClick={() => setShowBookings(!showBookings)}
//                   className="px-4 py-2 bg-[#6C4C3F] text-white rounded-lg hover:bg-[#5e4135] transition-colors"
//                 >
//                   My Bookings
//                 </button>

//                 {/* Empty Bookings Dropdown */}
//                 {showBookings && (
//                   <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50  border-gray-200">
//                     <div className="p-4 border-b border-gray-200">
//                       <h3 className="font-semibold text-[#6C4C3F]">
//                         My Bookings
//                       </h3>
//                     </div>

//                     <div className="p-4 text-center text-gray-500">
//                       <p>No bookings available</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Profile Icon */}
//               <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#6C4C3F] bg-white text-[#6C4C3F]">
//                 <IoPersonOutline size={20} />
//               </div>
//             </div>
//           </div>
//         </nav>
//       );
//     };
/* ======================= Axios Instance ======================= */
// إن لم تكن لديك ملف api.js منفصل يمكنك إنشاء الـ instance هنا مباشرةً
// عدِّل BASE_URL ليطابق عنوان خادمك (dev: http://localhost:5000)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
/* ============================================================= */

// Helper لتحويل حالة الباك‑إند إلى لون / تسمية بالفرونت
const statusLabel = {
  pending: { text: "Pending", bg: "bg-yellow-600" },
  confirmed: { text: "Accepted", bg: "bg-green-600" },
  declined: { text: "Rejected", bg: "bg-red-600" },
  completed: { text: "Finished", bg: "bg-gray-500" },
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* جلب البيانات من /api/getAllUserBookings */
  const loadBookings = useCallback(async () => {
    try {
      const { data } = await api.get("/getAllVendoreBookings");
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || "error fetching data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  /* إرسال تحديث الحالة للباك ثم تعديلها محلياً عند النجاح */
  const sendStatus = async (id, action) => {
    try {
      await api.put(`/booking/${id}/${action}`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: actionMap[action] } : b))
      );
    } catch (err) {
      alert(err.response?.data?.message || "cannot update status");
    }
  };

  // خريطة التحويل من اسم الـ action في الراوتر إلى قيمة status المطلوبة بعد التحديث
  const actionMap = {
    confirm: "confirmed",
    decline: "declined",
    complete: "completed",
  };

  /* ألوان الخلفية */
  const pageBg = { backgroundColor: "#DED4C6" };
  const cardBg = { backgroundColor: "#E8DED2" };

  /* عرض المحتوى */
  if (loading) return <div className="p-6" style={pageBg}>loading…</div>;
  if (error) return <div className="p-6" style={pageBg}>error: {error}</div>;

  return (
    <>
      <VendorNavbar />
      <div className="relative w-full h-[500px]">
        <img
          src="/10.jpeg"
          alt="Service Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 mt-15">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            My bookings
          </h1>
        </div>
      </div>
      <div className="min-h-screen p-16 space-y-4" style={pageBg}>
        {/* <h1 className="text-2xl font-semibold mb-4">My bookings</h1> */}

        {bookings.length === 0 && <p>No booking yet</p>}

        {bookings.map((b) => (
          <div
            key={b._id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 rounded-lg"
            style={cardBg}
          >
            {/* معلومات الحجز */}
            <div className="space-y-1 rtl:text-right">
              <p>
                <span className="font-medium">Service :</span>{" "}
                {b.service?.category || "غير متوفر"}
              </p>
              <p>
                <span className="font-medium">Service :</span>{" "}
                {b.service?.title || "غير متوفر"}
              </p>
              <p>
                <span className="font-medium">price :</span>{" "}
                {b.service?.price || "غير متوفر"}
              </p>
              <p>
                <span className="font-medium">Customer :</span> {b.user.name}
              </p>
              <p>
                <span className="font-medium">Customer Phone:</span>{" "}
                {b.user.phone}
              </p>
              <p>
                <span className="font-medium">Date :</span>{" "}
                {new Date(b.eventDate).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {b.notes && (
                <p>
                  <span className="font-medium">Notes :</span> {b.notes}
                </p>
              )}
            </div>

            {/* أزرار أو وسم حالة */}
            <div className="flex flex-wrap gap-2 rtl:space-x-reverse">
              {b.status === "pending" && (
                <>
                  <button
                    onClick={() => sendStatus(b._id, "confirm")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => sendStatus(b._id, "decline")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}

              {b.status === "confirmed" && (
                <button
                  onClick={() => sendStatus(b._id, "complete")}
                  className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  Finish
                </button>
              )}

              {b.status !== "pending" && b.status !== "confirmed" && (
                <span
                  className={`px-3 py-1 text-white rounded ${
                    statusLabel[b.status]?.bg || "bg-gray-500"
                  }`}
                >
                  {statusLabel[b.status]?.text || b.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}