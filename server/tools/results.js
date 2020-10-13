const Lottery = require('../models/lottery');
const South = require('../models/south');
const { isValidDate, isFuture, isToday } = require('../tools/date')


async function getLottery(req, res, next) {
  let lottery = [];
  try {
    // return res.json(req.params.date)
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
    
      default:
        break;
    }
    if (lottery.length === 0) {
      // for (let i = 20; i < 30; ++i) {
        const date = "21-09-2020";
        const data = await getResult(req.params.region, date);
        data.forEach(async (val) => {await val.save()});
        // }
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

function getUrl(region, date) {
  const regionCodes = {
    "south": "mn",
    "middle": "mt",
    "north": "mb"
  }
  const regionCode = regionCodes[region];
  const baseUrl = process.env.HISTORY_RES_URL2;
  return baseUrl.replace(/#region/g, regionCode).replace(/#date/g, date);
}

async function getResult(region, date) {
  const axios = require("axios");
  let channels = [];
  let data = [];

  const url = getUrl(region, date);
  await axios(url)
    .then(response => {
      const cheerio = require("cheerio");
      const $ = cheerio.load(response.data);
      channels = $(".table-striped thead > tr > th > a").map((i, v) => $(v).text()).get()
      for (let i = 0; i < channels.length; ++i) {
        let tmp = [[], [], [], [], [], [], [], [], []];
        data.push(tmp.concat());
      }
      $(".table-striped tbody > tr").each((atRes, val) => {
        const $1 = cheerio.load(val);
        $1("td").next((atChannel, val1) => {
          const $2 = cheerio.load(val1);
          $2("span").each((pos, res) => {
            data[atChannel][atRes].push($(res).text().trim());
          });
        });
      });
    })
    .catch(console.error);


  const allRewards = {
    "south": [ "G8", "G7", "G6", "G5", "G4", "G3", "G2", "G1", "GDB" ],
    "middle": [ "G8", "G7", "G6", "G5", "G4", "G3", "G2", "G1", "GDB" ],
    "north": [ "Mã ĐB", "GĐB", "G1", "G2", "G3", "G4", "G5", "G6", "G7" ]
  }

  const rewards = allRewards[region];

  let result = [];
  for (let atChannel = 0; atChannel < channels.length; ++atChannel) {
    let tmp = new South();
    tmp['date'] = date;
    tmp['channel'] = channels[atChannel]
    for (let atRes = 0; atRes < rewards.length; atRes++) {
      tmp[rewards[atRes]] = data[atChannel][atRes];
    }
    result.push(tmp);
  }
  return result;
}


module.exports = getLottery;