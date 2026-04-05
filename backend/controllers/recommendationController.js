const User = require("../models/userModel");
const Scholarship = require("../models/scholarshipModel");
const Application = require("../models/applicationModel");
const Interaction = require("../models/interactionModel");
const { generateRecommendations } = require("../services/recommendationService");
const { requestMlRecommendations } = require("../services/mlRecommendationClient");

async function getRecommendations(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const [scholarships, applications, interactions, users] = await Promise.all([
      Scholarship.find(),
      Application.find(),
      Interaction.find(),
      User.find()
    ]);

    let recommendations;

    try {
      recommendations = await requestMlRecommendations({
        user: user.toObject(),
        users: users.map((item) => item.toObject()),
        scholarships: scholarships.map((item) => item.toObject()),
        applications: applications.map((item) => {
          const source = item.toObject();
          return {
            userId: String(source.userId),
            scholarshipId: String(source.scholarshipId),
            status: source.status,
            submittedAt: source.submittedAt
          };
        }),
        interactions: interactions.map((item) => {
          const source = item.toObject();
          return {
            userId: String(source.userId),
            scholarshipId: String(source.scholarshipId),
            eventType: source.eventType,
            source: source.source,
            metadata: source.metadata || null,
            createdAt: source.createdAt
          };
        })
      });
    } catch (mlError) {
      console.warn("ML recommendation service unavailable, using fallback:", mlError.message);
      recommendations = generateRecommendations(user, scholarships);
    }

    res.json({ success: true, data: recommendations });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRecommendations
};
