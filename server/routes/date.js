import express from 'express';
import { genResultedDates } from '../tools/date.js';

const timeRouter = express.Router();

timeRouter.get('/genDates/:region/:quantity', (req, res) => {
  res.json(genResultedDates(req.params.region, req.params.quantity));
});

export { timeRouter };