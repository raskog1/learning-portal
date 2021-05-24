const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    scores: [
      {
        name: {
          type: String,
          required: true,
          unique: true,
        },
        score: {
          type: Number,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestampes: true }
);

module.exports = User = mongoose.model("user", UserSchema);
