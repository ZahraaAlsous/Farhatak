import express from "express";
import {
  countServices,
  createService,
  deleteService,
  deleteServiceForAdmin,
  getAllServices,
  getServiceBycategory,
  getServiceById,
  getServiceByTitle,
  getServiceDetailsById,
  getServicesOverTime,
  getServiceTitleCounts,
  getVendorServices,
  searchServices,
  updateService,
} from "../Controller/serviceController.js";
import protect from "../Middleware/TokenMiddleware.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import isAdmin from "../Middleware/isAdminMiddleware.js";

const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


// إعداد التخزين (تخزين الملفات محليًا كمثال)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // تأكد من وجود هذا المجلد
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// في الراوتر

const serviceRouter = express.Router();

serviceRouter.get("/getServicesOverTime", getServicesOverTime);
serviceRouter.get("/service", getServiceById);
serviceRouter.get("/service/category/:category", getServiceBycategory);
serviceRouter.get("/vendor/services", protect, getVendorServices);
serviceRouter.get("/service/id/:id", getServiceDetailsById);
serviceRouter.get("/service/:title/:category", getServiceByTitle);
// serviceRouter.post("/createService", protect, createService);
serviceRouter.post(
  "/createService",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createService
);
serviceRouter.get('/title-counts',protect,isAdmin, getServiceTitleCounts);
serviceRouter.patch("/updateService/:serviceId", protect, updateService);
serviceRouter.delete("/deleteService/:serviceId", protect, deleteService);
serviceRouter.get("/getAllServices",protect, getAllServices);
serviceRouter.delete(
  "/deleteServiceForAdmin/:serviceId",protect,
  isAdmin,
  deleteServiceForAdmin
);
serviceRouter.get("/search", searchServices);
serviceRouter.get("/countServices",protect,isAdmin, countServices);

// serviceRouter.get("/service/:serviceId/reviews", getReviewsByServiceId);

export default serviceRouter;
