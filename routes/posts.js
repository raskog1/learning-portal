const router = require("express").Router();
const auth = require("../config/middleware/auth");

const Post = require("../models/Post");

// POST api/posts
// Create a new post
// Private
router.post("/", auth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    console.log(req.body);
    const newPost = await Post.create(req.body);
    res.json(newPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET api/posts
// Get all posts in database
// Public
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find().sort({ date: -1 });
    res.json(allPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET api/posts/self
// Get current user posts
// Private
router.get("/self", auth, async (req, res) => {
  try {
    const selfPosts = await Post.find({ user: req.user.id }).sort({ date: -1 });
    res.json(selfPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// DELETE api/posts/:id
// Delete one post
// Private
router.delete("/:id", async (req, res) => {
  try {
    const byePost = await Post.deleteOne({ _id: req.params.id });
    res.json(byePost);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// PUT api/posts/:id
// Add a comment to a post
// Private
router.put("/:id", auth, async (req, res) => {
  try {
    const newComment = await Post.findByIdAndUpdate(req.params.id, {
      $push: {
        comments: req.body,
      },
    });
    res.json(newComment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
