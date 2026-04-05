const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    deadline: {
      type: Date,
      required: true
    },
    region: {
      type: String,
      trim: true,
      default: null
    },
    funding: {
      type: String,
      trim: true,
      default: null,
      alias: "fundingAmount"
    },
    degree: {
      type: String,
      trim: true,
      default: null
    },
    eligibility: {
      type: String,
      trim: true,
      default: null
    },
    category: {
      type: String,
      trim: true,
      default: null
    },
    provider: {
      type: String,
      trim: true,
      default: null
    },
    eligibleSkills: {
      type: [String],
      default: []
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.Scholarship || mongoose.model("Scholarship", scholarshipSchema);
