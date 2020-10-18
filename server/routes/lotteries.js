import express from 'express';
import { getLottery } from '../tools/results.js';

const lotteryRouter = express.Router();

// Get a lottery result
lotteryRouter.get('/:region/:date', getLottery, (req, res) => {
  res.json(res.lottery);
})

export { lotteryRouter };