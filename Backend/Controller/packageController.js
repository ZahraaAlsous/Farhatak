// route: GET /api/packages?budget=5000&categories=Hall,Cars

import Service from "../Models/serviceModel.js";

// import Service from "../models/Service.js";

export const generatePackages = async (req, res) => {
  const maxBudget = parseFloat(req.query.budget);
  let categories = req.query.categories
    ? req.query.categories.split(",")
    : ["Hall", "Cars", "Decoration", "Photography"];

  try {
    // Step 1: لكل تصنيف، جيب الخدمات الموجودة
    const servicesByCategory = {};

    for (const category of categories) {
      const services = await Service.find({ category }).lean();
      if (services.length === 0) {
        return res
          .status(400)
          .json({ message: `No services found in category: ${category}` });
      }
      servicesByCategory[category] = services;
    }

    // Step 2: أنشئ كل التركيبات الممكنة (مهمة صعبة لو كثير بيانات)
    const allCombos = generateCombinations(Object.values(servicesByCategory));

    // Step 3: فلتر التركيبات اللي مجموع سعرها أقل أو يساوي الميزانية
    const validPackages = allCombos
      .map((combo) => ({
        services: combo,
        totalPrice: combo.reduce((sum, service) => sum + service.price, 0),
      }))
      .filter((pkg) => pkg.totalPrice <= maxBudget);

    res.json(validPackages);
  } catch (err) {
    console.error("Error generating packages:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// دالة تولد جميع التركيبات الممكنة (recursive)
function generateCombinations(arrays, prefix = []) {
  if (arrays.length === 0) return [prefix];
  const [first, ...rest] = arrays;
  const combos = [];

  for (const item of first) {
    combos.push(...generateCombinations(rest, [...prefix, item]));
  }

  return combos;
}
