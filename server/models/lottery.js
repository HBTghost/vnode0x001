const { South, SouthModel } = require('./south');
const { Middle, MiddleModel } = require('./middle');
const { North, NorthModel } = require('./north');
const { isValidDate } = require('../tools/date');

class Lottery {
  constructor(region, date) {
    if (!isValidDate(date)) {
      throw { message: 'Date is not valid' };
    } else {
      this.date = date;
    }

    if (region === 'south') {
      this.model = new SouthModel(date);
    } else if (region === 'middle') {
      this.model = new MiddleModel(date);
    } else if (region === 'north') {
      this.model = new NorthModel(date);
    } else {
      throw { message: 'Region is not valid' };
    }
  }
  async getOrUpdate() {
    return await this.model.getOrUpdate();
  }
}

module.exports = Lottery