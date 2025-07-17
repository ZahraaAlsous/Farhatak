// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const RegisterFormv = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     businessName: "",
//     location: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       const payload = {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         confirmPassword: formData.confirmPassword,
//         phone: formData.phone,
//         profileImage: "",
//         businessName: formData.businessName,
//         location: formData.location,
//       };

//       const response = await axios.post(
//         "http://localhost:3000/api/auth/signupVendor",
//         payload
//       );
//             localStorage.setItem("token", response.data.token);


//       console.log("Server response:", response.data);
//       alert("Registration successful!");
//       setFormData({
//         name: "",
//         phone: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         businessName: "",
//         location: "",
//       });

//       navigate("/Vservice");
//     } catch (error) {
//       console.error(
//         "Registration failed:",
//         error.response?.data || error.message
//       );
//       alert("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4"
//       style={{
//         backgroundImage: "url('9.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/30"></div>

//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white/90 rounded-2xl shadow-lg p-8 md:p-12 relative z-10"
//       >
//         <h1 className="text-center text-3xl font-semibold text-[#a55c52] mb-10 tracking-wide">
//           Register as Vendor
//         </h1>

//         {/* Name */}
//         <label
//           className="block text-lg font-medium text-gray-700 mb-1"
//           htmlFor="name"
//         >
//           Name:
//         </label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           value={formData.name}
//           onChange={handleChange}
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
//           required
//         />

//         {/* Phone */}
//         <label
//           className="block text-lg font-medium text-gray-700 mb-1"
//           htmlFor="phone"
//         >
//           Phone number:
//         </label>
//         <input
//           id="phone"
//           name="phone"
//           type="tel"
//           value={formData.phone}
//           onChange={handleChange}
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
//           required
//         />

//         {/* Email */}
//         <label
//           className="block text-lg font-medium text-gray-700 mb-1"
//           htmlFor="email"
//         >
//           Email:
//         </label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
//           required
//         />

//         {/* Password */}
//         <label
//           className="block text-lg font-medium text-gray-700 mb-1"
//           htmlFor="password"
//         >
//           Password:
//         </label>
//         <input
//           id="password"
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
//           required
//         />

//         {/* Confirm Password */}
//         <label
//           className="block text-lg font-medium text-gray-700 mb-1"
//           htmlFor="confirmPassword"
//         >
//           Confirm Password:
//         </label>
//         <input
//           id="confirmPassword"
//           name="confirmPassword"
//           type="password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
//           required
//         />

//         {/* Business Name */}
//         <label
//           className="block text-lg font-medium text-gray-700 mb-1"
//           htmlFor="businessName"
//         >
//           Business Name:
//         </label>
//         <input
//           id="businessName"
//           name="businessName"
//           type="text"
//           value={formData.businessName}
//           onChange={handleChange}
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
//           required
//         />

//         {/* Location */}
//         <label
//           className="block text-lg font-medium text-gray-700 mb-1"
//           htmlFor="location"
//         >
//           Location:
//         </label>
//         <input
//           id="location"
//           name="location"
//           type="text"
//           value={formData.location}
//           onChange={handleChange}
//           className=" w-full h-11 rounded-lg bg-[#f5efe9] px-4"
//           required
//         />

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-40 h-14 bg-[#a5725d] text-white text-xl rounded-2xl mx-auto block hover:bg-[#8e5e4d]"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterFormv;


import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterFormv = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phone: formData.phone,
        profileImage: "",
        businessName: formData.businessName,
        location: formData.location,
      };

      const response = await axios.post(
        "http://localhost:3000/api/auth/signupVendor",
        payload
      );

      localStorage.setItem("token", response.data.token);

      console.log("Server response:", response.data);
      alert("Registration successful!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        businessName: "",
        location: "",
      });

      navigate("/Vservice");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <img
        src="9.jpeg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ✅ تعتيم الخلفية (اختياري) */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 rounded-2xl shadow-lg p-4 md:p-6 relative z-10"
      >
        <h1 className="text-center text-3xl font-semibold text-[#a55c52] mb-5 tracking-wide">
          Register as Vendor
        </h1>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
          required
        />

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone number"
          className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
          required
        />

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
          required
        />

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
          required
        />

        <input
          id="businessName"
          name="businessName"
          type="text"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Business Name"
          className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4"
          required
        />

        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full h-11 rounded-lg bg-[#f5efe9] px-4"
          required
        />

        <button
          type="submit"
          className="w-40 h-14 bg-[#a5725d] text-white text-xl rounded-2xl mx-auto block hover:bg-[#8e5e4d] mt-1"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterFormv;

