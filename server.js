const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
// const cors = require("cors");

// app.use(cors());

// Load env
dotenv.config({ path: "./process.env" });

const app = express();

// Dev logging
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// Lazy load routes
app.use("/api/genDateStrings", require("./routes/genDateStrings.js"))
app.use("/api/result", require("./routes/result.js"));

// Handle production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// Choose port
const port = process.env.PORT || 8000;

// Listen
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
})
