import Service from "../Models/serviceModel.js";
import Review from "../Models/reviewModel.js";

export const getReviewById = async (req, res) => {
  try {
    // Fetch the Review by its Id and populate the related service
    const { serviceId } = req.params;
    console.log(serviceId)
    const review = await Review.findById(serviceId).populate("service");

    // If review doesn't exist
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Return the review
    return res.status(200).json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addReview = async (req, res) => {
  try {
    // Fetch the Review by its Id
    const review = await Review.findById(req.params.id).populate("Service");

    // If service doesn't exist
    if (!Service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Return the review
    return res.status(200).json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
