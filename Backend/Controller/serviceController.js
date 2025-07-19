import Service from "../Models/serviceModel.js";
import Vendor from "../Models/vendorModel.js";
import Review from "../Models/reviewModel.js";
import asyncHandler from "express-async-handler";
import { generateTags } from "../tagGenerator.js";



//For the Booking We Need To Find The Service By ID
export const getServiceById = async (req, res) => {
  try {
    // Fetch the service by its ID
    const { id } = req.body;
    const service = await Service.findById(id).populate("vendor");

    // If service doesn't exist
    if (!Service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Check if the vendor is approved and active
    const vendor = service.vendor;

    if (!vendor.approved || !vendor.isActive) {
      return res.status(403).json({
        message:
          "This service is not available because the vendor is not approved or active.",
      });
    }

    // Return the service if the vendor is approved and active
    return res.status(200).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getServiceBycategory = async (req, res) => {
  try {
    // Fetch the service by its category
    const service = await Service.find({
      category: req.params.category,
    }).populate("vendor");

    // If service doesn't exist
    if (!service || service.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    // Filter out any service whose vendor is not approved or inactive
    const filteredServices = service.filter(
      (service) =>
        service.vendor && service.vendor.approved && service.vendor.isActive
    );

    if (filteredServices.length === 0) {
      return res.status(403).json({
        message:
          "No available services because vendors are not approved or active.",
      });
    }

    // Return the service if the vendor is approved and active
    return res.status(200).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getServiceDetailsById = async (req, res) => {
  try {
    // Fetch the service by its Id
    const { id } = req.params;
    const service = await Service.findById(id).populate("vendor");

    // If service doesn't exist
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Filter out any service whose vendor is not approved or inactive
    if (
      !service.vendor ||
      !service.vendor.approved ||
      !service.vendor.isActive
    ) {
      return res.status(403).json({
        message:
          "This service is not available because the vendor is not approved or active.",
      });
    }

    // Return the service if the vendor is approved and active
    return res.status(200).json(service);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// export const getReviewsByServiceId = async (req, res) => {
//   try {
//     const serviceId = req.params.serviceId;

//     // Find reviews with that service id and populate user info if needed
//     const reviews = await Review.find({ service: serviceId }).populate("user");

//     if (!reviews || reviews.length === 0) {
//       return res.status(404).json({ message: "No reviews found for this service" });
//     }

//     return res.status(200).json(reviews);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

export const getServiceByTitle = async (req, res) => {
  try {
    // Fetch the service by its Id
    const { title, category } = req.params;

    // Check for missing parameters
    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "Title and category are required" });
    }

    const service = await Service.find({
      title,
      category,
    }).populate("vendor");

    if (!service || service.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    // Filter out any service whose vendor is not approved or inactive
    const filteredServices = service.filter(
      (service) =>
        service.vendor && service.vendor.approved && service.vendor.isActive
    );

    if (filteredServices.length === 0) {
      return res.status(403).json({
        message:
          "No available services because vendors are not approved or active.",
      });
    }

    // Return the service if the vendor is approved and active
    return res.status(200).json(filteredServices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ==========================

export const getVendorServices = async (req, res) => {
  try {
    const userId = req.user._id;
      // return res.status(200).json(userId);
    // ❗️جلب حساب الـ Vendor بناءً على المستخدم الحالي
    const vendor = await Vendor.findOne({ user: userId });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // ❗️جلب كل الخدمات لهذا الـ Vendor فقط
    const services = await Service.find({
      vendor: vendor._id,
    }).populate("vendor");

    // if (!services || services.length === 0) {
    //   return res.status(404).json({
    //     message: "No services found for this vendor",
    //   });
    // }

    return res.status(200).json(services);
    // return res.status(200).json(vendor);

  } catch (error) {
    console.error("Error fetching vendor services:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



// export const createService = async (req, res) => {
//   try {
//     const vendor = await Vendor.findOne({ user: req.user._id, approved: true });

//     if (!vendor) {
//       return res.status(403).json({
//         message: "Not an approved vendor.",
//         success: false,
//         field: "Invalid vendor.",
//       });
//     }

//     // قاعدة url السيرفر، عدّلها حسب بيئة تشغيلك
//     const baseUrl = `${req.protocol}://${req.get("host")}`;

//     // صور وفيديوهات مع روابط كاملة
//     const images = req.files?.image
//       ? req.files.image.map((file) => `${baseUrl}/uploads/${file.filename}`)
//       : [];

//     const videos = req.files?.video
//       ? req.files.video.map((file) => `${baseUrl}/uploads/${file.filename}`)
//       : [];

//     const service = await Service.create({
//       vendor: vendor._id,
//       title: req.body.title,
//       category: req.body.category,
//       description: req.body.description,
//       price: req.body.price,
//       images,
//       videos,
//       availableDates: JSON.parse(req.body.availableDates || "[]"),
//       location: req.body.location,
//     });

//     return res.status(201).json({
//       message: "Service created.",
//       success: true,
//       field: "creating service",
//       data: service,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Server error.",
//       success: false,
//       field: "Server",
//     });
//   }
// };


export const createService = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user._id, approved: true });

    if (!vendor) {
      return res.status(403).json({
        message: "Not an approved vendor.",
        success: false,
        field: "Invalid vendor",
      });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const images = req.files?.image
      ? req.files.image.map((file) => `${baseUrl}/uploads/${file.filename}`)
      : [];

    const videos = req.files?.video
      ? req.files.video.map((file) => `${baseUrl}/uploads/${file.filename}`)
      : [];

    let tags = req.body.tags;
    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch {
        tags = [];
      }
    }

    if (!tags || tags.length === 0) {
      const firstImage = images?.[0];
      if (firstImage) {
        try {
          tags = await generateTags(firstImage);
        } catch (error) {
          console.error("Failed to generate tags:", error.message);
          tags = [];
        }
      } else {
        tags = [];
      }
    }

    const service = await Service.create({
      vendor: vendor._id,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      images,
      videos,
      availableDates: JSON.parse(req.body.availableDates || "[]"),
      location: req.body.location,
      tags,
    });

    return res.status(201).json({
      message: "Service created.",
      success: true,
      field: "creating service",
      data: service,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
      field: "Server",
    });
  }
};
export const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Find vendor associated with logged-in user and ensure approved
    const vendor = await Vendor.findOne({ user: req.user._id, approved: true });
    if (!vendor) {
      return res.status(403).json({
        message: "Not an approved vendor.",
        success: false,
        field: "Invalid vendor.",
      });
    }

    // Find service and check if it belongs to this vendor
    const service = await Service.findOne({ _id: serviceId, vendor: vendor._id });
    if (!service) {
      return res.status(404).json({
        message: "Service not found or you don't have permission to edit.",
        success: false,
        field: "Service",
      });
    }

    // Update the service fields from req.body
    const updates = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      images: req.body.images,
      videos: req.body.videos,
      availableDates: req.body.availableDates,
      location: req.body.location,
    };

    // Remove undefined keys (only update provided fields)
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    // Update and return the updated service
    const updatedService = await Service.findByIdAndUpdate(serviceId, updates, { new: true });

    return res.status(200).json({
      message: "Service updated successfully.",
      success: true,
      field: "updating service",
      data: updatedService,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
      field: "Server",
    });
  }
};


export const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Find vendor associated with logged-in user and ensure approved
    const vendor = await Vendor.findOne({ user: req.user._id, approved: true });
    if (!vendor) {
      return res.status(403).json({
        message: "Not an approved vendor.",
        success: false,
        field: "Invalid vendor.",
      });
    }

    // Find service and check if it belongs to this vendor
    const service = await Service.findOne({ _id: serviceId, vendor: vendor._id });
    if (!service) {
      return res.status(404).json({
        message: "Service not found or you don't have permission to delete.",
        success: false,
        field: "Service",
      });
    }

    // Delete the service
    await Service.findByIdAndDelete(serviceId);

    return res.status(200).json({
      message: "Service deleted successfully.",
      success: true,
      field: "deleting service",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
      field: "Server",
    });
  }
};



function formatDate(date) {
  if (!(date instanceof Date)) date = new Date(date);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`;
}

export const getAllServices = async (req, res) => {
  try {
    const service = await Service.find().lean();

    // Map over all services and convert availableDates to formatted strings
    const servicesFormatted = service.map((svc) => ({
      ...svc,
      availableDates: (svc.availableDates || []).map(formatDate),
    }));

    res.status(200).send(servicesFormatted);
  } catch (error) {
    res.status(500).send(`Data error... ${error}`);
  }
};

export const deleteServiceForAdmin = async (req, res) => {
  try {
    const { serviceId } = req.params;
    // Your existing logic to check vendor, service, then:
    await Service.findByIdAndDelete(serviceId);
    res.status(200).json({ message: "Service deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};


export const searchServices = async (req, res) => {
  try {
    const { q } = req.query;

    const services = await Service.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ],
    }).populate("vendor");

    // const filteredServices = services.filter(
    //   (service) => service.vendor?.activated && service.vendor?.approved
    // );

    res.status(200).json({
      message: "Search results.",
      success: true,
      // services: filteredServices,
      services: services,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error.", success: false, field: "Server" });
  }
};


//Count All Services (For The Admin)

export const countServices = async (req, res) => {
  try {
    const serviceCount = await Service.countDocuments({});

    res.status(200).json({ serviceCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getServiceTitleCounts = async (req, res) => {
  try {
    const counts = await Service.aggregate([
      {
        $group: {
          _id: "$title",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          title: "$_id",
          count: 1,
        },
      },
    ]);

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving service counts', error });
  }
};


export const getServicesOverTime = async (req, res) => {
  try {
    const data = await Service.aggregate([
      {
        $match: {
          createdAt: { $type: "date" } // ensure createdAt is a valid Date
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: 1,
                }
              }
            }
          },
          count: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch data." });
  }
};