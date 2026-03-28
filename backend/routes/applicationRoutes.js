const express = require("express");

const applicationController = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/apply", authMiddleware, applicationController.applyForScholarship);
router.get("/user/:id", authMiddleware, applicationController.getApplicationsByUser);

module.exports = router;
