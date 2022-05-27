require("dotenv").config();
const API_KEY = process.env.API_KEY;
const axios = require("axios");
const { convertData } = require("./convert");

const getTest = async (req, res) => {
  try {
    res.status(200).json({ message: "test" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getMise = async (req, res) => {
  const station = req.params.stationName.split(" ")[1];
  const query = `serviceKey=${API_KEY}&stationName=${encodeURI(
    station
  )}&dataTerm=DAILY&ver=1.3&returnType=json`;
  const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?${query}`;
  try {
    const x = await axios.get(url);
    const {
      pm10Value,
      pm25Value,
      o3Value,
      no2Value,
      coValue,
      so2Value,
      dataTime,
    } = x.data.response.body.items[0];
    const converted = convertData(
      pm10Value,
      pm25Value,
      o3Value,
      no2Value,
      coValue,
      so2Value,
      dataTime
    );
    res.status(200).json(converted);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  getMise,
  getTest,
};
