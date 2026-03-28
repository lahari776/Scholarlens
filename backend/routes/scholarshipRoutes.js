const express = require("express");

const scholarshipController = require("../controllers/scholarshipController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", scholarshipController.getScholarships);
router.get("/:id", scholarshipController.getScholarshipById);
router.post("/", authMiddleware, roleMiddleware("admin"), scholarshipController.createScholarship);
router.put("/:id", authMiddleware, roleMiddleware("admin"), scholarshipController.updateScholarship);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), scholarshipController.deleteScholarship);

module.exports = router;
