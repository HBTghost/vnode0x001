function getDateFromString(dateString) {
  let arr = dateString.split('-');
  const iso = arr.reverse().join('-');
  return new Date(iso);
}

function isFuture(dateString) {
  let date = getDateFromString(dateString);
  let today = new Date();
  const aDay = 24 * 60 * 60 * 1000;
  const getDays = (dateObj) => Math.floor(dateObj.getTime() / aDay);
  return getDays(date) > getDays(today);
}

function isToday(dateString) {
  let date = getDateFromString(dateString);
  let today = new Date();
  return today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() && today.getDate() === date.getDate();
}

function isValidDate(date) {
  const pattern = /^(?:(?:31(-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(-)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

  return pattern.test(date);
}

module.exports = {
  isValidDate,
  getDateFromString,
  isFuture,
  isToday
}