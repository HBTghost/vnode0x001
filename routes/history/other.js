import axios from "axios";
export async function getResult(place, date) {
  const handleDate = require("../tools/handleDate.js");
  const channels = handleDate.getChannels(place, date);
  var result = [];
  for (var i = 0; i < channels.length; ++i) {
    var tmp = [[], [], [], [], [], [], [], [], []];
    result.push(tmp.concat());
  }
  const url = getUrl(place, date);
  await axios(url)
  .then(response => {
      const cheerio = require("cheerio");
      const $ = cheerio.load(response.data);
      $(".table-striped tbody > tr").each((pos, val) => {
        const $1 = cheerio.load(val);
        $1("td").next((pos1, val1) => {
          const $2 = cheerio.load(val1);
          $2("span").each((pos2, val2) => {
            result[pos1][pos].push($(val2).text());
          });
        });
      });
    })
    .catch(console.error);
  const data = { channels, result };
  return data;
}

function getUrl(place, date) {
  const placeCodes = require("../data/placeCodes.json");
  const placeCode = placeCodes[place];
  const baseUrl = process.env.HISTORY_RES_URL;
  
  return baseUrl.replace(/#place/g, placeCode).replace(/#date/g, date);
}