const express = require("express");

const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:userId", authMiddleware, notificationController.getNotificationsByUser);

module.exports = router;
