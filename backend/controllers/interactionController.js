const Interaction = require("../models/interactionModel");
const Scholarship = require("../models/scholarshipModel");

async function trackInteraction(req, res, next) {
  try {
    const { userId, scholarshipId, eventType, source, metadata } = req.body;

    if (!userId || !scholarshipId || !eventType) {
      return res.status(400).json({
        success: false,
        message: "userId, scholarshipId, and eventType are required"
      });
    }

    if (String(req.user.id) !== String(userId) && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You can only record interactions for your own account"
      });
    }

    const scholarship = await Scholarship.findById(scholarshipId).select("_id");
    if (!scholarship) {
      return res.status(404).json({
        success: false,
        message: "Scholarship not found"
      });
    }

    const interaction = await Interaction.create({
      userId,
      scholarshipId,
      eventType,
      source,
      metadata: metadata || null
    });

    res.status(201).json({
      success: true,
      data: {
        id: String(interaction._id),
        userId: String(interaction.userId),
        scholarshipId: String(interaction.scholarshipId),
        eventType: interaction.eventType,
        source: interaction.source,
        createdAt: interaction.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  trackInteraction
};
