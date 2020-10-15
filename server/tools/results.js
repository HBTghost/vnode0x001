const { South, getSouth } = require('../models/south');
const { Middle, getMiddle } = require('../models/middle');
const { North, getNorth } = require('../models/north');
const { isValidDate, isFuture, isToday } = require('../tools/date');
// const { getNorth } = require('../models/north');


async function getLottery(req, res, next) {
  let lottery = [];
  try {
    if (!isValidRegion(req.params.region)) {
      return res.status(400).json({ message: 'Region is not valid' });
    }
    if (!isValidDate(req.params.date)) {
      return res.status(400).json({ message: 'Date is not valid' });
    }
    if (!isGotResult(req.params.region, req.params.date)) {
      return res.status(404).json({ message: 'Does not have result yet'})
    }
    switch (req.params.region) {
      case 'south':
        lottery = await South.find({
          'date': req.params.date
        });
        break;
      case 'middle':
        lottery = await Middle.find({
          'date': req.params.date
        });
        break;
      case 'north':
        lottery = await North.find({
          'date': req.params.date
        });
        break;
    
      default:
        break;
    }
    if (lottery.length === 0) {
      let data;
      switch (req.params.region) {
        case 'north':
          data = await getNorth(req.params.region, req.params.date);
          break;
        case 'middle':
          data = await getMiddle(req.params.region, req.params.date);
          break;
        case 'south':
          data = await getSouth(req.params.region, req.params.date);
          break;
        default:
          break;
      }
      data.forEach(async model => await model.save())
      return res.json(data);
    }
    return res.json(lottery)
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }

  res.lottery = lottery;
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

function isValidRegion(region) {
  const regions = ['south', 'middle', 'north'];
  return regions.includes(region);
}

module.exports = getLottery;