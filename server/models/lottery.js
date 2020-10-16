// const South = require('./south');
import { South } from './south';
const Middle = require('./middle');
const North = require('./north');
const { isValidDate, isFuture } = require('../tools/date');

class Lottery {
  constructor(region, date) {
    if (!isValidDate(date)) {
      throw { status: 400, message: 'Date is not valid' };
    }

    if (region === 'south') {
      this.model = new South(date);
    } else if (region === 'middle') {
      this.model = new Middle(date);
    } else if (region === 'north') {
      this.model = new North(date);
    } else {
      throw { status: 400, message: 'Region is not valid' };
    }
  }
  async getOrUpdate() {
    if (isFuture(this.model.date, this.model.timeRes)) {
      throw { status: 404, message: 'Does not have result yet' + (new Date()).toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' }) };
    }
    return await this.model.getOrUpdate();
  }
}

module.exports = Lottery;