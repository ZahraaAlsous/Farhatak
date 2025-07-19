import express from "express";
import protect from "../Middleware/TokenMiddleware.js";
import {
  checkDateAvailability,
  completeBooking,
  confirmBooking,
  declineBooking,
  getAllBookings,
  getAllUserBookings,
  getAllVendorBookings,
  getBookingStatusCounts,
  getServicesAndDates,
  getTopServicesByBooking,
} from "../Controller/bookingController.js";
import isAdmin from "../Middleware/isAdminMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post(
  "/checkDateAvailability/:serviceId",
  protect,
  checkDateAvailability
);
bookingRouter.get("/getAllUserBookings", protect, getAllUserBookings);
bookingRouter.get("/getAllBookings", protect, getAllBookings);
bookingRouter.get("/getAllVendoreBookings", protect, getAllVendorBookings);
bookingRouter.put("/booking/:id/confirm", protect, confirmBooking);
bookingRouter.put("/booking/:id/decline", protect, declineBooking);
bookingRouter.put("/booking/:id/complete", protect, completeBooking);
bookingRouter.get("/getServicesAndDates", protect,isAdmin, getServicesAndDates);
bookingRouter.get("/getBookingStatusCounts",protect,isAdmin, getBookingStatusCounts);
bookingRouter.get(
  "/getTopServicesByBooking",
  getTopServicesByBooking
);

export default bookingRouter;
