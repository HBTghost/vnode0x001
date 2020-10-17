import mongoose from 'mongoose';
import axios from "axios";
import cheerio from "cheerio";

// Create schema
const NorthSchema = mongoose.Schema({
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
const NorthModel = mongoose.model('North', NorthSchema);

// Export North management
class North {
  constructor(date) {
    this.date = date;
    this.timeRes = '18:25:00';
  }
  // Result URL
  getUrl() {
    const baseUrl = process.env.HISTORY_RES_URL2;
    return baseUrl.replace(/#region/g, 'mb').replace(/#date/g, this.date);
  }

  // Get model from date
  async get() {
    const rewards = [ "MaDB", "GDB", "G1", "G2", "G3", "G4", "G5", "G6", "G7" ];
    let MaDB = [];
    let data = [[], [], [], [], [], [], [], [], []];
    let result = [];

    const url = this.getUrl();
    await axios(url)
      .then(response => {
        const $ = cheerio.load(response.data);
        MaDB = $(".table-xsmb tbody tr > td > div > span").map((i, v) => $(v).text().trim()).get()

        $(".table-xsmb tr").each((atRes, val) => {
          const $1 = cheerio.load(val);

          $1("td > span").each((pos1, res) => {
            data[atRes].push($(res).text().trim());
          });
        });
        data[0] = [...MaDB];
      })
      .catch(console.error);

      
    let north = new NorthModel();
    north['date'] = this.date;
    rewards.forEach((rew, atRew) => {
      north[rew] = data[atRew];
    })
    result.push(north);
    
    return result;
  }
  
  // Get result from DB or scape result and post result to DB then return result
  async getOrUpdate() {
    let norths = await NorthModel.find({
      'date': this.date
    });
    if (norths.length === 0) {
      norths = await this.get();
      norths.forEach(async north => await north.save());
    }
    return norths;
  }
}

// Export North management
export { North };