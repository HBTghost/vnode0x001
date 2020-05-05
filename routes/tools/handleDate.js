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
  const regionChannels = require("../data/allChannels.json");
  return regionChannels[place][DoWindex];
}