const { South, getSouth } = require('../models/south');
const { Middle, getMiddle } = require('../models/middle');
const { North, getNorth } = require('../models/north');
const Lottery = require('../models/lottery');
const { isValidDate, isFuture, isToday } = require('../tools/date');

async function getLottery(req, res, next) {
  try {
    const lottery = new Lottery(req.params.region, req.params.date);
    const data = await lottery.getOrUpdate();
    if (data) {
      res.lottery = data;
    } else {
      return res.status(404).json({ message: 'Does not have result yet' });
    }
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }

  next();
}

function isGotResult(region, date) {
  if (isFuture(date)) {
    return false;
  }
  if (isToday(date)) {
    const resultedTimes = {
      'south': '16:35',
      'middle': '17:35',
      'north': '18:25'
    }
    return resultedTimes[region] < (new Date()).toTimeString().slice(0, 5);
  }
  return true;
}

module.exports = getLottery;