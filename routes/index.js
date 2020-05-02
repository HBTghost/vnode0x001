const express = require("express");
const router = express.Router();
// const axios = require("axios");

router.get("/:place/:date", (req, res) => {
  try {
    const { place, date } = req.params;
    var data;

    if (place === "north") {
      const north = require("./history/north.js");
      data = north.get(date);
    } else {
      const other = require("./history/other.js");
      data = other.get(date);
    }
    data += ` - ${place}`;
    res.json(data);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;
