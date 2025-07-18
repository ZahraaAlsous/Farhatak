// import React, { useState } from "react";

// /**
//  * RegisterForm – controlled version
//  *
//  * Adds local component state so each <input> really captures what the user types.
//  * On submit we simply log the data (replace with API call / state‑management as you like).
//  */

// const RegisterForm = () => {
//   // ---------------------------------------
//   // Local component state
//   // ---------------------------------------
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Handle change for all inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit handler
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Basic front‑end validation example
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     console.table(formData); // Replace with API POST call
//     alert("Registration successful (check console for payload)");
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center px-4"
//       style={{ backgroundImage: "url('/assets/1.jpg')" }}
//     >
//       {/* CARD */}
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-12 backdrop-blur-sm/70"
//       >
//         {/* Heading */}
//         <h1 className="text-center text-3xl font-semibold text-[#a55c52] mb-10 tracking-wide">
//           Register
//         </h1>

//         {/* USER NAME */}
//         <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="name">
//           User name :
//         </label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           value={formData.name}
//           onChange={handleChange}
//           className="mb-6 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
          
//           required
//         />

//         {/* PHONE NUMBER */}
//         <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="phone">
//           Phone number:
//         </label>
//         <input
//           id="phone"
//           name="phone"
//           type="tel"
//           value={formData.phone}
//           onChange={handleChange}
//           className="mb-6 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
          
//           required
//         />

//         {/* EMAIL */}
//         <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="email">
//           Email:
//         </label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="mb-6 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
         
//           required
//         />

//         {/* PASSWORD */}
//         <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="password">
//           Password:
//         </label>
//         <input
//           id="password"
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           className="mb-6 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
          
//           required
//         />

//         {/* CONFIRM PASSWORD */}
//         <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="confirmPassword">
//           Confirm password:
//         </label>
//         <input
//           id="confirmPassword"
//           name="confirmPassword"
//           type="password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           className="mb-8 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"

//           required
//         />

//         {/* SUBMIT BUTTON */}
//         <button
//           type="submit"
//           className="w-40 h-14 bg-[#a5725d] text-white text-xl rounded-2xl mx-auto block transition hover:bg-[#8e5e4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a5725d]/70"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;





// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const RegisterForm = () => {
//   const navigate = useNavigate(); // ⬅️ استخدمنا التنقل

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (formData.password !== formData.confirmPassword) {
//   //     alert("Passwords do not match!");
//   //     return;
//   //   }
//   //   console.table(formData);
//   //   alert("Registration successful (check console for payload)");
//   // };
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
//       };

//       const response = await axios.post(
//         "http://localhost:3000/api/auth/signup",
//         payload
//       );
//       localStorage.setItem("token", response.data.token);

//       console.log("Server response:", response.data);
//       alert("Registration successful!");

//       // Reset form
//       setFormData({
//         name: "",
//         phone: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });
//       navigate("/home");
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
//       {/* Overlay لتخفيف وضوح الخلفية */}
//       <div className="absolute inset-0 bg-black/30"></div>

//       {/* CARD */}
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white/90 rounded-2xl shadow-lg p-4 md:p-6 relative z-10"
//       >
//         {/* Heading */}
//         <h1 className="text-center text-3xl font-semibold text-[#a55c52] mb-5 tracking-wide">
//           Register
//         </h1>

//         {/* USER NAME */}
//         <label
//           className="block text-lg font-medium text-gray-700"
//           htmlFor="name"
//         >
//           User name :
//         </label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           value={formData.name}
//           onChange={handleChange}
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
//           required
//         />

//         {/* PHONE NUMBER */}
//         <label
//           className="block text-lg font-medium text-gray-700"
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
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
//           required
//         />

//         {/* EMAIL */}
//         <label
//           className="block text-lg font-medium text-gray-700 "
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
//           className=" w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
//           required
//         />

//         {/* PASSWORD */}
//         <label
//           className="block text-lg font-medium text-gray-700 "
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
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
//           required
//         />

//         {/* CONFIRM PASSWORD */}
//         <label
//           className="block text-lg font-medium text-gray-700 "
//           htmlFor="confirmPassword"
//         >
//           Confirm password:
//         </label>
//         <input
//           id="confirmPassword"
//           name="confirmPassword"
//           type="password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           className="mb-8 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
//           required
//         />

//         {/* باقي حقول الإدخال بنفس الطريقة */}

//         {/* SUBMIT BUTTON */}
//         <button
//           type="submit"
//           className="w-40 h-14 bg-[#a5725d] text-white text-xl rounded-2xl mx-auto block transition hover:bg-[#8e5e4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a5725d]/70"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;


// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const RegisterForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
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
//       };

//       const response = await axios.post(
//         "http://localhost:3000/api/auth/signup",
//         payload
//       );
//       localStorage.setItem("token", response.data.token);

//       console.log("Server response:", response.data);
//       alert("Registration successful!");

//       setFormData({
//         name: "",
//         phone: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });

//       navigate("/home");
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
//         className="w-full max-w-md bg-white/90 rounded-2xl shadow-lg p-4 md:p-6 relative z-10"
//       >
//         <h1 className="text-center text-3xl font-semibold text-[#a55c52] mb-5 tracking-wide">
//           Register
//         </h1>

//         <input
//           id="name"
//           name="name"
//           type="text"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="User name"
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
//           required
//         />

//         <input
//           id="phone"
//           name="phone"
//           type="tel"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="Phone number"
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
//           required
//         />

//         <input
//           id="email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
//           required
//         />

//         <input
//           id="password"
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
//           required
//         />

//         <input
//           id="confirmPassword"
//           name="confirmPassword"
//           type="password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm password"
//           className="mb-8 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
//           required
//         />

//         <button
//           type="submit"
//           className="w-40 h-14 bg-[#a5725d] text-white text-xl rounded-2xl mx-auto block transition hover:bg-[#8e5e4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a5725d]/70"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      };

      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
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
      });

      navigate("/home");
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
      {/* ✅ صورة الخلفية */}
      <img
        src="9.jpeg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ✅ تعتيم الخلفية (اختياري) */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* ✅ الفورم */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 rounded-2xl shadow-lg p-4 md:p-6 relative z-10"
      >
        <h1 className="text-center text-3xl font-semibold text-[#a55c52] mb-5 tracking-wide">
          Register
        </h1>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="User name"
          className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
          required
        />

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone number"
          className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
          required
        />

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-3 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
          required
        />

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          className="mb-8 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
          required
        />

        <button
          type="submit"
          className="w-40 h-14 bg-[#a5725d] text-white text-xl rounded-2xl mx-auto block transition hover:bg-[#8e5e4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a5725d]/70"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
