const express = require("express");
const { signup, login, getProfile, updateProfile, listUsers, getAdminStats } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.get("/users", authMiddleware, roleMiddleware("admin"), listUsers);
router.get("/admin/stats", authMiddleware, roleMiddleware("admin"), getAdminStats);

module.exports = router;
