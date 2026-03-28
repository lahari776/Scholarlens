const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["applied", "review", "approved", "rejected"],
      default: "applied"
    },
    statement: {
      type: String,
      default: null
    }
  },
  {
    timestamps: { createdAt: "submittedAt", updatedAt: false }
  }
);

applicationSchema.index({ userId: 1, scholarshipId: 1 }, { unique: true });

module.exports =
  mongoose.models.Application || mongoose.model("Application", applicationSchema);
