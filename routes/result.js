const express = require("express");
const router = express.Router();

router.get("/:place/:date", async (req, res) => {
  try {
    const { place, date } = req.params;
    var history;

    if (place === "north") {
      history = require("./history/north.js");
    } else {
      history = require("./history/other.js");
    }
    const data = await history.getResult(place, date);
    res.json(data);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      [
        {
          "channel": "Tây Ninh",
          "data": [
            {
              "reward": "G8",
              "result": [
                "82"
              ]
            },
            {
              "reward": "G7",
              "result": [
                "514"
              ]
            },
            {
              "reward": "G6",
              "result": [
                "8402",
                "7065",
                "7954"
              ]
            },
            {
              "reward": "G5",
              "result": [
                "2444"
              ]
            },
            {
              "reward": "G4",
              "result": [
                "62728",
                "83470",
                "95865",
                "69676",
                "42465",
                "95065",
                "95395"
              ]
            },
            {
              "reward": "G3",
              "result": [
                "95068",
                "65392"
              ]
            },
            {
              "reward": "G2",
              "result": [
                "30807"
              ]
            },
            {
              "reward": "G1",
              "result": [
                "96967"
              ]
            },
            {
              "reward": "GĐB",
              "result": [
                "248057"
              ]
            }
          ]
        },
        {
          "channel": "An Giang",
          "data": [
            {
              "reward": "G8",
              "result": [
                "96"
              ]
            },
            {
              "reward": "G7",
              "result": [
                "967"
              ]
            },
            {
              "reward": "G6",
              "result": [
                "9799",
                "8687",
                "9118"
              ]
            },
            {
              "reward": "G5",
              "result": [
                "8992"
              ]
            },
            {
              "reward": "G4",
              "result": [
                "89868",
                "87222",
                "02701",
                "23401",
                "01207",
                "45943",
                "69828"
              ]
            },
            {
              "reward": "G3",
              "result": [
                "48303",
                "06976"
              ]
            },
            {
              "reward": "G2",
              "result": [
                "90819"
              ]
            },
            {
              "reward": "G1",
              "result": [
                "67331"
              ]
            },
            {
              "reward": "GĐB",
              "result": [
                "669390"
              ]
            }
          ]
        },
        {
          "channel": "Bình Thuận",
          "data": [
            {
              "reward": "G8",
              "result": [
                "24"
              ]
            },
            {
              "reward": "G7",
              "result": [
                "846"
              ]
            },
            {
              "reward": "G6",
              "result": [
                "0128",
                "9577",
                "2162"
              ]
            },
            {
              "reward": "G5",
              "result": [
                "3165"
              ]
            },
            {
              "reward": "G4",
              "result": [
                "55671",
                "70990",
                "13982",
                "59464",
                "37275",
                "00040",
                "87205"
              ]
            },
            {
              "reward": "G3",
              "result": [
                "01258",
                "21071"
              ]
            },
            {
              "reward": "G2",
              "result": [
                "63249"
              ]
            },
            {
              "reward": "G1",
              "result": [
                "65019"
              ]
            },
            {
              "reward": "GĐB",
              "result": [
                "335885"
              ]
            }
          ]
        }
      ]
    });
  }
});

module.exports = router;
