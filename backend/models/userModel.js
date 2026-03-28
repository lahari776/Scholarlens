const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      alias: "fullName"
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },
    degree: {
      type: String,
      trim: true,
      default: null
    },
    region: {
      type: String,
      trim: true,
      default: null
    },
    age: {
      type: Number,
      default: null
    },
    gender: {
      type: String,
      trim: true,
      default: null
    },
    category: {
      type: String,
      trim: true,
      default: null
    },
    skills: {
      type: [String],
      default: []
    },
    specialisation: {
      type: String,
      trim: true,
      default: null
    },
    gpa: {
      type: Number,
      default: null
    },
    currentYear: {
      type: String,
      trim: true,
      default: null
    },
    incomeRange: {
      type: String,
      trim: true,
      default: null
    },
    interests: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false }
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
