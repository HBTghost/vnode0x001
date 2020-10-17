import { Lottery } from '../models/lottery.js';

async function getLottery(req, res, next) {
  try {
    const lottery = new Lottery(req.params.region, req.params.date);
    res.lottery = await lottery.getOrUpdate();
  } catch(err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next();
}

export { getLottery };