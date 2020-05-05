import axios from "axios";

export async function getResult(place, date) {
  const handleDate = require("../tools/handleDate.js");
  const channel = handleDate.getChannels(place, date);
  var result = [[], [], [], [], [], [], [], [], []];

  const url = getUrl(place, date);
  await axios(url)
  .then(response => {
    const cheerio = require("cheerio");
    const $ = cheerio.load(response.data);
    $(".table-xsmb tr").each((atRes, val) => {
      const $1 = cheerio.load(val);
      $1("td > span").each((pos1, res) => {
        result[atRes].push($(res).text());
      });
    });
  })
  .catch(console.error);

  const data = { channel, result };
  return data;
}

function getUrl(place, date) {
  const placeCodes = require("../data/placeCodes.json");
  const placeCode = placeCodes[place];
  const baseUrl = process.env.HISTORY_RES_URL;
  
  return baseUrl.replace(/#place/g, placeCode).replace(/#date/g, date);
}