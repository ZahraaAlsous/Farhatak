import express from "express"
import { getUsers, getUser, createUser, updateUser, deleteUser, updatePassword, countUsers } from "../Controller/userControler.js"
import { getProfile, login, signup } from "../Controller/authControler.js"
import protect from "../Middleware/TokenMiddleware.js"
import isAdmin from "../Middleware/isAdminMiddleware.js"

const userRoutes = express.Router()
// ****medillwaer
userRoutes.get("/countUsers",protect,isAdmin, countUsers);
userRoutes.get("/",protect,isAdmin, getUsers)
userRoutes.get("/:id", getUser)
userRoutes.post("/", createUser)
userRoutes.put("/:id", updateUser)
userRoutes.delete("/:id",protect,isAdmin, deleteUser)
userRoutes.put("/Password/:id", updatePassword);



// userRoutes.post("/user/signup", signup);
// userRoutes.post("/user/login", login);
// userRoutes.get("/user/profile",protect, getProfile);

export default userRoutes
