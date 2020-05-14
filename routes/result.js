const express = require("express");
const router = express.Router();

router.get("/:place/:date", async (req, res) => {
  try {
    const { place, date } = req.params;
    var history;

    if (place === "north") {
      history = require("./history/north.js");
    } else {
      history = require("./history/other.js");
    }
    const data = await history.getResult(place, date);
    res.json(data);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: err
    });
  }
});

module.exports = router;
