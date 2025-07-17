import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    // هذا هو العنصر الرئيسي الذي تمت إضافة الخلفية له
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/13.jpeg')" }}
    >
      {/* طبقة شبه شفافة لتحسين وضوح النص */}
      <div className="absolute inset-0  bg-opacity-30"></div>

      {/* باقي الكود كما هو */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Header */}
        <header className="py-6 px-6">
          <h1 className="text-4xl font-bold text-[#ffffff]"></h1>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center px-4">
          {/* Div مع تأثير ضبابية */}
          <div className="backdrop-blur-sm h-70  flex flex-col items-center justify-center  bg-opacity-70 p-8 rounded-2xl shadow-xl">
            <div className="text-center  mb-8">
              <h2 className="text-4xl font-bold mb-4 text-[#8c4a42]">
                Welcome to Farhatak
              </h2>
              <p className="text-lg text-[#8c4a42] max-w-md">
                Your one-stop solution for all your needs
              </p>
            </div>

            {/* Buttons - Horizontal Layout */}
            <div className="flex flex-row space-x-4 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 text-white bg-[#a5725d] rounded-lg hover:bg-[#8c4a42] transition-all duration-300 shadow-md hover:shadow-lg text-md font-medium w-40"
              >
                Login
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="px-6 py-3 text-[#a55c52] bg-white rounded-lg border border-[#a55c52] hover:bg-[#f9f2f1] transition-all duration-300 shadow-md hover:shadow-lg text-md font-medium w-40 flex justify-between items-center"
                >
                  <span>Register</span>
                  <span className="ml-2">▼</span>
                </button>

                {showDropdown && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={() => {
                        navigate("/register");
                        setShowDropdown(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-[#8c4a42] hover:bg-[#f5e8e6] transition-colors"
                    >
                      As User
                    </button>
                    <button
                      onClick={() => {
                        navigate("/registerv");
                        setShowDropdown(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-[#8c4a42] hover:bg-[#f5e8e6] transition-colors border-t border-gray-200"
                    >
                      As Vendor
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;