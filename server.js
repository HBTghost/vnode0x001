const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load env
dotenv.config({ path: "./process.env" });

const app = express();

// Dev logging
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// Routes
// app.get("/api/:place/:date", (req, res) => {
//   const { place, date } = req.params;
//   res.send(`${place} - ${date}`);
// })
app.use("/api", require("./routes/index"));

const port = process.env.PORT || 7070;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
})
