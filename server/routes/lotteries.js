// const express = require('express');
import express from 'express';
const router = express.Router();
// const getLottery = require('../tools/results')
import { getLottery } from '../tools/results.js';

// Get a lottery result
router.get('/:region/:date', getLottery, (req, res) => {
  res.json(res.lottery);
})

// module.exports = router
export { router };