const express = require("express");
const router = express.Router();

router.get("/:place/:dateString/:day/:amount", async (req, res) => {
  try {
    const { place, dateString, day, amount } = req.params;
    const handleDate = require("./tools/handleDate.js");
    const dateStrings =
      handleDate.genDateStrings(place, dateString, day, amount);

    res.json(dateStrings);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    })
  }
})

module.exports = router;
