const express = require("express");
const router = express.Router();
// const axios = require("axios");

router.get("/:place/:date", (req, res) => {
  try {
    const { place, date } = req.params;
    var data;
    if (place === "mb") {
      const mb = require("./history/mb");
      data = mb.show(date);
    }
    res.json(data);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
  // res.send("hello");
});

module.exports = router;
