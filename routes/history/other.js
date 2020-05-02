module.exports = {
  get: async function(place, date) {
    var channelsIndex = 5;
    const channels = getWeekChannels(place)[channelsIndex];
    const placeCode = getPlace(place);
    var baseUrl = process.env.HISTORY_RES_URL;
    const url = baseUrl
    .replace(/#place/g, placeCode)
    .replace(/#date/g, date);
    var data = [];
    for (var i = 0; i < channels.length; ++i) {
      var tmp = [[], [], [], [], [], [], [], [], []];
      data.push(tmp.concat());
    }
    const axios = require("axios");
    await axios(url)
      .then(response => {
        const cheerio = require("cheerio");
        const $ = cheerio.load(response.data);
        $(".table-striped tbody > tr").each((pos, val) => {
          const $1 = cheerio.load(val);
          $1("td").next((pos1, val1) => {
            const $2 = cheerio.load(val1);
            $2("span").each((pos2, val2) => {
              data[pos1][pos].push($(val2).text());
            });
          });
        });
        return data;
      })
      .catch(console.error);
    return data;
  },
}

// function get

function getPlace(place) {
  return place === "south" ? "mn" : "mt";
}
function getWeekChannels(place) {
  var data;
  if (place === "south") {
    data = [
      ["TP HCM", "Đồng Tháp", "Cà Mau"],
      ["Bến Tre", "Vũng Tàu", "Bạc Liêu"],
      ["Đồng Nai", "Cần Thơ", "Sóc Trăng"],
      ["Tây Ninh", "An Giang", "Bình Thuận"],
      ["Vĩnh Long", "Bình Dương", "Trà Vinh"],
      ["TP HCM", "Long An", "Bình Phước", "Hậu Giang"],
      ["Tiền Giang", "Kiên Giang", "Đà Lạt"]
    ]
  } else {
    data = [
      ["Thừa Thiên Huế", "Phú Yên"],
      ["Đắk Lắk", "Quảng Nam"],
      ["Đà Nẵng", "Khánh Hòa"],
      ["Bình Định", "Quảng Trị", "Quảng Bình"],
      ["Gia Lai", "Ninh Thuận"],
      ["Đà Nẵng", "Quảng Ngãi", "Đắk Nông"],
      ["Khánh Hòa", "Kon Tum"]
    ]
  }
  return data;
}

