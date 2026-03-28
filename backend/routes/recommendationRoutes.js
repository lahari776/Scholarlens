const express = require("express");

const recommendationController = require("../controllers/recommendationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:userId", authMiddleware, recommendationController.getRecommendations);

module.exports = router;
