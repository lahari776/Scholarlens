const Notification = require("../models/notificationModel");

function formatNotification(notification) {
  if (!notification) {
    return null;
  }

  const source = typeof notification.toObject === "function" ? notification.toObject() : notification;

  return {
    id: String(source._id || source.id),
    userId: String(source.userId?._id || source.userId),
    title: source.title,
    message: source.message,
    type: source.type,
    isRead: Boolean(source.read ?? source.isRead),
    createdAt: source.createdAt
  };
}

async function getNotificationsByUser(req, res, next) {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: notifications.map(formatNotification) });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getNotificationsByUser
};
