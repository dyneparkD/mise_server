const express = require("express");
const app = express();
const cors = require("cors");
const miseRoutes = require("./routes/mise.routes");

require("dotenv").config();
const PORT = process.env.PORT || 3001;
const ORIGIN = process.env.ORIGIN;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

app.get("/", (req, res) => {
  res.send(`mise server home. Port: ${PORT}`);
});
//
app.use("/mise", miseRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
