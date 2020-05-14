
export async function getResult(place, date) {
  const axios = require("axios");
  const handleDate = require("../tools/handleDate.js");
  const channels = handleDate.getChannels(place, date);

  var data = [];
  for (var i = 0; i < channels.length; ++i) {
    var tmp = [[], [], [], [], [], [], [], [], []];
    data.push(tmp.concat());
  }

  const url = getUrl(place, date);
  await axios(url)
    .then(response => {
      console.log(url);
      const cheerio = require("cheerio");
      const $ = cheerio.load(response.data);
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

  const allRewards = require("../data/allRewards.json");
  const rewards = allRewards[place];
  for (let atRes = 0; atRes < rewards.length; atRes++) {
    for (let atChannel = 0; atChannel < channels.length; ++atChannel) {
      var tmp = {};
      tmp["reward"] = rewards[atRes];
      tmp["result"] = data[atChannel][atRes];
      data[atChannel][atRes] = tmp;
    }
  }

  for (let atChannel = 0; atChannel < channels.length; ++atChannel) {
    var tmp = {};
    tmp["channel"] = channels[atChannel];
    tmp["data"] = data[atChannel];
    data[atChannel] = tmp;
  }

  return data;
}

function getUrl(place, date) {
  const placeCodes = require("../data/placeCodes.json");
  const placeCode = placeCodes[place];
  const baseUrl = process.env.HISTORY_RES_URL;
  const cors = "https://cors-anywhere.herokuapp.com/";
  return cors + baseUrl.replace(/#place/g, placeCode).replace(/#date/g, date);
}