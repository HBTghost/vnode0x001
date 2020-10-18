function isValidDate(date) {
  const pattern = /^(?:(?:31(-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(-)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

  return pattern.test(date);
}

function getDateFromString(dateString) {
  let arr = dateString.split('-');
  return new Date(arr.reverse().join('-'));
}

function isFuture(date, timeRes) {
  const nowString = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' });
  const userString = date ? getDateFromString(date).toLocaleString('en-GB') : nowString;

  const nowDate = nowString.slice(0, 10).split('/').reverse();
  const nowTime = nowString.slice(12).split(':');
  const userDate = userString.slice(0, 10).split('/').reverse();
  const userTime = timeRes.split(':');

  const now = [...nowDate, ...nowTime].map(val => parseInt(val));
  const user = [...userDate, ...userTime].map(val => parseInt(val));

  for (let index = 0; index < user.length; index++) {
    if (user[index] > now[index]) {
      return true;
    } else if (user[index] < now[index]) {
      return false;
    }
  }
  return true;
}

function genResultedDates(region, quantity = 1) {
  let resultedTime;
  if (region === 'south') {
    resultedTime = '16:35:00';
  } else if (region === 'middle') {
    resultedTime = '17:35:00';
  } else {
    resultedTime = '18:25:00';
  }

  function getStringFromDate(date) {
    let localeString =  date.toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' });
    return localeString.slice(0, 10).split('/').join('-');
  }

  let today = new Date();
  const aWeek = 7 * 24 * 60 * 60 * 1000;
  let result = []
  if (isFuture(null, resultedTime)) {
    today = new Date(today.getTime() - aWeek);
  }
  for (let i = 0; i < quantity; ++i) {
    result.push(getStringFromDate(today));
    today = new Date(today.getTime() - aWeek);
  }
  return result;
}

export { isValidDate, isFuture, genResultedDates };