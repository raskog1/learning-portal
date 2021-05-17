const router = require("express").Router();
const bcrypt = require("bcryptjs");
const auth = require("../config/middleware/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

// GET api/auth
// Get user information
// Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// POST api/auth
// Authenticate user and get token
// Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    // If not a user, send error
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // See if passwords match
    const isMatch = await bcrypt.compare(password, user.password);

    // If no match, send error
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Return jsonwebtoken
    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 3600 },
      (err, token) => {
        const safeUser = {
          ...user._doc,
          password: undefined,
          token,
        };

        if (err) throw err;
        res.json({ user: safeUser });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
