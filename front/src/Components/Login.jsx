import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // ⬅️ استخدمنا التنقل

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        const data = response.data;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful!");
        // navigate("/Home");
        if (data.user.role === "vendor") {
          navigate("/Vservice");
        } else if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/Home");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        alert(
          "Login failed: " +
            (error.response.data.message || "Invalid credentials")
        );
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('9.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 rounded-2xl shadow-lg p-8 md:p-12 relative z-10"
      >
        <h1 className="text-center text-3xl font-semibold text-[#a55c52] mb-10 tracking-wide">
          Login
        </h1>
        <label
          className="block text-lg font-medium text-gray-700 mb-2"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="mb-6 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
          required
        />
        <label
          className="block text-lg font-medium text-gray-700 mb-2"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="mb-6 w-full h-11 rounded-lg bg-[#f5efe9] px-4 focus:outline-none focus:ring-2 focus:ring-[#a55c52]/50 placeholder-gray-400"
          required
        />
        <button
          type="submit"
          className="w-40 h-14 bg-[#a5725d] text-white text-xl rounded-2xl mx-auto block transition hover:bg-[#8e5e4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a5725d]/70"
        >
          Login
        </button>
        <div className=" text-[#a5725d]  flex items-center justify-center">
          <span>Don't have an account? </span>
          <Link to="/register">
            <strong> Signup</strong>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
