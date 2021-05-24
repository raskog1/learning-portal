const router = require("express").Router();

const authRoutes = require("./auth");
const userRoutes = require("./users");
const assessRoutes = require("./assess");
const postRoutes = require("./posts");

// Auth Routes "/api/auth"
router.use("/api/auth", authRoutes);

// User Routes "/api/users"
router.use("/api/users", userRoutes);

// Assess Routes "/api/assess"
router.use("/api/assess", assessRoutes);

// Post Routes "/api/posts"
router.use("/api/posts", postRoutes);

module.exports = router;
