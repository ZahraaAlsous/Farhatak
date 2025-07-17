import express from "express";
// import {
//   getUsers,
//   getUser,
//   createUser,
//   updateUser,
//   deleteUser,
//   updatePassword,
// } from "../Controller/userControler.js";
import { createVendor, getProfile, getProfileVendor, login, signup, signupVendor, signupVendorU } from "../Controller/authControler.js";
import protect from "../Middleware/TokenMiddleware.js";

const authRoutes = express.Router()

authRoutes.post("/signup", signup);
authRoutes.post("/signupv", signupVendorU);
authRoutes.post("/login", login);
authRoutes.get("/profile", protect, getProfile);
authRoutes.get("/ProfileVendor", protect, getProfileVendor);
authRoutes.post("/signupVendor", signupVendor);
authRoutes.post("/create",protect, createVendor);

export default authRoutes