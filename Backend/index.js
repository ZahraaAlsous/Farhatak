import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoute.js";
import cors from "cors"
import authRoutes from "./Routes/authRoutes.js";
import serviceRouter from "./Routes/serviceRoutes.js";
import reviewRouter from "./Routes/reviewRoutes.js";
import bookingRouter from "./Routes/bookingRoutes.js";
import packageRoute from "./Routes/packageRoute.js";
import vendorsRouter from "./Routes/vendorsRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 3001;
const data = process.env.data;

mongoose
  .connect(data)
  .then(() => {
    console.log("Data Connected successfully");
    app.listen(port, () => {
      console.log(`Server Work On Port ${port}`);
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/uploads", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", serviceRouter);
app.use("/api", reviewRouter);
app.use("/api", bookingRouter);
app.use("/api", vendorsRouter);
app.use("/api", packageRoute);
