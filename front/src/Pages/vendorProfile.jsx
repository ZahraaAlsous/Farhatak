// import React, { useState, useEffect } from 'react';
// import { IoCameraOutline, IoCheckmarkOutline } from 'react-icons/io5';
// import { Link } from "react-router-dom";
// export default function VendorProfile({ currentUser }) {
//   /* ❶ املأ البيانات من المستخدم المسجل */
//   const [profileData, setProfileData] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     businessName: '',
//     location: '',
//   });

//   /* ❷ (اختياري) لو أردت جلبها من API بدلاً من props
//   useEffect(() => {
//     fetch('/api/me')
//       .then((res) => res.json())
//       .then((data) => setProfileData((p) => ({ ...p, ...data })));
//   }, []);
//   */

//   /* ❸ عند أوّل تحميل المقوّن – املأ حالة state من props */
//   useEffect(() => {
//     if (currentUser) {
//       setProfileData((p) => ({
//         ...p,
//         username: currentUser.username,
//         email: currentUser.email,
//         phone: currentUser.phone,
//       }));
//     }
//   }, [currentUser]);

//   /* ❹ يُسمح بتعديل حقلين فقط */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prev) => ({ ...prev, [name]: value }));
//   };

//   const [profileImage, setProfileImage] = useState(null);

//   const handleImageChange = (e) => {
//     if (e.target.files?.[0]) {
//       setProfileImage(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // أرسل فقط الحقول القابلة للتعديل
//     const payload = {
//       businessName: profileData.businessName,
//       location: profileData.location,
//     };

//     // مثال طلب PATCH
//     await fetch('/api/vendor/profile', {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     alert('Profile updated!');
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center bg-[#F6F1EB] py-12 px-4 sm:px-6 lg:px-8"
//     style={{
//         backgroundImage:
//           'url("9.jpg")',
//       }}
//     >
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-[#6C4C3F] p-6 text-center">
//             <h1 className="text-2xl font-bold text-white">Your Profile</h1>
//           </div>

//           {/* Content */}
//           <div className="p-6 md:p-8">
//             <div className="flex flex-col md:flex-row gap-8">
//               {/* Avatar */}
//               <div className="w-full md:w-1/3 flex flex-col items-center">
//                 <div className="relative mb-4">
//                   <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#6C4C3F] bg-gray-200">
//                     {profileImage ? (
//                       <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-400">
//                         <span className="text-4xl">👤</span>
//                       </div>
//                     )}
//                   </div>
//                   <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
//                     <IoCameraOutline className="text-[#a55c52]" />
//                     <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
//                   </label>
//                 </div>

//                 <h2 className="text-2xl font-bold text-[#6C4C3F]">{profileData.username}</h2>
//                 <p className="text-[#8c5e4f]">{profileData.businessName || 'Business name...'}</p>
//               </div>

//               {/* Form */}
//               <div className="w-full md:w-2/3">
//                 <form onSubmit={handleSubmit}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* ثابتة غير قابلة للتعديل */}
//                     <InputField label="Username" value={profileData.username} disabled />
//                     <InputField label="Email" value={profileData.email} disabled />
//                     <InputField label="Phone" value={profileData.phone} disabled />

//                     {/* حقول قابلة للتعديل */}
//                     <InputField
//                       label="Business Name"
//                       name="businessName"
//                       value={profileData.businessName}
//                       onChange={handleChange}
//                     />
//                     <InputField
//                       label="Location"
//                       name="location"
//                       value={profileData.location}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="mt-6 flex justify-end">
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-[#6C4C3F] text-white rounded-lg hover:bg-[#5e4135] flex items-center"
//                     >
//                       <IoCheckmarkOutline className="mr-1" />
//                       Save Changes
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* مكوّن مساعد لحقول الإدخال */
// function InputField({ label, name, value, onChange, disabled = false }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-[#6C4C3F] mb-1">{label}</label>
//       <input
//         type="text"
//         name={name}
//         value={value}
//         disabled={disabled}
//         onChange={onChange}
//         className={`w-full p-2 border border-[#DED4C6] rounded-lg ${
//           disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-[#f5efe9]'
//         }`}
//       />
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { IoCameraOutline, IoCheckmarkOutline } from "react-icons/io5";
import axios from "axios";
import { VendorNavbar } from "../Components/VendorNavbar";

export default function VendorProfile() {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    businessName: "",
    location: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  // 📦 جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/auth/ProfileVendor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;

        if (data.user && data.vendor) {
          setProfileData({
            username: data.user.name,
            email: data.user.email,
            phone: data.user.phone,
            businessName: data.vendor.businessName || "",
            location: data.vendor.location || "",
          });

          if (data.user.profileImage) {
            setProfileImage(data.user.profileImage);
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("فشل تحميل البيانات، تحقق من التوكن أو السيرفر.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      businessName: profileData.businessName,
      location: profileData.location,
    };

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/auth/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("تم التحديث بنجاح ✅");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("حدث خطأ أثناء التحديث ❌");
    }
  };

  return (
    <>
      <VendorNavbar />
      <div
        className="min-h-screen bg-cover bg-center bg-[#F6F1EB] py-12 px-4 sm:px-6 lg:px-8 mt-16"
        style={{ backgroundImage: 'url("9.jpg")' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#6C4C3F] p-6 text-center">
              <h1 className="text-2xl font-bold text-white">Your Profile</h1>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#6C4C3F] bg-gray-200">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-4xl">👤</span>
                        </div>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
                      <IoCameraOutline className="text-[#a55c52]" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                  </div>

                  <h2 className="text-2xl font-bold text-[#6C4C3F]">
                    {profileData.username}
                  </h2>
                  <p className="text-[#8c5e4f]">
                    {profileData.businessName || "Business name..."}
                  </p>
                </div>

                {/* Form */}
                <div className="w-full md:w-2/3">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* ثابتة */}
                      <InputField
                        label="Username"
                        value={profileData.username}
                        disabled
                      />
                      <InputField
                        label="Email"
                        value={profileData.email}
                        disabled
                      />
                      <InputField
                        label="Phone"
                        value={profileData.phone}
                        disabled
                      />

                      {/* قابلة للتعديل */}
                      <InputField
                        label="Business Name"
                        name="businessName"
                        value={profileData.businessName}
                        onChange={handleChange}
                      />
                      <InputField
                        label="Location"
                        name="location"
                        value={profileData.location}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#6C4C3F] text-white rounded-lg hover:bg-[#5e4135] flex items-center"
                      >
                        <IoCheckmarkOutline className="mr-1" />
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InputField({ label, name, value, onChange, disabled = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#6C4C3F] mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`w-full p-2 border border-[#DED4C6] rounded-lg ${
          disabled
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : "bg-[#f5efe9]"
        }`}
      />
    </div>
  );
}
