// Import mongoose
import mongoose from 'mongoose';

// Create schema
const MiddleSchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  G8: [String],
  G7: [String],
  G6: [String],
  G5: [String],
  G4: [String],
  G3: [String],
  G2: [String],
  G1: [String],
  GDB: [String]
});

// Create model
const MiddleModel = mongoose.model('Middle', MiddleSchema);

// Create Middle management
class Middle{
  constructor(date) {
    this.date = date;
    this.timeRes = '17:35:00';
  }

  // Result URL
  getUrl() {
    const baseUrl = process.env.HISTORY_RES_URL2;
    return baseUrl.replace(/#region/g, 'mt').replace(/#date/g, this.date);
  }

  // Get model
  async get() {
    const axios = require("axios");
    const url = this.getUrl();
    const rewards = [ "G8", "G7", "G6", "G5", "G4", "G3", "G2", "G1", "GDB" ];
    let channels = [];
    let result = [];
    let data = [];

    await axios(url)
      .then(response => {
        const cheerio = require("cheerio");
        const $ = cheerio.load(response.data);

        channels = $(".table-striped thead > tr > th > a").map((i, v) => $(v).text()).get()

        for (let i = 0; i < channels.length; ++i) {
          let tmp = [[], [], [], [], [], [], [], [], []];
          data.push([...tmp]);
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

    for (let atChannel = 0; atChannel < channels.length; ++atChannel) {
      let middle = new MiddleModel();
      middle['date'] = this.date;
      middle['channel'] = channels[atChannel];
      rewards.forEach((rew, atRew) => {
        middle[rew] = data[atChannel][atRew];
      })
      result.push(middle);
    }

    return result;
  }

  async getOrUpdate() {
    let middles = await MiddleModel.find({
      'date': this.date
    });
    if (middles.length === 0) {
      middles = await this.get();
      middles.forEach(async middle => await middle.save());
    }
    return middles;
  }
}

// Export Middle management
export { Middle };