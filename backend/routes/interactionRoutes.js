const express = require("express");

const interactionController = require("../controllers/interactionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, interactionController.trackInteraction);

module.exports = router;
