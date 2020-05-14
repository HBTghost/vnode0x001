const express = require("express");
const router = express.Router();

router.get("/:place/:date", async (req, res) => {
  try {
    const { place, date } = req.params;
    // var history;

    // if (place === "north") {
    //   history = require("./history/north.js");
    // } else {
      // history = require("./history/other.js");
    // }
    const history = require("./history/other");
    const data = await history.getResult(place, date);
    // const data = require("./data/res_south_07_05_2020.json");
    res.json(data);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: "Server is live but not available"
    });
  }
});

module.exports = router;
