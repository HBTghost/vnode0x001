const express = require("express");
const router = express.Router();

router.get("/:src/:des", async (req, res) => {
  try {
    const { src, des } = req.params;
    if (src === "0" || des === "0") {
      
    }
    res.json("");
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    })
  }
})

module.exports = router;
