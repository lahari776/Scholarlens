const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      trim: true,
      default: "Notification"
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      trim: true,
      default: "info"
    },
    read: {
      type: Boolean,
      default: false,
      alias: "isRead"
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false }
  }
);

module.exports =
  mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
