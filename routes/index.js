const router = require("express").Router();

const authRoutes = require("./auth");
const userRoutes = require("./users");

// Auth Routes "/api/auth"
router.use("/api/auth", authRoutes);

// User Routes "/api/users"
router.use("/api/users", userRoutes);

module.exports = router;
