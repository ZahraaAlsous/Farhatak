import express from "express";
import { getReviewById } from "../Controller/reviewController.js";
import multer from "multer";
import path from "path";

// مسار التخزين
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


const reviewRouter = express.Router();

reviewRouter.get("/review/:seviceId", getReviewById);




export default reviewRouter;