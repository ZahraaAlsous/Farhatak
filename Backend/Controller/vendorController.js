import Vendor from "../Models/vendorModel.js";

export const addNewVendor = async (req, res) => {
  try {
    // Extract data from request body
    const { user, businessName, businessType, description, location } =
      req.body;

    // Validate required fields
    if (!user || !businessName) {
      return res
        .status(400)
        .json({ message: "User and businessName are required." });
    }

    // Create new vendor document
    const newVendor = new Vendor({
      user,
      businessName,
      businessType,
      description,
      location,
    });

    // Save to database
    const savedVendor = await newVendor.save();

    // Send response
    res.status(201).json(savedVendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while adding vendor." });
  }
};

//Get All The Vendors (For The Admin)
export const getAllVendors = async (req, res) => {
  try {
    // if (!req.user) {
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthorized: User not authenticated" });
    // }
    // // Check if user is admin
    // if (req.user.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ message: "Forbidden: Admin access required" });
    // }

    const vendors = await Vendor.find().populate("user");
    if (!vendors.length) {
      return res.status(404).json({ message: "No vendors found" });
    }
    return res.status(200).json(vendors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//Edit The Vendor State (For Admin)
// export const editVendorState = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: User not authenticated" });
//     }
//     // Check if user is admin
//     if (req.user.role !== "admin") {
//       return res
//         .status(403)
//         .json({ message: "Forbidden: Admin access required" });
//     }

//     const { id } = req.params;
//     const { isActive } = req.body;
//     const { approved } = req.body;

//   // Validate isActive is boolean
//     if (typeof isActive !== "boolean") {
//       return res.status(400).json({ message: "`isActive` must be a boolean" });
//     }

//     const vendors = await Vendor.findByIdAndUpdate(
//       id,
//       { isActive: isActive },
//       { approved: approved },
//       { new: true }
//     ).populate("user");

//     if (!vendors) {
//       return res.status(404).json({ message: "No vendors found" });
//     }
//     return res.status(200).json(vendors);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
// export const editVendorState = async (req, res) => {
//   try {

//     const { id } = req.params;
//     const { isActive, approved } = req.body;

//     // Validate if provided
//     if (isActive !== undefined && typeof isActive !== "boolean") {
//       return res.status(400).json({ message: "`isActive` must be a boolean" });
//     }
//     if (approved !== undefined && typeof approved !== "boolean") {
//       return res.status(400).json({ message: "`approved` must be a boolean" });
//     }

//     const updateFields = {};
//     if (isActive !== undefined) updateFields.isActive = isActive;
//     if (approved !== undefined) updateFields.approved = approved;

//     const vendor = await Vendor.findByIdAndUpdate(id, updateFields, {
//       new: true,
//     }).populate("user");

//     if (!vendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }

//     return res.status(200).json(vendor);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

export const editVendorState = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive, approved } = req.body;

    // Validate types if provided
    if (isActive !== undefined && typeof isActive !== "boolean") {
      return res.status(400).json({ message: "`isActive` must be a boolean" });
    }
    if (approved !== undefined && typeof approved !== "boolean") {
      return res.status(400).json({ message: "`approved` must be a boolean" });
    }

    // Build update object only with fields provided
    const updateFields = {};
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (approved !== undefined) updateFields.approved = approved;

    // Update vendor and return updated document
    const vendor = await Vendor.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true, // Optional: enforce schema validation
    }).populate("user");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res.status(200).json(vendor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const deleteVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendorDelete = await Vendor.findByIdAndDelete(vendorId);

    if (!vendorDelete) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    res.status(200).json({ message: "Vendor deleted successfully." });
  } catch (error) {
    res.status(500).send(`Error deleting vendor: ${error}`);
  }
};


//Count All Vendors (For The Admin)

export const countVendors = async (req, res) => {
  try {
    const vendorsCount = await Vendor.countDocuments({});

    res.status(200).json({ vendorsCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
