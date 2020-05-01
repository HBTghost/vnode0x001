const express = require("express");
const router = express.Router();
// const axios = require("axios");
import { mb } from "./history/mb";

router.get("/:place/:date", (req, res) => {
  try {
    const { place, date } = req.params;
    // console.log(date);
    // var data;
    // if (place === "mb") {
    //   data = new mb(date);
    // }
    res.json(date);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
  // res.send("hello");
});

module.exports = router;
