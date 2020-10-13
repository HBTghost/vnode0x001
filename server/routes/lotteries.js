const express = require('express');
const router = express.Router();
const getLottery = require('../tools/results')

// Get a lottery result
router.get('/:region/:date', getLottery, (req, res) => {
  res.json(res.lottery);
})

module.exports = router