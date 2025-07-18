import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const VendorNavbar = () => {
  const navigate = useNavigate(); // ⬅️ استخدمنا التنقل

  return (
    <nav className="w-full fixed top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#f0e6df] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* <button onClick={() => navigate("/VendorProfile")}> */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-20 w-40 " />
        </div>
        {/* </button> */}
        <div className="flex items-center space-x-4">
          <div>
            <button
              className="px-4 py-2 bg-[#6C4C3F] text-white rounded-lg hover:bg-[#5e4135] transition-colors"
              onClick={() => navigate("/AddListingPage")}
            >
              Add Services +
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => navigate("/BookingsPage")}
              className="px-4 py-2 bg-[#6C4C3F] text-white rounded-lg hover:bg-[#5e4135] transition-colors"
            >
              My Bookings
            </button>
            <button
              onClick={() => navigate("/Vservice")}
              className="px-4 py-2 bg-[#6C4C3F] text-white rounded-lg hover:bg-[#5e4135] transition-colors ml-1"
            >
              My Services
            </button>

            {/* {showBookings && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-[#6C4C3F]">My Bookings</h3>
                </div>
                <div className="p-4 text-center text-gray-500">
                  <p>No bookings available</p>
                </div>
              </div>
            )} */}
          </div>

          <div
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#6C4C3F] bg-white text-[#6C4C3F]"
            onClick={() => navigate("/VendorProfile")}
          >
            <IoPersonOutline size={20} />
          </div>

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
      </div>
    </nav>
  );
};
