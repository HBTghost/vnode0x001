import express from 'express';
import { getLottery } from '../tools/results.js';

const router = express.Router();

// Get a lottery result
router.get('/:region/:date', getLottery, (req, res) => {
  res.json(res.lottery);
})

export { router };