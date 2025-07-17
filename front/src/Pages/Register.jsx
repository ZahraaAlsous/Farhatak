import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  // const [form, setForm] = useState({ username: '', phone: '', password: '' });
  const [form, setForm] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Add registration logic here
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          userName: form.username,
          phone: form.phone,
          password: form.password,
          confirmPassword: form.confirmPassword,
          avatar: "",
        }
      );
      localStorage.setItem("token", response.data.token);

      // console.log("Signup successful:", response.data);
      navigate("/ChatPage");
      // Redirect or show success message
    } catch (error) {
    //   console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-[#167785] to-[#233746]">
      <div className="w-full max-w-md rounded-3xl shadow-2xl p-8 bg-[#183642] text-[#F3F6F9]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 text-[#1797A6]">
            Join the Community
          </h2>
          <p>You are welcome here. Let's connect and support each other.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-[#1797A6] bg-transparent text-[#F3F6F9] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1797A6]"
              placeholder="Choose a unique username"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-[#1797A6] bg-transparent text-[#F3F6F9] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1797A6]"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-3 pr-20 rounded-xl border border-[#1797A6] bg-transparent text-[#F3F6F9] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1797A6]"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#1797A6] underline focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={0}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-[#1797A6] bg-transparent text-[#F3F6F9] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1797A6]"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1797A6] hover:opacity-90 text-[#F3F6F9] p-3 rounded-xl font-semibold transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#1797A6] hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
          <p className="mt-2 text-sm">
            <Link to="/" className="text-[#F3F6F9] hover:underline font-medium">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
