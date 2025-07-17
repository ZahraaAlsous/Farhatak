import express from "express";
import {
  addNewVendor,
  deleteVendor,
  editVendorState,
  getAllVendors,
} from "../Controller/vendorController.js";
import protect from "../Middleware/TokenMiddleware.js";
import isAdmin from "../Middleware/isAdminMiddleware.js";

const vendorsRouter = express.Router();

vendorsRouter.post("/addNewVendor", protect, isAdmin, addNewVendor);
vendorsRouter.get("/getAllVendors", protect, isAdmin, getAllVendors);
vendorsRouter.patch("/editVendorState/:id", protect, isAdmin, editVendorState);
vendorsRouter.delete("/deleteVendor/:vendorId", protect, isAdmin, deleteVendor);

export default vendorsRouter;
