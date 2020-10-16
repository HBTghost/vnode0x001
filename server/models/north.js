// Import mongoose
const mongoose = require('mongoose');

// Create schema
const northSchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  MaDB: [String],
  GDB: [String],
  G1: [String],
  G2: [String],
  G3: [String],
  G4: [String],
  G5: [String],
  G6: [String],
  G7: [String]
});

// Create model
const North = mongoose.model('North', northSchema);

// Result URL
function getUrl(date) {
  const baseUrl = process.env.HISTORY_RES_URL2;
  return baseUrl.replace(/#region/g, 'mb').replace(/#date/g, date);
}

// Get model from date
async function getNorth(date) {
  const axios = require("axios");
  const rewards = [ "MaDB", "GDB", "G1", "G2", "G3", "G4", "G5", "G6", "G7" ];
  let MaDB = [];
  let data = [[], [], [], [], [], [], [], [], []];
  let result = [];

  const url = getUrl(date);
  await axios(url)
    .then(response => {
      const cheerio = require("cheerio");
      const $ = cheerio.load(response.data);
      MaDB = $(".table-xsmb tbody tr > td > div > span").map((i, v) => $(v).text().trim()).get()
      $(".table-xsmb tr").each((atRes, val) => {
        const $1 = cheerio.load(val);
        $1("td > span").each((pos1, res) => {
          data[atRes].push($(res).text().trim());
        });
      });
      data[0] = [...MaDB]
    })
    .catch(console.error);

    
  let north = new North();
  north['date'] = date;
  rewards.forEach((rew, atRew) => {
    north[rew] = data[atRew];
  })
  result.push(north);
  
  return result;
}

class NorthModel {
  constructor(date) {
    this.date = date;
  }
  async getOrUpdate() {
    let norths = await North.find({
      'date': this.date
    });
    if (norths.length === 0) {
      norths = await getNorth(this.date);
      norths.forEach(async north => await north.save());
    }
    return norths;
  }
}

module.exports = {
  North,
  getNorth,
  NorthModel
}