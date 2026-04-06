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
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    eligibilitySummary: {
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
    applicationLink: {
      type: String,
      trim: true,
      default: null
    },
    officialWebsite: {
      type: String,
      trim: true,
      default: null
    },
    mode: {
      type: String,
      trim: true,
      default: null
    },
    tags: {
      domain: {
        type: [String],
        default: []
      },
      additional: {
        type: [String],
        default: []
      }
    },
    extraDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
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