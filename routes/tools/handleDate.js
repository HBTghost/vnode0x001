export function getChannels(place, dateString) {
  const date = getDateFromString(dateString);
  const regionChannels = require("../data/allChannels.json");
  return regionChannels[place][date.getDay()];
}
export function genDateStrings(place, dateString, day, amount) {
  var delta;
  if (dateString === "0") {
    delta = 0;
  } else {
    const tmp = getDateFromString(dateString);
    delta = parseInt(day) - tmp.getDay(); 
  }
  
  const today = new Date();
  const aDay = 24 * 60 * 60 * 1000;
  var date = new Date(today.getTime() + delta * aDay);
  if (isNotGotResult(place, date)) {
    date = new Date(date - 7 * aDay);
  }

  var dateStrings = [];
  for (let i = 0; i < parseInt(amount); ++i) {
    dateStrings.push(getStringFromDate(date));
    date = new Date(date - 7 * aDay);
  } 

  return dateStrings;
}
function getDateFromString(dateString) {
  var arr = dateString.split("-");
  const iso = arr.reverse().join("-");
  return new Date(iso);
}
function formatDigits(val, digits) {
  let res = val.toString();
  while (res.length < digits) {
    res = "0" + res;
  }
  return res;
}
function getStringFromDate(date) {
  const day = formatDigits(date.getDate(), 2);
  const month = formatDigits(date.getMonth() + 1, 2);
  const year = date.getFullYear();
  return day + "-" + month + "-" + year;
}
function isInRange(elem, array) {
  const [ begin, end ] = array;
  return elem > begin && elem < end;
}
// function isBiggerThanRange(elem, array) {
//   const [ begin, end ] = array;
//   return elem > end;
// }
function isSmallerThanRange(elem, array) {
  const [ begin, end ] = array;
  return elem < begin;
}
// function isGettingResult(place, date) {
//   const allResultingTime = require("../data/allResultingTime.json");
//   const { hourArr, minArr } = allResultingTime[place];
//   const hour = date.getHours();
//   const min = date.getMinutes();
//   return isInRange(hour, hourArr) && isInRange(min, minArr);
// }
// function isGotFullResult(date) {
//   const allResultingTime = require("../data/allResultingTime.json");
//   const { hourArr, minArr } = allResultingTime[place];
//   const hour = date.getHours();
//   const min = date.getMinutes();
//   if (isBiggerThanRange(hour, hourArr)) {
//     return true;
//   } else if (isInRange(hour, hourArr) && isBiggerThanRange(min, minArr)) {
//     return true;
//   } else {
//     return false;
//   }
// }
function isNotGotResult(place, date) {
  const allResultingTime = require("../data/allResultingTime.json");
  const resultingTime = allResultingTime[place];
  const hourArr = resultingTime["hour"];
  const minArr = resultingTime["min"];
  const hour = date.getHours();
  const min = date.getMinutes();
  if (isSmallerThanRange(hour, hourArr)) {
    return true;
  } else if (isInRange(hour, hourArr) && isSmallerThanRange(min, minArr)) {
    return true;
  } else {
    return false;
  }
}