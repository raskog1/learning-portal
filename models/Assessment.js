const mongoose = require("mongoose");

const AssessmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  questions: [
    {
      q: String,
      answers: [String],
      correctA: String,
    },
  ],
});

module.exports = Assessment = mongoose.model("assessment", AssessmentSchema);
