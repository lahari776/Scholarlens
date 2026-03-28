const User = require("../models/userModel");
const Scholarship = require("../models/scholarshipModel");
const { generateRecommendations } = require("../services/recommendationService");

async function getRecommendations(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const scholarships = await Scholarship.find();
    const recommendations = generateRecommendations(user, scholarships);

    res.json({ success: true, data: recommendations });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRecommendations
};
