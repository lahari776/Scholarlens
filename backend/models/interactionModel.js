const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    scholarshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true
    },
    eventType: {
      type: String,
      enum: ["view", "save", "apply", "detail_click", "recommendation_click"],
      required: true
    },
    source: {
      type: String,
      trim: true,
      default: "unknown"
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false }
  }
);

interactionSchema.index({ userId: 1, scholarshipId: 1, eventType: 1, createdAt: -1 });

module.exports =
  mongoose.models.Interaction || mongoose.model("Interaction", interactionSchema);
