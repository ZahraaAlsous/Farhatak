import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  eventDate: { type: Date, required: true },
  notes: String,
  status: {
    type: String,
    enum: ["pending", "confirmed", "declined", "completed"],
    default: "pending",
  },
  confirmedAt: Date,
  declinedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);

