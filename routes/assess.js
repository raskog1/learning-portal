const router = require("express").Router();

const Assessment = require("../models/Assessment");

// POST api/assess
// Create a new assessment
// Public
router.post("/", async (req, res) => {
  try {
    const newAssess = await Assessment.create(req.body);
    res.json(newAssess);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// PUT api/assess/:id
// Add question to an Assessment
// Public
router.put("/:id", async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndUpdate(req.params.id, {
      $push: {
        questions: req.body,
      },
    });

    res.json(assessment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET api/assess/:name
// View one Assessment
// Public
router.get("/:name", async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      name: req.params.name,
    });
    res.json(assessment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET api/assess
// View all Assessments
// Public
router.get("/", async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
