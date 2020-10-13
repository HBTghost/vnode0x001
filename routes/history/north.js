const axios = require('axios');

async function getResult(place, date) {
  const handleDate = require("../tools/handleDate.js");
  const channel = handleDate.getChannels(place, date);
  var data = [[], [], [], [], [], [], [], [], []];

  const url = getUrl(place, date);
  await axios(url)
    .then(response => {
      const cheerio = require("cheerio");
      const $ = cheerio.load(response.data);
      $(".table-xsmb tr").each((atRes, val) => {
        const $1 = cheerio.load(val);
        $1("td > span").each((pos1, res) => {
          data[atRes].push($(res).text().trim());
        });
      });
    })
    .catch(console.error);

  const allRewards = require("../data/allRewards.json");
  const rewards = allRewards[place];
  for (let atRes = 0; atRes < rewards.length; atRes++) {
    var tmp = {};
    tmp["reward"] = rewards[atRes];
    tmp["result"] = data[atRes];
    data[atRes] = tmp;
  }

  const result = { channel, data };
  return result;
}

function getUrl(place, date) {
  const placeCodes = require("../data/placeCodes.json");
  const placeCode = placeCodes[place];
  const baseUrl = process.env.HISTORY_RES_URL;
  
  return baseUrl.replace(/#place/g, placeCode).replace(/#date/g, date);
}
module.exports = getResult;