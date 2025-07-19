import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
import Vendor from "../Models/vendorModel.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      role,
      profileImage,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const newUser = new User(req.body);
    await newUser.save()
    const token = generateToken(newUser._id);
    res.status(201).json({ message: newUser, token });
  } catch (error) {
    res.status(500).json({ message: `Signup error: ${error.message}` });
  }
};
export const signupVendorU = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone, profileImage } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const newUser = new User({
      name,
      email,
      password,
      phone,
      profileImage,
      role: "vendor", 
    });

    await newUser.save();
    const token = generateToken(newUser._id);
    res.status(201).json({ message: newUser, token });
  } catch (error) {
    res.status(500).json({ message: `Signup error: ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);
    res.status(200).json({ message: "Login successful", token , user});
  } catch (err) {
    res.status(500).json({ message: `Login error: ${err.message}` });
  }
};



// export const getProfile = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ user });
//   } catch (err) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
  


export const signupVendor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      profileImage,
      businessName,
      businessType,
      description,
      location,
    } = req.body;

    // تحقق من تطابق كلمات السر
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // تحقق من أن المستخدم غير مسجل سابقًا
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // إنشاء المستخدم بدور "vendor"
    const newUser = new User({
      name,
      email,
      password,
      phone,
      profileImage,
      role: "vendor", // ← تعيين الدور تلقائيًا
    });

    await newUser.save();

    // إنشاء حساب Vendor وربطه بالمستخدم
    const newVendor = new Vendor({
      user: newUser._id,
      businessName,
      businessType,
      description,
      location,
      approved: false, // يمكن تغييره لاحقًا من قبل الأدمن
      isActive: false, // ← يمكن تفعيله لاحقًا
    });

    await newVendor.save();

    // توليد التوكن
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "Vendor registered successfully",
      user: newUser,
      vendor: newVendor,
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: `Signup error: ${error.message}` });
  }
};



export const getProfileVendor = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user;

    // إذا كان الدور "vendor" نأتي بمعلوماته من جدول Vendor
    if (user.role === "vendor") {
      const vendorProfile = await Vendor.findOne({ user: user._id });

      if (!vendorProfile) {
        return res.status(404).json({ message: "Vendor profile not found" });
      }

      return res.status(200).json({
        user,
        vendor: vendorProfile,
      });
    }

    // إذا لم يكن vendor نُرجع فقط معلومات المستخدم
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const createVendor = async (req, res) => {
  try {
    const {
      businessName,
      businessType,
      description,
      location,
    } = req.body;

    // تحقق مبدئي
    if ( !businessName) {
      return res
        .status(400)
        .json({ message: "businessName are required" });
    }

    // إنشاء Vendor جديد
    const newVendor = new Vendor({
      user : req.user._id,
      businessName,
      businessType,
      description,
      location,
      // `approved` و `isActive` ستأخذ القيمة الافتراضية false
    });

    await newVendor.save();

    res
      .status(201)
      .json({ message: "Vendor created successfully", vendor: newVendor });
  } catch (error) {
    console.error("Error creating vendor:", error);
    res
      .status(500)
      .json({ message: "Failed to create vendor", error: error.message });
  }
};

