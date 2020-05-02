function getDateFromString(dateString) {
  var arr = dateString.split("-");
  const iso = arr.reverse().join("-");
  return new Date(iso);
}
function getDoWindexFromDate(val) {
  return (val.getDay() + 7 - 1) % 7;
}
export function getChannels(place, dateString) {
  const date = getDateFromString(dateString);
  const DoWindex = getDoWindexFromDate(date);
  const regionChannels = require("../data/regionChannels.json");
  return regionChannels[place][DoWindex];
}
// function getCurDoW() {
//   return this.DoWs[this.getDoWindexFromDate(new Date())];
// }
// function formatDigits(val, digits) {
//   let res = val.toString();
//   while (res.length < digits) {
//     res = "0" + res;
//   }
//   return res;
// }
// function getStringFromDate(val) {
//   const day = this.formatDigits(val.getDate(), 2);
//   const month = this.formatDigits(val.getMonth() + 1, 2);
//   const year = val.getFullYear();
//   return day + "-" + month + "-" + year;
// }
// function genDateStringsFromDoW(DoW) {
//   const today = new Date();
//   const offset = this.DoWs.indexOf(DoW) - this.getDoWindexFromDate(today);
//   const day = 24 * 60 * 60 * 1000;
//   let date = new Date(today.getTime() + offset * day);
//   if (offset > 0 || (offset === 0 && today.getHours() < this.timeRes)) {
//     date = new Date(date - 7 * day);
//   }
//   this.dateStrings = [];
//   for (let i = 0; i < 7; ++i) {
//     this.dateStrings.push(this.getStringFromDate(date));
//     date = new Date(date - 7 * day);
//   }
// }
