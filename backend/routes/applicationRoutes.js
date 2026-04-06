const express = require("express");

const applicationController = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/apply", authMiddleware, applicationController.applyForScholarship);
router.get("/user/:id", authMiddleware, applicationController.getApplicationsByUser);
router.get("/admin", authMiddleware, roleMiddleware("admin"), applicationController.getAllApplications);

module.exports = router;
