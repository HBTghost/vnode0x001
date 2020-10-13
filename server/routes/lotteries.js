const express = require('express');
const router = express.Router();
const getLottery = require('../tools/results')
// const Lottery = require('../models/lottery');

// Get a lottery result
router.get('/:region/:date', getLottery, (req, res) => {
  console.log(req.params);
  res.json(res.lottery);
})


module.exports = router