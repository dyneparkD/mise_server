const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;
const ORIGIN = process.env.ORIGIN;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

app.get("/", (req, res) => {
  res.send("home");
});
//
app.get("/mise/:stationName", async (req, res) => {
  const station = req.params.stationName.split(" ")[1];
  console.log(station);
  const query = `serviceKey=${API_KEY}&stationName=${encodeURI(
    station
  )}&dataTerm=DAILY&ver=1.3&returnType=json`;
  const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?${query}`;
  try {
    const x = await axios.get(url);
    const y = JSON.stringify(x.data.response.body.items);
    res.send(y);
  } catch (error) {
    res.send("Fail");
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
