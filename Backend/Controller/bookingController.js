import Booking from "../Models/BookingModel.js";
import Service from "../Models/serviceModel.js";
import Vendor from "../Models/vendorModel.js";
import asyncHandler from 'express-async-handler';


// export const checkDateAvailability = async (req, res) => {
//   try {
//     const { serviceId } = req.params;
//     const { eventDate, notes } = req.body;

//     //Check If There Is eventDate

//     if (!serviceId || !eventDate) {
//       return res
//         .status(400)
//         .json({ message: "serviceId and eventDate are required" });
//     }

//     const date = new Date(eventDate);

//     // Get start of day (00:00:00)
//     const startOfDay = new Date(date.setHours(0, 0, 0, 0));
//     // Get end of day (23:59:59)
//     const endOfDay = new Date(date.setHours(23, 59, 59, 999));

//     const bookings = await Booking.find({
//       service: serviceId,
//       eventDate: {
//         $gte: startOfDay,
//         $lte: endOfDay,
//       },
//     });

//     if (bookings.length > 0) {
//       return res
//         .status(200)
//         .json({ available: false, message: "Date is already booked." });
//     } else {

//       return res
//         .status(200)
//         .json({ available: true, message: "Date is available." });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

//Find All User Booking


export const checkDateAvailability = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { eventDate, notes } = req.body;
    const userId = req.user._id;

    if (!serviceId || !eventDate || !userId) {
      return res.status(400).json({
        message: "serviceId, eventDate, and userId are required",
      });
    }

    const date = new Date(eventDate);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const bookings = await Booking.find({
      service: serviceId,
      eventDate: { $gte: startOfDay, $lte: endOfDay },
    });

    if (bookings.length > 0) {
      return res.status(200).json({
        available: false,
        message: "Date is already booked.",
      });
    }

    // ✅ جلب الخدمة للحصول على الـ vendor
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const vendorId = service.vendor;

    // ✅ إنشاء الحجز
    const newBooking = await Booking.create({
      service: serviceId,
      user: userId,
      vendor: vendorId,
      eventDate,
      notes,
    });

    return res.status(200).json({
      available: true,
      message: "Date is available and booking created.",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
// export const getAllUserBookings = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Check if user is authenticated
//     if (!req.user) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: User not authenticated" });
//     }

//     // Compare userId with req.user._id (convert ObjectId to string)
//     if (req.user._id.toString() !== userId) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: You can only access your own bookings" });
//     }
//     // Find bookings where user field matches userId
//     const bookings = await Booking.find({ user: userId })
//       .populate("service")
//       .populate("user")
//       .populate("vendor");

//     return res.status(200).json(bookings);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
export const getAllUserBookings = async (req, res) => {
  try {
    // const { userId } = req.params;
    const userId = req.user._id

    // Check if user is authenticated
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    // // Compare userId with req.user._id (convert ObjectId to string)
    // if (req.user._id.toString() !== userId) {
    //   return res
    //     .status(403)
    //     .json({ message: "Forbidden: You can only access your own bookings" });
    // }
    // Find bookings where user field matches userId
    const bookings = await Booking.find({ user: userId })
      .populate("service")
      .populate("user")
      .populate("vendor");

    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Find All The Bookings (For Admin)
export const getAllBookings = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    const bookings = await Booking.find()
      .populate("service")
      .populate("user")
      .populate("vendor");

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }
    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};




//true
export const getAllVendorBookings = async (req, res) => {
  try {
    const userId = req.user._id
    const vendor = await Vendor.findOne({ user: userId });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const bookings = await Booking.find({ vendor: vendor._id })
      .populate("user", "name email phone")
      .populate("service", "title category price location");

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching vendor bookings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const confirmBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = "confirmed";
  booking.confirmedAt = new Date();
  await booking.save();

  res.json({ message: "Booking confirmed", booking });
});



export const declineBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = "declined";
  booking.declinedAt = new Date();
  await booking.save();

  res.json({ message: "Booking declined", booking });
});



export const completeBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = "completed";
  await booking.save();

  res.json({ message: "Booking completed", booking });
});




//view all services and dates for each one
export const getServicesAndDates = async (req, res) => {
  try {
    // Find single vendor document for the user
    const vendor = await Vendor.findOne({ user: req.user._id });
    // const user=req.user._id
    console.log(vendor);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found for this user" });
    }

    // Use vendor._id to find bookings
    const bookings = await Booking.find({ vendor: vendor._id })
      .populate("service", "title category")
      .select("service");

    // Extract services only from bookings
    const services = bookings.map((booking) => booking.service);

    return res.status(200).json(services);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


// view all the bookings and the type of them (for Admin charts)

export const getBookingStatusCounts = async (req, res) => {
  try {
const result = await Booking.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,             // remove _id field
      status: "$_id",     // rename _id to status
      count: 1,           // include count field
    },
  },
]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Top Services by Booking Volume
export const getTopServicesByBooking = async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: "$service",
          bookingCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      {
        $addFields: {
          serviceDetails: { $arrayElemAt: ["$serviceDetails", 0] },
        },
      },
      {
        $project: {
          _id: 0,
          serviceId: "$_id",
          title: "$serviceDetails.title",
          category: "$serviceDetails.category",  // add category here
          bookingCount: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error("Error fetching top services:", error);
    res.status(500).json({ message: "Server error" });
  }
};
