const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const routes = require("./routes");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// Serve static assets for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Connect to MongoDB
const db = process.env.MONGODB_URI;
const connect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
};
connect();

// Start API server
app.listen(PORT, () => {
  console.log(`API server now listening on PORT ${PORT}`);
});
